import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup, AbstractControl, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
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
import { FormularioPerfilService } from './index';
import { ComboModel } from '../../general/combobox.model';
import { Formulario } from './formulario.model';
import { Contrato } from './contrato.model';
import { Componente } from './componente.model';
import { PerreglabService } from '../../../entities/perreglab/index';
import { SimpleChange } from '@angular/core/src/change_detection/change_detection_util';

@Component({
    selector: 'jhi-formulario-perfil6',
    templateUrl: './formulario-perfil6.component.html',
    styleUrls: ['formulario-perfil.scss'],
})

export class FormularioPerfil6Component implements OnInit, OnDestroy, AfterViewChecked {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;
    changeLog: string[] = [];

    // Variables de edicion y bloqueo
    block: boolean;
    editar: boolean;
    flgdecreto: boolean;

    // Flag de Modals
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

    @LocalStorage('inicio')
    inicio: boolean;
    init: boolean;

    anios: number[];
    selectTab: number;
    completeForm: FormGroup;
    cant: number;

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
        private fb: FormBuilder,
    ) {
        this.completeForm = this.fb.group({
            'name': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.selectTab = 0;
        this.init = true;
        this.cant = 0;
        this.loadAll();
        this.displayGuardar = false;
        const fechaReg = this.datepipe.transform(this.solicitud.tFecreg, 'yyyy');
        const fecha: number = Number(fechaReg);
        this.anios = Array<number>();
        this.anios.push(fecha);
        this.anios.push(fecha - 1);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 3);
        this.flgdecreto = false;
        if (this.selectedRegimen !== undefined && this.selectedRegimen !== null && this.selectedRegimen.length > 0) {
            for (const regimen of this.selectedRegimen) {
                if (regimen.value === '1') {
                    this.flgdecreto = true;
                    break;
                }
            }
            this.construirFormulario();
        } else {
            this.formulario = new Array<Formulario>();
            this.completeForm.reset();
            this.completeForm = this.fb.group({
                'name': ['', Validators.required]
            });
        }
    }

    ngAfterViewChecked(): void {
        this.cant++;
        if (this.init && this.cant === 588) {
                setTimeout(this.inflate());
            this.init = false;
        }
    }

    inflate() {
        for (let i = 0; i < this.formulario.length; i++) {
            let suma2 = 0
            for (let j = 0; j < this.formulario[i].listaContrataDirecta[7].componentes.length; j++) {
                suma2 += this.formulario[i].listaContrataDirecta[7].componentes[j].cantidad;
            }
            this.formulario[i].totalDirecta = suma2;
            for (let j = 0; j < this.formulario[i].listaContrataIndirecta1.length - 1; j++) {
                this.formulario[i].totalIndirecta1 += this.formulario[i].listaContrataIndirecta1[j].componentes[0].cantidad;
            }
            for (let m = 0; m < this.formulario[i].listaContrataIndirecta2.length - 1; m++) {
                this.formulario[i].totalIndirecta2 += this.formulario[i].listaContrataIndirecta2[m].componentes[0].cantidad;
            }
            for (let l = 0; l < this.formulario[i].listaContrataNoLaboral.length - 1; l++) {
                this.formulario[i].totalNoLaboral += this.formulario[i].listaContrataNoLaboral[l].componentes[0].cantidad;
            }

            this.formulario[i].totalIndirecta = this.formulario[i].totalIndirecta1 + this.formulario[i].totalIndirecta2;
            this.formulario[i].total = this.formulario[i].totalDirecta +
                this.formulario[i].totalIndirecta1 +
                this.formulario[i].totalIndirecta2 +
                this.formulario[i].totalNoLaboral;
        }
    }

    construirFormulario() {
        this.formulario = new Array<Formulario>();
        for (let k = 0; k < this.anios.length; k++) {
            this.formulario[k] = new Formulario();
            this.formulario[k].anio = this.anios[k];
            this.formulario[k].total = 0;
            this.formulario[k].totalDirecta = 0;
            this.formulario[k].totalIndirecta1 = 0;
            this.formulario[k].totalIndirecta2 = 0;
            this.formulario[k].totalNoLaboral = 0;
            this.formulario[k].listaContrataDirecta = new Array<Contrato>();
            const desc: string[] = ['EMPLEADOS DE DIRECCIÓN',
                'EMPLEADOS DE CONFIANZA',
                'EMPLEADOS',
                'EMPLEADOS A TIEMPO PARCIAL',
                'OBREROS',
                'OBREROS A TIEMPO PARCIAL',
                'TELETRABAJO',
                'TOTAL CONTRATACIÓN LABORAL DIRECTA'];
            const descAbrev: string[] = ['empd',
                'empc',
                'emp',
                'emptp',
                'obr',
                'obrtp',
                'tele',
                'total'];
            this.formulario[k].listaContrataDirecta = this.construirContratacion(desc, descAbrev, k, true, 'DI');

            const descIndirecta1: string[] = ['EMPLEADOS',
                'OBREROS',
                'SUBTOTAL'];
            const descAbrevIndirecta1: string[] = ['empind1',
                'obrind1',
                'subind1'];
            this.formulario[k].listaContrataIndirecta1 = this.construirContratacion(descIndirecta1, descAbrevIndirecta1, k, false, 'I1');

            const descIndirecta2: string[] = ['EMPLEADOS',
                'OBREROS',
                'SUBTOTAL'];
            const descAbrevIndirecta2: string[] = ['empind2',
                'obrind2',
                'subind2'];
            this.formulario[k].listaContrataIndirecta2 = this.construirContratacion(descIndirecta2, descAbrevIndirecta2, k, false, 'I2');

            const descNoLaboral: string[] = ['PRACTICANTES',
                'LOCADORES DE SERVICIOS',
                'TOTAL CONTRATACIÓN NO LABORAL'];
            const descAbrevNoLaboral: string[] = ['pracnolab',
                'locanolab',
                'totalnolab'];
            this.formulario[k].listaContrataNoLaboral = this.construirContratacion(descNoLaboral, descAbrevNoLaboral, k, false, 'NL');
        }
    }

    construirContratacion(desc: string[], descAbrev: string[], k: number, isDirecta: boolean, tipo: string): Contrato[] {
        const contratos = new Array<Contrato>();
        for (let j = 0; j < desc.length; j++) {
            const form = new Contrato();
            form.anio = this.anios[k];
            form.componentes = new Array<Componente>();
            form.descripcion = desc[j];
            if (isDirecta) {
                for (let i = 0; i < this.selectedRegimen.length; i++) {
                    // form.declegal = this.selectedRegimen[i].value;
                    form.componentes[i] = new Componente();
                    form.componentes[i].componente = descAbrev[j] + '_' + i + '_' + this.anios[k];
                    form.componentes[i].declegal = this.selectedRegimen[i].value;
                    if (j === desc.length - 1) {
                        form.componentes[i].cantidad = 0;
                    } else {
                        form.componentes[i].cantidad = 0;
                        const fc: FormControl = new FormControl();
                        this.completeForm.addControl(descAbrev[j] + '_' + i + '_' + this.anios[k], new FormControl);
                        this.completeForm.controls[descAbrev[j] + '_' + i + '_' + this.anios[k]].setValue(0);
                    }
                    this.anexlaboralService.obtenerDatosAnexo(form.anio, tipo, form.componentes[i].declegal, form.componentes[i].componente).subscribe(
                        (anexo) => {
                            if (anexo !== undefined && anexo !== null) {
                                form.componentes[i].cantidad = anexo.nCantlabo;
                                form.codigo = anexo.nCodanexo;
                                if (j !== desc.length - 1) {
                                    this.completeForm.controls[descAbrev[j] + '_' + i + '_' + this.anios[k]].setValue(anexo.nCantlabo);
                                }
                            }
                        },
                    );
                }
            } else {
                // form.componentes.push(descAbrev[j] + '_0_' + this.anios[k]);
                form.componentes[0] = new Componente();
                form.componentes[0].componente = descAbrev[j] + '_0_' + this.anios[k];
                if (j === desc.length - 1) {
                    form.componentes[0].cantidad = 0;
                } else {
                    form.componentes[0].cantidad = 0;
                    const fc: FormControl = new FormControl();
                    this.completeForm.addControl(descAbrev[j] + '_0_' + this.anios[k], new FormControl);
                    this.completeForm.controls[descAbrev[j] + '_0_' + this.anios[k]].setValue(0);
                }
                this.anexlaboralService.obtenerDatosAnexo(form.anio, tipo, 'NA', form.componentes[0].componente).subscribe(
                    (anexo) => {
                        if (anexo !== undefined && anexo !== null) {
                            form.codigo = anexo.nCodanexo;
                            form.componentes[0].cantidad = anexo.nCantlabo;
                            if (j !== desc.length - 1) {
                                this.completeForm.controls[descAbrev[j] + '_0_' + this.anios[k]].setValue(anexo.nCantlabo);
                            }
                        }
                    },
                );
            }
            contratos.push(form);
        }
        return contratos;
    }

    keyUpDirecta(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma = 0;
        let nomComponente: string;
        for (let j = 0; j < 7; j++) {
            switch (j) {
                case 0: nomComponente = 'empd'; break;
                case 1: nomComponente = 'empc'; break;
                case 2: nomComponente = 'emp'; break;
                case 3: nomComponente = 'emptp'; break;
                case 4: nomComponente = 'obr'; break;
                case 5: nomComponente = 'obrtp'; break;
                case 6: nomComponente = 'tele'; break;
            }
            suma = suma + Number(this.completeForm.controls[nomComponente + '_' + columna[1] + '_' + columna[2]].value)
        }

        loop:
        for (let a = 0; a < this.formulario.length; a++) {
            if (this.formulario[a].anio === Number(columna[2])) {
                for (let b = 0; b < this.formulario[a].listaContrataDirecta.length; b++) {
                    for (let c = 0; c < this.formulario[a].listaContrataDirecta[b].componentes.length; c++) {
                        if (this.formulario[a].listaContrataDirecta[b].componentes[c].componente === event.target.id) {
                            this.formulario[a].listaContrataDirecta[b].componentes[c].cantidad = Number(event.target.value);
                            break loop;
                        }
                    }
                }
            }
        }

        for (let i = 0; i < this.formulario.length; i++) {
            if (this.formulario[i].anio === Number(columna[2])) {
                this.formulario[i].listaContrataDirecta[7].componentes[Number(columna[1])].cantidad = suma;
            }
            let suma2 = 0
            for (let j = 0; j < this.formulario[i].listaContrataDirecta[7].componentes.length; j++) {
                suma2 += this.formulario[i].listaContrataDirecta[7].componentes[j].cantidad;
            }
            this.formulario[i].totalDirecta = suma2;
            this.formulario[i].total = this.formulario[i].totalDirecta +
                this.formulario[i].totalIndirecta1 +
                this.formulario[i].totalIndirecta2 +
                this.formulario[i].totalNoLaboral;
        }
    }

    keyUpIndirecta1(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma = 0;
        let nomComponente: string;
        for (let j = 0; j < 3; j++) {
            switch (j) {
                case 0: nomComponente = 'empind1'; break;
                case 1: nomComponente = 'obrind1'; break;
            }
            suma = suma + Number(this.completeForm.controls[nomComponente + '_0_' + columna[2]].value)
        }
        for (let a = 0; a < this.formulario.length; a++) {
            if (this.formulario[a].anio === Number(columna[2])) {
                for (let b = 0; b < this.formulario[a].listaContrataIndirecta1.length; b++) {
                    for (let c = 0; c < this.formulario[a].listaContrataIndirecta1[b].componentes.length; c++) {
                        if (this.formulario[a].listaContrataIndirecta1[b].componentes[c].componente === event.target.id) {
                            this.formulario[a].listaContrataIndirecta1[b].componentes[c].cantidad = Number(event.target.value);
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.formulario.length; i++) {
            if (this.formulario[i].anio === Number(columna[2])) {
                this.formulario[i].totalIndirecta1 = suma;
            }
            this.formulario[i].totalIndirecta = this.formulario[i].totalIndirecta1 + this.formulario[i].totalIndirecta2;
            this.formulario[i].total = this.formulario[i].totalDirecta +
                this.formulario[i].totalIndirecta1 +
                this.formulario[i].totalIndirecta2 +
                this.formulario[i].totalNoLaboral;
        }
    }

    keyUpIndirecta2(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma = 0;
        let nomComponente: string;
        for (let j = 0; j < 2; j++) {
            switch (j) {
                case 0: nomComponente = 'empind2'; break;
                case 1: nomComponente = 'obrind2'; break;
            }
            suma = suma + Number(this.completeForm.controls[nomComponente + '_0_' + columna[2]].value)
        }
        for (let a = 0; a < this.formulario.length; a++) {
            if (this.formulario[a].anio === Number(columna[2])) {
                for (let b = 0; b < this.formulario[a].listaContrataIndirecta2.length; b++) {
                    for (let c = 0; c < this.formulario[a].listaContrataIndirecta2[b].componentes.length; c++) {
                        if (this.formulario[a].listaContrataIndirecta2[b].componentes[c].componente === event.target.id) {
                            this.formulario[a].listaContrataIndirecta2[b].componentes[c].cantidad = Number(event.target.value);
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.formulario.length; i++) {
            if (this.formulario[i].anio === Number(columna[2])) {
                this.formulario[i].totalIndirecta2 = suma;
            }
            this.formulario[i].totalIndirecta = this.formulario[i].totalIndirecta1 + this.formulario[i].totalIndirecta2;
            this.formulario[i].total = this.formulario[i].totalDirecta +
                this.formulario[i].totalIndirecta1 +
                this.formulario[i].totalIndirecta2 +
                this.formulario[i].totalNoLaboral;
        }
    }

    keyUpNoLaboral(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma = 0;
        let nomComponente: string;
        for (let j = 0; j < 2; j++) {
            switch (j) {
                case 0: nomComponente = 'pracnolab'; break;
                case 1: nomComponente = 'locanolab'; break;
            }
            suma = suma + Number(this.completeForm.controls[nomComponente + '_0_' + columna[2]].value)
        }
        for (let a = 0; a < this.formulario.length; a++) {
            if (this.formulario[a].anio === Number(columna[2])) {
                for (let b = 0; b < this.formulario[a].listaContrataNoLaboral.length; b++) {
                    for (let c = 0; c < this.formulario[a].listaContrataNoLaboral[b].componentes.length; c++) {
                        if (this.formulario[a].listaContrataNoLaboral[b].componentes[c].componente === event.target.id) {
                            this.formulario[a].listaContrataNoLaboral[b].componentes[c].cantidad = Number(event.target.value);
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.formulario.length; i++) {
            if (this.formulario[i].anio === Number(columna[2])) {
                this.formulario[i].totalNoLaboral = suma;
            }
            this.formulario[i].total = this.formulario[i].totalDirecta +
                this.formulario[i].totalIndirecta1 +
                this.formulario[i].totalIndirecta2 +
                this.formulario[i].totalNoLaboral;
        }
    }

    ngOnDestroy() { }

    loadAll() { }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
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
