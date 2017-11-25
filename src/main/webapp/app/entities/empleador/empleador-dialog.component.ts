import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Empleador } from './empleador.model';
import { EmpleadorPopupService } from './empleador-popup.service';
import { EmpleadorService } from './empleador.service';
import { Perjuridica, PerjuridicaService } from '../perjuridica';
import { Pernatural, PernaturalService } from '../pernatural';
import { Tippersona, TippersonaService } from '../tippersona';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-empleador-dialog',
    templateUrl: './empleador-dialog.component.html'
})
export class EmpleadorDialogComponent implements OnInit {

    empleador: Empleador;
    isSaving: boolean;

    perjuridicas: Perjuridica[];

    pernaturals: Pernatural[];

    tippersonas: Tippersona[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private empleadorService: EmpleadorService,
        private perjuridicaService: PerjuridicaService,
        private pernaturalService: PernaturalService,
        private tippersonaService: TippersonaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perjuridicaService.query()
            .subscribe((res: ResponseWrapper) => { this.perjuridicas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pernaturalService.query()
            .subscribe((res: ResponseWrapper) => { this.pernaturals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tippersonaService.query()
            .subscribe((res: ResponseWrapper) => { this.tippersonas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.empleador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.empleadorService.update(this.empleador));
        } else {
            this.subscribeToSaveResponse(
                this.empleadorService.create(this.empleador));
        }
    }

    private subscribeToSaveResponse(result: Observable<Empleador>) {
        result.subscribe((res: Empleador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Empleador) {
        this.eventManager.broadcast({ name: 'empleadorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerjuridicaById(index: number, item: Perjuridica) {
        return item.id;
    }

    trackPernaturalById(index: number, item: Pernatural) {
        return item.id;
    }

    trackTippersonaById(index: number, item: Tippersona) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-empleador-popup',
    template: ''
})
export class EmpleadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empleadorPopupService: EmpleadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.empleadorPopupService
                    .open(EmpleadorDialogComponent as Component, params['id']);
            } else {
                this.empleadorPopupService
                    .open(EmpleadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
