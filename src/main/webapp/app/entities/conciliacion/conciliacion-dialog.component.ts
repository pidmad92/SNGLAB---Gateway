import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Conciliacion } from './conciliacion.model';
import { ConciliacionPopupService } from './conciliacion-popup.service';
import { ConciliacionService } from './conciliacion.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Abogado, AbogadoService } from '../abogado';
import { Hora, HoraService } from '../hora';
import { Resulconci, ResulconciService } from '../resulconci';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-conciliacion-dialog',
    templateUrl: './conciliacion-dialog.component.html'
})
export class ConciliacionDialogComponent implements OnInit {

    conciliacion: Conciliacion;
    isSaving: boolean;

    expedientes: Expediente[];

    abogados: Abogado[];

    horas: Hora[];

    resulconcis: Resulconci[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conciliacionService: ConciliacionService,
        private expedienteService: ExpedienteService,
        private abogadoService: AbogadoService,
        private horaService: HoraService,
        private resulconciService: ResulconciService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: ResponseWrapper) => { this.expedientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.abogadoService.query()
            .subscribe((res: ResponseWrapper) => { this.abogados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.horaService.query()
            .subscribe((res: ResponseWrapper) => { this.horas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.resulconciService.query()
            .subscribe((res: ResponseWrapper) => { this.resulconcis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conciliacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conciliacionService.update(this.conciliacion));
        } else {
            this.subscribeToSaveResponse(
                this.conciliacionService.create(this.conciliacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Conciliacion>) {
        result.subscribe((res: Conciliacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Conciliacion) {
        this.eventManager.broadcast({ name: 'conciliacionListModification', content: 'OK'});
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

    trackAbogadoById(index: number, item: Abogado) {
        return item.id;
    }

    trackHoraById(index: number, item: Hora) {
        return item.id;
    }

    trackResulconciById(index: number, item: Resulconci) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-conciliacion-popup',
    template: ''
})
export class ConciliacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conciliacionPopupService: ConciliacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conciliacionPopupService
                    .open(ConciliacionDialogComponent as Component, params['id']);
            } else {
                this.conciliacionPopupService
                    .open(ConciliacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
