import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Segsalud } from './segsalud.model';
import { SegsaludPopupService } from './segsalud-popup.service';
import { SegsaludService } from './segsalud.service';

@Component({
    selector: 'jhi-segsalud-dialog',
    templateUrl: './segsalud-dialog.component.html'
})
export class SegsaludDialogComponent implements OnInit {

    segsalud: Segsalud;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private segsaludService: SegsaludService,
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
        if (this.segsalud.id !== undefined) {
            this.subscribeToSaveResponse(
                this.segsaludService.update(this.segsalud));
        } else {
            this.subscribeToSaveResponse(
                this.segsaludService.create(this.segsalud));
        }
    }

    private subscribeToSaveResponse(result: Observable<Segsalud>) {
        result.subscribe((res: Segsalud) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Segsalud) {
        this.eventManager.broadcast({ name: 'segsaludListModification', content: 'OK'});
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
    selector: 'jhi-segsalud-popup',
    template: ''
})
export class SegsaludPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private segsaludPopupService: SegsaludPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.segsaludPopupService
                    .open(SegsaludDialogComponent as Component, params['id']);
            } else {
                this.segsaludPopupService
                    .open(SegsaludDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
