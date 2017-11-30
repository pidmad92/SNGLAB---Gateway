import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EvaluarAfiliarService } from './index';

@Component({
    selector: 'jhi-evaluar-afiliar',
    templateUrl: './evaluar-afiliar.component.html'
})
export class EvaluarAfiliarComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    listaConsulta: any[];

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
        this.listaConsulta = [
            {representantes: 'Desarrolladores del Perú', fecini: '11/11/11', fecfin: '11/11/11'},
            {representantes: 'Desarrolladores del Perú', fecini: '11/11/11', fecfin: '11/11/11'},
            {representantes: 'Desarrolladores del Perú', fecini: '11/11/11', fecfin: '11/11/11'},
        ]
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}

@Component({
    selector: 'jhi-evaluar-afiliar-popup',
    template: ''
})
export class EvaluarAfiliarPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

        constructor(
            private route: ActivatedRoute,
            private evaluarAfiliarService: EvaluarAfiliarService
        ) { }

        ngOnInit() {
            console.log('OpenDialog');
            this.routeSub = this.route.params.subscribe((params) => {
                if ( params['id'] ) {
                    this.evaluarAfiliarService
                        .open(EvaluarAfiliarComponent as Component, params['id']);
                } else {
                    this.evaluarAfiliarService
                        .open(EvaluarAfiliarComponent as Component);
                }
            });
        }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
