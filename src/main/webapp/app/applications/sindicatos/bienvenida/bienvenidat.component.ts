import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { BienvenidaService } from './bienvenida.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-bienvenidat',
    templateUrl: './bienvenidat.component.html'
})
export class BienvenidatComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    hideElement: false;

    tipoSector= 'sector';

    constructor(
        private eventManager: JhiEventManager
    ) {
    }

    verAmbito(valor: number) {
        console.log('valor=> ' + valor);
        if (valor === 1) {
            document.getElementById('divOpciones').style.display = 'block';
        } else if (valor === 2) {
            document.getElementById('divOpciones').style.display = 'none';
        } else if (valor === 3) {
            document.getElementById('divTbOt').style.display = 'block';
        } else if (valor === 4) {
            document.getElementById('divTbOt').style.display = 'none';
        }
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
    ngOnInit() {
        /*this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAtencionEmpleador();*/
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}
