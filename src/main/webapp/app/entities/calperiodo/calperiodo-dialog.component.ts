import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calperiodo } from './calperiodo.model';
import { CalperiodoPopupService } from './calperiodo-popup.service';
import { CalperiodoService } from './calperiodo.service';
import { Calbensoc, CalbensocService } from '../calbensoc';
import { Segsalud, SegsaludService } from '../segsalud';
import { Estperical, EstpericalService } from '../estperical';
import { Tipcalperi, TipcalperiService } from '../tipcalperi';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calperiodo-dialog',
    templateUrl: './calperiodo-dialog.component.html'
})
export class CalperiodoDialogComponent implements OnInit {

    calperiodo: Calperiodo;
    isSaving: boolean;

    calbensocs: Calbensoc[];

    segsaluds: Segsalud[];

    estpericals: Estperical[];

    tipcalperis: Tipcalperi[];
    tFeciniDp: any;
    tFecfinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calperiodoService: CalperiodoService,
        private calbensocService: CalbensocService,
        private segsaludService: SegsaludService,
        private estpericalService: EstpericalService,
        private tipcalperiService: TipcalperiService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.calbensocService.query()
            .subscribe((res: ResponseWrapper) => { this.calbensocs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.segsaludService.query()
            .subscribe((res: ResponseWrapper) => { this.segsaluds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.estpericalService.query()
            .subscribe((res: ResponseWrapper) => { this.estpericals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipcalperiService.query()
            .subscribe((res: ResponseWrapper) => { this.tipcalperis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calperiodo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calperiodoService.update(this.calperiodo));
        } else {
            this.subscribeToSaveResponse(
                this.calperiodoService.create(this.calperiodo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Calperiodo>) {
        result.subscribe((res: Calperiodo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Calperiodo) {
        this.eventManager.broadcast({ name: 'calperiodoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCalbensocById(index: number, item: Calbensoc) {
        return item.id;
    }

    trackSegsaludById(index: number, item: Segsalud) {
        return item.id;
    }

    trackEstpericalById(index: number, item: Estperical) {
        return item.id;
    }

    trackTipcalperiById(index: number, item: Tipcalperi) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-calperiodo-popup',
    template: ''
})
export class CalperiodoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calperiodoPopupService: CalperiodoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calperiodoPopupService
                    .open(CalperiodoDialogComponent as Component, params['id']);
            } else {
                this.calperiodoPopupService
                    .open(CalperiodoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
