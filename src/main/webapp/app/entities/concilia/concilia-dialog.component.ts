import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Concilia } from './concilia.model';
import { ConciliaPopupService } from './concilia-popup.service';
import { ConciliaService } from './concilia.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Abogado, AbogadoService } from '../abogado';
import { Horacon, HoraconService } from '../horacon';
import { Resulconci, ResulconciService } from '../resulconci';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-concilia-dialog',
    templateUrl: './concilia-dialog.component.html'
})
export class ConciliaDialogComponent implements OnInit {

    concilia: Concilia;
    isSaving: boolean;

    expedientes: Expediente[];

    abogados: Abogado[];

    horacons: Horacon[];

    resulconcis: Resulconci[];
    dFecconciDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private conciliaService: ConciliaService,
        private expedienteService: ExpedienteService,
        private abogadoService: AbogadoService,
        private horaconService: HoraconService,
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
        this.horaconService.query()
            .subscribe((res: ResponseWrapper) => { this.horacons = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.resulconciService.query()
            .subscribe((res: ResponseWrapper) => { this.resulconcis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.concilia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.conciliaService.update(this.concilia));
        } else {
            this.subscribeToSaveResponse(
                this.conciliaService.create(this.concilia));
        }
    }

    private subscribeToSaveResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Concilia) {
        this.eventManager.broadcast({ name: 'conciliaListModification', content: 'OK'});
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

    trackHoraconById(index: number, item: Horacon) {
        return item.id;
    }

    trackResulconciById(index: number, item: Resulconci) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-concilia-popup',
    template: ''
})
export class ConciliaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conciliaPopupService: ConciliaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.conciliaPopupService
                    .open(ConciliaDialogComponent as Component, params['id']);
            } else {
                this.conciliaPopupService
                    .open(ConciliaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
