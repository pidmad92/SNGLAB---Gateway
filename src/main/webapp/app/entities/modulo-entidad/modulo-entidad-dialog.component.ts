import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ModuloEntidad } from './modulo-entidad.model';
import { ModuloEntidadPopupService } from './modulo-entidad-popup.service';
import { ModuloEntidadService } from './modulo-entidad.service';
import { Modulo, ModuloService } from '../modulo';
import { Entidad, EntidadService } from '../entidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-modulo-entidad-dialog',
    templateUrl: './modulo-entidad-dialog.component.html'
})
export class ModuloEntidadDialogComponent implements OnInit {

    moduloEntidad: ModuloEntidad;
    isSaving: boolean;

    modulos: Modulo[];

    entidads: Entidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private moduloEntidadService: ModuloEntidadService,
        private moduloService: ModuloService,
        private entidadService: EntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduloService.query()
            .subscribe((res: ResponseWrapper) => { this.modulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.entidadService.query()
            .subscribe((res: ResponseWrapper) => { this.entidads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.moduloEntidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moduloEntidadService.update(this.moduloEntidad));
        } else {
            this.subscribeToSaveResponse(
                this.moduloEntidadService.create(this.moduloEntidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<ModuloEntidad>) {
        result.subscribe((res: ModuloEntidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ModuloEntidad) {
        this.eventManager.broadcast({ name: 'moduloEntidadListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModuloById(index: number, item: Modulo) {
        return item.id;
    }

    trackEntidadById(index: number, item: Entidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-modulo-entidad-popup',
    template: ''
})
export class ModuloEntidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moduloEntidadPopupService: ModuloEntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.moduloEntidadPopupService
                    .open(ModuloEntidadDialogComponent as Component, params['id']);
            } else {
                this.moduloEntidadPopupService
                    .open(ModuloEntidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
