import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, NgForm, ValidatorFn } from '@angular/forms' /* Necesario*/
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../../shared';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import {SelectItem} from 'primeng/primeng';

import { padWithZero  } from './../../../applications.constant';

// Modelos

import { Tipdocident } from '../../models/tipdocident.model';
import { Trabajador } from '../../models/trabajador.model';
import { Pernatural } from '../../models/pernatural.model';
import { Datlab } from './../../models/datlab.model';
import { Dirpernat } from './../../models/dirpernat.model';

// Componentes
import { ES } from './../../../applications.constant';

// Servicios

import { TrabajadorService } from './tabajador.service';
import { TrabajadorTransferService } from './trabajador-transfer.service'

@Component({
    selector: 'jhi-trabajador',
    templateUrl: './trabajador.component.html'
})

export class TrabajadorComponent implements OnInit {
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    es: any;

    // Variables de control de la pagina

    formBusquedaTrabajador: FormGroup;
    formPopupDireccion: FormGroup;
    showFormularioDatosTrabajador: boolean;
    showImputTextNumPartidaSucesion: boolean;
    validatorNumDoc: ValidatorFn[];
    formDatosTrabajador: FormGroup;
    popupDirecion: boolean;
    showComboProvincia: boolean;
    showComboDistrito: boolean;
    showInputDireccion: boolean;

    // Variables de Modelo - Entidad

    listaTipdocident: Tipdocident[];
    listaTrabajador: any[] = [];
    datlab: Datlab;
    listaDirpernat: Dirpernat[] = [];
    dirpernat: Dirpernat;
    selecDirper: Dirpernat;
    departamento: SelectItem[];
    provincia: SelectItem[];
    distrito: SelectItem[];
    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;
    newDirec: boolean;

