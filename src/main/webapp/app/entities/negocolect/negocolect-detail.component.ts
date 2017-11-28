import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Negocolect } from './negocolect.model';
import { NegocolectService } from './negocolect.service';

@Component({
    selector: 'jhi-negocolect-detail',
    templateUrl: './negocolect-detail.component.html'
})
export class NegocolectDetailComponent implements OnInit, OnDestroy {

    negocolect: Negocolect;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private negocolectService: NegocolectService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNegocolects();
    }

    load(id) {
        this.negocolectService.find(id).subscribe((negocolect) => {
            this.negocolect = negocolect;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNegocolects() {
        this.eventSubscriber = this.eventManager.subscribe(
            'negocolectListModification',
            (response) => this.load(this.negocolect.id)
        );
    }
}
