import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Falsoexp } from './falsoexp.model';
import { FalsoexpPopupService } from './falsoexp-popup.service';
import { FalsoexpService } from './falsoexp.service';
import { Empleador, EmpleadorService } from '../empleador';
import { Trabajador, TrabajadorService } from '../trabajador';
import { Abogado, AbogadoService } from '../abogado';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-falsoexp-dialog',
    templateUrl: './falsoexp-dialog.component.html'
})
export class FalsoexpDialogComponent implements OnInit {

    falsoexp: Falsoexp;
    isSaving: boolean;

    empleadors: Empleador[];

    trabajadors: Trabajador[];

    abogados: Abogado[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private falsoexpService: FalsoexpService,
        private empleadorService: EmpleadorService,
        private trabajadorService: TrabajadorService,
        private abogadoService: AbogadoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.abogadoService.query()
            .subscribe((res: ResponseWrapper) => { this.abogados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.falsoexp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.falsoexpService.update(this.falsoexp));
        } else {
            this.subscribeToSaveResponse(
                this.falsoexpService.create(this.falsoexp));
        }
    }

    private subscribeToSaveResponse(result: Observable<Falsoexp>) {
        result.subscribe((res: Falsoexp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Falsoexp) {
        this.eventManager.broadcast({ name: 'falsoexpListModification', content: 'OK'});
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

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }

    trackAbogadoById(index: number, item: Abogado) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-falsoexp-popup',
    template: ''
})
export class FalsoexpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private falsoexpPopupService: FalsoexpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.falsoexpPopupService
                    .open(FalsoexpDialogComponent as Component, params['id']);
            } else {
                this.falsoexpPopupService
                    .open(FalsoexpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
