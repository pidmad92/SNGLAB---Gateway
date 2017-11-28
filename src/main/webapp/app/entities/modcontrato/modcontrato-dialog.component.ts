import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modcontrato } from './modcontrato.model';
import { ModcontratoPopupService } from './modcontrato-popup.service';
import { ModcontratoService } from './modcontrato.service';

@Component({
    selector: 'jhi-modcontrato-dialog',
    templateUrl: './modcontrato-dialog.component.html'
})
export class ModcontratoDialogComponent implements OnInit {

    modcontrato: Modcontrato;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private modcontratoService: ModcontratoService,
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
        if (this.modcontrato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modcontratoService.update(this.modcontrato));
        } else {
            this.subscribeToSaveResponse(
                this.modcontratoService.create(this.modcontrato));
        }
    }

    private subscribeToSaveResponse(result: Observable<Modcontrato>) {
        result.subscribe((res: Modcontrato) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Modcontrato) {
        this.eventManager.broadcast({ name: 'modcontratoListModification', content: 'OK'});
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
    selector: 'jhi-modcontrato-popup',
    template: ''
})
export class ModcontratoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modcontratoPopupService: ModcontratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modcontratoPopupService
                    .open(ModcontratoDialogComponent as Component, params['id']);
            } else {
                this.modcontratoPopupService
                    .open(ModcontratoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
