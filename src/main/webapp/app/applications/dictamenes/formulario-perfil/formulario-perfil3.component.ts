import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { Direccion, DireccionService } from '../../../entities/direccion/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { Message } from 'primeng/components/common/api';
import { ComboModel } from '../../general/combobox.model';
import { FormularioPerfilService } from './index';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService } from '../../../entities/anexlaboral/index';
import { DatePipe } from '@angular/common';
import { Formulario } from './formulario.model';
import { FormGroup } from '@angular/forms';
import { PerreglabService } from '../../../entities/perreglab/index';

@Component({
    selector: 'jhi-formulario-perfil3',
    templateUrl: './formulario-perfil3.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil3Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editar: boolean;

    // Combos de Ambito y Etapa
    ambito: ComboModel[];
    etapa: ComboModel[];

    // Seleccion de Ambito y Etapa
    selectedAmbito: ComboModel;
    selectedAmbitoRegistro: ComboModel;
    selectedEtapa: ComboModel;
    selectedEtapaRegistro: ComboModel;

    // Flag de Modals
    displayOrganizacion: boolean;
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
    @LocalStorage('inicioSolicitante')
    inicioSolicitante: boolean;
    @LocalStorage('inicioOrganizacion')
    inicioOrganizacion: boolean;

    // Objetos CUD
    organizacion: Negocolect;
    empresa: Empresa;

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
        private perreglabService: PerreglabService,
        private datepipe: DatePipe,
    ) { }

    ngOnInit() {
        this.inicializarVariables();
        this.loadAll();
    }

    inicializarVariables() {
        // Iniciar Combos
        this.ambito = [];
        this.ambito.push(new ComboModel('Empleados de Confianza', 'EC', 0));
        this.ambito.push(new ComboModel('Empleados', 'EM', 0));
        this.ambito.push(new ComboModel('Obreros', 'OB', 0));
        this.etapa = [];
        this.etapa.push(new ComboModel('Trato Directo', 'TD', 0));
        this.etapa.push(new ComboModel('Conciliación', 'CO', 0));
        this.etapa.push(new ComboModel('Mediación', 'ME', 0));
        this.etapa.push(new ComboModel('Extraproceso', 'EX', 0));
        this.etapa.push(new ComboModel('Arbitraje', 'AR', 0));

        if (this.selectedAmbito === undefined || this.selectedAmbito === null) {
            this.selectedAmbito = this.ambito[0];
            this.selectedAmbitoRegistro = this.ambito[0];
            this.solicitante.vAmbsubje = this.selectedAmbitoRegistro.value;
        }

        if (this.selectedEtapa === undefined || this.selectedEtapa === null) {
            this.selectedEtapa = this.etapa[0];
            this.selectedEtapaRegistro = this.etapa[0];
            this.solicitante.vEtapaneg = this.selectedEtapaRegistro.value;
        }

        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
        this.editar = false;
        this.displayGuardar = false;
        this.inicioSolicitante = this.iniciarFlags(this.inicioSolicitante);
        this.inicioOrganizacion = this.iniciarFlags(this.inicioOrganizacion);
    }

    iniciarFlags(flg: boolean): boolean {
        if (flg === null || flg === undefined) {
            flg = true;
        } else {
            flg = false;
        }
        return flg;
    }

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {
        if (this.inicioSolicitante) {
            this.negocolectService.obtenerNegociacionSolicitante(nCodfperf, 'S').subscribe(
                (res: ResponseWrapper) => {
                    if (res.json[0] !== null && res.json[0] !== undefined) {
                        this.solicitante = res.json[0];
                    } else {
                        this.solicitante = new Negocolect();
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        }
        if (this.inicioOrganizacion) {
            this.negocolectService.obtenerNegociacion(nCodfperf, 'O').subscribe(
                (res: ResponseWrapper) => {
                    console.log(res.json);
                    if (res.json !== undefined && res.json !== null && res.json !== []) {
                        this.organizaciones = res.json;
                    } else {
                        this.organizaciones = new Array<Negocolect>();
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    // Organizaciones
    showOrganizacion() {
        this.block = true;
        this.editar = false;
        this.displayOrganizacion = true;
    }
    cancelarOrganizacion() {
        this.block = false;
        this.editar = false;
        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
    }
    guardarOrganizacion() {

        if (this.validarOrganizacion()) {
            this.organizacion.vCodAmbsu = this.selectedAmbitoRegistro.value;
            this.organizacion.vAmbsubje = this.selectedAmbitoRegistro.name;
            this.organizacion.vCodEtapa = this.selectedEtapaRegistro.value;
            this.organizacion.vEtapaneg = this.selectedEtapaRegistro.name;
            if (!this.editar) {
                this.organizacion.id = this.organizaciones.length;
                if (this.organizaciones.lastIndexOf(this.organizacion, 1) === -1) {
                    this.organizaciones.push(this.organizacion);
                }
            } else {
                const organizacionGuardado: Negocolect = this.organizaciones.find((x) => x.id === this.organizacion.id);
                if (organizacionGuardado !== undefined) {
                    const index = this.organizaciones.indexOf(organizacionGuardado);
                    this.organizaciones[index] = this.organizacion;
                }
            }
            this.organizacion = new Negocolect;
            this.displayOrganizacion = false;
            this.editar = false;
            this.block = false;
        }
    }
    editarOrganizacion(obj: Negocolect) {
        // this.organizacion = obj;
        this.organizacion.id = obj.id;
        this.organizacion.vRucneg = obj.vRucneg;
        this.organizacion.vRazonsoc = obj.vRazonsoc;
        this.organizacion.vAmbsubje = obj.vAmbsubje;
        this.organizacion.vEtapaneg = obj.vEtapaneg;
        this.organizacion.tFecvigde = obj.tFecvigde;
        this.organizacion.tFecvigha = obj.tFecvigha;
        this.organizacion.vTipongco = obj.vTipongco;
        this.organizacion.vCodAmbsu = obj.vCodAmbsu;
        this.organizacion.vCodEtapa = obj.vCodEtapa;
        this.organizacion.vRegistro = obj.vRegistro;

        this.selectedAmbitoRegistro.value = obj.vCodAmbsu;
        this.selectedEtapaRegistro.value = obj.vCodEtapa;
        this.selectedAmbitoRegistro.name = obj.vAmbsubje;
        this.selectedEtapaRegistro.name = obj.vEtapaneg;

        this.editar = true;
        this.block = true;
        this.displayOrganizacion = true;
    }
    eliminarOrganizacion(obj: Negocolect) {
        this.organizaciones.splice(this.organizaciones.indexOf(obj), 1);
    }
    validarOrganizacion(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.organizacion.vRucneg === undefined || this.organizacion.vRucneg === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de RUC.' });
            error = false;
        } else if (this.organizacion.vRazonsoc === undefined || this.organizacion.vRazonsoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la Razón Social.' });
            error = false;
        } else if (this.organizacion.vRegistro === undefined || this.organizacion.vRegistro === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de Registro.' });
            error = false;
        } else if (this.selectedAmbitoRegistro === undefined || this.selectedAmbitoRegistro === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el Ámbito Subjetivo.' });
            error = false;
        } else if (this.selectedEtapaRegistro === undefined || this.selectedEtapaRegistro === null) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar la Etapa de la Negociación.' });
            error = false;
        } else if (this.organizacion.tFecvigde === undefined || this.organizacion.tFecvigde === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la Fecha de Vigencia desde.' });
            error = false;
        } else if (this.organizacion.tFecvigha === undefined || this.organizacion.tFecvigha === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la Fecha de Vigencia hasta.' });
            error = false;
        } else if (this.organizacion.tFecvigde > this.organizacion.tFecvigha) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'La fecha de Vigencia inicial no debe ser mayor a la fecha de Vigencia final' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    asignarAmbito() {
        this.organizacion.vCodAmbsu = this.selectedAmbitoRegistro.value;
        this.organizacion.vAmbsubje = this.selectedAmbitoRegistro.name;
    }

    asignarEtapa() {
        this.organizacion.vCodEtapa = this.selectedEtapaRegistro.value;
        this.organizacion.vEtapaneg = this.selectedEtapaRegistro.name;
    }

    buscarRazonSocial() {
        this.messageList = [];
        this.messagesForm = [];
        this.empresa = new Empresa;
        if (this.organizacion.vRucneg !== undefined && this.organizacion.vRucneg !== null && this.organizacion.vRucneg !== '') {
            this.formularioPerfilService.obtenerDatosGenerales(this.organizacion.vRucneg)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.empresa = <Empresa>res.json[0];
                    if (this.empresa.ddp_nombre !== undefined && this.empresa.ddp_nombre !== null) {
                        this.organizacion.vRazonsoc = this.empresa.ddp_nombre;
                    } else {
                        this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron datos con el RUC ' + this.organizacion.vRucneg + '.' });
                        this.onErrorMultiple(this.messageList);
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el Ruc de la Organizacion Sindical.' });
            this.onErrorMultiple(this.messageList);
        }
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

    ngOnDestroy() { }
}
