import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

// import { LegajoRegistroService } from './legajo-registro.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
// import { BienvenidatComponent } from './index';

@Component({
    selector: 'jhi-atencion-legajo',
    templateUrl: './legajo-atencion.component.html'
})

export class AtencionLegajoComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private eventManager: JhiEventManager,
    ) {
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

    // open() {
    //     const modalRef = this.modalService.open(BienvenidatComponent);
    //     modalRef.componentInstance.name = 'World';
    // }

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

    salirr() {
        alert('holaa');
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}