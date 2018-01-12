
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { Observable, Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ResponseWrapper } from '../../../../shared';
import { DatosWizardService } from './datos-wizard.service';
import { Expediente, Empleador, Dirperjuri, Dirpernat } from './../';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard.service';
import { CrearMensajeria, MesgDestinario, Item, Administrado } from './../../models/crearMensajeria.model';

@Component({
    selector: 'jhi-verificacion-expediente',
    templateUrl: './verificacion-expediente.component.html'
})
export class VerificacionExpedienteComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    expedientes: Expediente[];
    empleador: Empleador;

    tipoNotificacion: SelectItem[];
    tipoEnvio: SelectItem[];
    selectedTNotificacion: String;
    selectedTEnvio: String;
    direcciones: any;
    direccionesEmp: any;

    dirperjuri: Dirperjuri[];
    dirpernat: Dirpernat[];

    soapNotificacion: CrearMensajeria;

    direcSelec: CrearMensajeria;

    constructor(
        private eventManager: JhiEventManager,
        private datosWizardService: DatosWizardService,
        private router: Router,
        private envioNotificacionService: EnvioNotificacionWizardService
    ) {}

    conseguirDirecciones( idTrabajador, idEmpleador, isPersonaJuridica, indice ) {
        this.datosWizardService.buscarDirecciones(idTrabajador).subscribe(
            (res: ResponseWrapper) => {
                this.expedientes[indice].trabajadorDireccion = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
        if ( isPersonaJuridica ) {
            this.datosWizardService.buscarDireccionesPerJur(idEmpleador).subscribe(
                (res: ResponseWrapper) => {
                    this.expedientes[indice].empleadorDireccion = res.json;
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        } else {
            this.datosWizardService.buscarDirecciones(idEmpleador).subscribe(
                (res: ResponseWrapper) => { this.expedientes[indice].empleadorDireccion = res.json; },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        }
    }

    ngOnInit() {
        this.subscription = this.envioNotificacionService.expedienteSeleccionado.subscribe((expedientes: any) => {
            this.expedientes = expedientes;
            if ( Object.keys(this.expedientes).length === 0) {
                this.router.navigate(['/conciliaciones/expediente/envio-notificacion' , { outlets: { wizard: ['seleccion-expediente'] } }]);
            } else {
                this.expedientes.forEach((expediente, index) => {
                    this.empleador = expediente.empleador;
                    let isPerjuridica = false;
                    if (this.empleador.pernatural === null) {
                        isPerjuridica = true;
                    }
                    this.conseguirDirecciones(expediente.trabajador.id, expediente.empleador.id, isPerjuridica, index);
                });
            }
        });

        this.tipoNotificacion = [
            {label: 'Conciliación', value: '1'},
            {label: 'Requerimiento', value: '2'},
            {label: 'Proveído de Archivo', value: '3'},
            {label: 'Vuelvase a Notificar', value: '4'},
        ];
        this.tipoEnvio = [
            {label: 'Urgente', value: '1'},
        ];
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
        this.direccionesEmp = [
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]

        this.registerChangeInExpediente();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    registerChangeInExpediente() {
        this.eventSubscriber = this.eventManager.subscribe('envioNotificaciones', (response) => {
            // console.log('EXPEDIENTES: ' + JSON.stringify(this.expedientes));
            this.cargarExpediente();
        });
    }
    padWithZero(number) {
        let num_form = '' + number;
        if (num_form.length < 2) {
            num_form = '0' + num_form;
        }
        return num_form;
    }

    cargarExpediente() {
        let cont = 0;

        this.soapNotificacion = new CrearMensajeria();
        this.soapNotificacion.msgDestinatario = new MesgDestinario();

        this.soapNotificacion.idAreaRemite = '5';
        this.soapNotificacion.idUserDespacho = '4';
        this.soapNotificacion.msgDestinatario = new MesgDestinario();
        this.soapNotificacion.msgDestinatario.item = [];
        this.expedientes.forEach((expediente, index) => {
            expediente.trabajadorDireccion.forEach((trabajadorDireccion) => {
                if (trabajadorDireccion.direc.nFlgnotifi === true) {
                    console.log('INDICE' + cont);
                    // console.log('DeptNotificar' + this.padWithZero(trabajadorDireccion.direc.nCoddepto));
                    this.soapNotificacion.msgDestinatario.item[cont] = new Item();
                    this.soapNotificacion.msgDestinatario.item[cont].administrado = new Administrado();
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.departamento = this.padWithZero(trabajadorDireccion.direc.nCoddepto);
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.distrito = this.padWithZero(trabajadorDireccion.direc.nCoddist);
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.domicilio = trabajadorDireccion.direc.vDircomple;
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.nombreRemitente =
                        trabajadorDireccion.direc.pernatural.vNombres + trabajadorDireccion.direc.pernatural.vApepat + trabajadorDireccion.direc.pernatural.vApemat;
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.numeroDocumentoIdent = trabajadorDireccion.direc.pernatural.vNumdoc;
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.pais = '173';
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.provincia = this.padWithZero(trabajadorDireccion.direc.nCodprov);
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.tipoAdministrado = '1';
                    this.soapNotificacion.msgDestinatario.item[cont].administrado.tipoDocumentoIdent = '2';
                    this.soapNotificacion.msgDestinatario.item[cont].asunto = 'HOJA DE ENVIO DE PRUEBA POR WS';
                    this.soapNotificacion.msgDestinatario.item[cont].idClase = '1';
                    this.soapNotificacion.msgDestinatario.item[cont].nivelSegu = 'NORMAL';
                    this.soapNotificacion.msgDestinatario.item[cont].noDocumento = '78549';
                    this.soapNotificacion.msgDestinatario.item[cont].numFolios = '2';
                    this.soapNotificacion.msgDestinatario.item[cont].numeroExpediente = '';
                    this.soapNotificacion.msgDestinatario.item[cont].paraNombre = 'MARIANO MELGAR';
                    this.soapNotificacion.msgDestinatario.item[cont].tipoDespacho = 'URGENTE';
                    cont++;
                }
            });
            console.log('SOAP' + JSON.stringify(this.soapNotificacion));
            this.subscribeToSaveResponseNotificacion(
                this.datosWizardService.createNotifacion(this.soapNotificacion));
        });
    }
    private subscribeToSaveResponseNotificacion(result: Observable<any>) {
        result.subscribe((res: any) => {
            console.log('OKNOTIFICACION');
        }, (res: Response) => this.onError('Error Datlab'));
    }

}
