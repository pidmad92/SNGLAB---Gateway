import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Datlab } from './datlab.model';
import { DatlabService } from './datlab.service';

@Component({
    selector: 'jhi-datlab-detail',
    templateUrl: './datlab-detail.component.html'
})
export class DatlabDetailComponent implements OnInit, OnDestroy {

    datlab: Datlab;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private datlabService: DatlabService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatlabs();
    }

    load(id) {
        this.datlabService.find(id).subscribe((datlab) => {
            this.datlab = datlab;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDatlabs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datlabListModification',
            (response) => this.load(this.datlab.id)
        );
    }
}
