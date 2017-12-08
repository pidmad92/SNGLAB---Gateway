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
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService, Anexlaboral } from '../../../entities/anexlaboral/index';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { Message } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { FormularioPerfilService } from './index';

@Component({
    selector: 'jhi-formulario-perfil6',
    templateUrl: './formulario-perfil6.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil6Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;
    displayGuardar: boolean;
    @LocalStorage('inicio')
    inicio: boolean;

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

    anios: Anexlaboral[];
    decretos: Anexlaboral[];
    descripciones: Anexlaboral[];

    cantidad: ModelAnexo[];

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
        private datepipe: DatePipe,
        private formularioPerfilService: FormularioPerfilService,
    ) { }

    ngOnInit() {
        this.loadAll();
        this.displayGuardar = false;
    }

    ngOnDestroy() { }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        this.anexlaboralService.obtenerAnios(nCodfperf).subscribe(
            (res: ResponseWrapper) => {
                 this.anios = <Anexlaboral[]>res.json;
                 this.anexlaboralService.obtenerDecretosPorTipoAnio(nCodfperf, 'D', this.anios[0].nAnioanex).subscribe(
                    (res1: ResponseWrapper) => {
                         this.decretos = <Anexlaboral[]>res1.json;
                    },
                    (res1: ResponseWrapper) => this.onError(res1.json)
                 );
                 this.anexlaboralService.obtenerDescripcionPorTipoAnio(nCodfperf, 'D', this.anios[0].nAnioanex).subscribe(
                    (res2: ResponseWrapper) => {
                            this.descripciones = <Anexlaboral[]>res2.json;
                    },
                    (res2: ResponseWrapper) => this.onError(res2.json)
                );
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

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
