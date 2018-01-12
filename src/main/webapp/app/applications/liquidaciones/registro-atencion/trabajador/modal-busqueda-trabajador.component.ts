import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResponseWrapper } from '../../../../shared';

import { Datlab } from './../../models/datlab.model';
import { ModalBusquedaTrabajadorService } from './modal-busqueda-trabajador.service';
import { TrabajadorService } from './tabajador.service'

@Component({
    selector: 'jhi-modal-busqueda-trabajador',
    templateUrl: './modal-busqueda-trabajador.component.html'
})
export class ModalBusquedaTrabajadorComponent implements OnInit {

    datlab: Datlab;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cargarDatos();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    cargarDatos() {
      console.log(`Buscando vinculos laborales registrados...`);
      this.buscarDatosLaborales();
    }

    buscarDatosLaborales() {

    }
    /*
    save() {
        this.isSaving = true;
        if (this.datlab.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datlabService.update(this.datlab));
        } else {
            this.subscribeToSaveResponse(
                this.datlabService.create(this.datlab));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datlab>) {
        result.subscribe((res: Datlab) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Datlab) {
        this.eventManager.broadcast({ name: 'datlabListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
*/
    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-modal-busqueda-trabajador-popup',
    template: ''
})
export class ModalBusquedaTrabajadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modalBusquedaTrabajadorService: ModalBusquedaTrabajadorService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalBusquedaTrabajadorService
                    .open(ModalBusquedaTrabajadorComponent as Component, params['id']);
            } else {
                this.modalBusquedaTrabajadorService
                    .open(ModalBusquedaTrabajadorComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
