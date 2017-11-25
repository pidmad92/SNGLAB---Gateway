import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Regimenlab } from './regimenlab.model';
import { RegimenlabPopupService } from './regimenlab-popup.service';
import { RegimenlabService } from './regimenlab.service';

@Component({
    selector: 'jhi-regimenlab-dialog',
    templateUrl: './regimenlab-dialog.component.html'
})
export class RegimenlabDialogComponent implements OnInit {

    regimenlab: Regimenlab;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private regimenlabService: RegimenlabService,
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
        if (this.regimenlab.id !== undefined) {
            this.subscribeToSaveResponse(
                this.regimenlabService.update(this.regimenlab));
        } else {
            this.subscribeToSaveResponse(
                this.regimenlabService.create(this.regimenlab));
        }
    }

    private subscribeToSaveResponse(result: Observable<Regimenlab>) {
        result.subscribe((res: Regimenlab) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Regimenlab) {
        this.eventManager.broadcast({ name: 'regimenlabListModification', content: 'OK'});
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
    selector: 'jhi-regimenlab-popup',
    template: ''
})
export class RegimenlabPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regimenlabPopupService: RegimenlabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.regimenlabPopupService
                    .open(RegimenlabDialogComponent as Component, params['id']);
            } else {
                this.regimenlabPopupService
                    .open(RegimenlabDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
