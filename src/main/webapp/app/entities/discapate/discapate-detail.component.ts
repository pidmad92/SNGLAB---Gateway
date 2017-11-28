import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Discapate } from './discapate.model';
import { DiscapateService } from './discapate.service';

@Component({
    selector: 'jhi-discapate-detail',
    templateUrl: './discapate-detail.component.html'
})
export class DiscapateDetailComponent implements OnInit, OnDestroy {

    discapate: Discapate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discapateService: DiscapateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscapates();
    }

    load(id) {
        this.discapateService.find(id).subscribe((discapate) => {
            this.discapate = discapate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscapates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discapateListModification',
            (response) => this.load(this.discapate.id)
        );
    }
}
