import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { RegistroOrganizacionService } from './registro-organizacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-regtistro-organizacion',
    templateUrl: './registro-organizacion.component.html'
})
export class RegistroOrganizacionComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    values1: string[];
    txtBuscar: string;
    val1: string;
    date1: Date;
    date2: Date;
    vigencia1: Date;
    vigencia2: Date;
    es: any;
    index: number;
    indexx: number;
    selectedCities: string[];
    listaAfiliacion: any[];
    listaEstatuto:  any[];
    listaJD:  any[];

    constructor(
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.index = 0;
        this.indexx = 0;
        this.selectedCities = [];
        this.listaAfiliacion = [
            {expedi : '124234-2343', tipdoc: 'RUC', numdoc: '11111112321', tiporg: 'Pública', razsoc: 'los locos', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
            {expedi : '124234-2342', tipdoc: 'RUC', numdoc: '12321111111', tiporg: 'Privada', razsoc: 'manicomio', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
            {expedi : '124234-2341', tipdoc: 'RUC', numdoc: '11123456111', tiporg: 'Privada', razsoc: 'los cabasllos', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
        ]
        this.listaEstatuto = [
            {id : '124234-2343', fecasa: '11/11/11', descri: 'Nuevo estatuto', archiv: 'Archivo'},
        ]
        this.listaJD = [
            {id : '124234-2343', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'jose pedro', cargo: 'los locos'},
            {id : '124234-2342', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'locos', cargo: 'los locos'},
            {id : '124234-2341', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'cabasllo', cargo: 'los locos'},
        ]
        /*this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();*/
    }

    openNext() {
        this.index = (this.index === 8) ? 0 : this.index + 1;
    }

    openPrev() {
        this.index = (this.index === 0) ? 8 : this.index - 1;
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

    /*mostrarOcultar(valor: number) {
        console.log('==>VALOR: ' + valor);
        if (valor === 1) {
            document.getElementById('divDatosGenerales').style.display = 'block';
        } else {
            document.getElementById('divDatosGenerales').style.display = 'none';
        }
    }*/
    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
