import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Solicitud } from './solicitud.model';
import { SolicitudService } from './solicitud.service';

@Component({
    selector: 'jhi-solicitud-detail',
    templateUrl: './solicitud-detail.component.html'
})
export class SolicitudDetailComponent implements OnInit, OnDestroy {

    solicitud: Solicitud;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private solicitudService: SolicitudService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSolicituds();
    }

    load(id) {
        this.solicitudService.find(id).subscribe((solicitud) => {
            this.solicitud = solicitud;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSolicituds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'solicitudListModification',
            (response) => this.load(this.solicitud.id)
        );
    }
}
