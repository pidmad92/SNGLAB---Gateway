import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipproveid } from './tipproveid.model';
import { TipproveidPopupService } from './tipproveid-popup.service';
import { TipproveidService } from './tipproveid.service';
import { Tipdocexp, TipdocexpService } from '../tipdocexp';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipproveid-dialog',
    templateUrl: './tipproveid-dialog.component.html'
})
export class TipproveidDialogComponent implements OnInit {

    tipproveid: Tipproveid;
    isSaving: boolean;

    tipdocexps: Tipdocexp[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipproveidService: TipproveidService,
        private tipdocexpService: TipdocexpService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipdocexpService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocexps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipproveid.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipproveidService.update(this.tipproveid));
        } else {
            this.subscribeToSaveResponse(
                this.tipproveidService.create(this.tipproveid));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipproveid>) {
        result.subscribe((res: Tipproveid) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipproveid) {
        this.eventManager.broadcast({ name: 'tipproveidListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipdocexpById(index: number, item: Tipdocexp) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tipproveid-popup',
    template: ''
})
export class TipproveidPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipproveidPopupService: TipproveidPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipproveidPopupService
                    .open(TipproveidDialogComponent as Component, params['id']);
            } else {
                this.tipproveidPopupService
                    .open(TipproveidDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
