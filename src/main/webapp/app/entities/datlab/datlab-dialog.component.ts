import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datlab } from './datlab.model';
import { DatlabPopupService } from './datlab-popup.service';
import { DatlabService } from './datlab.service';
import { Empleador, EmpleadorService } from '../empleador';
import { Modcontrato, ModcontratoService } from '../modcontrato';
import { Motcese, MotceseService } from '../motcese';
import { Regimenlab, RegimenlabService } from '../regimenlab';
import { Trabajador, TrabajadorService } from '../trabajador';
import { Tipvinculo, TipvinculoService } from '../tipvinculo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datlab-dialog',
    templateUrl: './datlab-dialog.component.html'
})
export class DatlabDialogComponent implements OnInit {

    datlab: Datlab;
    isSaving: boolean;

    empleadors: Empleador[];

    modcontratoes: Modcontrato[];

    motcese: Motcese[];

    regimenlabs: Regimenlab[];

    trabajadors: Trabajador[];

    tipvinculos: Tipvinculo[];
    dFecvinculDp: any;
    dFecceseDp: any;
    dFecfinconDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datlabService: DatlabService,
        private empleadorService: EmpleadorService,
        private modcontratoService: ModcontratoService,
        private motceseService: MotceseService,
        private regimenlabService: RegimenlabService,
        private trabajadorService: TrabajadorService,
        private tipvinculoService: TipvinculoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.modcontratoService.query()
            .subscribe((res: ResponseWrapper) => { this.modcontratoes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motceseService.query()
            .subscribe((res: ResponseWrapper) => { this.motcese = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.regimenlabService.query()
            .subscribe((res: ResponseWrapper) => { this.regimenlabs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipvinculoService.query()
            .subscribe((res: ResponseWrapper) => { this.tipvinculos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.datlab.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datlabService.update(this.datlab));
        } else {
            this.subscribeToSaveResponse(
                this.datlabService.create(this.datlab));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datlab>) {
        result.subscribe((res: Datlab) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Datlab) {
        this.eventManager.broadcast({ name: 'datlabListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmpleadorById(index: number, item: Empleador) {
        return item.id;
    }

    trackModcontratoById(index: number, item: Modcontrato) {
        return item.id;
    }

    trackMotceseById(index: number, item: Motcese) {
        return item.id;
    }

    trackRegimenlabById(index: number, item: Regimenlab) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }

    trackTipvinculoById(index: number, item: Tipvinculo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-datlab-popup',
    template: ''
})
export class DatlabPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datlabPopupService: DatlabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datlabPopupService
                    .open(DatlabDialogComponent as Component, params['id']);
            } else {
                this.datlabPopupService
                    .open(DatlabDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
