import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Discapacidad } from './discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';

@Component({
    selector: 'jhi-discapacidad-detail',
    templateUrl: './discapacidad-detail.component.html'
})
export class DiscapacidadDetailComponent implements OnInit, OnDestroy {

    discapacidad: Discapacidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private discapacidadService: DiscapacidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDiscapacidads();
    }

    load(id) {
        this.discapacidadService.find(id).subscribe((discapacidad) => {
            this.discapacidad = discapacidad;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDiscapacidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'discapacidadListModification',
            (response) => this.load(this.discapacidad.id)
        );
    }
}
