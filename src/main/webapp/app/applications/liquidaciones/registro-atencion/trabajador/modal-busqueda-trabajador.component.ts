import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable, Subscription } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ResponseWrapper } from '../../../../shared';

import { Datlab } from './../../models/datlab.model';
import { ModalBusquedaTrabajadorService } from './modal-busqueda-trabajador.service';
import { TrabajadorService } from './tabajador.service';
import { TrabajadorTransferService } from './trabajador-transfer.service'

@Component({
    selector: 'jhi-modal-busqueda-trabajador',
    templateUrl: './modal-busqueda-trabajador.component.html'
})
export class ModalBusquedaTrabajadorComponent implements OnInit {

    datLabSeleccionado: Datlab;
    isSaving: boolean;
    listaDatlab: any[];
    nomCompleto: string;
    selecDatLab: any = [];
    private eventSubscriber: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private data: TrabajadorTransferService
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cargarDatosLaborales();
    }

    // Boton Cancelar
    btnCancelar() {
        this.activeModal.dismiss('cancel');
    }

    // Boton Cargar
    btnCargar(event) {
      this.datLabSeleccionado = (this.selecDatLab.datolab as Datlab);
      this.data.cambiarDatlab(this.datLabSeleccionado);
      console.log(`Cargando el vinculo laboral con Id:${this.datLabSeleccionado.id}...`);
      // this.data.cambiarDatlab(event.data);
      this.eventManager.broadcast({ name: 'cargarDatosLaboralesfromPopup', context: 'OK'});
      // this.eventSubscriber = this.eventManager.subscribe('cargarDatosLaboralesfromPopup', (response) => this.cargarExpedienteConciliacion());

      // console.log(this.datLabSeleccionado)
      this.activeModal.dismiss('cargarDatos');
    }

    // Boton Nuevo
    btnNuevo(event) {
      console.log('Ir al formulario vacío')
      this.activeModal.dismiss('registrarNuevo');
    }

    // Inicializa las variables
    cargarDatosLaborales() {
      // Nombre completo del trabajador
      this.nomCompleto = this.listaDatlab[0].datolab.trabajador.pernatural.vApepat + ' ' +
      this.listaDatlab[0].datolab.trabajador.pernatural.vApemat + ' ' +
      this.listaDatlab[0].datolab.trabajador.pernatural.vNombres;
      // El Dni y los datos laborales se jalaron directamente desde el las variables al campo y al prime datatable.
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
