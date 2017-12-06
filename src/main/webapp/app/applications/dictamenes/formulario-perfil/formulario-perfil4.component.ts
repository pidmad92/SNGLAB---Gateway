import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage } from 'ng2-webstorage';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Participa } from '../../../entities/participa/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Direccion } from '../../../entities/direccion/index';
import { Negocolect } from '../../../entities/negocolect/index';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Message } from 'primeng/components/common/api';
import { Respinforma } from '../../../entities/respinforma/index';

@Component({
    selector: 'jhi-formulario-perfil4',
    templateUrl: './formulario-perfil4.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil4Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;

    // Datos de Perfil
    @SessionStorage('solicitud')
    solicitud: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;

    // Listados de dato
    @SessionStorage('undNegocios')
    undNegocios: Undnegocio[];
    @SessionStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @SessionStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @SessionStorage('obras')
    obras: Hechoinver[];
    @SessionStorage('proyectos')
    proyectos: Hechoinver[];
    @SessionStorage('direcciones')
    direcciones: Direccion[];
    @SessionStorage('solicitante')
    solicitante: Negocolect;
    @SessionStorage('organizaciones')
    organizaciones: Negocolect[];
    @SessionStorage('resultadoNegociaciones')
    resultadoNegociaciones: Resulnegoc[];
    @SessionStorage('responInfoFinanciera')
    responInfoFinanciera: Respinforma;
    @SessionStorage('responeInfoLaboral')
    responeInfoLaboral: Respinforma;

    displayResultado: boolean;
    resultadoRegistro: Resulnegoc;

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
        private resulNegocService: ResulnegocService,
    ) { }

    showResultado() {
        this.resultadoRegistro = new Resulnegoc;
        this.block = true;
        this.editar = false;
        this.displayResultado = true;
    }
    cancelarResultado() {
        this.resultadoRegistro = new Resulnegoc;
        this.displayResultado = false;
        this.block = false;
        this.editar = false;
    }
    guardarResultado() {
        if (this.validarResultado()) {
            if (!this.editar) {
                this.resultadoRegistro.id = this.resultadoNegociaciones.length;
                if (this.resultadoNegociaciones.lastIndexOf(this.resultadoRegistro, 1) === -1) {
                    this.resultadoNegociaciones.push(this.resultadoRegistro);
                }
            } else {
                const resultadoGuardado: Resulnegoc = this.resultadoNegociaciones.find((x) => x.id === this.resultadoRegistro.id);
                if (resultadoGuardado !== undefined) {
                    const index = this.resultadoNegociaciones.indexOf(resultadoGuardado);
                    this.resultadoNegociaciones[index] = this.resultadoRegistro;
                }
            }
            this.resultadoRegistro = new Resulnegoc;
            this.displayResultado = false;
            this.block = false;
            this.editar = false;
        }
    }
    editarResultado(obj: Resulnegoc) {
        this.resultadoRegistro.id = obj.id;
        this.resultadoRegistro.nFlgactivo = obj.nFlgactivo;
        this.resultadoRegistro.tFecreneg = obj.tFecreneg;
        this.resultadoRegistro.nAumento = obj.nAumento;
        this.resultadoRegistro.nClausula = obj.nClausula;
        this.resultadoRegistro.nGratifica = obj.nGratifica;
        this.resultadoRegistro.nAlimentac = obj.nAlimentac;
        this.resultadoRegistro.nMovilidad = obj.nMovilidad;

        this.displayResultado = true;
        this.block = true;
        this.editar = true;
    }
    eliminarResultado(obj: Resulnegoc) {
        this.resultadoNegociaciones.splice(this.resultadoNegociaciones.indexOf(obj), 1);
    }
    validarResultado(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.resultadoRegistro.tFecreneg === undefined || this.resultadoRegistro.tFecreneg === null || this.resultadoRegistro.tFecreneg === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar una Fecha.' });
            error = false;
        } else if (this.resultadoRegistro.nAumento === undefined || this.resultadoRegistro.nAumento === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el monto de Aumento General.' });
            error = false;
        } else if (this.resultadoRegistro.nClausula === undefined || this.resultadoRegistro.nClausula === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el monto de Clausula de Salvaguarda o Adicional.' });
            error = false;
        } else if (this.resultadoRegistro.nGratifica === undefined || this.resultadoRegistro.nGratifica === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el monto de la Gratificación por Cierre de Pliego.' });
            error = false;
        } else if (this.resultadoRegistro.nAlimentac === undefined || this.resultadoRegistro.nAlimentac === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el monto de la Alimentación.' });
            error = false;
        } else if (this.resultadoRegistro.nMovilidad === undefined || this.resultadoRegistro.nMovilidad === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el monto de la Movilidad.' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        if (this.resultadoNegociaciones === undefined && this.resultadoNegociaciones === null) {
            this.resulNegocService.obtenerResultadoNegociaciones(nCodfperf).subscribe(
                (res: ResponseWrapper) => this.resultadoNegociaciones = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    ngOnInit() {
        this.loadAll();
        this.resultadoRegistro = new Resulnegoc;
        this.displayResultado = false;
        this.block = false;
        this.editar = false;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
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

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
