import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

import { RegistroRecursoService } from './registro-recurso.service';
// import { IngresoDelegadosComponent } from './ingreso-delegados.component';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-nuevo-recurso',
    templateUrl: './nuevo-recurso.component.html'
})
export class NuevoRecursoComponent implements OnInit {
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
            {numero : '124234-2343', numrec: '235345', tiprec: 'Evaluación', fecreg: '11/11/11', estado: 'Evaluación'},
            {numero : '124234-2342', numrec: '345345', tiprec: 'Evaluación', fecreg: '11/11/11', estado: 'Evaluación'},
            {numero : '124234-2341', numrec: '345435', tiprec: 'Evaluación', fecreg: '11/11/11', estado: 'Evaluación'},
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
       // this.modalService.open(IngresoDelegadosComponent);
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
