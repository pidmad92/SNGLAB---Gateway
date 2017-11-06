import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoEntidad } from './tipo-entidad.model';
import { TipoEntidadPopupService } from './tipo-entidad-popup.service';
import { TipoEntidadService } from './tipo-entidad.service';

@Component({
    selector: 'jhi-tipo-entidad-dialog',
    templateUrl: './tipo-entidad-dialog.component.html'
})
export class TipoEntidadDialogComponent implements OnInit {

    tipoEntidad: TipoEntidad;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoEntidadService: TipoEntidadService,
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
        if (this.tipoEntidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoEntidadService.update(this.tipoEntidad));
        } else {
            this.subscribeToSaveResponse(
                this.tipoEntidadService.create(this.tipoEntidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoEntidad>) {
        result.subscribe((res: TipoEntidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoEntidad) {
        this.eventManager.broadcast({ name: 'tipoEntidadListModification', content: 'OK'});
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
    selector: 'jhi-tipo-entidad-popup',
    template: ''
})
export class TipoEntidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoEntidadPopupService: TipoEntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoEntidadPopupService
                    .open(TipoEntidadDialogComponent as Component, params['id']);
            } else {
                this.tipoEntidadPopupService
                    .open(TipoEntidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
