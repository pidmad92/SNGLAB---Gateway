import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EvaluarService } from './evaluar.service';
import { ES } from '../../applications.constant';

@Component({
    selector: 'jhi-evaluar',
    templateUrl: './evaluar.component.html'
})
export class EvaluarComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;

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
    listaEstatuto:  any[];
    listaJD:  any[];
    listaAfiliacion: any[];

    constructor(
        private eventManager: JhiEventManager,
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService
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

    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private onSaveSuccess() {
        this.eventManager.broadcast({ name: 'horaListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
    }

    ver() {
        console.log('holaaaasdaaaaa');
    }

    ngOnInit() {
        this.isSaving = false;
        this.es = ES;
        this.index = 0;
        this.indexx = 0;
        this.selectedCities = [];
        this.listaEstatuto = [
            {id : '124234-2343', fecasa: '11/11/11', descri: 'Nuevo estatuto', archiv: 'Archivo'},
        ]
        this.listaJD = [
            {id : '124234-2343', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'jose pedro', cargo: 'los locos'},
            {id : '124234-2342', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'locos', cargo: 'los locos'},
            {id : '124234-2341', numero: '122222222', tipdoc: 'dni', numdoc: '12345678', nombre: 'cabasllo', cargo: 'los locos'},
        ]
        this.listaAfiliacion = [
            {expedi : '124234-2343', tipdoc: 'RUC', numdoc: '11111112321', tiporg: 'Pública', razsoc: 'los locos', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
            {expedi : '124234-2342', tipdoc: 'RUC', numdoc: '12321111111', tiporg: 'Privada', razsoc: 'manicomio', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
            {expedi : '124234-2341', tipdoc: 'RUC', numdoc: '11123456111', tiporg: 'Privada', razsoc: 'los cabasllos', fecafi: '11/11/11', fecdes: '11/11/11', estado: 'Vigente'},
        ]
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}

@Component({
    selector: 'jhi-evaluar-popup',
    template: ''
})
export class EvaluarPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

        constructor(
            private route: ActivatedRoute,
            private evaluarService: EvaluarService
        ) { }

        ngOnInit() {
            console.log('OpenDialog');
            this.routeSub = this.route.params.subscribe((params) => {
                if ( params['id'] ) {
                    this.evaluarService
                        .open(EvaluarComponent as Component, params['id']);
                } else {
                    this.evaluarService
                        .open(EvaluarComponent as Component);
                }
            });
        }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
