import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Scargo } from './scargo.model';
import { ScargoPopupService } from './scargo-popup.service';
import { ScargoService } from './scargo.service';

@Component({
    selector: 'jhi-scargo-dialog',
    templateUrl: './scargo-dialog.component.html'
})
export class ScargoDialogComponent implements OnInit {

    scargo: Scargo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private scargoService: ScargoService,
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
        if (this.scargo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scargoService.update(this.scargo));
        } else {
            this.subscribeToSaveResponse(
                this.scargoService.create(this.scargo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Scargo>) {
        result.subscribe((res: Scargo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Scargo) {
        this.eventManager.broadcast({ name: 'scargoListModification', content: 'OK'});
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
    selector: 'jhi-scargo-popup',
    template: ''
})
export class ScargoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scargoPopupService: ScargoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scargoPopupService
                    .open(ScargoDialogComponent as Component, params['id']);
            } else {
                this.scargoPopupService
                    .open(ScargoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
