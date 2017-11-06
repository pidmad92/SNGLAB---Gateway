import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipatencion } from './tipatencion.model';
import { TipatencionPopupService } from './tipatencion-popup.service';
import { TipatencionService } from './tipatencion.service';

@Component({
    selector: 'jhi-tipatencion-dialog',
    templateUrl: './tipatencion-dialog.component.html'
})
export class TipatencionDialogComponent implements OnInit {

    tipatencion: Tipatencion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipatencionService: TipatencionService,
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
        if (this.tipatencion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipatencionService.update(this.tipatencion));
        } else {
            this.subscribeToSaveResponse(
                this.tipatencionService.create(this.tipatencion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipatencion>) {
        result.subscribe((res: Tipatencion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipatencion) {
        this.eventManager.broadcast({ name: 'tipatencionListModification', content: 'OK'});
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
    selector: 'jhi-tipatencion-popup',
    template: ''
})
export class TipatencionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipatencionPopupService: TipatencionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipatencionPopupService
                    .open(TipatencionDialogComponent as Component, params['id']);
            } else {
                this.tipatencionPopupService
                    .open(TipatencionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
