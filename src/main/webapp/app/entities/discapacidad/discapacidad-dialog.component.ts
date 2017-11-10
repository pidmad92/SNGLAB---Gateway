import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discapacidad } from './discapacidad.model';
import { DiscapacidadPopupService } from './discapacidad-popup.service';
import { DiscapacidadService } from './discapacidad.service';

@Component({
    selector: 'jhi-discapacidad-dialog',
    templateUrl: './discapacidad-dialog.component.html'
})
export class DiscapacidadDialogComponent implements OnInit {

    discapacidad: Discapacidad;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discapacidadService: DiscapacidadService,
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
        if (this.discapacidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discapacidadService.update(this.discapacidad));
        } else {
            this.subscribeToSaveResponse(
                this.discapacidadService.create(this.discapacidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<Discapacidad>) {
        result.subscribe((res: Discapacidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Discapacidad) {
        this.eventManager.broadcast({ name: 'discapacidadListModification', content: 'OK'});
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
    selector: 'jhi-discapacidad-popup',
    template: ''
})
export class DiscapacidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapacidadPopupService: DiscapacidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discapacidadPopupService
                    .open(DiscapacidadDialogComponent as Component, params['id']);
            } else {
                this.discapacidadPopupService
                    .open(DiscapacidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
