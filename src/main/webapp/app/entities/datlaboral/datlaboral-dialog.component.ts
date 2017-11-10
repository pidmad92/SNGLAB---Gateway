import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Datlaboral } from './datlaboral.model';
import { DatlaboralPopupService } from './datlaboral-popup.service';
import { DatlaboralService } from './datlaboral.service';
import { Empleador, EmpleadorService } from '../empleador';
import { Modacontrato, ModacontratoService } from '../modacontrato';
import { Motivocese, MotivoceseService } from '../motivocese';
import { Trabajador, TrabajadorService } from '../trabajador';
import { Subregilabo, SubregilaboService } from '../subregilabo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datlaboral-dialog',
    templateUrl: './datlaboral-dialog.component.html'
})
export class DatlaboralDialogComponent implements OnInit {

    datlaboral: Datlaboral;
    isSaving: boolean;

    empleadors: Empleador[];

    modacontratoes: Modacontrato[];

    motivocese: Motivocese[];

    trabajadors: Trabajador[];

    subregilabos: Subregilabo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datlaboralService: DatlaboralService,
        private empleadorService: EmpleadorService,
        private modacontratoService: ModacontratoService,
        private motivoceseService: MotivoceseService,
        private trabajadorService: TrabajadorService,
        private subregilaboService: SubregilaboService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.empleadorService.query()
            .subscribe((res: ResponseWrapper) => { this.empleadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.modacontratoService.query()
            .subscribe((res: ResponseWrapper) => { this.modacontratoes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motivoceseService.query()
            .subscribe((res: ResponseWrapper) => { this.motivocese = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.subregilaboService.query()
            .subscribe((res: ResponseWrapper) => { this.subregilabos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.datlaboral.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datlaboralService.update(this.datlaboral));
        } else {
            this.subscribeToSaveResponse(
                this.datlaboralService.create(this.datlaboral));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datlaboral>) {
        result.subscribe((res: Datlaboral) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Datlaboral) {
        this.eventManager.broadcast({ name: 'datlaboralListModification', content: 'OK'});
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

    trackModacontratoById(index: number, item: Modacontrato) {
        return item.id;
    }

    trackMotivoceseById(index: number, item: Motivocese) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }

    trackSubregilaboById(index: number, item: Subregilabo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-datlaboral-popup',
    template: ''
})
export class DatlaboralPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datlaboralPopupService: DatlaboralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datlaboralPopupService
                    .open(DatlaboralDialogComponent as Component, params['id']);
            } else {
                this.datlaboralPopupService
                    .open(DatlaboralDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
