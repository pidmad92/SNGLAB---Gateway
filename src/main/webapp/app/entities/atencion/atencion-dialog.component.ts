import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { AtencionPopupService } from './atencion-popup.service';
import { AtencionService } from './atencion.service';
import { Pase, PaseService } from '../pase';
import { Datlaboral, DatlaboralService } from '../datlaboral';
import { Empleador, EmpleadorService } from '../empleador';
import { Oficina, OficinaService } from '../oficina';
import { Tipatencion, TipatencionService } from '../tipatencion';
import { Trabajador, TrabajadorService } from '../trabajador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atencion-dialog',
    templateUrl: './atencion-dialog.component.html'
})
export class AtencionDialogComponent implements OnInit {

    atencion: Atencion;
    isSaving: boolean;

    pases: Pase[];

    datlaborals: Datlaboral[];

    empleadors: Empleador[];

    oficinas: Oficina[];

    tipatencions: Tipatencion[];

    trabajadors: Trabajador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atencionService: AtencionService,
        private paseService: PaseService,
        private datlaboralService: DatlaboralService,
        private empleadorService: EmpleadorService,
        private oficinaService: OficinaService,
        private tipatencionService: TipatencionService,
        private trabajadorService: TrabajadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paseService
            .query({filter: 'atencion-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.atencion.pase || !this.atencion.pase.id) {
                    this.pases = res.json;
                } else {
                    this.paseService
                        .find(this.atencion.pase.id)
                        .subscribe((subRes: Pase) => {
                            this.pases = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.datlaboralService.query()
            .subscribe((res: ResponseWrapper) => { this.datlaborals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.oficinaService.query()
            .subscribe((res: ResponseWrapper) => { this.oficinas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipatencionService.query()
            .subscribe((res: ResponseWrapper) => { this.tipatencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.atencion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atencionService.update(this.atencion));
        } else {
            this.subscribeToSaveResponse(
                this.atencionService.create(this.atencion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Atencion>) {
        result.subscribe((res: Atencion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Atencion) {
        this.eventManager.broadcast({ name: 'atencionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaseById(index: number, item: Pase) {
        return item.id;
    }

    trackDatlaboralById(index: number, item: Datlaboral) {
        return item.id;
    }

    trackEmpleadorById(index: number, item: Empleador) {
        return item.id;
    }

    trackOficinaById(index: number, item: Oficina) {
        return item.id;
    }

    trackTipatencionById(index: number, item: Tipatencion) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-atencion-popup',
    template: ''
})
export class AtencionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atencionPopupService: AtencionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atencionPopupService
                    .open(AtencionDialogComponent as Component, params['id']);
            } else {
                this.atencionPopupService
                    .open(AtencionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
