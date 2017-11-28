import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Notifica } from './notifica.model';
import { NotificaPopupService } from './notifica-popup.service';
import { NotificaService } from './notifica.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Tipenvnot, TipenvnotService } from '../tipenvnot';
import { Tipnotif, TipnotifService } from '../tipnotif';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-notifica-dialog',
    templateUrl: './notifica-dialog.component.html'
})
export class NotificaDialogComponent implements OnInit {

    notifica: Notifica;
    isSaving: boolean;

    expedientes: Expediente[];

    tipenvnots: Tipenvnot[];

    tipnotifs: Tipnotif[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private notificaService: NotificaService,
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
        if (this.notifica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notificaService.update(this.notifica));
        } else {
            this.subscribeToSaveResponse(
                this.notificaService.create(this.notifica));
        }
    }

    private subscribeToSaveResponse(result: Observable<Notifica>) {
        result.subscribe((res: Notifica) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Notifica) {
        this.eventManager.broadcast({ name: 'notificaListModification', content: 'OK'});
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
    selector: 'jhi-notifica-popup',
    template: ''
})
export class NotificaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificaPopupService: NotificaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificaPopupService
                    .open(NotificaDialogComponent as Component, params['id']);
            } else {
                this.notificaPopupService
                    .open(NotificaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
