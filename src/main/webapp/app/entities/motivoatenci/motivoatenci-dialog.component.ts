import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motivoatenci } from './motivoatenci.model';
import { MotivoatenciPopupService } from './motivoatenci-popup.service';
import { MotivoatenciService } from './motivoatenci.service';

@Component({
    selector: 'jhi-motivoatenci-dialog',
    templateUrl: './motivoatenci-dialog.component.html'
})
export class MotivoatenciDialogComponent implements OnInit {

    motivoatenci: Motivoatenci;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motivoatenciService: MotivoatenciService,
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
        if (this.motivoatenci.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motivoatenciService.update(this.motivoatenci));
        } else {
            this.subscribeToSaveResponse(
                this.motivoatenciService.create(this.motivoatenci));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motivoatenci>) {
        result.subscribe((res: Motivoatenci) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motivoatenci) {
        this.eventManager.broadcast({ name: 'motivoatenciListModification', content: 'OK'});
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
    selector: 'jhi-motivoatenci-popup',
    template: ''
})
export class MotivoatenciPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motivoatenciPopupService: MotivoatenciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motivoatenciPopupService
                    .open(MotivoatenciDialogComponent as Component, params['id']);
            } else {
                this.motivoatenciPopupService
                    .open(MotivoatenciDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
