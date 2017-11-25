import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calbensoc } from './calbensoc.model';
import { CalbensocPopupService } from './calbensoc-popup.service';
import { CalbensocService } from './calbensoc.service';
import { Bensocial, BensocialService } from '../bensocial';
import { Liquidacion, LiquidacionService } from '../liquidacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calbensoc-dialog',
    templateUrl: './calbensoc-dialog.component.html'
})
export class CalbensocDialogComponent implements OnInit {

    calbensoc: Calbensoc;
    isSaving: boolean;

    bensocials: Bensocial[];

    liquidacions: Liquidacion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calbensocService: CalbensocService,
        private bensocialService: BensocialService,
        private liquidacionService: LiquidacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bensocialService.query()
            .subscribe((res: ResponseWrapper) => { this.bensocials = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.liquidacionService.query()
            .subscribe((res: ResponseWrapper) => { this.liquidacions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calbensoc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calbensocService.update(this.calbensoc));
        } else {
            this.subscribeToSaveResponse(
                this.calbensocService.create(this.calbensoc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Calbensoc>) {
        result.subscribe((res: Calbensoc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Calbensoc) {
        this.eventManager.broadcast({ name: 'calbensocListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBensocialById(index: number, item: Bensocial) {
        return item.id;
    }

    trackLiquidacionById(index: number, item: Liquidacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-calbensoc-popup',
    template: ''
})
export class CalbensocPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calbensocPopupService: CalbensocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calbensocPopupService
                    .open(CalbensocDialogComponent as Component, params['id']);
            } else {
                this.calbensocPopupService
                    .open(CalbensocDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
