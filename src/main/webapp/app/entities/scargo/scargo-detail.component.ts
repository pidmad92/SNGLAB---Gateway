import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Scargo } from './scargo.model';
import { ScargoService } from './scargo.service';

@Component({
    selector: 'jhi-scargo-detail',
    templateUrl: './scargo-detail.component.html'
})
export class ScargoDetailComponent implements OnInit, OnDestroy {

    scargo: Scargo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scargoService: ScargoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScargos();
    }

    load(id) {
        this.scargoService.find(id).subscribe((scargo) => {
            this.scargo = scargo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScargos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scargoListModification',
            (response) => this.load(this.scargo.id)
        );
    }
}
