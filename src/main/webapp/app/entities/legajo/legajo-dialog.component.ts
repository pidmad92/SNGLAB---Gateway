import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Legajo } from './legajo.model';
import { LegajoPopupService } from './legajo-popup.service';
import { LegajoService } from './legajo.service';
import { Empleador, EmpleadorService } from '../empleador';
import { Pasegl, PaseglService } from '../pasegl';
import { Trabajador, TrabajadorService } from '../trabajador';
import { Materia, MateriaService } from '../materia';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-legajo-dialog',
    templateUrl: './legajo-dialog.component.html'
})
export class LegajoDialogComponent implements OnInit {

    legajo: Legajo;
    isSaving: boolean;

    empleadors: Empleador[];

    pasegls: Pasegl[];

    trabajadors: Trabajador[];

    materias: Materia[];
    dFecconcDp: any;
    dFecmodDp: any;
    dFecexpDp: any;
    dFecexpdaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private legajoService: LegajoService,
        private empleadorService: EmpleadorService,
        private paseglService: PaseglService,
        private trabajadorService: TrabajadorService,
        private materiaService: MateriaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.paseglService.query()
            .subscribe((res: ResponseWrapper) => { this.pasegls = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.materiaService.query()
            .subscribe((res: ResponseWrapper) => { this.materias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.legajo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.legajoService.update(this.legajo));
        } else {
            this.subscribeToSaveResponse(
                this.legajoService.create(this.legajo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Legajo>) {
        result.subscribe((res: Legajo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Legajo) {
        this.eventManager.broadcast({ name: 'legajoListModification', content: 'OK'});
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

    trackPaseglById(index: number, item: Pasegl) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }

    trackMateriaById(index: number, item: Materia) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-legajo-popup',
    template: ''
})
export class LegajoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legajoPopupService: LegajoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.legajoPopupService
                    .open(LegajoDialogComponent as Component, params['id']);
            } else {
                this.legajoPopupService
                    .open(LegajoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
