import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipinteres } from './tipinteres.model';
import { TipinteresPopupService } from './tipinteres-popup.service';
import { TipinteresService } from './tipinteres.service';

@Component({
    selector: 'jhi-tipinteres-dialog',
    templateUrl: './tipinteres-dialog.component.html'
})
export class TipinteresDialogComponent implements OnInit {

    tipinteres: Tipinteres;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipinteresService: TipinteresService,
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
        if (this.tipinteres.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipinteresService.update(this.tipinteres));
        } else {
            this.subscribeToSaveResponse(
                this.tipinteresService.create(this.tipinteres));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipinteres>) {
        result.subscribe((res: Tipinteres) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipinteres) {
        this.eventManager.broadcast({ name: 'tipinteresListModification', content: 'OK'});
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
    selector: 'jhi-tipinteres-popup',
    template: ''
})
export class TipinteresPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipinteresPopupService: TipinteresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipinteresPopupService
                    .open(TipinteresDialogComponent as Component, params['id']);
            } else {
                this.tipinteresPopupService
                    .open(TipinteresDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
