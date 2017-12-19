import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Message } from 'primeng/components/common/api';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService } from '../../../entities/anexlaboral/index';
import { DatePipe } from '@angular/common';
import { FormularioPerfilService } from './index';
import { Formulario } from './formulario.model';
import { FormGroup } from '@angular/forms';
import { PerreglabService } from '../../../entities/perreglab/index';
import { ComboModel } from '../../general/combobox.model';

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
    // Variables de edicion y bloqueo
    block: boolean;
    editar: boolean;

    // Flag de Modals
    displayResultado: boolean;
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
    formulario: Formulario[];
    @LocalStorage('regimenLaboral')
    selectedRegimen: ComboModel[];

    // Flags de Inicio
    @LocalStorage('inicioResultado')
    inicioResultado: boolean;

    // Objetos CUD
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
        private perreglabService: PerreglabService,
    ) { }

    ngOnInit() {
        this.iniciarDatos();
        this.loadAll();
        this.resultadoRegistro = new Negocolect();
        this.displayResultado = false;
        this.block = false;
        this.editar = false;
        this.displayGuardar = false;
    }

    iniciarDatos() {
        if (this.inicioResultado === null || this.inicioResultado === undefined) {
            this.inicioResultado = true;
        } else {
            this.inicioResultado = false;
        }
    }

    loadAll() {
        this.load(this.formPerfil.nCodfperf);
    }

    load(nCodfperf) {
        if (this.inicioResultado) {
            this.resultadoNegociaciones = new Array<Resulnegoc>();
            this.resulnegocService.obtenerResultadoNegociaciones(nCodfperf).subscribe(
                (res: ResponseWrapper) => {
                    this.resultadoNegociaciones = res.json;
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    ngOnDestroy() { }

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

    guardarFormularioPerfil() {
        if (this.solicitud !== undefined && this.solicForm !== undefined) {
            this.messagesForm = this.formularioPerfilService.validarDatosObligatorios(this.solicitud, this.formPerfil, this.obras, this.solicitante);
            if (this.messagesForm.length === 0) {
                this.formularioPerfilService.guardarFormularioPerfil(this.datepipe, this.solicitud, this.solicForm,
                    this.formPerfil, this.undNegocios, this.participacionesAccionarias, this.participacionesMercados,
                    this.obras, this.proyectos, this.direcciones, this.organizaciones, this.solicitante,
                    this.resultadoNegociaciones, this.responInfoFinanciera, this.responeInfoLaboral, this.formulario, this.selectedRegimen,
                    this.formperfilService, this.undnegocioService, this.participaService, this.hechoinverService,
                    this.direccionService, this.negocolectService, this.resulnegocService, this.respinformaService, this.anexlaboralService, this.perreglabService);
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
