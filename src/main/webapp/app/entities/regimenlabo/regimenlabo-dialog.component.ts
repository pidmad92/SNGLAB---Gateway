import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Regimenlabo } from './regimenlabo.model';
import { RegimenlaboPopupService } from './regimenlabo-popup.service';
import { RegimenlaboService } from './regimenlabo.service';

@Component({
    selector: 'jhi-regimenlabo-dialog',
    templateUrl: './regimenlabo-dialog.component.html'
})
export class RegimenlaboDialogComponent implements OnInit {

    regimenlabo: Regimenlabo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private regimenlaboService: RegimenlaboService,
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
        if (this.regimenlabo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regimenlaboService.update(this.regimenlabo));
        } else {
            this.subscribeToSaveResponse(
                this.regimenlaboService.create(this.regimenlabo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Regimenlabo>) {
        result.subscribe((res: Regimenlabo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Regimenlabo) {
        this.eventManager.broadcast({ name: 'regimenlaboListModification', content: 'OK'});
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
    selector: 'jhi-regimenlabo-popup',
    template: ''
})
export class RegimenlaboPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regimenlaboPopupService: RegimenlaboPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regimenlaboPopupService
                    .open(RegimenlaboDialogComponent as Component, params['id']);
            } else {
                this.regimenlaboPopupService
                    .open(RegimenlaboDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
