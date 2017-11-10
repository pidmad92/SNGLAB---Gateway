import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docexpedien } from './docexpedien.model';
import { DocexpedienPopupService } from './docexpedien-popup.service';
import { DocexpedienService } from './docexpedien.service';
import { Expediente, ExpedienteService } from '../expediente';
import { Dettipprov, DettipprovService } from '../dettipprov';
import { Tipdocexp, TipdocexpService } from '../tipdocexp';
import { Tipproveid, TipproveidService } from '../tipproveid';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docexpedien-dialog',
    templateUrl: './docexpedien-dialog.component.html'
})
export class DocexpedienDialogComponent implements OnInit {

    docexpedien: Docexpedien;
    isSaving: boolean;

    expedientes: Expediente[];

    dettipprovs: Dettipprov[];

    tipdocexps: Tipdocexp[];

    tipproveids: Tipproveid[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docexpedienService: DocexpedienService,
        private expedienteService: ExpedienteService,
        private dettipprovService: DettipprovService,
        private tipdocexpService: TipdocexpService,
        private tipproveidService: TipproveidService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService.query()
            .subscribe((res: ResponseWrapper) => { this.expedientes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.dettipprovService.query()
            .subscribe((res: ResponseWrapper) => { this.dettipprovs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipdocexpService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocexps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipproveidService.query()
            .subscribe((res: ResponseWrapper) => { this.tipproveids = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.docexpedien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docexpedienService.update(this.docexpedien));
        } else {
            this.subscribeToSaveResponse(
                this.docexpedienService.create(this.docexpedien));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docexpedien>) {
        result.subscribe((res: Docexpedien) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docexpedien) {
        this.eventManager.broadcast({ name: 'docexpedienListModification', content: 'OK'});
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

    trackDettipprovById(index: number, item: Dettipprov) {
        return item.id;
    }

    trackTipdocexpById(index: number, item: Tipdocexp) {
        return item.id;
    }

    trackTipproveidById(index: number, item: Tipproveid) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-docexpedien-popup',
    template: ''
})
export class DocexpedienPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docexpedienPopupService: DocexpedienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docexpedienPopupService
                    .open(DocexpedienDialogComponent as Component, params['id']);
            } else {
                this.docexpedienPopupService
                    .open(DocexpedienDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
