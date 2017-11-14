import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Expediente } from './expediente.model';
import { ExpedientePopupService } from './expediente-popup.service';
import { ExpedienteService } from './expediente.service';
import { Empleador, EmpleadorService } from '../empleador';
import { Tippersona, TippersonaService } from '../tippersona';
import { Trabajador, TrabajadorService } from '../trabajador';
import { Pase, PaseService } from '../pase';
import { Estexpedien, EstexpedienService } from '../estexpedien';
import { Resolutor, ResolutorService } from '../resolutor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-expediente-dialog',
    templateUrl: './expediente-dialog.component.html'
})
export class ExpedienteDialogComponent implements OnInit {

    expediente: Expediente;
    isSaving: boolean;

    empleadors: Empleador[];

    tippersonas: Tippersona[];

    trabajadors: Trabajador[];

    pases: Pase[];

    estexpediens: Estexpedien[];

    resolutors: Resolutor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private expedienteService: ExpedienteService,
        private empleadorService: EmpleadorService,
        private tippersonaService: TippersonaService,
        private trabajadorService: TrabajadorService,
        private paseService: PaseService,
        private estexpedienService: EstexpedienService,
        private resolutorService: ResolutorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tippersonaService.query()
            .subscribe((res: ResponseWrapper) => { this.tippersonas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.paseService.query()
            .subscribe((res: ResponseWrapper) => { this.pases = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.estexpedienService.query()
            .subscribe((res: ResponseWrapper) => { this.estexpediens = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.resolutorService.query()
            .subscribe((res: ResponseWrapper) => { this.resolutors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expediente.id !== undefined) {
            this.subscribeToSaveResponse(
                this.expedienteService.update(this.expediente));
        } else {
            this.subscribeToSaveResponse(
                this.expedienteService.create(this.expediente));
        }
    }

    private subscribeToSaveResponse(result: Observable<Expediente>) {
        result.subscribe((res: Expediente) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Expediente) {
        this.eventManager.broadcast({ name: 'expedienteListModification', content: 'OK'});
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

    trackTippersonaById(index: number, item: Tippersona) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }

    trackPaseById(index: number, item: Pase) {
        return item.id;
    }

    trackEstexpedienById(index: number, item: Estexpedien) {
        return item.id;
    }

    trackResolutorById(index: number, item: Resolutor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-expediente-popup',
    template: ''
})
export class ExpedientePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private expedientePopupService: ExpedientePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.expedientePopupService
                    .open(ExpedienteDialogComponent as Component, params['id']);
            } else {
                this.expedientePopupService
                    .open(ExpedienteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
