import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Dettipprov } from './dettipprov.model';
import { DettipprovService } from './dettipprov.service';

@Component({
    selector: 'jhi-dettipprov-detail',
    templateUrl: './dettipprov-detail.component.html'
})
export class DettipprovDetailComponent implements OnInit, OnDestroy {

    dettipprov: Dettipprov;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dettipprovService: DettipprovService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDettipprovs();
    }

    load(id) {
        this.dettipprovService.find(id).subscribe((dettipprov) => {
            this.dettipprov = dettipprov;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDettipprovs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'dettipprovListModification',
            (response) => this.load(this.dettipprov.id)
        );
    }
}
