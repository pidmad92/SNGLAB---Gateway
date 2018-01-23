import { Component, OnInit, OnDestroy, } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Message } from 'primeng/components/common/api';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { FormularioFinancieroFinancieroService } from './index';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Formulario1 } from './formulario1.model';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancService } from '../entities/formfinanc.service';
import { FormfinancDetalleService } from '../entities/formfinancdetalle.service';
import { FormfinancDetalle } from '../entities/index';
import { DetalleCuenta } from './detallecuenta.model';

@Component({
    selector: 'jhi-formulario-financiero-financiero-n1',
    templateUrl: './formulario-financiero-financiero-n1.component.html',
    styleUrls: ['formulario-financiero-financiero.scss']
})

export class FormularioFinancieroFinancieroN1Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editarProvisiones: boolean;
    editarOtrosIngresos: boolean;
    editarOtrosGastos: boolean;
    displayProvisiones: boolean;
    displayOtrosIngresos: boolean;
    displayOtrosGastos: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formGroup: FormGroup;
    formulario: Formulario1;
    constantes: Constants;

    nCodffina: number;

    provisiones: DetalleCuenta;
    otrosIngresos: DetalleCuenta;
    otrosGastos: DetalleCuenta;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private formularioLaboralService: FormularioFinancieroFinancieroService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
        // Servicios
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private formfinancService: FormfinancService,
        private formfinancdetalleService: FormfinancDetalleService,
    ) {
        this.formGroup = this.fb.group({ 'name': ['', Validators.required] });
    }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodffina']);
        });
    }

    load(nCodffina) {
        this.nCodffina = nCodffina;
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
        this.anios = Array<number>();
        this.anios.push(fecha - 3);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.anios.push(fecha);

        this.provisiones = new DetalleCuenta();
        this.otrosIngresos = new DetalleCuenta();
        this.otrosGastos = new DetalleCuenta();

        this.displayProvisiones = false;
        this.editarProvisiones = false;
        this.displayOtrosIngresos = false;
        this.editarOtrosIngresos = false;
        this.displayOtrosGastos = false;
        this.editarOtrosGastos = false;

        this.construirFormulario();
    }

    mostrarDialogProvisiones() {
        this.provisiones = new DetalleCuenta();
        this.displayProvisiones = true;
        this.editarProvisiones = false;
    }

    cancelarModalProvisiones() {
        this.provisiones = new DetalleCuenta();
        this.displayProvisiones = false;
        this.editarProvisiones = false;
    }

    guardarModalProvisiones() {
        const t = new Tabla();
        if (!this.editarProvisiones) {
            t.id = this.formulario.listaProvisionesCredDirec.length;
        } else {
            t.id = this.provisiones.id;
        }
        t.descripcion = this.provisiones.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1_COD_PROCREDIR + 'a_' + this.formulario.listaProvisionesCredDirec.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.provisiones.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1_COD_PROCREDIR + 'b_' + this.formulario.listaProvisionesCredDirec.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.provisiones.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1_COD_PROCREDIR + 'c_' + this.formulario.listaProvisionesCredDirec.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.provisiones.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1_COD_PROCREDIR + 'd_' + this.formulario.listaProvisionesCredDirec.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.provisiones.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarProvisiones) {
            const bean: Tabla = this.formulario.listaProvisionesCredDirec.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaProvisionesCredDirec.indexOf(bean);
                this.formulario.listaProvisionesCredDirec[index] = t;
            }
        } else {
            this.formulario.listaProvisionesCredDirec.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaProvisionesCredDirec.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaProvisionesCredDirec[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaProvisionesCredDirec[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaProvisionesCredDirec[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaProvisionesCredDirec[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaProvisionesCredDirec[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalProvisionesCredDirec.componentes[0].cantidad = Number(suma1) + Number(this.provisiones.anioA);
        this.formulario.totalProvisionesCredDirec.componentes[1].cantidad = Number(suma2) + Number(this.provisiones.anioB);
        this.formulario.totalProvisionesCredDirec.componentes[2].cantidad = Number(suma3) + Number(this.provisiones.anioC);
        this.formulario.totalProvisionesCredDirec.componentes[3].cantidad = Number(suma4) + Number(this.provisiones.anioD);
        this.margenFinancieroNeto();

        this.displayProvisiones = false;
        this.provisiones = new DetalleCuenta();
        this.editarProvisiones = false;
    }

    editarComponenteProvisiones(tabla: Tabla) {
        this.displayProvisiones = true;
        this.editarProvisiones = true;
        this.provisiones = new DetalleCuenta();
        this.provisiones.id = tabla.id;
        this.provisiones.descripcion = tabla.descripcion;
        this.provisiones.anioA = tabla.componentes[0].cantidad;
        this.provisiones.anioB = tabla.componentes[1].cantidad;
        this.provisiones.anioC = tabla.componentes[2].cantidad;
        this.provisiones.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteProvisiones(tabla: Tabla) {
        const t = this.formulario.listaProvisionesCredDirec.splice(this.formulario.listaProvisionesCredDirec.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalProvisionesCredDirec.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalProvisionesCredDirec.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalProvisionesCredDirec.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalProvisionesCredDirec.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
        this.margenFinancieroNeto();
    }

    mostrarDialogOtrosIngresos() {
        this.otrosIngresos = new DetalleCuenta();
        this.displayOtrosIngresos = true;
        this.editarOtrosIngresos = false;
    }

    cancelarModalOtrosIngresos() {
        this.otrosIngresos = new DetalleCuenta();
        this.displayOtrosIngresos = false;
        this.editarOtrosIngresos = false;
    }

    guardarModalOtrosIngresos() {
        const t = new Tabla();
        if (!this.editarOtrosIngresos) {
            t.id = this.formulario.listaOtrosIngresos.length;
        } else {
            t.id = this.otrosIngresos.id;
        }
        t.descripcion = this.otrosIngresos.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1_COD_OTROSING + 'a_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosIngresos.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1_COD_OTROSING + 'b_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosIngresos.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1_COD_OTROSING + 'c_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosIngresos.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1_COD_OTROSING + 'd_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosIngresos.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosIngresos) {
            const bean: Tabla = this.formulario.listaOtrosIngresos.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaOtrosIngresos.indexOf(bean);
                this.formulario.listaOtrosIngresos[index] = t;
            }
        } else {
            this.formulario.listaOtrosIngresos.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaOtrosIngresos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaOtrosIngresos[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaOtrosIngresos[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaOtrosIngresos[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaOtrosIngresos[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaOtrosIngresos[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalOtrosIngresos.componentes[0].cantidad = Number(suma1) + Number(this.otrosIngresos.anioA);
        this.formulario.totalOtrosIngresos.componentes[1].cantidad = Number(suma2) + Number(this.otrosIngresos.anioB);
        this.formulario.totalOtrosIngresos.componentes[2].cantidad = Number(suma3) + Number(this.otrosIngresos.anioC);
        this.formulario.totalOtrosIngresos.componentes[3].cantidad = Number(suma4) + Number(this.otrosIngresos.anioD);
        this.totalOtrosIngresosGastos();

        this.displayOtrosIngresos = false;
        this.otrosIngresos = new DetalleCuenta();
        this.editarOtrosIngresos = false;
    }

    editarComponenteOtrosIngresos(tabla: Tabla) {
        this.displayOtrosIngresos = true;
        this.editarOtrosIngresos = true;
        this.otrosIngresos = new DetalleCuenta();
        this.otrosIngresos.id = tabla.id;
        this.otrosIngresos.descripcion = tabla.descripcion;
        this.otrosIngresos.anioA = tabla.componentes[0].cantidad;
        this.otrosIngresos.anioB = tabla.componentes[1].cantidad;
        this.otrosIngresos.anioC = tabla.componentes[2].cantidad;
        this.otrosIngresos.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosIngresos(tabla: Tabla) {
        const t = this.formulario.listaOtrosIngresos.splice(this.formulario.listaOtrosIngresos.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalOtrosIngresos.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalOtrosIngresos.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalOtrosIngresos.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalOtrosIngresos.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
        this.totalOtrosIngresosGastos();
    }

    mostrarDialogOtrosGastos() {
        this.otrosGastos = new DetalleCuenta();
        this.displayOtrosGastos = true;
        this.editarOtrosGastos = false;
    }

    cancelarModalOtrosGastos() {
        this.otrosGastos = new DetalleCuenta();
        this.displayOtrosGastos = false;
        this.editarOtrosGastos = false;
    }

    guardarModalOtrosGastos() {
        const t = new Tabla();
        if (!this.editarOtrosGastos) {
            t.id = this.formulario.listaOtrosGastos.length;
        } else {
            t.id = this.otrosGastos.id;
        }
        t.descripcion = this.otrosGastos.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1_COD_OTROSGAS + 'a_' + this.formulario.listaOtrosGastos.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosGastos.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1_COD_OTROSGAS + 'b_' + this.formulario.listaOtrosGastos.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosGastos.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1_COD_OTROSGAS + 'c_' + this.formulario.listaOtrosGastos.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosGastos.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1_COD_OTROSGAS + 'd_' + this.formulario.listaOtrosGastos.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosGastos.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosGastos) {
            const bean: Tabla = this.formulario.listaOtrosGastos.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaOtrosGastos.indexOf(bean);
                this.formulario.listaOtrosGastos[index] = t;
            }
        } else {
            this.formulario.listaOtrosGastos.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaOtrosGastos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaOtrosGastos[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaOtrosGastos[i].componentes[0].cantidad)
                        break;
                    case 1: suma2 += Number(this.formulario.listaOtrosGastos[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaOtrosGastos[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaOtrosGastos[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalOtrosGastos.componentes[0].cantidad = Number(suma1) + Number(this.otrosGastos.anioA);
        this.formulario.totalOtrosGastos.componentes[1].cantidad = Number(suma2) + Number(this.otrosGastos.anioB);
        this.formulario.totalOtrosGastos.componentes[2].cantidad = Number(suma3) + Number(this.otrosGastos.anioC);
        this.formulario.totalOtrosGastos.componentes[3].cantidad = Number(suma4) + Number(this.otrosGastos.anioD);
        this.totalOtrosIngresosGastos();

        this.displayOtrosGastos = false;
        this.otrosGastos = new DetalleCuenta();
        this.editarOtrosGastos = false;
    }

    editarComponenteOtrosGastos(tabla: Tabla) {
        this.displayOtrosGastos = true;
        this.editarOtrosGastos = true;
        this.otrosGastos = new DetalleCuenta();
        this.otrosGastos.id = tabla.id;
        this.otrosGastos.descripcion = tabla.descripcion;
        this.otrosGastos.anioA = tabla.componentes[0].cantidad;
        this.otrosGastos.anioB = tabla.componentes[1].cantidad;
        this.otrosGastos.anioC = tabla.componentes[2].cantidad;
        this.otrosGastos.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosGastos(tabla: Tabla) {
        const t = this.formulario.listaOtrosGastos.splice(this.formulario.listaOtrosGastos.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalOtrosGastos.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalOtrosGastos.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalOtrosGastos.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalOtrosGastos.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
        this.totalOtrosIngresosGastos();
    }

    construirFormulario() {
        this.formulario = new Formulario1();

        const ingintDesc = [
            this.constantes.FORM1_INGINT_DISPONIBLE,
            this.constantes.FORM1_INGINT_FONDOINTER,
            this.constantes.FORM1_INGINT_INVVALORCAMRESUL,
            this.constantes.FORM1_INGINT_DISPONIBLEVENTA,
            this.constantes.FORM1_INGINT_VENCIMIENTO,
            this.constantes.FORM1_INGINT_CREDDIRECTOS,
            this.constantes.FORM1_INGINT_OPECOBERTURA,
            this.constantes.FORM1_INGINT_CUENTAS,
            this.constantes.FORM1_INGINT_OTROS,
            this.constantes.FORM1_INGINT_TOTAL
        ];
        const ingintCod = [
            this.constantes.FORM1_COD_INGINT_DISPONIBLE,
            this.constantes.FORM1_COD_INGINT_FONDOINTER,
            this.constantes.FORM1_COD_INGINT_INVVALORCAMRESUL,
            this.constantes.FORM1_COD_INGINT_DISPONIBLEVENTA,
            this.constantes.FORM1_COD_INGINT_VENCIMIENTO,
            this.constantes.FORM1_COD_INGINT_CREDDIRECTOS,
            this.constantes.FORM1_COD_INGINT_OPECOBERTURA,
            this.constantes.FORM1_COD_INGINT_CUENTAS,
            this.constantes.FORM1_COD_INGINT_OTROS,
            this.constantes.FORM1_COD_INGINT_TOTAL
        ];
        this.formulario.listaIngresosIntereses = this.crearlistacomponentes(ingintDesc, ingintCod, true);

        const gasintDesc = [
            this.constantes.FORM1_GASINT_OBLIGPUBLICO,
            this.constantes.FORM1_GASINT_FONDOINTER,
            this.constantes.FORM1_GASINT_DEPOSISFINAN,
            this.constantes.FORM1_GASINT_ADEUDOSOBLIG,
            this.constantes.FORM1_GASINT_DIFCAMBIO,
            this.constantes.FORM1_GASINT_CUENTASPAGAR,
            this.constantes.FORM1_GASINT_RESULOPECOBER,
            this.constantes.FORM1_GASINT_OTROSGASFINAN,
            this.constantes.FORM1_GASINT_TOTAL
        ];
        const gasintCod = [
            this.constantes.FORM1_COD_GASINT_OBLIGPUBLICO,
            this.constantes.FORM1_COD_GASINT_FONDOINTER,
            this.constantes.FORM1_COD_GASINT_DEPOSISFINAN,
            this.constantes.FORM1_COD_GASINT_ADEUDOSOBLIG,
            this.constantes.FORM1_COD_GASINT_DIFCAMBIO,
            this.constantes.FORM1_COD_GASINT_CUENTASPAGAR,
            this.constantes.FORM1_COD_GASINT_RESULOPECOBER,
            this.constantes.FORM1_COD_GASINT_OTROSGASFINAN,
            this.constantes.FORM1_COD_GASINT_TOTAL
        ];
        this.formulario.listaGastosIntereses = this.crearlistacomponentes(gasintDesc, gasintCod, true);

        const margenfinanbrutoDesc = [this.constantes.FORM1_MARGENFINANBRUTO];
        const margenfinanbrutoCod = [this.constantes.FORM1_COD_MARGENFINANBRUTO];
        this.formulario.totalMargenFinanBruto = this.creartotales(margenfinanbrutoDesc, margenfinanbrutoCod);

        const provcreddirecDesc = [this.constantes.FORM1_PROCREDIR_TOTAL];
        const provcreddirecCod = [this.constantes.FORM1_COD_PROCREDIR_TOTAL];
        this.formulario.totalProvisionesCredDirec = this.creartotales(provcreddirecDesc, provcreddirecCod);

        const margenfinanbrutodespprovDesc = [this.constantes.FORM1_MARGENFINANBRUTODESPPROV];
        const margenfinanbrutodespprovCod = [this.constantes.FORM1_COD_MARGENFINANBRUTODESPPROV];
        this.formulario.totalMargenFinanNetoDespProv = this.creartotales(margenfinanbrutodespprovDesc, margenfinanbrutodespprovCod);

        const ingservfinanDesc = [
            this.constantes.FORM1_INGSERFIN_CREDINDI,
            this.constantes.FORM1_INGSERFIN_FIDEICOMISIONES,
            this.constantes.FORM1_INGSERFIN_EMISIONELEC,
            this.constantes.FORM1_INGSERFIN_DIVERSOS,
            this.constantes.FORM1_INGSERFIN_TOTAL
        ];
        const ingservfinanCod = [
            this.constantes.FORM1_COD_INGSERFIN_CREDINDI,
            this.constantes.FORM1_COD_INGSERFIN_FIDEICOMISIONES,
            this.constantes.FORM1_COD_INGSERFIN_EMISIONELEC,
            this.constantes.FORM1_COD_INGSERFIN_DIVERSOS,
            this.constantes.FORM1_COD_INGSERFIN_TOTAL
        ];
        this.formulario.listaIngresosServFinan = this.crearlistacomponentes(ingservfinanDesc, ingservfinanCod, true);

        const gasservfinanDesc = [
            this.constantes.FORM1_GASSERFIN_CREDINDI,
            this.constantes.FORM1_GASSERFIN_FIDEICOMISIONES,
            this.constantes.FORM1_GASSERFIN_PRIMASFONSEGDEPO,
            this.constantes.FORM1_GASSERFIN_DIVERSOS,
            this.constantes.FORM1_GASSERFIN_TOTAL
        ];
        const gasservfinanCod = [
            this.constantes.FORM1_COD_GASSERFIN_CREDINDI,
            this.constantes.FORM1_COD_GASSERFIN_FIDEICOMISIONES,
            this.constantes.FORM1_COD_GASSERFIN_PRIMASFONSEGDEPO,
            this.constantes.FORM1_COD_GASSERFIN_DIVERSOS,
            this.constantes.FORM1_COD_GASSERFIN_TOTAL
        ];
        this.formulario.listaGastosServFinan = this.crearlistacomponentes(gasservfinanDesc, gasservfinanCod, true);

        const margenfinannetogasservfinanDesc = [this.constantes.FORM1_MARGENFINANNETOGASSERVFINAN];
        const margenfinannetogasservfinanCod = [this.constantes.FORM1_COD_MARGENFINANNETOGASSERVFINAN];
        this.formulario.totalMargenFinanNetoIngGastosServFinan = this.creartotales(margenfinannetogasservfinanDesc, margenfinannetogasservfinanCod);

        const resuloperfinanDesc = [this.constantes.FORM1_ROF];
        const resuloperfinanCod = [this.constantes.FORM1_COD_ROF];
        this.formulario.listaResultadoOpeFinan = this.crearlistacomponentes(resuloperfinanDesc, resuloperfinanCod, false);

        const margenoperacionalDesc = [this.constantes.FORM1_MARGENOPERACIONAL];
        const margenoperacionalCod = [this.constantes.FORM1_COD_MARGENOPERACIONAL];
        this.formulario.totalMargenOperacional = this.creartotales(margenoperacionalDesc, margenoperacionalCod);

        const gastosadminDesc = [
            this.constantes.FORM1_GASTOSADMIN_PERSONAL,
            this.constantes.FORM1_GASTOSADMIN_DIRECTORIO,
            this.constantes.FORM1_GASTOSADMIN_SERVICIOS,
            this.constantes.FORM1_GASTOSADMIN_IMPUESTOS,
            this.constantes.FORM1_GASTOSADMIN_TOTAL
        ];
        const gastosadminCod = [
            this.constantes.FORM1_COD_GASTOSADMIN_PERSONAL,
            this.constantes.FORM1_COD_GASTOSADMIN_DIRECTORIO,
            this.constantes.FORM1_COD_GASTOSADMIN_SERVICIOS,
            this.constantes.FORM1_COD_GASTOSADMIN_IMPUESTOS,
            this.constantes.FORM1_COD_GASTOSADMIN_TOTAL
        ];
        this.formulario.listaGastosAdministracion = this.crearlistacomponentes(gastosadminDesc, gastosadminCod, true);

        const depreamorDesc = [this.constantes.FORM1_DEPRECIACIONES_AMORTIZACIONES];
        const depreamorCod = [this.constantes.FORM1_COD_DEPRECIACIONES_AMORTIZACIONES];
        this.formulario.listaDepresacionesAmortizaciones = this.crearlistacomponentes(depreamorDesc, depreamorCod, false);

        const margenoperacionalnetoDesc = [this.constantes.FORM1_MARGENOPERACIONALNETO];
        const margenoperacionalnetoCod = [this.constantes.FORM1_COD_MARGENOPERACIONALNETO];
        this.formulario.totalMargenOperacionalNeto = this.creartotales(margenoperacionalnetoDesc, margenoperacionalnetoCod);

        const valuacionDesc = [this.constantes.FORM1_VALUACIONACTPROV];
        const valuacionCod = [this.constantes.FORM1_COD_VALUACIONACTPROV];
        this.formulario.listaValuacionActivosProvisiones = this.crearlistacomponentes(valuacionDesc, valuacionCod, false);

        const resuloperaDesc = [this.constantes.FORM1_RESULOPE];
        const resuloperaCod = [this.constantes.FORM1_COD_RESULOPE];
        this.formulario.totalResultadoOperacion = this.creartotales(resuloperaDesc, resuloperaCod);

        const otrosingresosDesc = [this.constantes.FORM1_OTROSING_TOTAL];
        const otrosingresosCod = [this.constantes.FORM1_COD_OTROSING_TOTAL];
        this.formulario.totalOtrosIngresos = this.creartotales(otrosingresosDesc, otrosingresosCod);

        const otrosgastosDesc = [this.constantes.FORM1_OTROSGAS_TOTAL];
        const otrosgastosCod = [this.constantes.FORM1_COD_OTROSGAS_TOTAL];
        this.formulario.totalOtrosGastos = this.creartotales(otrosgastosDesc, otrosgastosCod);

        const totalingresosgastosDesc = [this.constantes.FORM1_OTROSING_OTROSGAS_TOTAL];
        const totalingresosgastosCod = [this.constantes.FORM1_COD_OTROSING_OTROSGAS_TOTAL];
        this.formulario.totalOtrosIngresosOtrosGastos = this.creartotales(totalingresosgastosDesc, totalingresosgastosCod);

        const resultantesimpDesc = [this.constantes.FORM1_RESULTADO_IMPUESTORENTA];
        const resultantesimpCod = [this.constantes.FORM1_COD_RESULTADO_IMPUESTORENTA];
        this.formulario.totalResultadoAntesImpRenta = this.creartotales(resultantesimpDesc, resultantesimpCod);

        const imprentaDesc = [this.constantes.FORM1_IMPRENTA_IMPUESTO];
        const imprentaCod = [this.constantes.FORM1_COD_IMPRENTA_IMPUESTO];
        this.formulario.listaImpuestoRenta = this.crearlistacomponentes(imprentaDesc, imprentaCod, false);

        const resultadoejercicioDesc = [this.constantes.FORM1_RESULTADONETOEJERCICIO];
        const resultadoejercicioCod = [this.constantes.FORM1_COD_RESULTADONETOEJERCICIO];
        this.formulario.totalResultadoNetoEjercicio = this.creartotales(resultadoejercicioDesc, resultadoejercicioCod);

        this.formulario.listaProvisionesCredDirec = new Array<Tabla>();
        this.formulario.listaOtrosIngresos = new Array<Tabla>();
        this.formulario.listaOtrosGastos = new Array<Tabla>();

        this.obtenerValores(this.constantes.FORM1_COD_PROCREDIR, 1);
        this.obtenerValores(this.constantes.FORM1_COD_OTROSING, 2);
        this.obtenerValores(this.constantes.FORM1_COD_OTROSGAS, 3);

    }

    obtenerValores(componente: string, tipo: number) {
        const excluido = 'subtotal';
        const componentes = new Array<Componente>();
        this.formfinancdetalleService.obtenerListaComponenteExcluido(this.nCodffina, componente, excluido).subscribe(
            (res: ResponseWrapper) => {
                let cont = 1;
                let i = 0;
                const objetos: FormfinancDetalle[] = res.json;
                if (objetos.length > 0) {
                    while ((cont - 1) < objetos.length) {
                        const comp: Componente = new Componente();
                        comp.codigo = objetos[cont - 1].vCompone;
                        comp.cantidad = objetos[cont - 1].nValffina;
                        comp.id = objetos[cont - 1].nCodfdetal;
                        comp.vUsureg = objetos[cont - 1].vUsuareg;
                        comp.tFecReg = objetos[cont - 1].tFecreg;
                        comp.nSedeReg = objetos[cont - 1].nSedereg;
                        switch (tipo) {
                            case 1:
                                if (this.formulario.listaProvisionesCredDirec[i] === undefined) {
                                    this.formulario.listaProvisionesCredDirec[i] = new Tabla();
                                    if (this.formulario.listaProvisionesCredDirec[i].componentes === undefined) {
                                        this.formulario.listaProvisionesCredDirec[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaProvisionesCredDirec[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaProvisionesCredDirec[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaProvisionesCredDirec[i].componentes.push(comp);
                                break;
                            case 2:
                                if (this.formulario.listaOtrosIngresos[i] === undefined) {
                                    this.formulario.listaOtrosIngresos[i] = new Tabla();
                                    if (this.formulario.listaOtrosIngresos[i].componentes === undefined) {
                                        this.formulario.listaOtrosIngresos[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaOtrosIngresos[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaOtrosIngresos[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaOtrosIngresos[i].componentes.push(comp);
                                break;
                            case 3:
                                if (this.formulario.listaOtrosGastos[i] === undefined) {
                                    this.formulario.listaOtrosGastos[i] = new Tabla();
                                    if (this.formulario.listaOtrosGastos[i].componentes === undefined) {
                                        this.formulario.listaOtrosGastos[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaOtrosGastos[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaOtrosGastos[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaOtrosGastos[i].componentes.push(comp);
                                break;
                        }

                        if (cont % 4 === 0 && (cont - 1) !== 0) {
                            i++;
                        }
                        cont++;
                    }
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    // Funcionaes para la creacion de Formularios
    // -------------------------------------------------------------------
    crearcomponentes(desc: string[], cod: string[]): Tabla {
        const t = new Tabla();
        t.componentes = new Array<Componente>();
        for (let j = 0; j < desc.length; j++) {
            t.descripcion = desc[j];
            for (let i = 0; i < this.anios.length; i++) {
                t.componentes[i] = new Componente();
                t.componentes[i].codigo = cod[j] + '_' + i + '_' + this.anios[i];
                t.componentes[i].cantidad = 0;
                t.componentes[i].año = this.anios[i];
                this.formfinancdetalleService.obtenerComponente(this.nCodffina, t.componentes[i].codigo).subscribe(
                    (formfinancdetalle) => {
                        if (formfinancdetalle !== undefined) {
                            t.componentes[i].cantidad = formfinancdetalle.nValffina;
                            t.componentes[i].id = formfinancdetalle.nCodfdetal;
                            t.componentes[i].vUsureg = formfinancdetalle.vUsuareg;
                            t.componentes[i].tFecReg = formfinancdetalle.tFecreg;
                            t.componentes[i].nSedeReg = formfinancdetalle.nSedereg;
                        }
                    }
                );
                const fc: FormControl = new FormControl();
                this.formGroup.addControl(cod[j] + '_' + i + '_' + this.anios[i], new FormControl);
                this.formGroup.controls[cod[j] + '_' + i + '_' + this.anios[i]].setValue(0);
            }
        }
        return t;
    }

    creartotales(desc: string[], cod: string[]): Tabla {
        const t = new Tabla();
        t.componentes = new Array<Componente>();
        for (let j = 0; j < desc.length; j++) {
            t.descripcion = desc[j];
            for (let i = 0; i < this.anios.length; i++) {
                t.componentes[i] = new Componente();
                t.componentes[i].codigo = cod[j] + '_' + i + '_' + this.anios[i];
                t.componentes[i].cantidad = 0;
                t.componentes[i].año = this.anios[i];
                this.formfinancdetalleService.obtenerComponente(this.nCodffina, t.componentes[i].codigo).subscribe(
                    (formfinancdetalle) => {
                        if (formfinancdetalle !== undefined) {
                            t.componentes[i].cantidad = formfinancdetalle.nValffina;
                            t.componentes[i].id = formfinancdetalle.nCodfdetal;
                            t.componentes[i].vUsureg = formfinancdetalle.vUsuareg;
                            t.componentes[i].tFecReg = formfinancdetalle.tFecreg;
                            t.componentes[i].nSedeReg = formfinancdetalle.nSedereg;
                        }
                    }
                );
            }
        }
        return t;
    }

    crearlistacomponentes(desc: string[], cod: string[], subtotal: boolean): Tabla[] {
        const t = new Array<Tabla>();
        for (let j = 0; j < desc.length; j++) {
            t[j] = new Tabla();
            t[j].descripcion = desc[j];
            t[j].componentes = new Array<Componente>();
            for (let i = 0; i < this.anios.length; i++) {
                t[j].componentes[i] = new Componente();
                t[j].componentes[i].codigo = cod[j] + '_' + i + '_' + this.anios[i];
                t[j].componentes[i].cantidad = 0;
                this.formfinancdetalleService.obtenerComponente(this.nCodffina, t[j].componentes[i].codigo).subscribe(
                    (formfinancdetalle) => {
                        if (formfinancdetalle !== undefined) {
                            t[j].componentes[i].cantidad = formfinancdetalle.nValffina;
                            t[j].componentes[i].id = formfinancdetalle.nCodfdetal;
                            t[j].componentes[i].vUsureg = formfinancdetalle.vUsuareg;
                            t[j].componentes[i].tFecReg = formfinancdetalle.tFecreg;
                            t[j].componentes[i].nSedeReg = formfinancdetalle.nSedereg;
                        }
                    }
                );
                t[j].componentes[i].año = this.anios[i];
                if (subtotal && j === desc.length - 1) {
                    // logica no necesaria
                } else {
                    const fc: FormControl = new FormControl();
                    this.formGroup.addControl(cod[j] + '_' + i + '_' + this.anios[i], new FormControl);
                    this.formGroup.controls[cod[j] + '_' + i + '_' + this.anios[i]].setValue(0);
                }
            }

        }
        return t;
    }
    // -------------------------------------------------------------------
    // Calculos del Formulario
    // -------------------------------------------------------------------
    subtotalIngresoIntereses(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaIngresosIntereses.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaIngresosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosIntereses[i].componentes.length; j++) {
                if (this.formulario.listaIngresosIntereses[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaIngresosIntereses[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaIngresosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosIntereses[i].componentes.length; j++) {
                if (this.formulario.listaIngresosIntereses[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaIngresosIntereses[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaIngresosIntereses[idy].componentes[idx].cantidad = suma;
        this.margenFinancieroBruto();
    }

    subtotalGastosIntereses(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaGastosIntereses.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaGastosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosIntereses[i].componentes.length; j++) {
                if (this.formulario.listaGastosIntereses[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaGastosIntereses[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosIntereses[i].componentes.length; j++) {
                if (this.formulario.listaGastosIntereses[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaGastosIntereses[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaGastosIntereses[idy].componentes[idx].cantidad = suma;
        this.margenFinancieroBruto();
    }

    margenFinancieroBruto() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        const idx = this.formulario.listaIngresosIntereses.length - 1;
        const jdx = this.formulario.listaGastosIntereses.length - 1;

        for (let i = 0; i < this.formulario.listaIngresosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosIntereses[i].componentes.length; j++) {
                switch (j) {
                    case 0: ingreso1 += Number(this.formulario.listaIngresosIntereses[i].componentes[0].cantidad)
                        break;
                    case 1: ingreso2 += Number(this.formulario.listaIngresosIntereses[i].componentes[1].cantidad);
                        break;
                    case 2: ingreso3 += Number(this.formulario.listaIngresosIntereses[i].componentes[2].cantidad);
                        break;
                    case 3: ingreso4 += Number(this.formulario.listaIngresosIntereses[i].componentes[3].cantidad);
                        break;
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosIntereses.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosIntereses[i].componentes.length; j++) {
                switch (j) {
                    case 0: gasto1 += Number(this.formulario.listaGastosIntereses[i].componentes[0].cantidad)
                        break;
                    case 1: gasto2 += Number(this.formulario.listaGastosIntereses[i].componentes[1].cantidad);
                        break;
                    case 2: gasto3 += Number(this.formulario.listaGastosIntereses[i].componentes[2].cantidad);
                        break;
                    case 3: gasto4 += Number(this.formulario.listaGastosIntereses[i].componentes[3].cantidad);
                        break;
                }
            }
        }

        this.formulario.totalMargenFinanBruto.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalMargenFinanBruto.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalMargenFinanBruto.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalMargenFinanBruto.componentes[3].cantidad = ingreso4 - gasto4;
        this.margenFinancieroNeto();
    }

    margenFinancieroNeto() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        ingreso1 = this.formulario.totalMargenFinanBruto.componentes[0].cantidad;
        ingreso2 = this.formulario.totalMargenFinanBruto.componentes[1].cantidad;
        ingreso3 = this.formulario.totalMargenFinanBruto.componentes[2].cantidad;
        ingreso4 = this.formulario.totalMargenFinanBruto.componentes[3].cantidad;

        gasto1 = this.formulario.totalProvisionesCredDirec.componentes[0].cantidad;
        gasto2 = this.formulario.totalProvisionesCredDirec.componentes[1].cantidad;
        gasto3 = this.formulario.totalProvisionesCredDirec.componentes[2].cantidad;
        gasto4 = this.formulario.totalProvisionesCredDirec.componentes[3].cantidad;

        this.formulario.totalMargenFinanNetoDespProv.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalMargenFinanNetoDespProv.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalMargenFinanNetoDespProv.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalMargenFinanNetoDespProv.componentes[3].cantidad = ingreso4 - gasto4;
        this.margenFinancieroNetoIngGasServFinancieros();
    }

    subtotalIngresosServFinancieros(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaIngresosServFinan.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaIngresosServFinan.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosServFinan[i].componentes.length; j++) {
                if (this.formulario.listaIngresosServFinan[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaIngresosServFinan[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaIngresosServFinan.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosServFinan[i].componentes.length; j++) {
                if (this.formulario.listaIngresosServFinan[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaIngresosServFinan[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaIngresosServFinan[idy].componentes[idx].cantidad = suma;
        this.margenFinancieroNetoIngGasServFinancieros();
    }

    subtotalGastosServFinancieros(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaGastosServFinan.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaGastosServFinan.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosServFinan[i].componentes.length; j++) {
                if (this.formulario.listaGastosServFinan[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaGastosServFinan[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosServFinan.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosServFinan[i].componentes.length; j++) {
                if (this.formulario.listaGastosServFinan[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaGastosServFinan[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaGastosServFinan[idy].componentes[idx].cantidad = suma;
        this.margenFinancieroNetoIngGasServFinancieros();
    }

    margenFinancieroNetoIngGasServFinancieros() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        const idx = this.formulario.listaIngresosServFinan.length - 1;
        const jdx = this.formulario.listaGastosServFinan.length - 1;

        ingreso1 = this.formulario.totalMargenFinanNetoDespProv.componentes[0].cantidad + this.formulario.listaIngresosServFinan[idx].componentes[0].cantidad;
        ingreso2 = this.formulario.totalMargenFinanNetoDespProv.componentes[1].cantidad + this.formulario.listaIngresosServFinan[idx].componentes[1].cantidad;
        ingreso3 = this.formulario.totalMargenFinanNetoDespProv.componentes[2].cantidad + this.formulario.listaIngresosServFinan[idx].componentes[2].cantidad;
        ingreso4 = this.formulario.totalMargenFinanNetoDespProv.componentes[3].cantidad + this.formulario.listaIngresosServFinan[idx].componentes[3].cantidad;

        gasto1 = this.formulario.listaGastosServFinan[jdx].componentes[0].cantidad;
        gasto2 = this.formulario.listaGastosServFinan[jdx].componentes[1].cantidad;
        gasto3 = this.formulario.listaGastosServFinan[jdx].componentes[2].cantidad;
        gasto4 = this.formulario.listaGastosServFinan[jdx].componentes[3].cantidad;

        this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[3].cantidad = ingreso4 - gasto4;

        this.margenOperacional();
    }

    subtotalROF(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let j = 0; j < this.formulario.listaResultadoOpeFinan[0].componentes.length; j++) {
            if (this.formulario.listaResultadoOpeFinan[0].componentes[j].codigo === event.target.id) {
                this.formulario.listaResultadoOpeFinan[0].componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.margenOperacional();
    }

    margenOperacional() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        ingreso1 = this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[0].cantidad;
        ingreso2 = this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[1].cantidad;
        ingreso3 = this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[2].cantidad;
        ingreso4 = this.formulario.totalMargenFinanNetoIngGastosServFinan.componentes[3].cantidad;

        gasto1 = this.formulario.listaResultadoOpeFinan[0].componentes[0].cantidad;
        gasto2 = this.formulario.listaResultadoOpeFinan[0].componentes[1].cantidad;
        gasto3 = this.formulario.listaResultadoOpeFinan[0].componentes[2].cantidad;
        gasto4 = this.formulario.listaResultadoOpeFinan[0].componentes[3].cantidad;

        this.formulario.totalMargenOperacional.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalMargenOperacional.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalMargenOperacional.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalMargenOperacional.componentes[3].cantidad = ingreso4 - gasto4;
        this.margenOperacionalNeto();
    }

    subtotalGastosAdmin(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaGastosAdministracion.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaGastosAdministracion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosAdministracion[i].componentes.length; j++) {
                if (this.formulario.listaGastosAdministracion[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaGastosAdministracion[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosAdministracion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosAdministracion[i].componentes.length; j++) {
                if (this.formulario.listaGastosAdministracion[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaGastosAdministracion[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaGastosAdministracion[idy].componentes[idx].cantidad = suma;
        this.margenOperacionalNeto();
    }

    subtotalDepresaciones(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let j = 0; j < this.formulario.listaDepresacionesAmortizaciones[0].componentes.length; j++) {
            if (this.formulario.listaDepresacionesAmortizaciones[0].componentes[j].codigo === event.target.id) {
                this.formulario.listaDepresacionesAmortizaciones[0].componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.margenOperacionalNeto();
    }

    margenOperacionalNeto() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        const idy = this.formulario.listaGastosAdministracion.length - 1;

        ingreso1 = this.formulario.totalMargenOperacional.componentes[0].cantidad;
        ingreso2 = this.formulario.totalMargenOperacional.componentes[1].cantidad;
        ingreso3 = this.formulario.totalMargenOperacional.componentes[2].cantidad;
        ingreso4 = this.formulario.totalMargenOperacional.componentes[3].cantidad;

        gasto1 = this.formulario.listaGastosAdministracion[idy].componentes[0].cantidad + this.formulario.listaDepresacionesAmortizaciones[0].componentes[0].cantidad;
        gasto2 = this.formulario.listaGastosAdministracion[idy].componentes[1].cantidad + this.formulario.listaDepresacionesAmortizaciones[0].componentes[1].cantidad;
        gasto3 = this.formulario.listaGastosAdministracion[idy].componentes[2].cantidad + this.formulario.listaDepresacionesAmortizaciones[0].componentes[2].cantidad;
        gasto4 = this.formulario.listaGastosAdministracion[idy].componentes[3].cantidad + this.formulario.listaDepresacionesAmortizaciones[0].componentes[3].cantidad;

        this.formulario.totalMargenOperacionalNeto.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalMargenOperacionalNeto.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalMargenOperacionalNeto.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalMargenOperacionalNeto.componentes[3].cantidad = ingreso4 - gasto4;
        this.resultadoOperacion();
    }

    subtotalValuacion(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let j = 0; j < this.formulario.listaValuacionActivosProvisiones[0].componentes.length; j++) {
            if (this.formulario.listaValuacionActivosProvisiones[0].componentes[j].codigo === event.target.id) {
                this.formulario.listaValuacionActivosProvisiones[0].componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.resultadoOperacion();
    }

    resultadoOperacion() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        const idy = this.formulario.listaValuacionActivosProvisiones.length - 1;

        ingreso1 = this.formulario.totalMargenOperacionalNeto.componentes[0].cantidad;
        ingreso2 = this.formulario.totalMargenOperacionalNeto.componentes[1].cantidad;
        ingreso3 = this.formulario.totalMargenOperacionalNeto.componentes[2].cantidad;
        ingreso4 = this.formulario.totalMargenOperacionalNeto.componentes[3].cantidad;

        gasto1 = this.formulario.listaValuacionActivosProvisiones[idy].componentes[0].cantidad;
        gasto2 = this.formulario.listaValuacionActivosProvisiones[idy].componentes[1].cantidad;
        gasto3 = this.formulario.listaValuacionActivosProvisiones[idy].componentes[2].cantidad;
        gasto4 = this.formulario.listaValuacionActivosProvisiones[idy].componentes[3].cantidad;

        this.formulario.totalResultadoOperacion.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalResultadoOperacion.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalResultadoOperacion.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalResultadoOperacion.componentes[3].cantidad = ingreso4 - gasto4;
        this.resultadoAntesImpRenta();
    }

    totalOtrosIngresosGastos() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        ingreso1 = this.formulario.totalOtrosIngresos.componentes[0].cantidad;
        ingreso2 = this.formulario.totalOtrosIngresos.componentes[1].cantidad;
        ingreso3 = this.formulario.totalOtrosIngresos.componentes[2].cantidad;
        ingreso4 = this.formulario.totalOtrosIngresos.componentes[3].cantidad;

        gasto1 = this.formulario.totalOtrosGastos.componentes[0].cantidad;
        gasto2 = this.formulario.totalOtrosGastos.componentes[1].cantidad;
        gasto3 = this.formulario.totalOtrosGastos.componentes[2].cantidad;
        gasto4 = this.formulario.totalOtrosGastos.componentes[3].cantidad;

        this.formulario.totalOtrosIngresosOtrosGastos.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalOtrosIngresosOtrosGastos.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalOtrosIngresosOtrosGastos.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalOtrosIngresosOtrosGastos.componentes[3].cantidad = ingreso4 - gasto4;
        this.resultadoAntesImpRenta();
    }

    resultadoAntesImpRenta() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        ingreso1 = this.formulario.totalResultadoOperacion.componentes[0].cantidad;
        ingreso2 = this.formulario.totalResultadoOperacion.componentes[1].cantidad;
        ingreso3 = this.formulario.totalResultadoOperacion.componentes[2].cantidad;
        ingreso4 = this.formulario.totalResultadoOperacion.componentes[3].cantidad;

        gasto1 = this.formulario.totalOtrosIngresosOtrosGastos.componentes[0].cantidad;
        gasto2 = this.formulario.totalOtrosIngresosOtrosGastos.componentes[1].cantidad;
        gasto3 = this.formulario.totalOtrosIngresosOtrosGastos.componentes[2].cantidad;
        gasto4 = this.formulario.totalOtrosIngresosOtrosGastos.componentes[3].cantidad;

        this.formulario.totalResultadoAntesImpRenta.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalResultadoAntesImpRenta.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalResultadoAntesImpRenta.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalResultadoAntesImpRenta.componentes[3].cantidad = ingreso4 - gasto4;
        this.resultadoNetoEjercicio();
    }

    subtotalImpRent(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let j = 0; j < this.formulario.listaImpuestoRenta[0].componentes.length; j++) {
            if (this.formulario.listaImpuestoRenta[0].componentes[j].codigo === event.target.id) {
                this.formulario.listaImpuestoRenta[0].componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.resultadoNetoEjercicio();
    }

    resultadoNetoEjercicio() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;
        let gasto1 = 0;
        let gasto2 = 0;
        let gasto3 = 0;
        let gasto4 = 0;

        const idx = this.formulario.listaImpuestoRenta.length - 1;

        ingreso1 = this.formulario.totalResultadoAntesImpRenta.componentes[0].cantidad;
        ingreso2 = this.formulario.totalResultadoAntesImpRenta.componentes[1].cantidad;
        ingreso3 = this.formulario.totalResultadoAntesImpRenta.componentes[2].cantidad;
        ingreso4 = this.formulario.totalResultadoAntesImpRenta.componentes[3].cantidad;

        gasto1 = this.formulario.listaImpuestoRenta[idx].componentes[0].cantidad;
        gasto2 = this.formulario.listaImpuestoRenta[idx].componentes[1].cantidad;
        gasto3 = this.formulario.listaImpuestoRenta[idx].componentes[2].cantidad;
        gasto4 = this.formulario.listaImpuestoRenta[idx].componentes[3].cantidad;

        this.formulario.totalResultadoNetoEjercicio.componentes[0].cantidad = ingreso1 - gasto1;
        this.formulario.totalResultadoNetoEjercicio.componentes[1].cantidad = ingreso2 - gasto2;
        this.formulario.totalResultadoNetoEjercicio.componentes[2].cantidad = ingreso3 - gasto3;
        this.formulario.totalResultadoNetoEjercicio.componentes[3].cantidad = ingreso4 - gasto4;
    }
    // -------------------------------------------------------------------
    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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

        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'ff1').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaIngresosIntereses, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosIntereses, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaProvisionesCredDirec, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaIngresosServFinan, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosServFinan, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaResultadoOpeFinan, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosAdministracion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaDepresacionesAmortizaciones, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaValuacionActivosProvisiones, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaOtrosIngresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaOtrosGastos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaImpuestoRenta, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalProvisionesCredDirec, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalOtrosIngresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalOtrosGastos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalMargenFinanBruto, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalMargenFinanNetoDespProv, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalMargenFinanNetoIngGastosServFinan, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalMargenOperacional, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalMargenOperacionalNeto, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalResultadoOperacion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalOtrosIngresosOtrosGastos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalResultadoAntesImpRenta, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalResultadoNetoEjercicio, this.nCodffina);
                this.verControlInformacion();
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
