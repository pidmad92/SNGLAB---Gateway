import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TipoEntidad } from './tipo-entidad.model';
import { TipoEntidadService } from './tipo-entidad.service';

@Component({
    selector: 'jhi-tipo-entidad-detail',
    templateUrl: './tipo-entidad-detail.component.html'
})
export class TipoEntidadDetailComponent implements OnInit, OnDestroy {

    tipoEntidad: TipoEntidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tipoEntidadService: TipoEntidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTipoEntidads();
    }

    load(id) {
        this.tipoEntidadService.find(id).subscribe((tipoEntidad) => {
            this.tipoEntidad = tipoEntidad;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTipoEntidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tipoEntidadListModification',
            (response) => this.load(this.tipoEntidad.id)
        );
    }
}
