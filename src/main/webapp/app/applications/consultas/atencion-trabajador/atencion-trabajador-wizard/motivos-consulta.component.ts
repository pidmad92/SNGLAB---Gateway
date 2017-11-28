// import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Motate } from './../motate.model';
import { Motatenofic } from './../motatenofic.model';
import { MotatenoficService } from './../motatenofic.service';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';

import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-motivos-consulta',
    templateUrl: './motivos-consulta.component.html'
})
// export class MotivosConsultaComponent implements OnInit, OnDestroy {
    export class MotivosConsultaComponent {
    listamotatenofic: Motatenofic[];
    // cols: any[];
    idoficOrigen: number;
    // private subscription: Subscription;
    // private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private motatenoficService: MotatenoficService,
        private route: ActivatedRoute
    ) {
    }

    // ngOnInit() {
    //     this.idoficOrigen = 5;
    //     this.motatenoficService.findListaMotatenOfic(this.idoficOrigen)
    //     .subscribe((res: ResponseWrapper) => { this.listamotatenofic = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    //     console.log(this.listamotatenofic);
    //     this.cols = [
    //         // {field: 'dpto', header: 'Dpto'},
    //         // {field: 'prov', header: 'Provincia'},
    //         // {field: 'dist', header: 'Distrito'},
    //         // {field: 'direc', header: 'Dirección'},
    //         // {field: 'noti', header: 'Notificar'},
    //         {field: 'vDesmotate', header: 'Descripción'}
    //     ];
    //     this.subscription = this.route.params.subscribe((params) => {
    //         // this.load(params['id']);
    //     });
    // }

    // load(id) {
    //     // this.atencionTrabajadorService.find(id).subscribe((trabajador) => {
    //     //     this.trabajador = trabajador;
    //     // });
    // }

    // previousState() {
    //     window.history.back();
    // }

    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    // registerChangeInAccionadops() {
    //     // this.eventSubscriber = this.eventManager.subscribe(
    //     //     'datosMotatenoficListModification',
    //     //     (response) => this.load(this.trabajador.id)
    //     // );
    // }

    // trackMotivoConsltaOfic(index: number, item: Motate) {
    //     return item.vDesmotate;
    // }

    // private onError(error: any) {
    //     // this.jhiAlertService.error(error.message, null, null);
    // }
}
