import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Discap } from './discap.model';
import { DiscapService } from './discap.service';

@Component({
    selector: 'jhi-discap-detail',
    templateUrl: './discap-detail.component.html'
})
export class DiscapDetailComponent implements OnInit, OnDestroy {

    discap: Discap;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discapService: DiscapService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscaps();
    }

    load(id) {
        this.discapService.find(id).subscribe((discap) => {
            this.discap = discap;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscaps() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discapListModification',
            (response) => this.load(this.discap.id)
        );
    }
}
