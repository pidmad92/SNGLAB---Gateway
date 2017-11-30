import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Legtipdoc } from './legtipdoc.model';
import { LegtipdocPopupService } from './legtipdoc-popup.service';
import { LegtipdocService } from './legtipdoc.service';
import { Abogado, AbogadoService } from '../abogado';
import { Legajo, LegajoService } from '../legajo';
import { Tipdocpj, TipdocpjService } from '../tipdocpj';
import { Tipresoluc, TipresolucService } from '../tipresoluc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-legtipdoc-dialog',
    templateUrl: './legtipdoc-dialog.component.html'
})
export class LegtipdocDialogComponent implements OnInit {

    legtipdoc: Legtipdoc;
    isSaving: boolean;

    abogados: Abogado[];

    legajos: Legajo[];

    tipdocpjs: Tipdocpj[];

    tipresolucs: Tipresoluc[];
    dFecdocDp: any;
    dFecentrDp: any;
    dFecdevDp: any;
    dFecrecjuzDp: any;
    dFecmodDp: any;
    dFeccitDp: any;
    dFecdocreqDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private legtipdocService: LegtipdocService,
        private abogadoService: AbogadoService,
        private legajoService: LegajoService,
        private tipdocpjService: TipdocpjService,
        private tipresolucService: TipresolucService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.abogadoService.query()
            .subscribe((res: ResponseWrapper) => { this.abogados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.legajoService.query()
            .subscribe((res: ResponseWrapper) => { this.legajos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipdocpjService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocpjs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipresolucService.query()
            .subscribe((res: ResponseWrapper) => { this.tipresolucs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.legtipdoc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.legtipdocService.update(this.legtipdoc));
        } else {
            this.subscribeToSaveResponse(
                this.legtipdocService.create(this.legtipdoc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Legtipdoc>) {
        result.subscribe((res: Legtipdoc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Legtipdoc) {
        this.eventManager.broadcast({ name: 'legtipdocListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAbogadoById(index: number, item: Abogado) {
        return item.id;
    }

    trackLegajoById(index: number, item: Legajo) {
        return item.id;
    }

    trackTipdocpjById(index: number, item: Tipdocpj) {
        return item.id;
    }

    trackTipresolucById(index: number, item: Tipresoluc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-legtipdoc-popup',
    template: ''
})
export class LegtipdocPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legtipdocPopupService: LegtipdocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.legtipdocPopupService
                    .open(LegtipdocDialogComponent as Component, params['id']);
            } else {
                this.legtipdocPopupService
                    .open(LegtipdocDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
