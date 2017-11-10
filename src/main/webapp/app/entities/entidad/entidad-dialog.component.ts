import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { EntidadPopupService } from './entidad-popup.service';
import { EntidadService } from './entidad.service';
import { TipoEntidad, TipoEntidadService } from '../tipo-entidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-entidad-dialog',
    templateUrl: './entidad-dialog.component.html'
})
export class EntidadDialogComponent implements OnInit {

    entidad: Entidad;
    isSaving: boolean;

    tipoentidads: TipoEntidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private entidadService: EntidadService,
        private tipoEntidadService: TipoEntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoEntidadService.query()
            .subscribe((res: ResponseWrapper) => { this.tipoentidads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.entidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.entidadService.update(this.entidad));
        } else {
            this.subscribeToSaveResponse(
                this.entidadService.create(this.entidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<Entidad>) {
        result.subscribe((res: Entidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Entidad) {
        this.eventManager.broadcast({ name: 'entidadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoEntidadById(index: number, item: TipoEntidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entidad-popup',
    template: ''
})
export class EntidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entidadPopupService: EntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entidadPopupService
                    .open(EntidadDialogComponent as Component, params['id']);
            } else {
                this.entidadPopupService
                    .open(EntidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
