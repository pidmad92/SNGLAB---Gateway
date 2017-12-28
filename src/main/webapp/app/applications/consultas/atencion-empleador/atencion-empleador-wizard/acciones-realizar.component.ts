// import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Accionadop } from '../../models/accionadop.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';

import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-acciones-realizar',
    templateUrl: './acciones-realizar.component.html'
})
// export class AccionesRealizarComponent implements OnInit, OnDestroy {
    export class AccionesRealizarComponent {
    listaccionadop: Accionadop[];
    cols: any[];
    constructor(
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        // private accionadopService: AccionadopService,
        private route: ActivatedRoute
    ) {
    }

    // ngOnInit() {
    //     this.accionadopService.findListaAccionAdoptada()
    //     .subscribe((res: ResponseWrapper) => { this.listaccionadop = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    //     this.cols = [
    //         // {field: 'dpto', header: 'Dpto'},
    //         // {field: 'prov', header: 'Provincia'},
    //         // {field: 'dist', header: 'Distrito'},
    //         // {field: 'direc', header: 'Dirección'},
    //         // {field: 'noti', header: 'Notificar'},
    //         {field: 'vDesaccdop', header: 'Descripción'}
    //     ];
    // }

    load(id) {
        // this.atencionTrabajadorService.find(id).subscribe((trabajador) => {
        //     this.trabajador = trabajador;
        // });
    }

    previousState() {
        window.history.back();
    }

    // ngOnDestroy() {
    //     // this.subscription.unsubscribe();
    //     // this.eventManager.destroy(this.eventSubscriber);
    // }

    registerChangeInAccionadops() {
        // this.eventSubscriber = this.eventManager.subscribe(
        //     'datosTrabajadorListModification',
        //     (response) => this.load(this.trabajador.id)
        // );
    }

    trackMotivoConsltaOfic(index: number, item: Accionadop) {
         return item.vDesaccdop;
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
