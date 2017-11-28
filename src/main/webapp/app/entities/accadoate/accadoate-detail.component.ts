import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Accadoate } from './accadoate.model';
import { AccadoateService } from './accadoate.service';

@Component({
    selector: 'jhi-accadoate-detail',
    templateUrl: './accadoate-detail.component.html'
})
export class AccadoateDetailComponent implements OnInit, OnDestroy {

    accadoate: Accadoate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private accadoateService: AccadoateService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAccadoates();
    }

    load(id) {
        this.accadoateService.find(id).subscribe((accadoate) => {
            this.accadoate = accadoate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAccadoates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'accadoateListModification',
            (response) => this.load(this.accadoate.id)
        );
    }
}
