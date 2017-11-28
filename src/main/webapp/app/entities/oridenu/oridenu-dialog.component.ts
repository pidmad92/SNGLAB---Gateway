import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Oridenu } from './oridenu.model';
import { OridenuPopupService } from './oridenu-popup.service';
import { OridenuService } from './oridenu.service';

@Component({
    selector: 'jhi-oridenu-dialog',
    templateUrl: './oridenu-dialog.component.html'
})
export class OridenuDialogComponent implements OnInit {

    oridenu: Oridenu;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private oridenuService: OridenuService,
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
        if (this.oridenu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.oridenuService.update(this.oridenu));
        } else {
            this.subscribeToSaveResponse(
                this.oridenuService.create(this.oridenu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Oridenu>) {
        result.subscribe((res: Oridenu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Oridenu) {
        this.eventManager.broadcast({ name: 'oridenuListModification', content: 'OK'});
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
    selector: 'jhi-oridenu-popup',
    template: ''
})
export class OridenuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oridenuPopupService: OridenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.oridenuPopupService
                    .open(OridenuDialogComponent as Component, params['id']);
            } else {
                this.oridenuPopupService
                    .open(OridenuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
