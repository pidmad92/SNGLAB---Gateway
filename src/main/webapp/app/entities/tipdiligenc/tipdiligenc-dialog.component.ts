import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdiligenc } from './tipdiligenc.model';
import { TipdiligencPopupService } from './tipdiligenc-popup.service';
import { TipdiligencService } from './tipdiligenc.service';
import { Tipresoluc, TipresolucService } from '../tipresoluc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipdiligenc-dialog',
    templateUrl: './tipdiligenc-dialog.component.html'
})
export class TipdiligencDialogComponent implements OnInit {

    tipdiligenc: Tipdiligenc;
    isSaving: boolean;

    tipresolucs: Tipresoluc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdiligencService: TipdiligencService,
        private tipresolucService: TipresolucService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipresolucService.query()
            .subscribe((res: ResponseWrapper) => { this.tipresolucs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipdiligenc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdiligencService.update(this.tipdiligenc));
        } else {
            this.subscribeToSaveResponse(
                this.tipdiligencService.create(this.tipdiligenc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdiligenc>) {
        result.subscribe((res: Tipdiligenc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdiligenc) {
        this.eventManager.broadcast({ name: 'tipdiligencListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipresolucById(index: number, item: Tipresoluc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tipdiligenc-popup',
    template: ''
})
export class TipdiligencPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdiligencPopupService: TipdiligencPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdiligencPopupService
                    .open(TipdiligencDialogComponent as Component, params['id']);
            } else {
                this.tipdiligencPopupService
                    .open(TipdiligencDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
