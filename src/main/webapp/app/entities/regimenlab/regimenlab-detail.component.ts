import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Regimenlab } from './regimenlab.model';
import { RegimenlabService } from './regimenlab.service';

@Component({
    selector: 'jhi-regimenlab-detail',
    templateUrl: './regimenlab-detail.component.html'
})
export class RegimenlabDetailComponent implements OnInit, OnDestroy {

    regimenlab: Regimenlab;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private regimenlabService: RegimenlabService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRegimenlabs();
    }

    load(id) {
        this.regimenlabService.find(id).subscribe((regimenlab) => {
            this.regimenlab = regimenlab;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRegimenlabs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'regimenlabListModification',
            (response) => this.load(this.regimenlab.id)
        );
    }
}
