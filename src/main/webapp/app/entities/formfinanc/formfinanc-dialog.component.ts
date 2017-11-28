import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Formfinanc } from './formfinanc.model';
import { FormfinancPopupService } from './formfinanc-popup.service';
import { FormfinancService } from './formfinanc.service';

@Component({
    selector: 'jhi-formfinanc-dialog',
    templateUrl: './formfinanc-dialog.component.html'
})
export class FormfinancDialogComponent implements OnInit {

    formfinanc: Formfinanc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formfinancService: FormfinancService,
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
        if (this.formfinanc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formfinancService.update(this.formfinanc));
        } else {
            this.subscribeToSaveResponse(
                this.formfinancService.create(this.formfinanc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Formfinanc>) {
        result.subscribe((res: Formfinanc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Formfinanc) {
        this.eventManager.broadcast({ name: 'formfinancListModification', content: 'OK'});
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
    selector: 'jhi-formfinanc-popup',
    template: ''
})
export class FormfinancPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formfinancPopupService: FormfinancPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formfinancPopupService
                    .open(FormfinancDialogComponent as Component, params['id']);
            } else {
                this.formfinancPopupService
                    .open(FormfinancDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
