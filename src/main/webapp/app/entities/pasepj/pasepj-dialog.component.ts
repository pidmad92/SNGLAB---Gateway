import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pasepj } from './pasepj.model';
import { PasepjPopupService } from './pasepj-popup.service';
import { PasepjService } from './pasepj.service';

@Component({
    selector: 'jhi-pasepj-dialog',
    templateUrl: './pasepj-dialog.component.html'
})
export class PasepjDialogComponent implements OnInit {

    pasepj: Pasepj;
    isSaving: boolean;
    dFecpasDp: any;
    dFecrecepDp: any;
    dFecmodDp: any;
    dFecdesDp: any;
    dFecconDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pasepjService: PasepjService,
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
        if (this.pasepj.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pasepjService.update(this.pasepj));
        } else {
            this.subscribeToSaveResponse(
                this.pasepjService.create(this.pasepj));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pasepj>) {
        result.subscribe((res: Pasepj) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pasepj) {
        this.eventManager.broadcast({ name: 'pasepjListModification', content: 'OK'});
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
    selector: 'jhi-pasepj-popup',
    template: ''
})
export class PasepjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasepjPopupService: PasepjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pasepjPopupService
                    .open(PasepjDialogComponent as Component, params['id']);
            } else {
                this.pasepjPopupService
                    .open(PasepjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
