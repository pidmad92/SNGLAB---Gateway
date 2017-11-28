import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Solicitud } from './solicitud.model';
import { SolicitudPopupService } from './solicitud-popup.service';
import { SolicitudService } from './solicitud.service';
import { Reporteres, ReporteresService } from '../reporteres';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-solicitud-dialog',
    templateUrl: './solicitud-dialog.component.html'
})
export class SolicitudDialogComponent implements OnInit {

    solicitud: Solicitud;
    isSaving: boolean;

    reporteres: Reporteres[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private solicitudService: SolicitudService,
        private reporteresService: ReporteresService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.reporteresService
            .query({filter: 'solicitud-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.solicitud.reporteRes || !this.solicitud.reporteRes.id) {
                    this.reporteres = res.json;
                } else {
                    this.reporteresService
                        .find(this.solicitud.reporteRes.id)
                        .subscribe((subRes: Reporteres) => {
                            this.reporteres = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.solicitud.id !== undefined) {
            this.subscribeToSaveResponse(
                this.solicitudService.update(this.solicitud));
        } else {
            this.subscribeToSaveResponse(
                this.solicitudService.create(this.solicitud));
        }
    }

    private subscribeToSaveResponse(result: Observable<Solicitud>) {
        result.subscribe((res: Solicitud) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Solicitud) {
        this.eventManager.broadcast({ name: 'solicitudListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackReporteresById(index: number, item: Reporteres) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-solicitud-popup',
    template: ''
})
export class SolicitudPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudPopupService: SolicitudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['nCodsolic'] ) {
                this.solicitudPopupService
                    .open(SolicitudDialogComponent as Component, params['nCodsolic']);
            } else {
                this.solicitudPopupService
                    .open(SolicitudDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
