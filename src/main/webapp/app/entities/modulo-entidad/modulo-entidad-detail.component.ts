import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ModuloEntidad } from './modulo-entidad.model';
import { ModuloEntidadService } from './modulo-entidad.service';

@Component({
    selector: 'jhi-modulo-entidad-detail',
    templateUrl: './modulo-entidad-detail.component.html'
})
export class ModuloEntidadDetailComponent implements OnInit, OnDestroy {

    moduloEntidad: ModuloEntidad;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private moduloEntidadService: ModuloEntidadService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModuloEntidads();
    }

    load(id) {
        this.moduloEntidadService.find(id).subscribe((moduloEntidad) => {
            this.moduloEntidad = moduloEntidad;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInModuloEntidads() {
        this.eventSubscriber = this.eventManager.subscribe(
            'moduloEntidadListModification',
            (response) => this.load(this.moduloEntidad.id)
        );
    }
}
