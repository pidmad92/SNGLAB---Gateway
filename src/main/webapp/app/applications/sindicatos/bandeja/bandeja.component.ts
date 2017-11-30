import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
    selector: 'jhi-bandeja',
    templateUrl: './bandeja.component.html'
})
export class BandejaComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeSub: any;
    id = '14';

    txtBuscar: string;
    val1: string;
    displayDialog: boolean;
    newCar: boolean;
    listaConsulta: any[];

    constructor(
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit() {
        this.listaConsulta = [
            {expediente : '124234-2343', nombre: 'Ministerio de Trabajo Lima', recurso: 'Junta Directiva', fecha: '11/11/11'},
            {expediente : '124234-2342', nombre: 'Ministerio de Trabajo Huau', recurso: 'Junta Directiva', fecha: '11/11/11'},
            {expediente : '124234-2341', nombre: 'Ministerio de Trabajo Huaa', recurso: 'Junta Directiva', fecha: '11/11/11'},
        ]
        /*this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();*/
    }

    loadAll() {

        /*if (this.currentSearch) {
            this.atencionEmpleadorService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.empleador = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.atencionEmpleadorService.query().subscribe(
            (res: ResponseWrapper) => {
                this.empleador = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );*/
    }

    clear() {
        /*this.currentSearch = '';
        this.loadAll();*/
    }
    open(texto) {
        console.log('texto: ' + texto);
        // this.modalService.open(EvaluarSolicitudesComponent);
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
