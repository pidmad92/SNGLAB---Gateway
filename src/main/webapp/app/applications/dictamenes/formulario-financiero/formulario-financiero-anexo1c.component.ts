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
import { Ventas } from './ventas.model';
import { Constants } from './constants';
import { Anexo1C } from './anexo1c.model';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancDetalleService } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-anexo1c',
    templateUrl: './formulario-financiero-anexo1c.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroAnexo1CComponent implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editarMPNacional: boolean;
    editarMPImportada: boolean;
    editarGastosFinancieros: boolean;
    editarGFImportada: boolean;

    displayMPNacional: boolean;
    displayMPImportada: boolean;
    displayGastosFinancieros: boolean;
    displayGFImportada: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formulario: Anexo1C;
    constantes: Constants;
    ventasMPNacionales: Ventas;
    ventasMPImportadas: Ventas;
    ventasGastosFinancieros: Ventas;

    nCodffina: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private formularioLaboralService: FormularioFinancieroService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
        private formfinancdetalleService: FormfinancDetalleService,
    ) { }

    loadAll() {
        this.displayMPNacional = false;
        this.displayMPImportada = false;
        this.displayGastosFinancieros = false;
        this.displayGFImportada = false;
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodffina']);
        });
    }

    ngOnInit() {
        this.loadAll();
        this.inicializarVariables();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    inicializarVariables() {
        this.constantes = new Constants();
        const fechaReg = this.datepipe.transform(this.solicitud.tFecreg, 'yyyy');
        const fecha: number = Number(fechaReg);
        this.ventasMPNacionales = new Ventas();
        this.ventasMPImportadas = new Ventas();
        this.ventasGastosFinancieros = new Ventas();
        this.anios = Array<number>();
        this.anios.push(fecha - 3);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.anios.push(fecha);
        this.construirFormulario();
    }

    load(nCodffina) {
        this.nCodffina = nCodffina;
    }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    // MP NACIONAL ----------------------------
    mostrarDialogMPNacional() {
        this.ventasMPNacionales = new Ventas();
        this.displayMPNacional = true;
        this.editarMPNacional = false;
    }

    cancelarModalMPNacional() {
        this.ventasMPNacionales = new Ventas();
        this.displayMPNacional = false;
        this.editarMPNacional = false;
    }

    guardarModalMPNacional() {
        const t = new Tabla();
        if (!this.editarMPNacional) {
            this.ventasMPNacionales.id = this.formulario.listaMPNacional.length;
        }

        t.id = this.ventasMPNacionales.id;
        t.descripcion = this.ventasMPNacionales.producto;
        t.unidadmedida = this.ventasMPNacionales.unidadMedida;

        t.componentes = new Array<Componente>();
        t.componentes[0] = new Componente();
        t.componentes[0].cantidad = Number(this.ventasMPNacionales.anioAvolumenfisico);

        t.componentes[1] = new Componente();
        t.componentes[1].cantidad = Number(this.ventasMPNacionales.anioApromedio);

        t.componentes[2] = new Componente();
        t.componentes[2].cantidad = Number(this.ventasMPNacionales.anioAvolumenfisico) + Number(this.ventasMPNacionales.anioApromedio);

        t.componentes[3] = new Componente();
        t.componentes[3].cantidad = Number(this.ventasMPNacionales.anioBvolumenfisico);

        t.componentes[4] = new Componente();
        t.componentes[4].cantidad = Number(this.ventasMPNacionales.anioBpromedio);

        t.componentes[5] = new Componente();
        t.componentes[5].cantidad = Number(this.ventasMPNacionales.anioBvolumenfisico) + Number(this.ventasMPNacionales.anioBpromedio);

        t.componentes[6] = new Componente();
        t.componentes[6].cantidad = Number(this.ventasMPNacionales.anioCvolumenfisico);

        t.componentes[7] = new Componente();
        t.componentes[7].cantidad = Number(this.ventasMPNacionales.anioCpromedio);

        t.componentes[8] = new Componente();
        t.componentes[8].cantidad = Number(this.ventasMPNacionales.anioCvolumenfisico) + Number(this.ventasMPNacionales.anioCpromedio);

        t.componentes[9] = new Componente();
        t.componentes[9].cantidad = Number(this.ventasMPNacionales.anioDvolumenfisico);

        t.componentes[10] = new Componente();
        t.componentes[10].cantidad = Number(this.ventasMPNacionales.anioDpromedio);

        t.componentes[11] = new Componente();
        t.componentes[11].cantidad = Number(this.ventasMPNacionales.anioDvolumenfisico) + Number(this.ventasMPNacionales.anioDpromedio);

        if (this.editarMPNacional) {
            const bean: Tabla = this.formulario.listaMPNacional.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaMPNacional.indexOf(bean);
                this.formulario.listaMPNacional[index] = t;
            }
        } else {
            this.formulario.listaMPNacional.push(t);
        }

        this.actualizarSubtotalMPNacional();

        this.ventasMPNacionales = new Ventas();
        this.displayMPNacional = false;
        this.editarMPNacional = false;
    }

    actualizarSubtotalMPNacional() {

        let multiplicacion1 = 0;
        let multiplicacion2 = 0;
        let multiplicacion3 = 0;
        let multiplicacion4 = 0;
        let multiplicacion5 = 0;
        let multiplicacion6 = 0;
        let multiplicacion7 = 0;
        let multiplicacion8 = 0;
        let multiplicacion9 = 0;
        let multiplicacion10 = 0;
        let multiplicacion11 = 0;
        let multiplicacion12 = 0;

        for (let i = 0; i < this.formulario.listaMPNacional.length; i++) {
            for (let j = 0; j < this.formulario.listaMPNacional[i].componentes.length; j++) {
                switch (j) {
                    case 0: multiplicacion1 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 1: multiplicacion2 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 2: multiplicacion3 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 3: multiplicacion4 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 4: multiplicacion5 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 5: multiplicacion6 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 6: multiplicacion7 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 7: multiplicacion8 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 8: multiplicacion9 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 9: multiplicacion10 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 10: multiplicacion11 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;
                    case 11: multiplicacion12 *= this.formulario.listaMPNacional[i].componentes[j].cantidad; break;

                }
            }
        }

        this.formulario.subtotalMPNacional[0].componentes[0].cantidad = multiplicacion1;
        this.formulario.subtotalMPNacional[0].componentes[1].cantidad = multiplicacion2;
        this.formulario.subtotalMPNacional[0].componentes[2].cantidad = multiplicacion3;
        this.formulario.subtotalMPNacional[1].componentes[0].cantidad = multiplicacion4;
        this.formulario.subtotalMPNacional[1].componentes[1].cantidad = multiplicacion5;
        this.formulario.subtotalMPNacional[1].componentes[2].cantidad = multiplicacion6;
        this.formulario.subtotalMPNacional[2].componentes[0].cantidad = multiplicacion7;
        this.formulario.subtotalMPNacional[2].componentes[1].cantidad = multiplicacion8;
        this.formulario.subtotalMPNacional[2].componentes[2].cantidad = multiplicacion9;
        this.formulario.subtotalMPNacional[3].componentes[0].cantidad = multiplicacion10;
        this.formulario.subtotalMPNacional[3].componentes[1].cantidad = multiplicacion11;
        this.formulario.subtotalMPNacional[3].componentes[2].cantidad = multiplicacion12;
        this.actualizarTotalMP();
    }

    editarComponenteMPNacional(tabla: Tabla) {
        this.ventasMPNacionales = new Ventas();

        this.ventasMPNacionales.id = tabla.id;
        this.ventasMPNacionales.producto = tabla.descripcion;
        this.ventasMPNacionales.unidadMedida = tabla.unidadmedida;
        this.ventasMPNacionales.anioAvolumenfisico = tabla.componentes[0].cantidad;
        this.ventasMPNacionales.anioApromedio = tabla.componentes[1].cantidad;
        this.ventasMPNacionales.anioBvolumenfisico = tabla.componentes[3].cantidad;
        this.ventasMPNacionales.anioBpromedio = tabla.componentes[4].cantidad;
        this.ventasMPNacionales.anioCvolumenfisico = tabla.componentes[6].cantidad;
        this.ventasMPNacionales.anioCpromedio = tabla.componentes[7].cantidad;
        this.ventasMPNacionales.anioDvolumenfisico = tabla.componentes[9].cantidad;
        this.ventasMPNacionales.anioDpromedio = tabla.componentes[10].cantidad;

        this.displayMPNacional = true;
        this.editarMPNacional = true;
    }

    eliminarComponenteMPNacional(tabla: Tabla) {
        const t = this.formulario.listaMPNacional.splice(this.formulario.listaMPNacional.indexOf(tabla), 1);
        this.actualizarSubtotalMPNacional();
    }

    // MP IMPORTADA ------------------------

    mostrarDialogMPImportada() {
        this.ventasMPImportadas = new Ventas();
        this.displayMPImportada = true;
        this.editarMPImportada = false;
    }

    cancelarModalMPImportada() {
        this.ventasMPImportadas = new Ventas();
        this.displayMPImportada = false;
        this.editarMPImportada = false;
    }

    guardarModalMPImportada() {
        const t = new Tabla();
        if (!this.editarMPImportada) {
            this.ventasMPImportadas.id = this.formulario.listaMPImportada.length;
        }

        t.id = this.ventasMPImportadas.id;
        t.descripcion = this.ventasMPImportadas.producto;
        t.unidadmedida = this.ventasMPImportadas.unidadMedida;

        t.componentes = new Array<Componente>();
        t.componentes[0] = new Componente();
        t.componentes[0].cantidad = Number(this.ventasMPImportadas.anioAvolumenfisico);

        t.componentes[1] = new Componente();
        t.componentes[1].cantidad = Number(this.ventasMPImportadas.anioApromedio);

        t.componentes[2] = new Componente();
        t.componentes[2].cantidad = Number(this.ventasMPImportadas.anioAvolumenfisico) + Number(this.ventasMPImportadas.anioApromedio);

        t.componentes[3] = new Componente();
        t.componentes[3].cantidad = Number(this.ventasMPImportadas.anioBvolumenfisico);

        t.componentes[4] = new Componente();
        t.componentes[4].cantidad = Number(this.ventasMPImportadas.anioBpromedio);

        t.componentes[5] = new Componente();
        t.componentes[5].cantidad = Number(this.ventasMPImportadas.anioBvolumenfisico) + Number(this.ventasMPImportadas.anioBpromedio);

        t.componentes[6] = new Componente();
        t.componentes[6].cantidad = Number(this.ventasMPImportadas.anioCvolumenfisico);

        t.componentes[7] = new Componente();
        t.componentes[7].cantidad = Number(this.ventasMPImportadas.anioCpromedio);

        t.componentes[8] = new Componente();
        t.componentes[8].cantidad = Number(this.ventasMPImportadas.anioCvolumenfisico) + Number(this.ventasMPImportadas.anioCpromedio);

        t.componentes[9] = new Componente();
        t.componentes[9].cantidad = Number(this.ventasMPImportadas.anioDvolumenfisico);

        t.componentes[10] = new Componente();
        t.componentes[10].cantidad = Number(this.ventasMPImportadas.anioDpromedio);

        t.componentes[11] = new Componente();
        t.componentes[11].cantidad = Number(this.ventasMPImportadas.anioDvolumenfisico) + Number(this.ventasMPImportadas.anioDpromedio);

        if (this.editarMPImportada) {
            const bean: Tabla = this.formulario.listaMPImportada.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaMPImportada.indexOf(bean);
                this.formulario.listaMPImportada[index] = t;
            }
        } else {
            this.formulario.listaMPImportada.push(t);
        }

        this.actualizarSubtotalMPImportada();

        this.ventasMPImportadas = new Ventas();
        this.displayMPImportada = false;
        this.editarMPImportada = false;
    }

    actualizarSubtotalMPImportada() {

        let multiplicacion1 = 0;
        let multiplicacion2 = 0;
        let multiplicacion3 = 0;
        let multiplicacion4 = 0;
        let multiplicacion5 = 0;
        let multiplicacion6 = 0;
        let multiplicacion7 = 0;
        let multiplicacion8 = 0;
        let multiplicacion9 = 0;
        let multiplicacion10 = 0;
        let multiplicacion11 = 0;
        let multiplicacion12 = 0;

        for (let i = 0; i < this.formulario.listaMPImportada.length; i++) {
            for (let j = 0; j < this.formulario.listaMPImportada[i].componentes.length; j++) {
                switch (j) {
                    case 0: multiplicacion1 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 1: multiplicacion2 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 2: multiplicacion3 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 3: multiplicacion4 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 4: multiplicacion5 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 5: multiplicacion6 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 6: multiplicacion7 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 7: multiplicacion8 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 8: multiplicacion9 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 9: multiplicacion10 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 10: multiplicacion11 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;
                    case 11: multiplicacion12 *= this.formulario.listaMPImportada[i].componentes[j].cantidad; break;

                }
            }
        }

        this.formulario.subtotalMPImportada[0].componentes[0].cantidad = multiplicacion1;
        this.formulario.subtotalMPImportada[0].componentes[1].cantidad = multiplicacion2;
        this.formulario.subtotalMPImportada[0].componentes[2].cantidad = multiplicacion3;
        this.formulario.subtotalMPImportada[1].componentes[0].cantidad = multiplicacion4;
        this.formulario.subtotalMPImportada[1].componentes[1].cantidad = multiplicacion5;
        this.formulario.subtotalMPImportada[1].componentes[2].cantidad = multiplicacion6;
        this.formulario.subtotalMPImportada[2].componentes[0].cantidad = multiplicacion7;
        this.formulario.subtotalMPImportada[2].componentes[1].cantidad = multiplicacion8;
        this.formulario.subtotalMPImportada[2].componentes[2].cantidad = multiplicacion9;
        this.formulario.subtotalMPImportada[3].componentes[0].cantidad = multiplicacion10;
        this.formulario.subtotalMPImportada[3].componentes[1].cantidad = multiplicacion11;
        this.formulario.subtotalMPImportada[3].componentes[2].cantidad = multiplicacion12;
        this.actualizarTotalMP();
    }

    editarComponenteMPImportada(tabla: Tabla) {
        this.ventasMPImportadas = new Ventas();

        this.ventasMPImportadas.id = tabla.id;
        this.ventasMPImportadas.producto = tabla.descripcion;
        this.ventasMPImportadas.unidadMedida = tabla.unidadmedida;
        this.ventasMPImportadas.anioAvolumenfisico = tabla.componentes[0].cantidad;
        this.ventasMPImportadas.anioApromedio = tabla.componentes[1].cantidad;
        this.ventasMPImportadas.anioBvolumenfisico = tabla.componentes[3].cantidad;
        this.ventasMPImportadas.anioBpromedio = tabla.componentes[4].cantidad;
        this.ventasMPImportadas.anioCvolumenfisico = tabla.componentes[6].cantidad;
        this.ventasMPImportadas.anioCpromedio = tabla.componentes[7].cantidad;
        this.ventasMPImportadas.anioDvolumenfisico = tabla.componentes[9].cantidad;
        this.ventasMPImportadas.anioDpromedio = tabla.componentes[10].cantidad;

        this.displayMPImportada = true;
        this.editarMPImportada = true;
    }

    eliminarComponenteMPImportada(tabla: Tabla) {
        const t = this.formulario.listaMPImportada.splice(this.formulario.listaMPImportada.indexOf(tabla), 1);
        this.actualizarSubtotalMPImportada();
    }

    // GF NACIONAL ----------------------------
    mostrarDialogGastosFinancieros() {
        this.ventasGastosFinancieros = new Ventas();
        this.displayGastosFinancieros = true;
        this.editarGastosFinancieros = false;
    }

    cancelarModalGastosFinancieros() {
        this.ventasGastosFinancieros = new Ventas();
        this.displayGastosFinancieros = false;
        this.editarGastosFinancieros = false;
    }

    guardarModalGastosFinancieros() {
        const t = new Tabla();
        if (!this.editarGastosFinancieros) {
            this.ventasGastosFinancieros.id = this.formulario.listaGastosFinancieros.length;
        }

        t.id = this.ventasGastosFinancieros.id;
        t.descripcion = this.ventasGastosFinancieros.producto;
        t.unidadmedida = this.ventasGastosFinancieros.unidadMedida;

        t.componentes = new Array<Componente>();
        t.componentes[0] = new Componente();
        t.componentes[0].cantidad = Number(this.ventasGastosFinancieros.anioAvolumenfisico);

        t.componentes[1] = new Componente();
        t.componentes[1].cantidad = Number(this.ventasGastosFinancieros.anioApromedio);

        t.componentes[2] = new Componente();
        t.componentes[2].cantidad = Number(this.ventasGastosFinancieros.anioAvolumenfisico) + Number(this.ventasGastosFinancieros.anioApromedio);

        t.componentes[3] = new Componente();
        t.componentes[3].cantidad = Number(this.ventasGastosFinancieros.anioBvolumenfisico);

        t.componentes[4] = new Componente();
        t.componentes[4].cantidad = Number(this.ventasGastosFinancieros.anioBpromedio);

        t.componentes[5] = new Componente();
        t.componentes[5].cantidad = Number(this.ventasGastosFinancieros.anioBvolumenfisico) + Number(this.ventasGastosFinancieros.anioBpromedio);

        t.componentes[6] = new Componente();
        t.componentes[6].cantidad = Number(this.ventasGastosFinancieros.anioCvolumenfisico);

        t.componentes[7] = new Componente();
        t.componentes[7].cantidad = Number(this.ventasGastosFinancieros.anioCpromedio);

        t.componentes[8] = new Componente();
        t.componentes[8].cantidad = Number(this.ventasGastosFinancieros.anioCvolumenfisico) + Number(this.ventasGastosFinancieros.anioCpromedio);

        t.componentes[9] = new Componente();
        t.componentes[9].cantidad = Number(this.ventasGastosFinancieros.anioDvolumenfisico);

        t.componentes[10] = new Componente();
        t.componentes[10].cantidad = Number(this.ventasGastosFinancieros.anioDpromedio);

        t.componentes[11] = new Componente();
        t.componentes[11].cantidad = Number(this.ventasGastosFinancieros.anioDvolumenfisico) + Number(this.ventasGastosFinancieros.anioDpromedio);

        if (this.editarGastosFinancieros) {
            const bean: Tabla = this.formulario.listaGastosFinancieros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosFinancieros.indexOf(bean);
                this.formulario.listaGastosFinancieros[index] = t;
            }
        } else {
            this.formulario.listaGastosFinancieros.push(t);
        }

        this.actualizarSubtotalGastosFinancieros();

        this.ventasGastosFinancieros = new Ventas();
        this.displayGastosFinancieros = false;
        this.editarGastosFinancieros = false;
    }

    actualizarSubtotalGastosFinancieros() {

        let multiplicacion1 = 0;
        let multiplicacion2 = 0;
        let multiplicacion3 = 0;
        let multiplicacion4 = 0;
        let multiplicacion5 = 0;
        let multiplicacion6 = 0;
        let multiplicacion7 = 0;
        let multiplicacion8 = 0;
        let multiplicacion9 = 0;
        let multiplicacion10 = 0;
        let multiplicacion11 = 0;
        let multiplicacion12 = 0;

        for (let i = 0; i < this.formulario.listaGastosFinancieros.length; i++) {
            for (let j = 0; j < this.formulario.listaGastosFinancieros[i].componentes.length; j++) {
                switch (j) {
                    case 0: multiplicacion1 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 1: multiplicacion2 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 2: multiplicacion3 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 3: multiplicacion4 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 4: multiplicacion5 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 5: multiplicacion6 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 6: multiplicacion7 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 7: multiplicacion8 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 8: multiplicacion9 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 9: multiplicacion10 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 10: multiplicacion11 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;
                    case 11: multiplicacion12 *= this.formulario.listaGastosFinancieros[i].componentes[j].cantidad; break;

                }
            }
        }

        this.formulario.subtotalGastosFinancieros[0].componentes[0].cantidad = multiplicacion1;
        this.formulario.subtotalGastosFinancieros[0].componentes[1].cantidad = multiplicacion2;
        this.formulario.subtotalGastosFinancieros[0].componentes[2].cantidad = multiplicacion3;
        this.formulario.subtotalGastosFinancieros[1].componentes[0].cantidad = multiplicacion4;
        this.formulario.subtotalGastosFinancieros[1].componentes[1].cantidad = multiplicacion5;
        this.formulario.subtotalGastosFinancieros[1].componentes[2].cantidad = multiplicacion6;
        this.formulario.subtotalGastosFinancieros[2].componentes[0].cantidad = multiplicacion7;
        this.formulario.subtotalGastosFinancieros[2].componentes[1].cantidad = multiplicacion8;
        this.formulario.subtotalGastosFinancieros[2].componentes[2].cantidad = multiplicacion9;
        this.formulario.subtotalGastosFinancieros[3].componentes[0].cantidad = multiplicacion10;
        this.formulario.subtotalGastosFinancieros[3].componentes[1].cantidad = multiplicacion11;
        this.formulario.subtotalGastosFinancieros[3].componentes[2].cantidad = multiplicacion12;
    }

    editarComponenteGastosFinancieros(tabla: Tabla) {
        this.ventasGastosFinancieros = new Ventas();

        this.ventasGastosFinancieros.id = tabla.id;
        this.ventasGastosFinancieros.producto = tabla.descripcion;
        this.ventasGastosFinancieros.unidadMedida = tabla.unidadmedida;
        this.ventasGastosFinancieros.anioAvolumenfisico = tabla.componentes[0].cantidad;
        this.ventasGastosFinancieros.anioApromedio = tabla.componentes[1].cantidad;
        this.ventasGastosFinancieros.anioBvolumenfisico = tabla.componentes[3].cantidad;
        this.ventasGastosFinancieros.anioBpromedio = tabla.componentes[4].cantidad;
        this.ventasGastosFinancieros.anioCvolumenfisico = tabla.componentes[6].cantidad;
        this.ventasGastosFinancieros.anioCpromedio = tabla.componentes[7].cantidad;
        this.ventasGastosFinancieros.anioDvolumenfisico = tabla.componentes[9].cantidad;
        this.ventasGastosFinancieros.anioDpromedio = tabla.componentes[10].cantidad;

        this.displayGastosFinancieros = true;
        this.editarGastosFinancieros = true;
    }

    eliminarComponenteGastosFinancieros(tabla: Tabla) {
        const t = this.formulario.listaGastosFinancieros.splice(this.formulario.listaGastosFinancieros.indexOf(tabla), 1);
        this.actualizarSubtotalGastosFinancieros();
    }

    // ---------------------------------------------------------------------
    actualizarTotalMP() {
        this.formulario.ingresoTotalMP[0].componentes[0].cantidad = this.formulario.subtotalMPImportada[0].componentes[2].cantidad
            + this.formulario.subtotalMPNacional[0].componentes[2].cantidad;
        this.formulario.ingresoTotalMP[0].componentes[1].cantidad = this.formulario.subtotalMPImportada[1].componentes[2].cantidad
            + this.formulario.subtotalMPNacional[1].componentes[2].cantidad;
        this.formulario.ingresoTotalMP[0].componentes[2].cantidad = this.formulario.subtotalMPImportada[2].componentes[2].cantidad
            + this.formulario.subtotalMPNacional[2].componentes[2].cantidad;
        this.formulario.ingresoTotalMP[0].componentes[3].cantidad = this.formulario.subtotalMPImportada[3].componentes[2].cantidad
            + this.formulario.subtotalMPNacional[3].componentes[2].cantidad;
    }

    // ---------------------------------------
    construirFormulario() {
        const anxMPNacCod: string[] = [this.constantes.FORM1ANEX1C_COD_MP_NAC_CANTIDAD_CONSUMIDA,
        this.constantes.FORM1ANEX1C_COD_MP_NAC_PRECIO_PROMEDIO,
        this.constantes.FORM1ANEX1C_COD_MP_NAC_COSTO_TOTAL];
        const anxMPImpCod: string[] = [this.constantes.FORM1ANEX1C_COD_MP_IMP_CANTIDAD_CONSUMIDA,
        this.constantes.FORM1ANEX1C_COD_MP_IMP_PRECIO_PROMEDIO,
        this.constantes.FORM1ANEX1C_COD_MP_IMP_COSTO_TOTAL];

        const anxGFCod: string[] = [this.constantes.FORM1ANEX1C_COD_GF_CANTIDAD_CONSUMIDA,
        this.constantes.FORM1ANEX1C_COD_GF_PRECIO_PROMEDIO,
        this.constantes.FORM1ANEX1C_COD_GF_COSTO_TOTAL];

        this.formulario = new Anexo1C();
        this.formulario.listaMPNacional = new Array<Tabla>();
        this.formulario.listaMPImportada = new Array<Tabla>();
        this.formulario.subtotalMPNacional = new Array<Tabla>();
        this.formulario.subtotalMPImportada = new Array<Tabla>();
        this.formulario.subtotalGastosFinancieros = new Array<Tabla>();
        for (let i = 0; i < this.anios.length; i++) {
            this.formulario.subtotalMPNacional[i] = new Tabla();
            this.formulario.subtotalMPNacional[i].componentes = new Array<Componente>();

            this.formulario.subtotalMPImportada[i] = new Tabla();
            this.formulario.subtotalMPImportada[i].componentes = new Array<Componente>();

            this.formulario.subtotalGastosFinancieros[i] = new Tabla();
            this.formulario.subtotalGastosFinancieros[i].componentes = new Array<Componente>();

            for (let j = 0; j < anxMPNacCod.length; j++) {
                this.formulario.subtotalMPNacional[i].componentes[j] = new Componente();
                this.formulario.subtotalMPNacional[i].componentes[j].cantidad = 0;
                this.formulario.subtotalMPNacional[i].componentes[j].codigo = anxMPNacCod[j] + '_subtotal_' + i + this.anios[i];
            }

            for (let j = 0; j < anxMPImpCod.length; j++) {
                this.formulario.subtotalMPImportada[i].componentes[j] = new Componente();
                this.formulario.subtotalMPImportada[i].componentes[j].cantidad = 0;
                this.formulario.subtotalMPImportada[i].componentes[j].codigo = anxMPImpCod[j] + '_subtotal_' + i + this.anios[i];
            }

            for (let j = 0; j < anxGFCod.length; j++) {
                this.formulario.subtotalGastosFinancieros[i].componentes[j] = new Componente();
                this.formulario.subtotalGastosFinancieros[i].componentes[j].cantidad = 0;
                this.formulario.subtotalGastosFinancieros[i].componentes[j].codigo = anxGFCod[j] + '_subtotal_' + i + this.anios[i];
            }

        }
        this.formulario.ingresoTotalMP = new Array<Tabla>();
        this.formulario.ingresoTotalMP[0] = new Tabla();
        this.formulario.ingresoTotalMP[0].componentes = new Array<Componente>();
        this.formulario.ingresoTotalMP[0].componentes[0] = new Componente();
        this.formulario.ingresoTotalMP[0].componentes[0].cantidad = 0;
        this.formulario.ingresoTotalMP[0].componentes[1] = new Componente();
        this.formulario.ingresoTotalMP[0].componentes[1].cantidad = 0;
        this.formulario.ingresoTotalMP[0].componentes[2] = new Componente();
        this.formulario.ingresoTotalMP[0].componentes[2].cantidad = 0;
        this.formulario.ingresoTotalMP[0].componentes[3] = new Componente();
        this.formulario.ingresoTotalMP[0].componentes[3].cantidad = 0;

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
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaMPNacional, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaMPImportada, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosFinancieros, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.ingresoTotalMP, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.subtotalGastosFinancieros, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.subtotalMPImportada, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.subtotalMPNacional, this.nCodffina);
        this.verControlInformacion();
    }
    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
