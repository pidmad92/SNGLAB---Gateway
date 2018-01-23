
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { Observable, Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Message } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/components/common/api';
import { padWithZero  } from './../../../applications.constant';

import { Tipnotif } from './../../models/tipnotif.model';
import { Tipenvnot } from './../../models/tipenvnot.model';

import { ResponseWrapper } from '../../../../shared';
import { DatosWizardService } from './datos-wizard.service';
import { Expediente, Empleador, Dirperjuri, Dirpernat, Notifica, Direcnotif } from './../';
import { EnvioNotificacionWizardService } from './envio-notificacion-wizard.service';
import { MesgDestinario, Item, Administrado } from './../../models/crearMensajeria.model';

@Component({
    selector: 'jhi-verificacion-expediente',
    templateUrl: './verificacion-expediente.component.html',
    providers: [ConfirmationService]
})
export class VerificacionExpedienteComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    expedientes: Expediente[];
    empleador: Empleador;
    notifica: Notifica;
    direcnotif: Direcnotif;

    idNotificacion = [];
    tipoNotificacion: Tipnotif;
    tipoenvNotificacion: Tipenvnot;
    selectedTNotificacion: String;
    selectedTEnvio: String;

    block: boolean;
    mensajes: Message[] = [];

    dirperjuri: Dirperjuri[];
    dirpernat: Dirpernat[];

    msgDestinatario: MesgDestinario;

    direcSelec: MesgDestinario;

    constructor(
        private eventManager: JhiEventManager,
        private datosWizardService: DatosWizardService,
        private router: Router,
        private envioNotificacionService: EnvioNotificacionWizardService,
        private confirmationService: ConfirmationService,
    ) {}

    conseguirDirecciones( idTrabajador, idEmpleador, isPersonaJuridica, indice ) {
        this.block = true;
        this.datosWizardService.buscarDirecciones(idTrabajador).subscribe(
            (res: ResponseWrapper) => {
                this.expedientes[indice].trabajadorDireccion = res.json;
                this.block = false;
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
    loadTipnotif() {
        this.datosWizardService.buscarTipnotif().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.tipoNotificacion = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadTipenvnotif() {
        this.datosWizardService.buscarTipenvnot().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.tipoenvNotificacion = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipnotif();
        this.loadTipenvnotif();
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
            let mostrarMensaje = false;
            this.expedientes.forEach((expediente) => {
                console.log('Tenvio' + expediente.nroFolios);
                if (expediente.tipoEnvio === null || expediente.tipoEnvio === undefined) {
                    this.mensajes = [];
                    this.mensajes.push({ severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado uno de los tipos de envió' });
                    mostrarMensaje = true;
                } else if (expediente.tipoNotificacion === null || expediente.tipoNotificacion === undefined) {
                    this.mensajes = [];
                    this.mensajes.push({ severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado uno de los tipos de notificación' });
                    mostrarMensaje = true;
                } else if (expediente.nroFolios === null || expediente.nroFolios === undefined) {
                    this.mensajes = [];
                    this.mensajes.push({ severity: 'warn', summary: 'Mensaje de Alerta', detail: 'No se ha ingresado uno de los números de folios' });
                    mostrarMensaje = true;
                }
            });
            console.log('CONFIRMAR');
            if (!mostrarMensaje) {
                this.confirmar();
            }
        });
    }
    confirmar() {
        this.confirmationService.confirm({
            message: '¿Esta seguro de registrar esta atención?',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.cargarExpediente();
            }
        });
    }

    cargarExpediente() {
        let cont = 0;
        this.msgDestinatario = new MesgDestinario();
        this.msgDestinatario.item = [];
        this.expedientes.forEach((expediente, index) => {
            expediente.trabajadorDireccion.forEach((trabajadorDireccion) => {
                if (trabajadorDireccion.direc.nFlgnotifi === true) {
                    this.msgDestinatarioPersona(trabajadorDireccion, cont);
                    cont++;
                }
            });
            expediente.empleadorDireccion.forEach((empleadorDireccion) => {
                if (empleadorDireccion.direc.nFlgnotifi === true) {
                    this.msgDestinatarioPersona(empleadorDireccion, cont)
                    cont++;
                }
            });
            console.log('SOAP' + JSON.stringify(this.msgDestinatario));
            this.subscribeToSaveResponseNotificacion(
                this.datosWizardService.createNotifacion(this.msgDestinatario));
        });
    }
    private subscribeToSaveResponseNotificacion(result: Observable<any>) {
        this.block = true;
        let index = 0;
        result.subscribe((res: any) => {
            console.log('RESULT');
            console.log(res);
            this.expedientes.forEach((expediente) => {
                console.log('SAVE EXPEDIENTE');
                console.log(expediente);
                this.notifica = new Notifica();
                this.notifica.expediente = expediente;
                this.notifica.nNumfolios = expediente.nroFolios;
                this.notifica.tipenvnot = expediente.tipoEnvio;
                this.notifica.tipnotif = expediente.tipoNotificacion;
                this.notifica.vHojaenvio = res.item[index].doNohetxt;
                this.notifica.direcnotifs = expediente.trabajadorDireccion;
                this.subscribeToSaveNotifica(
                    this.datosWizardService.createTableDirecNotifica(expediente.trabajadorDireccion), 'Las direcciones se han enviado correctamente');
                index++;
                if (expediente.empleadorDireccion !== null) {
                    this.notifica = new Notifica();
                    this.notifica.expediente = expediente;
                    this.notifica.nNumfolios = expediente.nroFolios;
                    this.notifica.tipenvnot = expediente.tipoEnvio;
                    this.notifica.tipnotif = expediente.tipoNotificacion;
                    this.notifica.vHojaenvio = res.item[index].doNohetxt;
                    this.notifica.direcnotifs = expediente.empleadorDireccion;
                    this.subscribeToSaveNotifica(
                        this.datosWizardService.createTableDirecNotifica(expediente.empleadorDireccion), 'Las direcciones se han enviado correctamente');
                    index++;
                }
            });
            console.log('NOTIFICA SAVE');
            console.log(this.notifica);
           this.subscribeToSaveNotifica(
                this.datosWizardService.createTableNotifica(this.notifica), 'Las notificaciónes se han enviado correctamente');
        }, (res: Response) => {
            this.onError('Error en la respuesta del servidor por favor vuelva a intentarlo');
            this.block = false;
        });
    }

    private subscribeToSaveDirecNotifica(result: Observable<Direcnotif>, mensaje: string) {
        result.subscribe((res: any) => {
            console.log('DIRECGRABADO');
        }, (res: Response) => this.onError('Error en la respuesta del servidor por favor vuelva a intentarlo'));
    }

    private subscribeToSaveNotifica(result: Observable<Notifica>, mensaje: string) {
        result.subscribe((res: any) => {
            console.log('GRABADO');
            console.log(res);
            this.idNotificacion.push(res.id);
            console.log('IDNOTIF');
            console.log(this.idNotificacion);
            this.block = false;
            this.envioNotificacionService.cambiarNotificacion(this.idNotificacion);
            this.eventManager.broadcast({ name: 'end', content: 'OK'});
        }, (res: Response) => this.onError('Error en la respuesta del servidor por favor vuelva a intentarlo'));
    }

    private msgDestinatarioPersona(personaDireccion, cont ) {
        this.msgDestinatario.item[cont] = new Item();
        this.msgDestinatario.item[cont].administrado = new Administrado();
        this.msgDestinatario.item[cont].administrado.departamento = padWithZero(personaDireccion.direc.nCoddepto);
        this.msgDestinatario.item[cont].administrado.distrito = padWithZero(personaDireccion.direc.nCoddist);
        this.msgDestinatario.item[cont].administrado.domicilio = personaDireccion.direc.vDircomple;
        if (personaDireccion.direc.pernatural !== undefined) {
            this.msgDestinatario.item[cont].administrado.nombreRemitente =
                personaDireccion.direc.pernatural.vNombres + ' ' + personaDireccion.direc.pernatural.vApepat + ' ' + personaDireccion.direc.pernatural.vApemat;
            this.msgDestinatario.item[cont].administrado.numeroDocumentoIdent = personaDireccion.direc.pernatural.vNumdoc;
        } else {
            this.msgDestinatario.item[cont].administrado.nombreRemitente =
                personaDireccion.direc.perjuridica.vRazsocial;
            this.msgDestinatario.item[cont].administrado.numeroDocumentoIdent = personaDireccion.direc.perjuridica.vNumdoc;
        }
        this.msgDestinatario.item[cont].administrado.pais = '173';
        this.msgDestinatario.item[cont].administrado.provincia = padWithZero(personaDireccion.direc.nCodprov);
        this.msgDestinatario.item[cont].administrado.tipoAdministrado = '1';
        this.msgDestinatario.item[cont].administrado.tipoDocumentoIdent = '2';
        this.msgDestinatario.item[cont].asunto = 'HOJA DE ENVIO DE PRUEBA POR WS1';
        this.msgDestinatario.item[cont].idClase = '1';
        this.msgDestinatario.item[cont].nivelSegu = 'NORMAL';
        this.msgDestinatario.item[cont].noDocumento = '78549';
        this.msgDestinatario.item[cont].numFolios = '2';
        this.msgDestinatario.item[cont].numeroExpediente = '';
        this.msgDestinatario.item[cont].paraNombre = 'MARIANO MELGAR';
        this.msgDestinatario.item[cont].tipoDespacho = 'URGENTE';
    }

}
