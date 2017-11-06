import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Accionadop } from './accionadop.model';
import { AccionadopService } from './accionadop.service';

@Component({
    selector: 'jhi-accionadop-detail',
    templateUrl: './accionadop-detail.component.html'
})
export class AccionadopDetailComponent implements OnInit, OnDestroy {

    accionadop: Accionadop;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accionadopService: AccionadopService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccionadops();
    }

    load(id) {
        this.accionadopService.find(id).subscribe((accionadop) => {
            this.accionadop = accionadop;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accionadopListModification',
            (response) => this.load(this.accionadop.id)
        );
    }
}
