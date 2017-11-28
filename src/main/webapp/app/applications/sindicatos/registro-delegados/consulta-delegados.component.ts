import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { RegistroDelegadosService } from './registro-delegados.service';
import { RegistroDelegadosComponent } from './registro-delegados.component';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

// import { RegistroDelegadosComponent } from './index';

@Component({
    selector: 'jhi-consulta-delegados',
    templateUrl: './consulta-delegados.component.html'
})
export class ConsultaDelegadosComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    closeResult: string;

    txtBuscar: string;
    val1: string;
    displayDialog: boolean;
    newCar: boolean;
    listaConsulta: any[];

    constructor(
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
    ) {
    }
        ngOnInit() {
            this.listaConsulta = [
                {expediente : '124234-2343', nombre: 'Ministerio de Trabajo Lima', estado: 'Evaluación'},
                {expediente : '124234-2342', nombre: 'Ministerio de Trabajo Huau', estado: 'Evaluación'},
                {expediente : '124234-2341', nombre: 'Ministerio de Trabajo Huaa', estado: 'Evaluación'},
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

    open() {
        this.modalService.open(RegistroDelegadosComponent);
    }

    close() {
        this.close();
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
