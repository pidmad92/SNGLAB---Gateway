import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './../trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit, OnDestroy {

    trabajador: Trabajador;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    cars: any[];
    cols: any[];

    constructor(
        private eventManager: JhiEventManager,
        private accionadopService: AtencionTrabajadorService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.cars = [{ 'dpto': 'Lima', 'prov': 'Lima', 'dist': 'Puente Piedra', 'direc': 'Mz D Lt. 18 Urb.', 'noti': '', 'acci': '' },
                     { 'dpto': 'Lima', 'prov': 'Lima', 'dist': 'Jesus Maria', 'direc': 'Av. Salaverry x', 'noti': '', 'acci': '' }
                    ]
        this.cols = [
            {field: 'dpto', header: 'Dpto'},
            {field: 'prov', header: 'Provincia'},
            {field: 'dist', header: 'Distrito'},
            {field: 'direc', header: 'Dirección'},
            {field: 'noti', header: 'Notificar'},
            {field: 'acci', header: 'Acciones'}
        ];
        this.subscription = this.route.params.subscribe((params) => {
            // this.load(params['id']);
        });
        this.registerChangeInAccionadops();
    }

    load(id) {
        this.accionadopService.find(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
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
            'datosTrabajadorListModification',
            (response) => this.load(this.trabajador.id)
        );
    }
}
