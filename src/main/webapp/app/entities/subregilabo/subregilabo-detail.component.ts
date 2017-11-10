import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Subregilabo } from './subregilabo.model';
import { SubregilaboService } from './subregilabo.service';

@Component({
    selector: 'jhi-subregilabo-detail',
    templateUrl: './subregilabo-detail.component.html'
})
export class SubregilaboDetailComponent implements OnInit, OnDestroy {

    subregilabo: Subregilabo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private subregilaboService: SubregilaboService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSubregilabos();
    }

    load(id) {
        this.subregilaboService.find(id).subscribe((subregilabo) => {
            this.subregilabo = subregilabo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSubregilabos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'subregilaboListModification',
            (response) => this.load(this.subregilabo.id)
        );
    }
}
