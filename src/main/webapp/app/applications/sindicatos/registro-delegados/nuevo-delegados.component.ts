import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { RegistroDelegadosService } from './registro-delegados.service';
import { IngresoDelegadosComponent } from './ingreso-delegados.component';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-nuevo-delegados',
    templateUrl: './nuevo-delegados.component.html'
})
export class NuevoDelegadosComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    listaConsulta: any[];

    constructor(
        private eventManager: JhiEventManager,
        private modalService: NgbModal,
    ) {
    }

    ngOnInit() {
        this.listaConsulta = [
            {tipdoc : 'DNI', numdoc: '23534512', nomcom: 'Evaluación de nombres', fecreg: '11/11/11', estado: 'Evaluación'},
            {tipdoc : 'DNI', numdoc: '34534512', nomcom: 'Evaluación de nombres', fecreg: '11/11/11', estado: 'Evaluación'},
            {tipdoc : 'DNI', numdoc: '34543512', nomcom: 'Evaluación de nombres', fecreg: '11/11/11', estado: 'Evaluación'},
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
        this.modalService.open(IngresoDelegadosComponent);
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
