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
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { FormularioN1 } from './formulario-n1.model';
import { Constants } from './constants';
import { FormControl } from '@angular/forms';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { EmpresaServicio } from './empresaServicio.model';

@Component({
    selector: 'jhi-formulario-financiero-n1',
    templateUrl: './formulario-financiero-n1.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroN1Component implements OnInit, OnDestroy {
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
    display: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formGroup: FormGroup;
    formulario: FormularioN1;
    constantes: Constants;
    empresaServicio: EmpresaServicio;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private formularioLaboralService: FormularioFinancieroService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
        // Servicios
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
    ) {
        this.formGroup = this.fb.group({ 'name': ['', Validators.required] });
    }

    loadAll() {
        this.display = false;
        this.empresaServicio = new EmpresaServicio();
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    load(nCodfperf) { }

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
        this.construirFormulario();
    }

    mostrarDialog() {
        this.empresaServicio = new EmpresaServicio();
        this.display = true;
        this.editar = false;
    }

    cancelarModal() {
        this.empresaServicio = new EmpresaServicio();
        this.display = false;
        this.editar = false;
    }

    guardarModal() {
        const t = new Tabla();
        if (!this.editar) {
            t.id = this.formulario.listaEmpresaServicios.length;
        } else {
            t.id = this.empresaServicio.id;
        }
        t.descripcion = this.empresaServicio.concepto;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.empresaServicio.concepto + '_' + this.formulario.listaEmpresaServicios.length + '_anioA';
        componenteAnioA.cantidad = this.empresaServicio.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.empresaServicio.concepto + '_' + this.formulario.listaEmpresaServicios.length + '_anioB';
        componenteAnioB.cantidad = this.empresaServicio.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.empresaServicio.concepto + '_' + this.formulario.listaEmpresaServicios.length + '_anioC';
        componenteAnioC.cantidad = this.empresaServicio.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.empresaServicio.concepto + '_' + this.formulario.listaEmpresaServicios.length + '_anioD';
        componenteAnioD.cantidad = this.empresaServicio.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editar) {
            const bean: Tabla = this.formulario.listaEmpresaServicios.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaEmpresaServicios.indexOf(bean);
                this.formulario.listaEmpresaServicios[index] = t;
            }
        } else {
            this.formulario.listaEmpresaServicios.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaEmpresaServicios.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaEmpresaServicios[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.listaEmpresaServicios[i].componentes[0].cantidad;
                        break;
                    case 1: suma2 += this.formulario.listaEmpresaServicios[i].componentes[1].cantidad;
                        break;
                    case 2: suma3 += this.formulario.listaEmpresaServicios[i].componentes[2].cantidad;
                        break;
                    case 3: suma4 += this.formulario.listaEmpresaServicios[i].componentes[3].cantidad;
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalServicios.componentes[0].cantidad = suma1 + this.empresaServicio.anioA;
        this.formulario.totalServicios.componentes[1].cantidad = suma2 + this.empresaServicio.anioB;
        this.formulario.totalServicios.componentes[2].cantidad = suma3 + this.empresaServicio.anioC;
        this.formulario.totalServicios.componentes[3].cantidad = suma4 + this.empresaServicio.anioD;
        this.totalCostosVentasOperacionServicios();

        this.display = false;
        this.empresaServicio = new EmpresaServicio();
        this.editar = false;
    }

    editarComponente(tabla: Tabla) {
        this.display = true;
        this.editar = true;
        this.empresaServicio = new EmpresaServicio();
        this.empresaServicio.id = tabla.id;
        this.empresaServicio.concepto = tabla.descripcion;
        this.empresaServicio.anioA = tabla.componentes[0].cantidad;
        this.empresaServicio.anioB = tabla.componentes[1].cantidad;
        this.empresaServicio.anioC = tabla.componentes[2].cantidad;
        this.empresaServicio.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponente(tabla: Tabla) {
        const t = this.formulario.listaEmpresaServicios.splice(this.formulario.listaEmpresaServicios.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalServicios.componentes[0].cantidad -= tabla.componentes[0].cantidad;
        this.formulario.totalServicios.componentes[1].cantidad -= tabla.componentes[1].cantidad;
        this.formulario.totalServicios.componentes[2].cantidad -= tabla.componentes[2].cantidad;
        this.formulario.totalServicios.componentes[3].cantidad -= tabla.componentes[3].cantidad;
        this.totalCostosVentasOperacionServicios();
    }

    construirFormulario() {
        this.formulario = new FormularioN1();
        // Creacion de Tabla Ingresos
        const ingresosDesc: string[] = [this.constantes.FORM1_TOTAL_DE_INGRESOS];
        const ingresosCod: string[] = [this.constantes.FORM1_COD_TOTAL_DE_INGRESOS];
        this.formulario.listaTotalIngresos = this.crearcomponentes(ingresosDesc, ingresosCod);

        // Creacion de Tabla COSTOS DE VENTAS U OPERACIÓN
        //  I. EMPRESAS DE PRODUCCIÓN (1)
        const empresasProdDesc: string[] = [this.constantes.FORM1_MATERIA_PRIMA,
        this.constantes.FORM1_MANO_OBRA_DIRECTA,
        this.constantes.FORM1_GASTOS_FABRICACION,
        this.constantes.FORM1_SUB_TOTAL,
        this.constantes.FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO,
        this.constantes.FORM1_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO,
        this.constantes.FORM1_SUBTOTAL_PRODUCCION];
        const empresasProdCod: string[] = [this.constantes.FORM1_COD_MATERIA_PRIMA,
        this.constantes.FORM1_COD_MANO_OBRA_DIRECTA,
        this.constantes.FORM1_COD_GASTOS_FABRICACION,
        this.constantes.FORM1_COD_SUB_TOTAL,
        this.constantes.FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_TERMINADO,
        this.constantes.FORM1_COD_DIFERENCIA_INVENTARIO_PRODUCTO_PROCESO,
        this.constantes.FORM1_COD_SUBTOTAL_PRODUCCION];

        this.formulario.listaEmpresaProduccion = this.crearlistacomponentes(empresasProdDesc, empresasProdCod, true);

        //  II. EMPRESAS DE SERVICIOS O COMERCIALIZADORA (1)
        const totalServiciosDesc: string[] = [this.constantes.FORM1_SUBTOTAL_SERVICIOS];
        const totalServiciosCod: string[] = [this.constantes.FORM1_COD_SUBTOTAL_SERVICIOS];
        this.formulario.totalServicios = this.creartotales(totalServiciosDesc, totalServiciosCod);

        this.formulario.listaEmpresaServicios = new Array<Tabla>();
        // TOTALES DE COSTOS DE VENTAS U OPERACIÓN
        const totalVenOpeSerDesc: string[] = [this.constantes.FORM1_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS];
        const totalVenOpeSerCod: string[] = [this.constantes.FORM1_COD_TOTAL_COSTOS_TOTALES_VENTAS_OPERACIONES_SERVICIOS];

        this.formulario.totalCostos = this.creartotales(totalVenOpeSerDesc, totalVenOpeSerCod);

        const utiBrutaDesc: string[] = [this.constantes.FORM1_UTILIDAD_BRUTA];
        const utiBrutaCod: string[] = [this.constantes.FORM1_COD_UTILIDAD_BRUTA];

        this.formulario.utilidadBrutaCostos = this.creartotales(utiBrutaDesc, utiBrutaCod);

        // Creacion de Tabla GASTOS OPERATIVOS
        const gastosOp1Desc: string[] = [this.constantes.FORM1_GASTOS_VENTAS_DISTRIBUCION,
        this.constantes.FORM1_GASTOS_ADMINISTRACION];
        const gastosOp1Cod: string[] = [this.constantes.FORM1_COD_GASTOS_VENTAS_DISTRIBUCION,
        this.constantes.FORM1_COD_GASTOS_ADMINISTRACION];

        this.formulario.listaGastosOperativos1 = this.crearlistacomponentes(gastosOp1Desc, gastosOp1Cod, false);

        // Totales de Gastos Operativos 1
        const totalGastosOp1Desc: string[] = [this.constantes.FORM1_TOTAL_GASTOS_OPERATIVOS];
        const totalGastosOp1Cod: string[] = [this.constantes.FORM1_COD_TOTAL_GASTOS_OPERATIVOS];

        this.formulario.totalGastos = this.creartotales(totalGastosOp1Desc, totalGastosOp1Cod);

        const utiGastosOp1Desc: string[] = [this.constantes.FORM1_UTILIDAD_OPERATIVA];
        const utiGastosOp1Cod: string[] = [this.constantes.FORM1_COD_UTILIDAD_OPERATIVA];

        this.formulario.utilidadOperativa = this.creartotales(utiGastosOp1Desc, utiGastosOp1Cod);

        // Gastos Operativos 2
        const gastosOp2Desc: string[] = [this.constantes.FORM1_INGRESOS_FINANCIEROS,
        this.constantes.FORM1_GASTOS_FINANCIEROS,
        this.constantes.FORM1_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO,
        this.constantes.FORM1_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO,
        this.constantes.FORM1_OTROS_INGRESOS,
        this.constantes.FORM1_OTROS_EGRESOS,
        this.constantes.FORM1_SUBTOTAL_GASTOS_OPERATIVOS];
        const gastosOp2Cod: string[] = [this.constantes.FORM1_COD_INGRESOS_FINANCIEROS,
        this.constantes.FORM1_COD_GASTOS_FINANCIEROS,
        this.constantes.FORM1_COD_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO,
        this.constantes.FORM1_COD_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO,
        this.constantes.FORM1_COD_OTROS_INGRESOS,
        this.constantes.FORM1_COD_OTROS_EGRESOS,
        this.constantes.FORM1_COD_SUBTOTAL_GASTOS_OPERATIVOS];

        this.formulario.listaGastosOperativos2 = this.crearlistacomponentes(gastosOp2Desc, gastosOp2Cod, true);

        // Totales Gastos Operativos 2
        const utiGastosOp2Desc: string[] = [this.constantes.FORM1_UTILIDAD_ANTES_PARTICIPACIONES];
        const utiGastosOp2Cod: string[] = [this.constantes.FORM1_COD_UTILIDAD_ANTES_PARTICIPACIONES];

        this.formulario.utilidadAntParti = this.creartotales(utiGastosOp2Desc, utiGastosOp2Cod);

        // Participacion de Trabajadores
        const partiTrabDesc: string[] = [this.constantes.FORM1_PARTICIPACION_TRABAJADORES];
        const partiTrabCod: string[] = [this.constantes.FORM1_COD_PARTICIPACION_TRABAJADORES];

        this.formulario.listaParticipacion = this.crearlistacomponentes(partiTrabDesc, partiTrabCod, false);

        // Utilidades Antes de Impuesto
        const utiImpDesc: string[] = [this.constantes.FORM1_UTILIDAD_ANTES_IMPUESTOS];
        const utiImpCod: string[] = [this.constantes.FORM1_COD_UTILIDAD_ANTES_IMPUESTOS];

        this.formulario.utilidadAntImp = this.creartotales(utiImpDesc, utiImpCod);

        // Impuesto a la Renta
        const impRentaDesc: string[] = [this.constantes.FORM1_IMPUESTO_RENTA];
        const impRentaCod: string[] = [this.constantes.FORM1_COD_IMPUESTO_RENTA];

        this.formulario.listaImpuestoRenta = this.crearlistacomponentes(impRentaDesc, impRentaCod, false);

        // Utilidad del Ejercicio
        const utilidadDesc: string[] = [this.constantes.FORM1_UTILIDAD_EJERCICIO];
        const utilidadCod: string[] = [this.constantes.FORM1_COD_UTILIDAD_EJERCICIO];

        this.formulario.utilidadEjercicio = this.creartotales(utilidadDesc, utilidadCod);

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
    subtotalEmpresaProduccion(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaEmpresaProduccion.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaEmpresaProduccion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaEmpresaProduccion[i].componentes.length; j++) {
                if (this.formulario.listaEmpresaProduccion[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaEmpresaProduccion[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaEmpresaProduccion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaEmpresaProduccion[i].componentes.length; j++) {
                if (this.formulario.listaEmpresaProduccion[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaEmpresaProduccion[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaEmpresaProduccion[idy].componentes[idx].cantidad = suma;
        this.totalCostosVentasOperacionServicios();
    }

    subtotalIngresos(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let i = 0; i < this.formulario.listaTotalIngresos.componentes.length; i++) {
            if (this.formulario.listaTotalIngresos.componentes[i].codigo === event.target.id) {
                this.formulario.listaTotalIngresos.componentes[i].cantidad = Number(event.target.value);
            }
        }

        this.totalUtilidadBruta();
        this.totalUtilidadAntesParticipaciones();
        this.utilidadAntesImpuesto();
        this.utilidadEjercicio();
    }

    totalCostosVentasOperacionServicios() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        const idx = this.formulario.listaEmpresaProduccion.length - 1;

        suma1 += this.formulario.listaEmpresaProduccion[idx].componentes[0].cantidad;
        suma2 += this.formulario.listaEmpresaProduccion[idx].componentes[1].cantidad;
        suma3 += this.formulario.listaEmpresaProduccion[idx].componentes[2].cantidad;
        suma4 += this.formulario.listaEmpresaProduccion[idx].componentes[3].cantidad;

        suma1 += this.formulario.totalServicios.componentes[0].cantidad;
        suma2 += this.formulario.totalServicios.componentes[1].cantidad;
        suma3 += this.formulario.totalServicios.componentes[2].cantidad;
        suma4 += this.formulario.totalServicios.componentes[3].cantidad;

        this.formulario.totalCostos.componentes[0].cantidad = suma1;
        this.formulario.totalCostos.componentes[1].cantidad = suma2;
        this.formulario.totalCostos.componentes[2].cantidad = suma3;
        this.formulario.totalCostos.componentes[3].cantidad = suma4;
        this.totalUtilidadBruta();
    }

    totalUtilidadBruta() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        suma1 = this.formulario.listaTotalIngresos.componentes[0].cantidad;
        suma2 = this.formulario.listaTotalIngresos.componentes[1].cantidad;
        suma3 = this.formulario.listaTotalIngresos.componentes[2].cantidad;
        suma4 = this.formulario.listaTotalIngresos.componentes[3].cantidad;

        let resta1 = 0;
        let resta2 = 0;
        let resta3 = 0;
        let resta4 = 0;

        resta1 = this.formulario.totalCostos.componentes[0].cantidad;
        resta2 = this.formulario.totalCostos.componentes[1].cantidad;
        resta3 = this.formulario.totalCostos.componentes[2].cantidad;
        resta4 = this.formulario.totalCostos.componentes[3].cantidad;

        this.formulario.utilidadBrutaCostos.componentes[0].cantidad = suma1 - resta1;
        this.formulario.utilidadBrutaCostos.componentes[1].cantidad = suma2 - resta2;
        this.formulario.utilidadBrutaCostos.componentes[2].cantidad = suma3 - resta3;
        this.formulario.utilidadBrutaCostos.componentes[3].cantidad = suma4 - resta4;
        this.totalUtilidadOperativa();
    }

    subtotalGastosOperativos1(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        for (let i = 0; i < this.formulario.listaGastosOperativos1.length; i++) {
            for (let j = 0; j < this.formulario.listaGastosOperativos1[i].componentes.length; j++) {
                if (this.formulario.listaGastosOperativos1[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaGastosOperativos1[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosOperativos1.length; i++) {
            for (let j = 0; j < this.formulario.listaGastosOperativos1[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.listaGastosOperativos1[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.listaGastosOperativos1[i].componentes[j].cantidad;
                        break;
                    case 2: suma3 += this.formulario.listaGastosOperativos1[i].componentes[j].cantidad;
                        break;
                    case 3: suma4 += this.formulario.listaGastosOperativos1[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        this.formulario.totalGastos.componentes[0].cantidad = suma1;
        this.formulario.totalGastos.componentes[1].cantidad = suma2;
        this.formulario.totalGastos.componentes[2].cantidad = suma3;
        this.formulario.totalGastos.componentes[3].cantidad = suma4;

        this.totalUtilidadOperativa();
    }

    totalUtilidadOperativa() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        suma1 = this.formulario.utilidadBrutaCostos.componentes[0].cantidad;
        suma2 = this.formulario.utilidadBrutaCostos.componentes[1].cantidad;
        suma3 = this.formulario.utilidadBrutaCostos.componentes[2].cantidad;
        suma4 = this.formulario.utilidadBrutaCostos.componentes[3].cantidad;

        let resta1 = 0;
        let resta2 = 0;
        let resta3 = 0;
        let resta4 = 0;

        resta1 = this.formulario.totalGastos.componentes[0].cantidad;
        resta2 = this.formulario.totalGastos.componentes[1].cantidad;
        resta3 = this.formulario.totalGastos.componentes[2].cantidad;
        resta4 = this.formulario.totalGastos.componentes[3].cantidad;

        this.formulario.utilidadOperativa.componentes[0].cantidad = suma1 - resta1;
        this.formulario.utilidadOperativa.componentes[1].cantidad = suma2 - resta2;
        this.formulario.utilidadOperativa.componentes[2].cantidad = suma3 - resta3;
        this.formulario.utilidadOperativa.componentes[3].cantidad = suma4 - resta4;

    }

    subtotalGastosOperativos2(event: any) {
        const columna: string[] = event.target.id.split('_');
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        const idx = this.formulario.listaGastosOperativos2.length - 1;
        for (let i = 0; i < this.formulario.listaGastosOperativos2.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosOperativos2[i].componentes.length; j++) {
                if (this.formulario.listaGastosOperativos2[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaGastosOperativos2[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaGastosOperativos2.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosOperativos2[i].componentes.length; j++) {
                const componente: string[] = this.formulario.listaGastosOperativos2[i].componentes[j].codigo.split('_');
                switch (componente[0] + '_' + componente[1]) {
                    case this.constantes.FORM1_COD_INGRESOS_FINANCIEROS:
                        switch (j) {
                            case 0: suma1 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 1:  suma2 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 2:  suma3 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 3:  suma4 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                        }
                    break;
                    case this.constantes.FORM1_COD_GASTOS_FINANCIEROS:
                    switch (j) {
                        case 0: suma1 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 1:  suma2 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 2:  suma3 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 3:  suma4 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        }
                    break;
                    case this.constantes.FORM1_COD_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO:
                        switch (j) {
                            case 0: suma1 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 1:  suma2 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 2:  suma3 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 3:  suma4 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                        }
                    break;
                    case this.constantes.FORM1_COD_COSTO_ENAJENACION_VALORES_BIENES_ACTIVO_FIJO:
                    switch (j) {
                        case 0: suma1 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 1:  suma2 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 2:  suma3 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 3:  suma4 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                    }
                    break;
                    case this.constantes.FORM1_COD_OTROS_INGRESOS:
                        switch (j) {
                            case 0: suma1 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 1:  suma2 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 2:  suma3 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                            case 3:  suma4 += this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                                break;
                        }
                    break;
                    case this.constantes.FORM1_COD_OTROS_EGRESOS:
                    switch (j) {
                        case 0: suma1 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 1:  suma2 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 2:  suma3 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                        case 3:  suma4 -= this.formulario.listaGastosOperativos2[i].componentes[j].cantidad;
                            break;
                    }
                    break;
                }
            }
        }

        this.formulario.listaGastosOperativos2[idx].componentes[0].cantidad = suma1;
        this.formulario.listaGastosOperativos2[idx].componentes[1].cantidad = suma2;
        this.formulario.listaGastosOperativos2[idx].componentes[2].cantidad = suma3;
        this.formulario.listaGastosOperativos2[idx].componentes[3].cantidad = suma4;
        this.totalUtilidadAntesParticipaciones();
        this.utilidadAntesImpuesto();
        this.utilidadEjercicio();
    }

    totalUtilidadAntesParticipaciones() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        const idx = this.formulario.listaGastosOperativos2.length - 1;

        suma1 = this.formulario.utilidadOperativa.componentes[0].cantidad;
        suma2 = this.formulario.utilidadOperativa.componentes[1].cantidad;
        suma3 = this.formulario.utilidadOperativa.componentes[2].cantidad;
        suma4 = this.formulario.utilidadOperativa.componentes[3].cantidad;

        let resta1 = 0;
        let resta2 = 0;
        let resta3 = 0;
        let resta4 = 0;

        resta1 = this.formulario.listaGastosOperativos2[idx].componentes[0].cantidad;
        resta2 = this.formulario.listaGastosOperativos2[idx].componentes[1].cantidad;
        resta3 = this.formulario.listaGastosOperativos2[idx].componentes[2].cantidad;
        resta4 = this.formulario.listaGastosOperativos2[idx].componentes[3].cantidad;

        this.formulario.utilidadAntParti.componentes[0].cantidad = suma1 - resta1;
        this.formulario.utilidadAntParti.componentes[1].cantidad = suma2 - resta2;
        this.formulario.utilidadAntParti.componentes[2].cantidad = suma3 - resta3;
        this.formulario.utilidadAntParti.componentes[3].cantidad = suma4 - resta4;
    }

    participacionTrabajadores(event: any) {
        for (let i = 0; i < this.formulario.listaParticipacion.length; i++) {
            for (let j = 0; j < this.formulario.listaParticipacion[i].componentes.length; j++) {
                if (this.formulario.listaParticipacion[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaParticipacion[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
        this.utilidadAntesImpuesto();
        this.utilidadEjercicio();
    }

    utilidadAntesImpuesto() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        suma1 = this.formulario.utilidadAntParti.componentes[0].cantidad;
        suma2 = this.formulario.utilidadAntParti.componentes[1].cantidad;
        suma3 = this.formulario.utilidadAntParti.componentes[2].cantidad;
        suma4 = this.formulario.utilidadAntParti.componentes[3].cantidad;

        let resta1 = 0;
        let resta2 = 0;
        let resta3 = 0;
        let resta4 = 0;

        resta1 = this.formulario.listaParticipacion[0].componentes[0].cantidad;
        resta2 = this.formulario.listaParticipacion[0].componentes[1].cantidad;
        resta3 = this.formulario.listaParticipacion[0].componentes[2].cantidad;
        resta4 = this.formulario.listaParticipacion[0].componentes[3].cantidad;

        this.formulario.utilidadAntImp.componentes[0].cantidad = suma1 - resta1;
        this.formulario.utilidadAntImp.componentes[1].cantidad = suma2 - resta2;
        this.formulario.utilidadAntImp.componentes[2].cantidad = suma3 - resta3;
        this.formulario.utilidadAntImp.componentes[3].cantidad = suma4 - resta4;
    }

    impuestoRenta(event: any) {
        for (let i = 0; i < this.formulario.listaImpuestoRenta.length; i++) {
            for (let j = 0; j < this.formulario.listaImpuestoRenta[i].componentes.length; j++) {
                if (this.formulario.listaImpuestoRenta[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaImpuestoRenta[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
        this.utilidadEjercicio();
    }

    utilidadEjercicio() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        suma1 = this.formulario.utilidadAntImp.componentes[0].cantidad;
        suma2 = this.formulario.utilidadAntImp.componentes[1].cantidad;
        suma3 = this.formulario.utilidadAntImp.componentes[2].cantidad;
        suma4 = this.formulario.utilidadAntImp.componentes[3].cantidad;

        let resta1 = 0;
        let resta2 = 0;
        let resta3 = 0;
        let resta4 = 0;

        resta1 = this.formulario.listaImpuestoRenta[0].componentes[0].cantidad;
        resta2 = this.formulario.listaImpuestoRenta[0].componentes[1].cantidad;
        resta3 = this.formulario.listaImpuestoRenta[0].componentes[2].cantidad;
        resta4 = this.formulario.listaImpuestoRenta[0].componentes[3].cantidad;

        this.formulario.utilidadEjercicio.componentes[0].cantidad = suma1 - resta1;
        this.formulario.utilidadEjercicio.componentes[1].cantidad = suma2 - resta2;
        this.formulario.utilidadEjercicio.componentes[2].cantidad = suma3 - resta3;
        this.formulario.utilidadEjercicio.componentes[3].cantidad = suma4 - resta4;
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

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
