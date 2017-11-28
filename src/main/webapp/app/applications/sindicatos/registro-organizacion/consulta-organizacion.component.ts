import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { RegistroOrganizacionService } from './registro-organizacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-consulta-organizacion',
    templateUrl: './consulta-organizacion.component.html'
})
export class ConsultaOrganizacionComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    txtBuscar: string;
    val1: string;
    displayDialog: boolean;
    newCar: boolean;
    listaConsulta: any[];

    constructor(
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.listaConsulta = [
            {expediente : '124234-2343', nombre: 'Ministerio de Trabajo Lima', fecha: '11/11/11'},
            {expediente : '124234-2342', nombre: 'Ministerio de Trabajo Huau', fecha: '11/11/11'},
            {expediente : '124234-2341', nombre: 'Ministerio de Trabajo Huaa', fecha: '11/11/11'},
        ]
        /*this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();*/
    }
    showDialogToAdd() {
        this.newCar = true;
        this.displayDialog = true;
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

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
