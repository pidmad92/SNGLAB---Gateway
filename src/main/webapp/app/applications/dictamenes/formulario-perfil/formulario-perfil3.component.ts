import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicformService, Solicform } from '../../../entities/solicform/index';
import { FormperfilService, Formperfil } from '../../../entities/formperfil/index';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { SessionStorage } from 'ng2-webstorage';
import { Direccion } from '../../../entities/direccion/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Participa } from '../../../entities/participa/index';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { Message } from 'primeng/components/common/api';
import { ComboModel } from '../../general/combobox.model';

@Component({
    selector: 'jhi-formulario-perfil3',
    templateUrl: './formulario-perfil3.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil3Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;

    // Flag de Modals
    displayOrganizacion: boolean;

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

    // Organizacion
    organizacion: Negocolect;

    // Combos
    ambito: ComboModel[];
    selectedAmbito: ComboModel;
    selectedAmbitoRegistro: ComboModel;

    etapa: ComboModel[];
    selectedEtapa: ComboModel;
    selectedEtapaRegistro: ComboModel;

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
        private negocolectService: NegocolectService,
    ) { }

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

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {
        if (this.solicitante === undefined || this.solicitante === null) {
            this.negocolectService.obtenerNegociacionSolicitante(nCodfperf, 'S').subscribe((solicitante) =>
                this.solicitante = solicitante,
            );
        }
        if (this.organizaciones === undefined || this.organizaciones.length === 0) {
            this.negocolectService.obtenerNegociacion(nCodfperf, 'O').subscribe(
                (res: ResponseWrapper) => this.organizaciones = res.json,
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
    }

    ngOnInit() {
        this.loadAll();

        // Iniciar Combos
        this.ambito = [];
        this.ambito.push(new ComboModel('Empleados de Confianza', 'EC', 0));
        this.ambito.push(new ComboModel('Empleados', 'EM', 0));
        this.ambito.push(new ComboModel('Obreros', 'OB', 0));

        if (this.selectedAmbito === undefined || this.selectedAmbito === null) {
            this.selectedAmbito = this.ambito[0];
            this.selectedAmbitoRegistro = this.ambito[0];
        }

        // Iniciar Combos
        this.etapa = [];
        this.etapa.push(new ComboModel('Trato Directo', 'TD', 0));
        this.etapa.push(new ComboModel('Conciliación', 'CO', 0));
        this.etapa.push(new ComboModel('Mediación', 'ME', 0));
        this.etapa.push(new ComboModel('Extraproceso', 'EX', 0));
        this.etapa.push(new ComboModel('Arbitraje', 'AR', 0));

        if (this.selectedEtapa === undefined || this.selectedEtapa === null) {
            this.selectedEtapa = this.etapa[0];
            this.selectedEtapaRegistro = this.etapa[0];
        }

        this.organizacion = new Negocolect;
        this.displayOrganizacion = false;
        this.editar = false;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
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
        this.router.navigate(['./dictamenes/formulario-perfil/1/' + this.solicForm.nCodfperf]);
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
