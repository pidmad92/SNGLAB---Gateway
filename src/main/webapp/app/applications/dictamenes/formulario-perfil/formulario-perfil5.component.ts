import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Direccion, DireccionService } from '../../../entities/direccion/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { RespinformaService, Respinforma } from '../../../entities/respinforma/index';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Message } from 'primeng/components/common/api';
import { Persona } from '../../general/servicesmodel/persona.model';
import { FormularioPerfilService } from './index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService } from '../../../entities/anexlaboral/index';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'jhi-formulario-perfil5',
    templateUrl: './formulario-perfil5.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil5Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;
    @LocalStorage('inicioFinanciero')
    inicioFinanciero: boolean;
    @LocalStorage('inicioLaboral')
    inicioLaboral: boolean;

    persona: Persona;

    displayGuardar: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    // Listados de dato
    @LocalStorage('undNegocios')
    undNegocios: Undnegocio[];
    @LocalStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @LocalStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @LocalStorage('obras')
    obras: Hechoinver[];
    @LocalStorage('proyectos')
    proyectos: Hechoinver[];
    @LocalStorage('direcciones')
    direcciones: Direccion[];
    @LocalStorage('solicitante')
    solicitante: Negocolect;
    @LocalStorage('organizaciones')
    organizaciones: Negocolect[];
    @LocalStorage('resultadoNegociaciones')
    resultadoNegociaciones: Resulnegoc[];
    @LocalStorage('responInfoFinanciera')
    responInfoFinanciera: Respinforma;
    @LocalStorage('responeInfoLaboral')
    responeInfoLaboral: Respinforma;
    @LocalStorage('anexoLaboral')
    anexoLaboral: ModelAnexo[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,

        // Servicios
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private direccionService: DireccionService,
        private undnegocioService: UndnegocioService,
        private participaService: ParticipaService,
        private hechoinverService: HechoinverService,
        private negocolectService: NegocolectService,
        private resulnegocService: ResulnegocService,
        private respinformaService: RespinformaService,
        private anexlaboralService: AnexlaboralService,
        private formularioPerfilService: FormularioPerfilService,
        private datepipe: DatePipe,
    ) { }

    buscarNombreFinanciero() {
        this.messageList = [];
        this.messagesForm = [];
        // DNI
        this.persona = new Persona;
        if (this.responInfoFinanciera.vNumdocum !== undefined
            && this.responInfoFinanciera.vNumdocum !== null
            && this.responInfoFinanciera.vNumdocum !== '') {
            this.formularioPerfilService.obtenerDatosReniec(this.responInfoFinanciera.vNumdocum)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.persona = <Persona>res.json[0];
                    if (this.persona.nombres !== undefined && this.persona.nombres !== null) {
                        this.responInfoFinanciera.vNombre = this.persona.apellidoPaterno + ' ' + this.persona.apellidoMaterno + ' ' + this.persona.nombres;
                    } else {
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el DNI ' + this.responInfoFinanciera.vNumdocum + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el DNI del Responsable de la información económica - financiera.' });
            this.onErrorMultiple(this.messageList);
        }
    }

    buscarNombreLaboral() {
        this.messageList = [];
        this.messagesForm = [];
        // DNI
        this.persona = new Persona;
        if (this.responeInfoLaboral.vNumdocum !== undefined
            && this.responeInfoLaboral.vNumdocum !== null
            && this.responeInfoLaboral.vNumdocum !== '') {
            this.formularioPerfilService.obtenerDatosReniec(this.responeInfoLaboral.vNumdocum)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.persona = <Persona>res.json[0];
                    if (this.persona.nombres !== undefined && this.persona.nombres !== null) {
                        this.responeInfoLaboral.vNombre = this.persona.apellidoPaterno + ' ' + this.persona.apellidoMaterno + ' ' + this.persona.nombres;
                    } else {
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el DNI ' + this.responeInfoLaboral.vNumdocum + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el DNI del Responsable de la información laboral.' });
            this.onErrorMultiple(this.messageList);
        }
    }

    iniciarDatos() {
        if (this.inicioFinanciero === null || this.inicioFinanciero === undefined) {
            this.inicioFinanciero = true;
        } else {
            this.inicioFinanciero = false;
        }
        if (this.inicioLaboral === null || this.inicioLaboral === undefined) {
            this.inicioLaboral = true;
        } else {
            this.inicioLaboral = false;
        }
    }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        this.respinformaService.obtenerResponsableInformacion(nCodfperf, 'F').subscribe((responInfoFinanciera) => {
                if (this.inicioFinanciero) {
                    this.responInfoFinanciera = responInfoFinanciera;
                }
            },
        );
        this.respinformaService.obtenerResponsableInformacion(nCodfperf, 'L').subscribe((responeInfoLaboral) => {
                if (this.inicioLaboral) {
                    this.responeInfoLaboral = responeInfoLaboral;
                }
            },
        );
        if (this.responInfoFinanciera === null) {
            this.responInfoFinanciera = new Respinforma;
        }
        if (this.responeInfoLaboral === null) {
            this.responeInfoLaboral = new Respinforma;
        }
    }

    ngOnInit() {
        this.iniciarDatos();
        this.loadAll();
        this.displayGuardar = false;
    }

    ngOnDestroy() { }

    guardarFormularioPerfil() {
        if (this.solicitud !== undefined && this.solicForm !== undefined) {
            this.messagesForm = this.formularioPerfilService.validarDatosObligatorios(this.solicitud, this.formPerfil, this.obras, this.solicitante);
            if (this.messagesForm.length === 0) {
                this.formularioPerfilService.guardarFormularioPerfil(this.datepipe, this.solicitud, this.solicForm,
                    this.formPerfil, this.undNegocios, this.participacionesAccionarias, this.participacionesMercados,
                    this.obras, this.proyectos, this.direcciones, this.organizaciones, this.solicitante,
                    this.resultadoNegociaciones, this.responInfoFinanciera, this.responeInfoLaboral, this.anexoLaboral,
                    this.formperfilService, this.undnegocioService, this.participaService, this.hechoinverService,
                    this.direccionService, this.negocolectService, this.resulnegocService, this.respinformaService)
                this.router.navigate(['./dictamenes/control-informacion/' + this.solicitud.nCodsolic]);
            }
        }
    }

    mostrarGuardar() {
        this.displayGuardar = true;
    }

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    irPerfil6() {
        this.router.navigate(['./dictamenes/formulario-perfil6']);
    }

    irPerfil5() {
        this.router.navigate(['./dictamenes/formulario-perfil5']);
    }

    irPerfil4() {
        this.router.navigate(['./dictamenes/formulario-perfil4']);
    }

    irPerfil3() {
        this.router.navigate(['./dictamenes/formulario-perfil3']);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

    irPerfil() {
        this.router.navigate(['./dictamenes/formulario-perfil/' + this.solicForm.nCodfperf]);
    }

}
