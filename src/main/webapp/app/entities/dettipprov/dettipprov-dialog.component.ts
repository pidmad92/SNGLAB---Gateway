import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dettipprov } from './dettipprov.model';
import { DettipprovPopupService } from './dettipprov-popup.service';
import { DettipprovService } from './dettipprov.service';
import { Tipproveid, TipproveidService } from '../tipproveid';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dettipprov-dialog',
    templateUrl: './dettipprov-dialog.component.html'
})
export class DettipprovDialogComponent implements OnInit {

    dettipprov: Dettipprov;
    isSaving: boolean;

    tipproveids: Tipproveid[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dettipprovService: DettipprovService,
        private tipproveidService: TipproveidService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipproveidService.query()
            .subscribe((res: ResponseWrapper) => { this.tipproveids = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dettipprov.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dettipprovService.update(this.dettipprov));
        } else {
            this.subscribeToSaveResponse(
                this.dettipprovService.create(this.dettipprov));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dettipprov>) {
        result.subscribe((res: Dettipprov) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dettipprov) {
        this.eventManager.broadcast({ name: 'dettipprovListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipproveidById(index: number, item: Tipproveid) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dettipprov-popup',
    template: ''
})
export class DettipprovPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dettipprovPopupService: DettipprovPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dettipprovPopupService
                    .open(DettipprovDialogComponent as Component, params['id']);
            } else {
                this.dettipprovPopupService
                    .open(DettipprovDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
