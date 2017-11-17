import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { ResulconciPopupService } from './resulconci-popup.service';
import { ResulconciService } from './resulconci.service';
import { Tipresconc, TipresconcService } from '../tipresconc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resulconci-dialog',
    templateUrl: './resulconci-dialog.component.html'
})
export class ResulconciDialogComponent implements OnInit {

    resulconci: Resulconci;
    isSaving: boolean;

    tipresconcs: Tipresconc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resulconciService: ResulconciService,
        private tipresconcService: TipresconcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipresconcService.query()
            .subscribe((res: ResponseWrapper) => { this.tipresconcs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.resulconci.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resulconciService.update(this.resulconci));
        } else {
            this.subscribeToSaveResponse(
                this.resulconciService.create(this.resulconci));
        }
    }

    private subscribeToSaveResponse(result: Observable<Resulconci>) {
        result.subscribe((res: Resulconci) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Resulconci) {
        this.eventManager.broadcast({ name: 'resulconciListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipresconcById(index: number, item: Tipresconc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-resulconci-popup',
    template: ''
})
export class ResulconciPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resulconciPopupService: ResulconciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resulconciPopupService
                    .open(ResulconciDialogComponent as Component, params['id']);
            } else {
                this.resulconciPopupService
                    .open(ResulconciDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
