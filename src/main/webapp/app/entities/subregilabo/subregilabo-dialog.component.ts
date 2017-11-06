import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Subregilabo } from './subregilabo.model';
import { SubregilaboPopupService } from './subregilabo-popup.service';
import { SubregilaboService } from './subregilabo.service';
import { Regimenlabo, RegimenlaboService } from '../regimenlabo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subregilabo-dialog',
    templateUrl: './subregilabo-dialog.component.html'
})
export class SubregilaboDialogComponent implements OnInit {

    subregilabo: Subregilabo;
    isSaving: boolean;

    regimenlabos: Regimenlabo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subregilaboService: SubregilaboService,
        private regimenlaboService: RegimenlaboService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.regimenlaboService.query()
            .subscribe((res: ResponseWrapper) => { this.regimenlabos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subregilabo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.subregilaboService.update(this.subregilabo));
        } else {
            this.subscribeToSaveResponse(
                this.subregilaboService.create(this.subregilabo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Subregilabo>) {
        result.subscribe((res: Subregilabo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Subregilabo) {
        this.eventManager.broadcast({ name: 'subregilaboListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRegimenlaboById(index: number, item: Regimenlabo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-subregilabo-popup',
    template: ''
})
export class SubregilaboPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subregilaboPopupService: SubregilaboPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.subregilaboPopupService
                    .open(SubregilaboDialogComponent as Component, params['id']);
            } else {
                this.subregilaboPopupService
                    .open(SubregilaboDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
