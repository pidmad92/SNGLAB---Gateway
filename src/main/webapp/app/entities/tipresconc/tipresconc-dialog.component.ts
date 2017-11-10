import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipresconc } from './tipresconc.model';
import { TipresconcPopupService } from './tipresconc-popup.service';
import { TipresconcService } from './tipresconc.service';

@Component({
    selector: 'jhi-tipresconc-dialog',
    templateUrl: './tipresconc-dialog.component.html'
})
export class TipresconcDialogComponent implements OnInit {

    tipresconc: Tipresconc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipresconcService: TipresconcService,
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
        if (this.tipresconc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipresconcService.update(this.tipresconc));
        } else {
            this.subscribeToSaveResponse(
                this.tipresconcService.create(this.tipresconc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipresconc>) {
        result.subscribe((res: Tipresconc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipresconc) {
        this.eventManager.broadcast({ name: 'tipresconcListModification', content: 'OK'});
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
    selector: 'jhi-tipresconc-popup',
    template: ''
})
export class TipresconcPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipresconcPopupService: TipresconcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipresconcPopupService
                    .open(TipresconcDialogComponent as Component, params['id']);
            } else {
                this.tipresconcPopupService
                    .open(TipresconcDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
