import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { RevisarSolicitudesService } from './revisar-solicitudes.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { EvaluarSolicitudesService } from './index';

@Component({
    selector: 'jhi-evaluar-solicitudes',
    templateUrl: './evaluar-solicitudes.component.html'
})
export class EvaluarSolicitudesComponent implements OnInit {
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;

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
    }

    /*ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }*/
}

@Component({
    selector: 'jhi-evaluar-solicitudes-popup',
    template: ''
})
export class EvaluarSolicitudesPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

        constructor(
            private route: ActivatedRoute,
            private evaluarSolicitudesService: EvaluarSolicitudesService
        ) { }

        ngOnInit() {
            console.log('OpenDialog');
            this.routeSub = this.route.params.subscribe((params) => {
                if ( params['id'] ) {
                    this.evaluarSolicitudesService
                        .open(EvaluarSolicitudesComponent as Component, params['id']);
                } else {
                    this.evaluarSolicitudesService
                        .open(EvaluarSolicitudesComponent as Component);
                }
            });
        }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
