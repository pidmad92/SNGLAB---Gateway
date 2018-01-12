import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm, ValidatorFn } from '@angular/forms' /* Necesario*/
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

// Modelos

import { Tipdocident } from '../../models/tipdocident.model';
import { Trabajador } from '../../models/trabajador.model';
import { Pernatural } from '../../models/pernatural.model';

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
    validatorNumDoc: ValidatorFn[];

    // Variables de Modelo - Entidad

    listaTipdocident: Tipdocident[];
    listaTrabajador: any[] = [];

    // Constructor

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private trabajadorService:  TrabajadorService,
        private router: Router
    ) {
    };

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    };

    // Al cargar la pagina:

    ngOnInit() {
      this.contruirFormularioBusquedaTrabajador();
      this.cargarListaComboTipoDocumento();
      this.ocultarFormularioDatosTrabajador();
      this.ocultarImputTextNumPartidaSucesion();
    };

    // 1. Al hacer un cambio en el combo

    cambioComboBusquedaTrabajador(formBusquedaTrabajador: FormGroup) {
      this.setearValidacionesNumeroDocumentoIdentidad(formBusquedaTrabajador);
      this.limpiarImputNumeroDocumento();
      this.ocultarFormularioDatosTrabajador();
      this.ocultarImputTextNumPartidaSucesion();
    };

    // 2. Al hacer cambio en el numero de documento

    cambioInputBusquedaTrabajador(formBusquedaTrabajador: FormGroup) {
      this.ocultarFormularioDatosTrabajador();
      this.ocultarImputTextNumPartidaSucesion();
    };

    // 3. Al hacer click en el boton para buscar el trabajador

    buscarTrabajador(formBusquedaTrabajador: FormGroup) {
      console.log(`Buscó al Trabajador con Tip.Doc: ${formBusquedaTrabajador.value.documento.tipDoc} y Num.Doc: ${formBusquedaTrabajador.value.documento.numDoc}`);
        // console.log(formBusquedaTrabajador);
        this.buscarTrabajadorBaseDatos(formBusquedaTrabajador);
    };

    // 4.

    buscarTrabajadorBaseDatos(formBusquedaTrabajador: FormGroup) {
      console.log(`Buscando al trabajador en Base de Datos...`);
      this.trabajadorService.findTrabajadorsByDocIdent(Number(formBusquedaTrabajador.value.documento.tipDoc), formBusquedaTrabajador.value.documento.numDoc as String).subscribe(
        (res: ResponseWrapper) => {
          this.listaTrabajador = res.json;
          if (JSON.stringify(this.listaTrabajador[0])) {
            console.log(`¡Trabajador encontrado! Trabajador con Id:${this.listaTrabajador[0].Trabajador.id}`);
            this.abrirPopupBusquedaVinculosLaborales();
          } else {
            console.log(`No existe el trabajador en la base de datos`);
            this.buscarTrabajadorReniec(formBusquedaTrabajador);
          }
        },
        (res: ResponseWrapper) => {
          this.onError(res.json)
        });
    }

    // Funciones Utilitarias - Busqueda Trabajador - I --------------------------------------------------------------------

    // Al iniciar - llamar el servicio para llenar el combo del tipo de documento para la busqueda del trabajador

    cargarListaComboTipoDocumento() {
      this.trabajadorService.consultaTipoDocIdentidad().subscribe((res: ResponseWrapper) => {
            this.listaTipdocident = res.json;
            /*console.log(`Resjson:
              ${JSON.stringify(res.json)}`);*/
            this.currentSearch = '';
        },
        (res: ResponseWrapper) => {
          this.onError(res.json);
        });
    };

    mostrarFormularioDatosTrabajador() {
      this.showFormularioDatosTrabajador = true;
    };

    mostrarImputTextNumPartidaSucesion() {
      this.showImputTextNumPartidaSucesion = true;
    };

    ocultarFormularioDatosTrabajador() {
      this.showFormularioDatosTrabajador = false;
    };

    ocultarImputTextNumPartidaSucesion() {
      this.showImputTextNumPartidaSucesion = false;
    };

    // Limpia todo (combo e input) y le asigna al combo la ultima opcion seleccionada

    limpiarImputNumeroDocumento() {
      this.formBusquedaTrabajador.reset({
        documento: {
          tipDoc: this.formBusquedaTrabajador.value.documento.tipDoc,
          numDoc: ''
      }});
    };

    // Establecer la validacion del número de documento segun el tipo de documento

    setearValidacionesNumeroDocumentoIdentidad(formBusquedaTrabajador: FormGroup) {
      // console.log(`Validar para el Tip.Doc: ${formBusquedaTrabajador.value.documento.tipDoc}`);
      this.formBusquedaTrabajador = formBusquedaTrabajador;
      this.validatorNumDoc = [];
      this.validatorNumDoc.push(Validators.required); // http://www2.sunat.gob.pe/pdt/pdtModulos/independientes/p695/TipoDoc.htm
      this.validatorNumDoc.push(Validators.pattern('[0-9]+'));
      this.validatorNumDoc.push(Validators.minLength(8));
      this.validatorNumDoc.push(Validators.maxLength(15));
      ((this.formBusquedaTrabajador.get('documento') as FormGroup).get('numDoc') as FormControl).setValidators(this.validatorNumDoc);
    };

    // Construye el formulario de Busqueda del Trabajador

    contruirFormularioBusquedaTrabajador() {
      this.formBusquedaTrabajador = new FormGroup({});
      this.formBusquedaTrabajador.addControl('documento', new FormGroup({}));
      (this.formBusquedaTrabajador.get('documento') as FormGroup).addControl('tipDoc', new FormControl());
      (this.formBusquedaTrabajador.get('documento') as FormGroup).addControl('numDoc', new FormControl());
      ((this.formBusquedaTrabajador.get('documento') as FormGroup).get('tipDoc') as FormControl).reset();
      ((this.formBusquedaTrabajador.get('documento') as FormGroup).get('tipDoc') as FormControl).setValidators(Validators.required);
      ((this.formBusquedaTrabajador.get('documento') as FormGroup).get('numDoc') as FormControl).reset();
      ((this.formBusquedaTrabajador.get('documento') as FormGroup).get('numDoc') as FormControl).setValidators(Validators.required);
      /*this.formBusquedaTrabajador = new FormGroup({
        'documento': new FormGroup({
          'tipDoc': new FormControl(null, Validators.required), // this.formBusquedaTrabajador.value.documento.tipDoc
          'numDoc': new FormControl(null, this.validatorNumDoc)
          })
        });*/
    };

    // Busca el trabajador en la Reniec

    buscarTrabajadorReniec(formBusquedaTrabajador: FormGroup) {
      console.log(`Buscando al trabajador en Reniec...`);
      // this.buscarTrabajadorBaseDatos(formBusquedaTrabajador);
    };

    // Abrir el popup de busqueda de vinculos laborales
    abrirPopupBusquedaVinculosLaborales() {
      this.router.navigate(['/liquidaciones/registro-atencion/trabajador' , { outlets: { popupexp: [Number(JSON.stringify(this.listaTrabajador[0].Trabajador.id))] } }]);
      // this.mostrarFormularioDatosTrabajador();
    }

    // Funciones Utilitarias - Busqueda Trabajador - F --------------------------------------------------------------------
}