    // Constructor

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private trabajadorService:  TrabajadorService,
        private trabajadorTransferService: TrabajadorTransferService,
        private router: Router
    ) {
    };

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    };

    // Al cargar la pagina:

    ngOnInit() {
      this.es = ES;
      this.contruirFormularioBusquedaTrabajador();
      this.cargarListaComboTipoDocumento();
      this.ocultarFormularioDatosTrabajador();
      this.ocultarImputTextNumPartidaSucesion();
      this.recibirDatosLaboralesTrabajador();
      this.contruirFormularioPopupDireccion();
      this.showComboProvincia = false;
      this.showComboDistrito = false;
      this.showInputDireccion = false;
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
        this.buscarTrabajadorBaseDatos(formBusquedaTrabajador);
    };

    // 4. Al hacer click en una direccion de la tabla de direcciones

    eventodireccionSeleccionada(event) {
      this.newDirec = false;
      this.abrirPopupDireccion(event.data.direc);
    };

    // 5. Al hacer click en nueva direccion

    btnAnadirDireccion() {
      this.newDirec = true;
      this.abrirPopupDireccion('');
      console.log(`Añadir direccion`);
    };

    // 6. En el Popup de Direcciones:

    // 6.1 Al hacer click en el boton eliminar direccion

    eliminarDireccion() {
      console.log(`Quitando Direccion`);
      this.popupDirecion = false;
    };

    // 6.2 Al hacer click en el boton guardar

    AnadirDireccion() {
      console.log(`Mostrando Direccion...`);
      this.popupDirecion = false;
    };

    // 6.3 Al hacer click en el boton cancelar

    cerrarPopupDireccion() {
      this.popupDirecion = false;
    };

    // 7. Al hacer click en el boton siguiente

    btnSiguiente(formBusquedaTrabajador: FormGroup) {
      console.log('Presiono el boton siguiente');
      this.router.navigate(['/liquidaciones/registro-atencion/empleador']);
    };

    // --------------------------------------------------------------------------------------------------------------------
    // Funciones Utilitarias - Busqueda Trabajador - I --------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------------------

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

    // Busca el trabajador en la Base de Datos

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
    };

    // Recibe los datos que podrian haber sido enviados del popup al formulario del trabajador
    recibirDatosLaboralesTrabajador() {
      this.eventSubscriber = this.eventManager.subscribe('cargarDatosLaboralesfromPopup', (response) => this.cargarDatosLaborales());
    };

    // Carga los datos laborales
    cargarDatosLaborales() {
      this.trabajadorTransferService.datlabSeleccionado.subscribe((datlab) => {
        this.datlab = datlab as Datlab;
        this.mostrarFormularioDatosTrabajador();
        this.contruirFormularioDatosTrabajador();
        this.setearValidacionesFormularioDatosTrabajador(this.formDatosTrabajador);
        this.setearDatosTablaDirecciones();
        // console.log(this.datlab);
      });
    };

    // Construye el formulario de Datos del Trabajador

    contruirFormularioDatosTrabajador() {
      this.formDatosTrabajador = new FormGroup({});
      this.formDatosTrabajador.addControl('apePat', new FormControl());
      this.formDatosTrabajador.addControl('apeMat', new FormControl());
      this.formDatosTrabajador.addControl('nombres', new FormControl());
      // Sucesion
      this.formDatosTrabajador.addControl('numPartSuc', new FormControl());
      this.formDatosTrabajador.addControl('fecNac', new FormControl());
      this.formDatosTrabajador.addControl('sexo', new FormControl());
      this.formDatosTrabajador.addControl('numTel', new FormControl());
      this.formDatosTrabajador.addControl('numCel', new FormControl());
      // Dirección
      this.formDatosTrabajador.addControl('email', new FormControl());
      this.formDatosTrabajador.addControl('discap', new FormControl());
      this.formDatosTrabajador.addControl('embarazo', new FormControl());
      // Seteo Previo
      (this.formDatosTrabajador.get('apePat') as FormControl).reset();
      (this.formDatosTrabajador.get('apePat') as FormControl).setValidators(Validators.required);
      (this.formDatosTrabajador.get('apeMat') as FormControl).reset();
      (this.formDatosTrabajador.get('apeMat') as FormControl).setValidators(Validators.required);
      (this.formDatosTrabajador.get('nombres') as FormControl).reset();
      (this.formDatosTrabajador.get('nombres') as FormControl).setValidators(Validators.required);
      // Sucesion
      (this.formDatosTrabajador.get('fecNac') as FormControl).reset();
      (this.formDatosTrabajador.get('fecNac') as FormControl).setValidators(Validators.required);
      (this.formDatosTrabajador.get('sexo') as FormControl).reset();
      (this.formDatosTrabajador.get('sexo') as FormControl).setValidators(Validators.required);
      (this.formDatosTrabajador.get('numTel') as FormControl).reset();
      (this.formDatosTrabajador.get('numCel') as FormControl).reset();
      (this.formDatosTrabajador.get('email') as FormControl).reset();
      (this.formDatosTrabajador.get('discap') as FormControl).reset();
      (this.formDatosTrabajador.get('embarazo') as FormControl).reset();
      /*this.formBusquedaTrabajador = new FormGroup({
        'documento': new FormGroup({
          'tipDoc': new FormControl(null, Validators.required), // this.formBusquedaTrabajador.value.documento.tipDoc
          'numDoc': new FormControl(null, this.validatorNumDoc)
          })
        });*/
    };

    // Setea las validaciones para el formulario de Datos del Trabajador

    setearValidacionesFormularioDatosTrabajador(formDatosTrabajador: FormGroup) {
      // console.log('Setea validaciones');
      (this.formDatosTrabajador.get('apePat') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vApepat);
      (this.formDatosTrabajador.get('apeMat') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vApemat);
      (this.formDatosTrabajador.get('nombres') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vNombres);
      (this.formDatosTrabajador.get('fecNac') as FormControl).setValue(new Date(
      +(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).dFecnac as string).substring(0, 4),
      +(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).dFecnac as string).substring(5, 7) - 1,
      +(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).dFecnac as string).substring(8, 10)));
      (this.formDatosTrabajador.get('sexo') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vSexoper);
      (this.formDatosTrabajador.get('numTel') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vTelefono);
      (this.formDatosTrabajador.get('numCel') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vCelular);
      (this.formDatosTrabajador.get('email') as FormControl).setValue(((this.datlab.trabajador as Trabajador).pernatural as Pernatural).vEmailper);
      // console.log((((this.datlab.trabajador as Trabajador).pernatural as Pernatural).dFecnac as Date));
    };

    setearDatosTablaDirecciones() {
      this.cargarDirecPerNatu((this.datlab.trabajador as Trabajador).id);

    };

    cargarDirecPerNatu(id: number) {
        this.trabajadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                this.listaDirpernat = res.json;
                console.log(`El trabajador tiene ${this.listaDirpernat.length} registros de Direcciones`);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    };

    btnEliminarDireccion(id: number) {
      console.log(`Elimino la direccion con id: ${id}`);
    };

    abrirPopupDireccion(ubigeo: any) {
      this.popupDirecion = true;
      (this.formPopupDireccion.get('departamento') as FormControl).setValue('');
      (this.formPopupDireccion.get('provincia') as FormControl).setValue('');
      (this.formPopupDireccion.get('distrito') as FormControl).setValue('');
      this.cargarListaComboDepartamento(); // Sucesivamente cargara los demas
      if (!this.newDirec) {
        this.setearDatosPopupDirecciones(ubigeo);
      };
    };

    contruirFormularioPopupDireccion() {
      this.formPopupDireccion = new FormGroup({});
      this.formPopupDireccion.addControl('departamento', new FormControl());
      this.formPopupDireccion.addControl('provincia', new FormControl());
      this.formPopupDireccion.addControl('distrito', new FormControl());
      this.formPopupDireccion.addControl('direccion', new FormControl());
      (this.formPopupDireccion.get('departamento') as FormControl).setValidators(Validators.required);
      (this.formPopupDireccion.get('provincia') as FormControl).setValidators(Validators.required);
      (this.formPopupDireccion.get('distrito') as FormControl).setValidators(Validators.required);
      (this.formPopupDireccion.get('direccion') as FormControl).setValidators(Validators.required);
    };

    setearDatosPopupDirecciones(ubigeo: any) {
      (this.formPopupDireccion.get('departamento') as FormControl).setValue(padWithZero(ubigeo.nCoddepto));
      this.cargarListaComboProvincia(ubigeo.nCoddepto);
      (this.formPopupDireccion.get('provincia') as FormControl).setValue(padWithZero(ubigeo.nCodprov));
      this.cargarListaComboDistrito(ubigeo.nCodprov);
      (this.formPopupDireccion.get('distrito') as FormControl).setValue(padWithZero(ubigeo.nCoddist));
      (this.formPopupDireccion.get('direccion') as FormControl).setValue(ubigeo.vDircomple);
    };

    cargarListaComboDepartamento() {
      this.trabajadorService.consDep().subscribe((departamentos) => {
          this.departs = departamentos.json;
      });
      (this.formPopupDireccion.get('provincia') as FormControl).setValue('');
      (this.formPopupDireccion.get('distrito') as FormControl).setValue('');
      (this.formPopupDireccion.get('direccion') as FormControl).setValue('');
    };

    cargarListaComboProvincia(idDept) {
      (this.formPopupDireccion.get('provincia') as FormControl).setValue('');
      (this.formPopupDireccion.get('distrito') as FormControl).setValue('');
      (this.formPopupDireccion.get('direccion') as FormControl).setValue('');
      this.trabajadorService.consProv(padWithZero(idDept)).subscribe((provincias) => {
          this.provins = provincias.json;
      });
    };

    cargarListaComboDistrito(idProv) {
      (this.formPopupDireccion.get('distrito') as FormControl).setValue('');
      (this.formPopupDireccion.get('direccion') as FormControl).setValue('');
      this.trabajadorService.consDis(padWithZero(this.formPopupDireccion.value.departamento), padWithZero(idProv)).subscribe((distritos) => {
          this.distris = distritos.json;
      });
    };

    // Funciones Utilitarias - Busqueda Trabajador - F --------------------------------------------------------------------
};
