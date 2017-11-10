import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Accionadop } from './accionadop.model';
import { AccionadopPopupService } from './accionadop-popup.service';
import { AccionadopService } from './accionadop.service';

@Component({
    selector: 'jhi-accionadop-dialog',
    templateUrl: './accionadop-dialog.component.html'
})
export class AccionadopDialogComponent implements OnInit {

    accionadop: Accionadop;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accionadopService: AccionadopService,
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
        if (this.accionadop.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accionadopService.update(this.accionadop));
        } else {
            this.subscribeToSaveResponse(
                this.accionadopService.create(this.accionadop));
        }
    }

    private subscribeToSaveResponse(result: Observable<Accionadop>) {
        result.subscribe((res: Accionadop) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Accionadop) {
        this.eventManager.broadcast({ name: 'accionadopListModification', content: 'OK'});
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
    selector: 'jhi-accionadop-popup',
    template: ''
})
export class AccionadopPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accionadopPopupService: AccionadopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accionadopPopupService
                    .open(AccionadopDialogComponent as Component, params['id']);
            } else {
                this.accionadopPopupService
                    .open(AccionadopDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
