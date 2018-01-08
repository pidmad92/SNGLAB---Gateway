import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms' /* Necesario*/
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

// Modelos

import { Tipdocident } from '../../models/tipdocident.model';

// Servicios

import { TrabajadorService } from './tabajador.service';

@Component({
    selector: 'jhi-trabajador',
    templateUrl: './trabajador.component.html'
})

export class TrabajadorComponent implements OnInit {
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    // Variables de control de la pagina

    formBusquedaTrabajador: FormGroup;
    showFormularioDatosTrabajador: boolean;
    showImputTextNumPartidaSucesion: boolean;

    // Variables de Modelo - Entidad

    listaTipdocident: Tipdocident[];

    // Constructor

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private trabajadorService:  TrabajadorService
    ) {
      this.formBusquedaTrabajador = new FormGroup({
        'documento': new FormGroup({
          'tipDoc': new FormControl(null,
            Validators.required),
          'numDoc': new FormControl(null, [
            Validators.required,
            Validators.pattern('[0-9]+'),
            Validators.minLength(8),
            Validators.maxLength(15) // http://www2.sunat.gob.pe/pdt/pdtModulos/independientes/p695/TipoDoc.htm
            ])
          })
      });
      this.showFormularioDatosTrabajador = false;
      this.showImputTextNumPartidaSucesion = false;
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    // Al cargar la pagina:

    ngOnInit() {
      this.cargarListaComboTipoDocumento();
    }

    // Al hacer click en el boton para buscar el trabajador

    buscarTrabajador(formBusquedaTrabajador: FormGroup) {
      console.log(`Buscó al Trabajador:
        Tip.Doc: ${formBusquedaTrabajador.value.documento.tipDoc}
        Num.Doc: ${formBusquedaTrabajador.value.documento.numDoc}`);
        console.log(formBusquedaTrabajador);
        this.mostrarFormularioDatosTrabajador();
    }

    // Al hacer un cambio en el combo

    resetFormularioTrabajador() {
      this.limpiarImputNumeroDocumento();
      this.ocultarFormularioDatosTrabajador();
      this.ocultarImputTextNumPartidaSucesion();
    };

    // Funciones Utilitarias - Busqueda Trabajador - I --------------------------------------------------------------------

    // Al iniciar - llamar el servicio para llenar el combo del tipo de documento para la busqueda del trabajador

    cargarListaComboTipoDocumento() {
      this.trabajadorService.consultaTipoDocIdentidad().subscribe(
        (res: ResponseWrapper) => {
            this.listaTipdocident = res.json;
            /*console.log(`Resjson:
              ${JSON.stringify(res.json)}`);*/
            this.currentSearch = '';
        },
        (res: ResponseWrapper) => {
          this.onError(res.json);
        }
      );
    }

    mostrarFormularioDatosTrabajador() {
      this.showFormularioDatosTrabajador = true;
    }

    mostrarImputTextNumPartidaSucesion() {
      this.showImputTextNumPartidaSucesion = true;
    }

    ocultarFormularioDatosTrabajador() {
      this.showFormularioDatosTrabajador = false;
    }

    ocultarImputTextNumPartidaSucesion() {
      this.showImputTextNumPartidaSucesion = false;
    }

    // Limpia todo (combo e input) y le asigna al combo la ultima opcion seleccionada

    limpiarImputNumeroDocumento() {
      this.formBusquedaTrabajador.reset({
        documento: {
          tipDoc: this.formBusquedaTrabajador.value.documento.tipDoc,
          numDoc: ''
      }});
    }

    // Funciones Utilitarias - Busqueda Trabajador - F --------------------------------------------------------------------
}
