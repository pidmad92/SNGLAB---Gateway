import { Component, OnInit, OnDestroy, } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { ComboModel } from '../../general/combobox.model';
import { Message } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { FormularioFinancieroService } from './index';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Formperfil } from '../../../entities/formperfil/index';
import { Solicform } from '../../../entities/solicform/index';
import { Solicitud } from '../../../entities/solicitud/index';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Anexo1A } from './anexo1a.model';
import { Componente } from './componente.model';
import { Ventas } from './ventas.model';

@Component({
    selector: 'jhi-formulario-financiero-anexo1a',
    templateUrl: './formulario-financiero-anexo1a.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroAnexo1AComponent implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editarNacional: boolean;
    editarInternacional: boolean;
    displayNacional: boolean;
    displayInternacional: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formulario: Anexo1A;
    constantes: Constants;
    ventasNacionales: Ventas;
    ventasInternacionales: Ventas;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private formularioLaboralService: FormularioFinancieroService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
    ) { }

    loadAll() {
        this.displayNacional = false;
        this.displayInternacional = false;
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    ngOnInit() {
        this.inicializarVariables();
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    inicializarVariables() {
        this.constantes = new Constants();
        const fechaReg = this.datepipe.transform(this.solicitud.tFecreg, 'yyyy');
        const fecha: number = Number(fechaReg);
        this.formulario = new Anexo1A();
        this.ventasNacionales = new Ventas();
        this.ventasInternacionales = new Ventas();
        this.anios = Array<number>();
        this.anios.push(fecha - 3);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.anios.push(fecha);
        this.construirFormulario();
    }

    load(nCodfperf) {}
    // Nacional ----------------------------
    mostrarDialogNacional() {
        this.ventasNacionales = new Ventas();
        this.displayNacional = true;
        this.editarNacional = false;
    }

    cancelarModalNacional() {
        this.ventasNacionales = new Ventas();
        this.displayNacional = false;
        this.editarNacional = false;
    }

    guardarModalNacional() {
        const t = new Tabla();
        if (!this.editarNacional) {
            this.ventasNacionales.id = this.formulario.listaNacional.length;
        }

        t.id = this.ventasNacionales.id;
        t.descripcion = this.ventasNacionales.producto;
        t.unidadmedida = this.ventasNacionales.unidadMedida;

        t.componentes = new Array<Componente>();
        t.componentes[0] = new Componente();
        t.componentes[0].cantidad = Number(this.ventasNacionales.anioAvolumenfisico);

        t.componentes[1] = new Componente();
        t.componentes[1].cantidad = Number(this.ventasNacionales.anioApromedio);

        t.componentes[2] = new Componente();
        t.componentes[2].cantidad = Number(this.ventasNacionales.anioAvolumenfisico) + Number(this.ventasNacionales.anioApromedio);

        t.componentes[3] = new Componente();
        t.componentes[3].cantidad = Number(this.ventasNacionales.anioBvolumenfisico);

        t.componentes[4] = new Componente();
        t.componentes[4].cantidad = Number(this.ventasNacionales.anioBpromedio);

        t.componentes[5] = new Componente();
        t.componentes[5].cantidad = Number(this.ventasNacionales.anioBvolumenfisico)  + Number(this.ventasNacionales.anioBpromedio);

        t.componentes[6] = new Componente();
        t.componentes[6].cantidad = Number(this.ventasNacionales.anioCvolumenfisico);

        t.componentes[7] = new Componente();
        t.componentes[7].cantidad = Number(this.ventasNacionales.anioCpromedio);

        t.componentes[8] = new Componente();
        t.componentes[8].cantidad = Number(this.ventasNacionales.anioCvolumenfisico)  + Number(this.ventasNacionales.anioCpromedio);

        t.componentes[9] = new Componente();
        t.componentes[9].cantidad = Number(this.ventasNacionales.anioDvolumenfisico);

        t.componentes[10] = new Componente();
        t.componentes[10].cantidad = Number(this.ventasNacionales.anioDpromedio);

        t.componentes[11] = new Componente();
        t.componentes[11].cantidad = Number(this.ventasNacionales.anioDvolumenfisico)  + Number(this.ventasNacionales.anioDpromedio);

        if (this.editarNacional) {
            const bean: Tabla = this.formulario.listaNacional.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaNacional.indexOf(bean);
                this.formulario.listaNacional[index] = t;
            }
        } else {
            this.formulario.listaNacional.push(t);
        }

        this.actualizarSubtotalNacional();

        this.ventasNacionales = new Ventas();
        this.displayNacional = false;
        this.editarNacional = false;
    }

    actualizarSubtotalNacional() {

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        let suma5 = 0;
        let suma6 = 0;
        let suma7 = 0;
        let suma8 = 0;
        let suma9 = 0;
        let suma10 = 0;
        let suma11 = 0;
        let suma12 = 0;

        for (let i = 0; i < this.formulario.listaNacional.length; i++) {
            for (let j = 0; j < this.formulario.listaNacional[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 1: suma2 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 2: suma3 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 3: suma4 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 4: suma5 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 5: suma6 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 6: suma7 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 7: suma8 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 8: suma9 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 9: suma10 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 10: suma11 += this.formulario.listaNacional[i].componentes[j].cantidad; break;
                    case 11: suma12 += this.formulario.listaNacional[i].componentes[j].cantidad; break;

                }
            }
        }

        this.formulario.subtotalNacional[0].componentes[0].cantidad = suma1;
        this.formulario.subtotalNacional[0].componentes[1].cantidad = suma2;
        this.formulario.subtotalNacional[0].componentes[2].cantidad = suma3;
        this.formulario.subtotalNacional[1].componentes[0].cantidad = suma4;
        this.formulario.subtotalNacional[1].componentes[1].cantidad = suma5;
        this.formulario.subtotalNacional[1].componentes[2].cantidad = suma6;
        this.formulario.subtotalNacional[2].componentes[0].cantidad = suma7;
        this.formulario.subtotalNacional[2].componentes[1].cantidad = suma8;
        this.formulario.subtotalNacional[2].componentes[2].cantidad = suma9;
        this.formulario.subtotalNacional[3].componentes[0].cantidad = suma10;
        this.formulario.subtotalNacional[3].componentes[1].cantidad = suma11;
        this.formulario.subtotalNacional[3].componentes[2].cantidad = suma12;
        this.actualizarTotal();
    }

    editarComponenteNacional(tabla: Tabla) {
        this.ventasNacionales = new Ventas();

        this.ventasNacionales.id = tabla.id;
        this.ventasNacionales.producto = tabla.descripcion;
        this.ventasNacionales.unidadMedida = tabla.unidadmedida;
        this.ventasNacionales.anioAvolumenfisico = tabla.componentes[0].cantidad;
        this.ventasNacionales.anioApromedio = tabla.componentes[1].cantidad;
        this.ventasNacionales.anioBvolumenfisico = tabla.componentes[3].cantidad;
        this.ventasNacionales.anioBpromedio = tabla.componentes[4].cantidad;
        this.ventasNacionales.anioCvolumenfisico = tabla.componentes[6].cantidad;
        this.ventasNacionales.anioCpromedio = tabla.componentes[7].cantidad;
        this.ventasNacionales.anioDvolumenfisico = tabla.componentes[9].cantidad;
        this.ventasNacionales.anioDpromedio = tabla.componentes[10].cantidad;

        this.displayNacional = true;
        this.editarNacional = true;
    }

    eliminarComponenteNacional(tabla: Tabla) {
        const t = this.formulario.listaNacional.splice(this.formulario.listaNacional.indexOf(tabla), 1);
        this.actualizarSubtotalNacional();
    }

    // Internacional ------------------------

    mostrarDialogInternacional() {
        this.ventasInternacionales = new Ventas();
        this.displayInternacional = true;
        this.editarInternacional = false;
    }

    cancelarModalInternacional() {
        this.ventasInternacionales = new Ventas();
        this.displayInternacional = false;
        this.editarInternacional = false;
    }

    guardarModalInternacional() {
        const t = new Tabla();
        if (!this.editarInternacional) {
            this.ventasInternacionales.id = this.formulario.listaInternacional.length;
        }

        t.id = this.ventasInternacionales.id;
        t.descripcion = this.ventasInternacionales.producto;
        t.unidadmedida = this.ventasInternacionales.unidadMedida;

        t.componentes = new Array<Componente>();
        t.componentes[0] = new Componente();
        t.componentes[0].cantidad = Number(this.ventasInternacionales.anioAvolumenfisico);

        t.componentes[1] = new Componente();
        t.componentes[1].cantidad = Number(this.ventasInternacionales.anioApromedio);

        t.componentes[2] = new Componente();
        t.componentes[2].cantidad = Number(this.ventasInternacionales.anioAvolumenfisico) + Number(this.ventasInternacionales.anioApromedio);

        t.componentes[3] = new Componente();
        t.componentes[3].cantidad = Number(this.ventasInternacionales.anioBvolumenfisico);

        t.componentes[4] = new Componente();
        t.componentes[4].cantidad = Number(this.ventasInternacionales.anioBpromedio);

        t.componentes[5] = new Componente();
        t.componentes[5].cantidad = Number(this.ventasInternacionales.anioBvolumenfisico)  + Number(this.ventasInternacionales.anioBpromedio);

        t.componentes[6] = new Componente();
        t.componentes[6].cantidad = Number(this.ventasInternacionales.anioCvolumenfisico);

        t.componentes[7] = new Componente();
        t.componentes[7].cantidad = Number(this.ventasInternacionales.anioCpromedio);

        t.componentes[8] = new Componente();
        t.componentes[8].cantidad = Number(this.ventasInternacionales.anioCvolumenfisico)  + Number(this.ventasInternacionales.anioCpromedio);

        t.componentes[9] = new Componente();
        t.componentes[9].cantidad = Number(this.ventasInternacionales.anioDvolumenfisico);

        t.componentes[10] = new Componente();
        t.componentes[10].cantidad = Number(this.ventasInternacionales.anioDpromedio);

        t.componentes[11] = new Componente();
        t.componentes[11].cantidad = Number(this.ventasInternacionales.anioDvolumenfisico)  + Number(this.ventasInternacionales.anioDpromedio);

        if (this.editarInternacional) {
            const bean: Tabla = this.formulario.listaInternacional.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaInternacional.indexOf(bean);
                this.formulario.listaInternacional[index] = t;
            }
        } else {
            this.formulario.listaInternacional.push(t);
        }

        this.actualizarSubtotalInternacional();

        this.ventasInternacionales = new Ventas();
        this.displayInternacional = false;
        this.editarInternacional = false;
    }

    actualizarSubtotalInternacional() {

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        let suma5 = 0;
        let suma6 = 0;
        let suma7 = 0;
        let suma8 = 0;
        let suma9 = 0;
        let suma10 = 0;
        let suma11 = 0;
        let suma12 = 0;

        for (let i = 0; i < this.formulario.listaInternacional.length; i++) {
            for (let j = 0; j < this.formulario.listaInternacional[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 1: suma2 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 2: suma3 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 3: suma4 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 4: suma5 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 5: suma6 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 6: suma7 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 7: suma8 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 8: suma9 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 9: suma10 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 10: suma11 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;
                    case 11: suma12 += this.formulario.listaInternacional[i].componentes[j].cantidad; break;

                }
            }
        }

        this.formulario.subtotalInternacional[0].componentes[0].cantidad = suma1;
        this.formulario.subtotalInternacional[0].componentes[1].cantidad = suma2;
        this.formulario.subtotalInternacional[0].componentes[2].cantidad = suma3;
        this.formulario.subtotalInternacional[1].componentes[0].cantidad = suma4;
        this.formulario.subtotalInternacional[1].componentes[1].cantidad = suma5;
        this.formulario.subtotalInternacional[1].componentes[2].cantidad = suma6;
        this.formulario.subtotalInternacional[2].componentes[0].cantidad = suma7;
        this.formulario.subtotalInternacional[2].componentes[1].cantidad = suma8;
        this.formulario.subtotalInternacional[2].componentes[2].cantidad = suma9;
        this.formulario.subtotalInternacional[3].componentes[0].cantidad = suma10;
        this.formulario.subtotalInternacional[3].componentes[1].cantidad = suma11;
        this.formulario.subtotalInternacional[3].componentes[2].cantidad = suma12;
        this.actualizarTotal();
    }

    editarComponenteInternacional(tabla: Tabla) {
        this.ventasInternacionales = new Ventas();

        this.ventasInternacionales.id = tabla.id;
        this.ventasInternacionales.producto = tabla.descripcion;
        this.ventasInternacionales.unidadMedida = tabla.unidadmedida;
        this.ventasInternacionales.anioAvolumenfisico = tabla.componentes[0].cantidad;
        this.ventasInternacionales.anioApromedio = tabla.componentes[1].cantidad;
        this.ventasInternacionales.anioBvolumenfisico = tabla.componentes[3].cantidad;
        this.ventasInternacionales.anioBpromedio = tabla.componentes[4].cantidad;
        this.ventasInternacionales.anioCvolumenfisico = tabla.componentes[6].cantidad;
        this.ventasInternacionales.anioCpromedio = tabla.componentes[7].cantidad;
        this.ventasInternacionales.anioDvolumenfisico = tabla.componentes[9].cantidad;
        this.ventasInternacionales.anioDpromedio = tabla.componentes[10].cantidad;

        this.displayInternacional = true;
        this.editarInternacional = true;
    }

    eliminarComponenteInternacional(tabla: Tabla) {
        const t = this.formulario.listaInternacional.splice(this.formulario.listaInternacional.indexOf(tabla), 1);
        this.actualizarSubtotalInternacional();
    }

    actualizarTotal() {
        this.formulario.ingresoTotal[0].componentes[0].cantidad = this.formulario.subtotalInternacional[0].componentes[2].cantidad
                                                                + this.formulario.subtotalNacional[0].componentes[2].cantidad;
        this.formulario.ingresoTotal[0].componentes[1].cantidad = this.formulario.subtotalInternacional[1].componentes[2].cantidad
                                                                + this.formulario.subtotalNacional[1].componentes[2].cantidad;
        this.formulario.ingresoTotal[0].componentes[2].cantidad = this.formulario.subtotalInternacional[2].componentes[2].cantidad
                                                                + this.formulario.subtotalNacional[2].componentes[2].cantidad;
        this.formulario.ingresoTotal[0].componentes[3].cantidad = this.formulario.subtotalInternacional[3].componentes[2].cantidad
                                                                + this.formulario.subtotalNacional[3].componentes[2].cantidad;
    }
    // ---------------------------------------
    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    // ---------------------------------------
    construirFormulario() {
        const anxNacCod: string[] = [this.constantes.FORM1ANEX1A_COD_NAC_VOLUMEN_FISICO,
                                    this.constantes.FORM1ANEX1A_COD_NAC_PRECIO_PROMEDIO,
                                    this.constantes.FORM1ANEX1A_COD_NAC_INGRESOS];
        const anxIntCod: string[] = [this.constantes.FORM1ANEX1A_COD_INT_VOLUMEN_FISICO,
                                    this.constantes.FORM1ANEX1A_COD_INT_PRECIO_PROMEDIO,
                                    this.constantes.FORM1ANEX1A_COD_INT_INGRESOS];

        this.formulario.listaNacional = new Array<Tabla>();
        this.formulario.listaInternacional = new Array<Tabla>();
        this.formulario.subtotalNacional = new Array<Tabla>();
        this.formulario.subtotalInternacional = new Array<Tabla>();
        for (let i = 0; i < this.anios.length; i++) {
            this.formulario.subtotalNacional[i] = new Tabla();
            this.formulario.subtotalNacional[i].componentes = new Array<Componente>();

            this.formulario.subtotalInternacional[i] = new Tabla();
            this.formulario.subtotalInternacional[i].componentes = new Array<Componente>();

            for (let j = 0; j < anxNacCod.length; j++) {
                this.formulario.subtotalNacional[i].componentes[j] = new Componente();
                this.formulario.subtotalNacional[i].componentes[j].cantidad = 0;
                this.formulario.subtotalNacional[i].componentes[j].codigo = anxNacCod[j] + '_subtotal_' + i + this.anios[i];
            }

            for (let j = 0; j < anxIntCod.length; j++) {
                this.formulario.subtotalInternacional[i].componentes[j] = new Componente();
                this.formulario.subtotalInternacional[i].componentes[j].cantidad = 0;
                this.formulario.subtotalInternacional[i].componentes[j].codigo = anxIntCod[j] + '_subtotal_' + i + this.anios[i];
            }

        }
        this.formulario.ingresoTotal = new Array<Tabla>();
        this.formulario.ingresoTotal[0] = new Tabla();
        this.formulario.ingresoTotal[0].componentes = new Array<Componente>();
        this.formulario.ingresoTotal[0].componentes[0] = new Componente();
        this.formulario.ingresoTotal[0].componentes[0].cantidad = 0;
        this.formulario.ingresoTotal[0].componentes[1] = new Componente();
        this.formulario.ingresoTotal[0].componentes[1].cantidad = 0;
        this.formulario.ingresoTotal[0].componentes[2] = new Componente();
        this.formulario.ingresoTotal[0].componentes[2].cantidad = 0;
        this.formulario.ingresoTotal[0].componentes[3] = new Componente();
        this.formulario.ingresoTotal[0].componentes[3].cantidad = 0;

    }

    // --------------------------- Errores ------------------------------------
    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    guardarFormulario() {
        this.verControlInformacion();
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
