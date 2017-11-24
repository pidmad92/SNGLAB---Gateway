import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Entidad } from './entidad.model';
import { EntidadService } from './entidad.service';
import { EntidadModuloPopupService } from './entidad-modulo-popup.service';
import { ModuloEntidad } from './../modulo-entidad/modulo-entidad.model';
import { ModuloService } from './../modulo/modulo.service';
import { ModuloEntidadService } from './../modulo-entidad/modulo-entidad.service';
import { TipoEntidad, TipoEntidadService } from '../tipo-entidad';
import { Principal, ResponseWrapper } from '../../shared';
import { Modulo } from '../modulo/modulo.model';
declare var $: any;

@Component({
    selector: 'jhi-entidad-dialog-fk',
    templateUrl: './entidad-modulo-dialog.component.html'
})
export class EntidadModuloDialogComponent implements OnInit {

    moduloEntidades: ModuloEntidad[];
    moduloEntidad: ModuloEntidad = new ModuloEntidad();
    isSaving: boolean;

    entidad: Entidad;
    modulo: Modulo;

    modulos: Modulo[];
    entidades: Entidad[];

    tipoentidades: TipoEntidad[];
    idEntidad: number;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private entidadService: EntidadService,
        private moduloService: ModuloService,
        private moduloEntidadService: ModuloEntidadService,
        private tipoEntidadService: TipoEntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entidadService.find(this.idEntidad).subscribe((entidad) => {
            this.entidad = entidad;
        });
    }
    saveModuloEntidad(id: number) {
        this.isSaving = true;
        this.modulo = new Modulo();
        this.modulo.id = id;
        this.moduloEntidad.entidad = this.entidad;
        this.moduloEntidad.modulo = this.modulo;
        this.subscribeToSaveResponse(
            this.moduloEntidadService.create(this.moduloEntidad));
    }
    deleteModuloEntidad(id: number) {
        this.moduloEntidadService.delete(id).subscribe((response) => {});
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    private subscribeToSaveResponse(result: Observable<ModuloEntidad>) {
        result.subscribe((res: ModuloEntidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }
    private onSaveSuccess(result: Entidad) {
        this.eventManager.broadcast({ name: 'moduloEntidadListModification', content: 'OK'});
        this.isSaving = false;
    }
    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
    trackTipoEntidadById(index: number, item: TipoEntidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-entidad-popup',
    template: ''
})
export class EntidadModuloPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private entidadModuloPopupService: EntidadModuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.entidadModuloPopupService
                    .open(EntidadModuloDialogComponent as Component, params['id']);
            } else {
                this.entidadModuloPopupService
                    .open(EntidadModuloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
