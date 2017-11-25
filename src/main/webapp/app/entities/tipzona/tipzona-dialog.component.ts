import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipzona } from './tipzona.model';
import { TipzonaPopupService } from './tipzona-popup.service';
import { TipzonaService } from './tipzona.service';

@Component({
    selector: 'jhi-tipzona-dialog',
    templateUrl: './tipzona-dialog.component.html'
})
export class TipzonaDialogComponent implements OnInit {

    tipzona: Tipzona;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipzonaService: TipzonaService,
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
        if (this.tipzona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipzonaService.update(this.tipzona));
        } else {
            this.subscribeToSaveResponse(
                this.tipzonaService.create(this.tipzona));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipzona>) {
        result.subscribe((res: Tipzona) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipzona) {
        this.eventManager.broadcast({ name: 'tipzonaListModification', content: 'OK'});
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
    selector: 'jhi-tipzona-popup',
    template: ''
})
export class TipzonaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipzonaPopupService: TipzonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipzonaPopupService
                    .open(TipzonaDialogComponent as Component, params['id']);
            } else {
                this.tipzonaPopupService
                    .open(TipzonaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
