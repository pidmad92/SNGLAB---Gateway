import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Notificacion } from './notificacion.model';
import { NotificacionPopupService } from './notificacion-popup.service';
import { NotificacionService } from './notificacion.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Tipenvnot, TipenvnotService } from '../tipenvnot';
import { Tipnotif, TipnotifService } from '../tipnotif';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-notificacion-dialog',
    templateUrl: './notificacion-dialog.component.html'
})
export class NotificacionDialogComponent implements OnInit {

    notificacion: Notificacion;
    isSaving: boolean;

    expedientes: Expediente[];

    tipenvnots: Tipenvnot[];

    tipnotifs: Tipnotif[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private notificacionService: NotificacionService,
        private expedienteService: ExpedienteService,
        private tipenvnotService: TipenvnotService,
        private tipnotifService: TipnotifService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: ResponseWrapper) => { this.expedientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipenvnotService.query()
            .subscribe((res: ResponseWrapper) => { this.tipenvnots = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipnotifService.query()
            .subscribe((res: ResponseWrapper) => { this.tipnotifs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.notificacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notificacionService.update(this.notificacion));
        } else {
            this.subscribeToSaveResponse(
                this.notificacionService.create(this.notificacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Notificacion>) {
        result.subscribe((res: Notificacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Notificacion) {
        this.eventManager.broadcast({ name: 'notificacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }

    trackTipenvnotById(index: number, item: Tipenvnot) {
        return item.id;
    }

    trackTipnotifById(index: number, item: Tipnotif) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-notificacion-popup',
    template: ''
})
export class NotificacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificacionPopupService: NotificacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificacionPopupService
                    .open(NotificacionDialogComponent as Component, params['id']);
            } else {
                this.notificacionPopupService
                    .open(NotificacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
