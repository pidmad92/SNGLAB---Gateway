import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resolucrd } from './resolucrd.model';
import { ResolucrdPopupService } from './resolucrd-popup.service';
import { ResolucrdService } from './resolucrd.service';
import { Tippersona, TippersonaService } from '../tippersona';
import { Expediente, ExpedienteService } from '../expediente';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resolucrd-dialog',
    templateUrl: './resolucrd-dialog.component.html'
})
export class ResolucrdDialogComponent implements OnInit {

    resolucrd: Resolucrd;
    isSaving: boolean;

    tippersonas: Tippersona[];

    expedientes: Expediente[];
    dFecresosdDp: any;
    dFecconcilDp: any;
    dFechanotiDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resolucrdService: ResolucrdService,
        private tippersonaService: TippersonaService,
        private expedienteService: ExpedienteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tippersonaService.query()
            .subscribe((res: ResponseWrapper) => { this.tippersonas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.expedienteService.query()
            .subscribe((res: ResponseWrapper) => { this.expedientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resolucrd.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resolucrdService.update(this.resolucrd));
        } else {
            this.subscribeToSaveResponse(
                this.resolucrdService.create(this.resolucrd));
        }
    }

    private subscribeToSaveResponse(result: Observable<Resolucrd>) {
        result.subscribe((res: Resolucrd) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Resolucrd) {
        this.eventManager.broadcast({ name: 'resolucrdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTippersonaById(index: number, item: Tippersona) {
        return item.id;
    }

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resolucrd-popup',
    template: ''
})
export class ResolucrdPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resolucrdPopupService: ResolucrdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resolucrdPopupService
                    .open(ResolucrdDialogComponent as Component, params['id']);
            } else {
                this.resolucrdPopupService
                    .open(ResolucrdDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
