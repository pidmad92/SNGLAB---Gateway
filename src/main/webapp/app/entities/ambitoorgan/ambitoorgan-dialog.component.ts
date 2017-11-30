import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Ambitoorgan } from './ambitoorgan.model';
import { AmbitoorganPopupService } from './ambitoorgan-popup.service';
import { AmbitoorganService } from './ambitoorgan.service';

@Component({
    selector: 'jhi-ambitoorgan-dialog',
    templateUrl: './ambitoorgan-dialog.component.html'
})
export class AmbitoorganDialogComponent implements OnInit {

    ambitoorgan: Ambitoorgan;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ambitoorganService: AmbitoorganService,
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
        if (this.ambitoorgan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ambitoorganService.update(this.ambitoorgan));
        } else {
            this.subscribeToSaveResponse(
                this.ambitoorganService.create(this.ambitoorgan));
        }
    }

    private subscribeToSaveResponse(result: Observable<Ambitoorgan>) {
        result.subscribe((res: Ambitoorgan) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Ambitoorgan) {
        this.eventManager.broadcast({ name: 'ambitoorganListModification', content: 'OK'});
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
    selector: 'jhi-ambitoorgan-popup',
    template: ''
})
export class AmbitoorganPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ambitoorganPopupService: AmbitoorganPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ambitoorganPopupService
                    .open(AmbitoorganDialogComponent as Component, params['id']);
            } else {
                this.ambitoorganPopupService
                    .open(AmbitoorganDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
