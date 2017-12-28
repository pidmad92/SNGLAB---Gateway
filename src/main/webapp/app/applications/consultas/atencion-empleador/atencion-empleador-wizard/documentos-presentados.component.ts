// import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresate } from '../../models/docpresate.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';

import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-documentos-presentados',
    templateUrl: './documentos-presentados.component.html'
})
// export class DocumentosPresentadosComponent implements OnInit, OnDestroy {
    export class DocumentosPresentadosComponent {
    listadocpresate: Docpresate[];
    cols: any[];
    idoficOrigen: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        // private docpresateService: DocpresateService,
        private route: ActivatedRoute
    ) {
    }

    // ngOnInit() {
    //     this.docpresateService.findListaDocpresate()
    //     .subscribe((res: ResponseWrapper) => { this.listadocpresate = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    //     this.cols = [
    //         // {field: 'dpto', header: 'Dpto'},
    //         // {field: 'prov', header: 'Provincia'},
    //         // {field: 'dist', header: 'Distrito'},
    //         // {field: 'direc', header: 'Dirección'},
    //         // {field: 'noti', header: 'Notificar'},
    //         {field: 'vDesmotate', header: 'Descripción'}
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
    //     this.subscription.unsubscribe();
    //     this.eventManager.destroy(this.eventSubscriber);
    // }

    registerChangeInAccionadops() {
        // this.eventSubscriber = this.eventManager.subscribe(
        //     'datosTrabajadorListModification',
        //     (response) => this.load(this.trabajador.id)
        // );
    }

    trackMotivoConsltaOfic(index: number, item: Docpresate) {
        // return item.vDesmotate;
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
