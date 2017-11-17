import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipenvnot } from './tipenvnot.model';
import { TipenvnotPopupService } from './tipenvnot-popup.service';
import { TipenvnotService } from './tipenvnot.service';

@Component({
    selector: 'jhi-tipenvnot-dialog',
    templateUrl: './tipenvnot-dialog.component.html'
})
export class TipenvnotDialogComponent implements OnInit {

    tipenvnot: Tipenvnot;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipenvnotService: TipenvnotService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipenvnot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipenvnotService.update(this.tipenvnot));
        } else {
            this.subscribeToSaveResponse(
                this.tipenvnotService.create(this.tipenvnot));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipenvnot>) {
        result.subscribe((res: Tipenvnot) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipenvnot) {
        this.eventManager.broadcast({ name: 'tipenvnotListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-tipenvnot-popup',
    template: ''
})
export class TipenvnotPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipenvnotPopupService: TipenvnotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipenvnotPopupService
                    .open(TipenvnotDialogComponent as Component, params['id']);
            } else {
                this.tipenvnotPopupService
                    .open(TipenvnotDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
