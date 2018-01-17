import { Component, OnInit, OnDestroy, } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { ComboModel } from '../../general/combobox.model';
import { Message } from 'primeng/components/common/api';
import { DatePipe } from '@angular/common';
import { FormularioFinancieroPrivadoService } from './index';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Formperfil } from '../../../entities/formperfil/index';
import { Solicform } from '../../../entities/solicform/index';
import { Solicitud } from '../../../entities/solicitud/index';
import { Constants } from './constants';
import { Anexo1D } from './anexo1d.model';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { DetalleCuenta } from './detallecuenta.model';
import { FormfinancDetalleService, FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-privado-anexo1d',
    templateUrl: './formulario-financiero-privado-anexo1d.component.html',
    styleUrls: ['formulario-financiero-privado.scss']
})

export class FormularioFinancieroPrivadoAnexo1DComponent implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editarGastosVentasDistribucion: boolean;
    editarGastosVenDistriServPorTerceros: boolean;
    editarGastosDiversionGestion: boolean;
    editarProvisiones: boolean;
    editarGastosAdministracion: boolean;
    editarGastosDentroAdminServPorTerceros: boolean;
    editarIngresosFinancieros: boolean;
    editarGastosFinancieros: boolean;
    editarOtrosIngresos: boolean;
    editarOtrosEgresos: boolean;
    displayGastosVentasDistribucion: boolean;
    displayGastosVenDistriServPorTerceros: boolean;
    displayGastosDiversionGestion: boolean;
    displayProvisiones: boolean;
    displayGastosAdministracion: boolean;
    displayGastosDentroAdminServPorTerceros: boolean;
    displayIngresosFinancieros: boolean;
    displayGastosFinancieros: boolean;
    displayOtrosIngresos: boolean;
    displayOtrosEgresos: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formulario: Anexo1D;
    constantes: Constants;
    gastosVentasDistribucion: DetalleCuenta;
    gastosVenDistriServPorTerceros: DetalleCuenta;
    gastosDiversionGestion: DetalleCuenta;
    provisiones: DetalleCuenta;
    gastosAdministracion: DetalleCuenta;
    gastosDentroAdminServPorTerceros: DetalleCuenta;
    ingresosFinancieros: DetalleCuenta;
    gastosFinancieros: DetalleCuenta;
    otrosIngresos: DetalleCuenta;
    otrosEgresos: DetalleCuenta;

    nCodffina: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private formularioLaboralService: FormularioFinancieroPrivadoService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
        private formfinancdetalleService: FormfinancDetalleService,
    ) { }

    loadAll() {
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
        this.formulario = new Anexo1D();
        this.anios = Array<number>();
        this.anios.push(fecha - 3);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.anios.push(fecha);

        this.displayGastosVentasDistribucion = false;
        this.displayGastosVenDistriServPorTerceros = false;
        this.displayGastosDiversionGestion = false;
        this.displayProvisiones = false;
        this.displayGastosAdministracion = false;
        this.displayGastosDentroAdminServPorTerceros = false;
        this.displayIngresosFinancieros = false;
        this.displayGastosFinancieros = false;
        this.displayOtrosIngresos = false;
        this.displayOtrosEgresos = false;

        this.editarGastosVentasDistribucion = false;
        this.editarGastosVenDistriServPorTerceros = false;
        this.editarGastosDiversionGestion = false;
        this.editarProvisiones = false;
        this.editarGastosAdministracion = false;
        this.editarGastosDentroAdminServPorTerceros = false;
        this.editarIngresosFinancieros = false;
        this.editarGastosFinancieros = false;
        this.editarOtrosIngresos = false;
        this.editarOtrosEgresos = false;

        this.gastosVentasDistribucion = new DetalleCuenta();
        this.gastosVenDistriServPorTerceros = new DetalleCuenta();
        this.gastosDiversionGestion = new DetalleCuenta();
        this.provisiones = new DetalleCuenta();
        this.gastosAdministracion = new DetalleCuenta();
        this.gastosDentroAdminServPorTerceros = new DetalleCuenta();
        this.ingresosFinancieros = new DetalleCuenta();
        this.gastosFinancieros = new DetalleCuenta();
        this.otrosIngresos = new DetalleCuenta();
        this.otrosEgresos = new DetalleCuenta();

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
    construirFormulario() {
        this.formulario = new Anexo1D();
        this.formulario.listaGastosVentasDistribucion = new Array<Tabla>();
        this.formulario.listaGastosVenDistriServPorTerceros = new Array<Tabla>();
        this.formulario.listaGastosDiversionGestion = new Array<Tabla>();
        this.formulario.listaProvisiones = new Array<Tabla>();
        this.formulario.listaGastosAdministracion = new Array<Tabla>();
        this.formulario.listaGastosDentroAdminServPorTerceros = new Array<Tabla>();
        this.formulario.listaIngresosFinancieros = new Array<Tabla>();
        this.formulario.listaGastosFinancieros = new Array<Tabla>();
        this.formulario.listaOtrosIngresos = new Array<Tabla>();
        this.formulario.listaOtrosEgresos = new Array<Tabla>();

        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION, 1);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS, 2);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION, 3);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_PROVISIONES, 4);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_GASTOS_ADMINISTRACION, 5);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS, 6);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_INGRESOS_FINANCIEROS, 7);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_GASTOS_FINANCIEROS, 8);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_OTROS_INGRESOS, 9);
        this.obtenerValores(this.constantes.FORM1ANEX1D_COD_OTROS_EGRESOS, 10);

        const totalGastosVentasDistribucionDesc: string[] = [this.constantes.FORM1ANEX1D_GASTOS_VENTAS_DISTRIBUCION];
        const totalGastosVentasDistribucionCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_GASTOS_VENTAS_DISTRIBUCION];

        const totalGastosVenDistriServPorTercerosDesc: string[] = [this.constantes.FORM1ANEX1D_GASTOS_SERVICIOS_PRESTADOS_TERCEROS];
        const totalGastosVenDistriServPorTercerosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_GASTOS_SERVICIOS_PRESTADOS_TERCEROS];

        const totalGastosDiversionGestionDesc: string[] = [this.constantes.FORM1ANEX1D_GASTOS_CARGOS_DIVERSOS_GESTION];
        const totalGastosDiversionGestionCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_GASTOS_CARGOS_DIVERSOS_GESTION];

        const totalProvisionesDesc: string[] = [this.constantes.FORM1ANEX1D_PROVISIONES];
        const totalProvisionesCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_PROVISIONES];

        const totalGastosAdministracionDesc: string[] = [this.constantes.FORM1ANEX1D_GASTOS_ADMINISTRACION];
        const totalGastosAdministracionCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_GASTOS_ADMINISTRACION];

        const totalGastosDentroAdminServPorTercerosDesc: string[] = [this.constantes.FORM1ANEX1D_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS];
        const totalGastosDentroAdminServPorTercerosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS];

        const totalIngresosFinancierosDesc: string[] = [this.constantes.FORM1ANEX1D_INGRESOS_FINANCIEROS];
        const totalIngresosFinancierosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_INGRESOS_FINANCIEROS];

        const totalGastosFinancierosDesc: string[] = [this.constantes.FORM1ANEX1D_GASTOS_FINANCIEROS];
        const totalGastosFinancierosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_GASTOS_FINANCIEROS];

        const totalOtrosIngresosDesc: string[] = [this.constantes.FORM1ANEX1D_OTROS_INGRESOS];
        const totalOtrosIngresosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_OTROS_INGRESOS];

        const totalOtrosEgresosDesc: string[] = [this.constantes.FORM1ANEX1D_OTROS_EGRESOS];
        const totalOtrosEgresosCod: string[] = [this.constantes.FORM1ANEX1D_COD_TOTAL_OTROS_EGRESOS];

        this.formulario.totalGastosVentasDistribucion = this.creartotales(totalGastosVentasDistribucionDesc, totalGastosVentasDistribucionCod);
        this.formulario.totalGastosVenDistriServPorTerceros = this.creartotales(totalGastosVenDistriServPorTercerosDesc, totalGastosVenDistriServPorTercerosCod);
        this.formulario.totalGastosDiversionGestion = this.creartotales(totalGastosDiversionGestionDesc, totalGastosDiversionGestionCod);
        this.formulario.totalProvisiones = this.creartotales(totalProvisionesDesc, totalProvisionesCod);
        this.formulario.totalGastosAdministracion = this.creartotales(totalGastosAdministracionDesc, totalGastosAdministracionCod);
        this.formulario.totalGastosDentroAdminServPorTerceros = this.creartotales(totalGastosDentroAdminServPorTercerosDesc, totalGastosDentroAdminServPorTercerosCod);
        this.formulario.totalIngresosFinancieros = this.creartotales(totalIngresosFinancierosDesc, totalIngresosFinancierosCod);
        this.formulario.totalGastosFinancieros = this.creartotales(totalGastosFinancierosDesc, totalGastosFinancierosCod);
        this.formulario.totalOtrosIngresos = this.creartotales(totalOtrosIngresosDesc, totalOtrosIngresosCod);
        this.formulario.totalOtrosEgresos = this.creartotales(totalOtrosEgresosDesc, totalOtrosEgresosCod);

    }

    obtenerComponente(tabla: Tabla[], i: number, codigo: string) {
        this.formfinancdetalleService.obtenerComponente(this.nCodffina, codigo).subscribe(
            (formfinancdetalle) => {
                if (formfinancdetalle !== undefined) {
                    tabla[0].componentes[i].cantidad = formfinancdetalle.nValffina;
                    tabla[0].componentes[i].id = formfinancdetalle.nCodfdetal;
                    tabla[0].componentes[i].vUsureg = formfinancdetalle.vUsuareg;
                    tabla[0].componentes[i].tFecReg = formfinancdetalle.tFecreg;
                    tabla[0].componentes[i].nSedeReg = formfinancdetalle.nSedereg;
                }
            }
        );
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
                                if (this.formulario.listaGastosVentasDistribucion[i] === undefined) {
                                    this.formulario.listaGastosVentasDistribucion[i] = new Tabla();
                                    if (this.formulario.listaGastosVentasDistribucion[i].componentes === undefined) {
                                        this.formulario.listaGastosVentasDistribucion[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosVentasDistribucion[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosVentasDistribucion[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosVentasDistribucion[i].componentes.push(comp);
                                break;
                            case 2:
                                if (this.formulario.listaGastosVenDistriServPorTerceros[i] === undefined) {
                                    this.formulario.listaGastosVenDistriServPorTerceros[i] = new Tabla();
                                    if (this.formulario.listaGastosVenDistriServPorTerceros[i].componentes === undefined) {
                                        this.formulario.listaGastosVenDistriServPorTerceros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosVenDistriServPorTerceros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosVenDistriServPorTerceros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosVenDistriServPorTerceros[i].componentes.push(comp);
                                break;
                            case 3:
                                if (this.formulario.listaGastosDiversionGestion[i] === undefined) {
                                    this.formulario.listaGastosDiversionGestion[i] = new Tabla();
                                    if (this.formulario.listaGastosDiversionGestion[i].componentes === undefined) {
                                        this.formulario.listaGastosDiversionGestion[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosDiversionGestion[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosDiversionGestion[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosDiversionGestion[i].componentes.push(comp);
                                break;
                            case 4:
                                if (this.formulario.listaProvisiones[i] === undefined) {
                                    this.formulario.listaProvisiones[i] = new Tabla();
                                    if (this.formulario.listaProvisiones[i].componentes === undefined) {
                                        this.formulario.listaProvisiones[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaProvisiones[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaProvisiones[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaProvisiones[i].componentes.push(comp);
                                break;
                            case 5:
                                if (this.formulario.listaGastosAdministracion[i] === undefined) {
                                    this.formulario.listaGastosAdministracion[i] = new Tabla();
                                    if (this.formulario.listaGastosAdministracion[i].componentes === undefined) {
                                        this.formulario.listaGastosAdministracion[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosAdministracion[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosAdministracion[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosAdministracion[i].componentes.push(comp);
                                break;
                            case 6:
                                if (this.formulario.listaGastosDentroAdminServPorTerceros[i] === undefined) {
                                    this.formulario.listaGastosDentroAdminServPorTerceros[i] = new Tabla();
                                    if (this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes === undefined) {
                                        this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosDentroAdminServPorTerceros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosDentroAdminServPorTerceros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes.push(comp);
                                break;
                            case 7:
                                if (this.formulario.listaIngresosFinancieros[i] === undefined) {
                                    this.formulario.listaIngresosFinancieros[i] = new Tabla();
                                    if (this.formulario.listaIngresosFinancieros[i].componentes === undefined) {
                                        this.formulario.listaIngresosFinancieros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaIngresosFinancieros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaIngresosFinancieros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaIngresosFinancieros[i].componentes.push(comp);
                                break;
                            case 8:
                                if (this.formulario.listaGastosFinancieros[i] === undefined) {
                                    this.formulario.listaGastosFinancieros[i] = new Tabla();
                                    if (this.formulario.listaGastosFinancieros[i].componentes === undefined) {
                                        this.formulario.listaGastosFinancieros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaGastosFinancieros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaGastosFinancieros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaGastosFinancieros[i].componentes.push(comp);
                                break;
                            case 9:
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
                            case 10:
                                if (this.formulario.listaOtrosEgresos[i] === undefined) {
                                    this.formulario.listaOtrosEgresos[i] = new Tabla();
                                    if (this.formulario.listaOtrosEgresos[i].componentes === undefined) {
                                        this.formulario.listaOtrosEgresos[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaOtrosEgresos[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaOtrosEgresos[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaOtrosEgresos[i].componentes.push(comp);
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

    // ------------------------------------------------------------------------
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

    // GastosVentasDistribucion ----------------------------------------------------------------------------------
    mostrarDialogGastosVentasDistribucion() {
        this.gastosVentasDistribucion = new DetalleCuenta();
        this.displayGastosVentasDistribucion = true;
        this.editarGastosVentasDistribucion = false;
    }

    cancelarModalGastosVentasDistribucion() {
        this.gastosVentasDistribucion = new DetalleCuenta();
        this.displayGastosVentasDistribucion = false;
        this.editarGastosVentasDistribucion = false;
    }

    guardarModalGastosVentasDistribucion() {
        const t = new Tabla();
        if (!this.editarGastosVentasDistribucion) {
            t.id = this.formulario.listaGastosVentasDistribucion.length;
        } else {
            t.id = this.gastosVentasDistribucion.id;
        }
        t.descripcion = this.gastosVentasDistribucion.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION + '_' + this.formulario.listaGastosVentasDistribucion.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosVentasDistribucion.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION + '_' + this.formulario.listaGastosVentasDistribucion.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosVentasDistribucion.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION + '_' + this.formulario.listaGastosVentasDistribucion.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosVentasDistribucion.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_VENTAS_DISTRIBUCION + '_' + this.formulario.listaGastosVentasDistribucion.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosVentasDistribucion.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosVentasDistribucion) {
            const bean: Tabla = this.formulario.listaGastosVentasDistribucion.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosVentasDistribucion.indexOf(bean);
                this.formulario.listaGastosVentasDistribucion[index] = t;
            }
        } else {
            this.formulario.listaGastosVentasDistribucion.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosVentasDistribucion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosVentasDistribucion[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosVentasDistribucion[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosVentasDistribucion[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosVentasDistribucion[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosVentasDistribucion[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosVentasDistribucion.componentes[0].cantidad = suma1 + Number(this.gastosVentasDistribucion.anioA);
        this.formulario.totalGastosVentasDistribucion.componentes[1].cantidad = suma2 + Number(this.gastosVentasDistribucion.anioB);
        this.formulario.totalGastosVentasDistribucion.componentes[2].cantidad = suma3 + Number(this.gastosVentasDistribucion.anioC);
        this.formulario.totalGastosVentasDistribucion.componentes[3].cantidad = suma4 + Number(this.gastosVentasDistribucion.anioD);

        this.displayGastosVentasDistribucion = false;
        this.gastosVentasDistribucion = new DetalleCuenta();
        this.editarGastosVentasDistribucion = false;
    }

    editarComponenteGastosVentasDistribucion(tabla: Tabla) {
        this.displayGastosVentasDistribucion = true;
        this.editarGastosVentasDistribucion = true;
        this.gastosVentasDistribucion = new DetalleCuenta();
        this.gastosVentasDistribucion.id = tabla.id;
        this.gastosVentasDistribucion.descripcion = tabla.descripcion;
        this.gastosVentasDistribucion.anioA = tabla.componentes[0].cantidad;
        this.gastosVentasDistribucion.anioB = tabla.componentes[1].cantidad;
        this.gastosVentasDistribucion.anioC = tabla.componentes[2].cantidad;
        this.gastosVentasDistribucion.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosVentasDistribucion(tabla: Tabla) {
        const t = this.formulario.listaGastosVentasDistribucion.splice(this.formulario.listaGastosVentasDistribucion.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosVentasDistribucion.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosVentasDistribucion.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosVentasDistribucion.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosVentasDistribucion.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // GastosVenDistriServPorTerceros ----------------------------------------------------------------------------------

    mostrarDialogGastosVenDistriServPorTerceros() {
        this.gastosVenDistriServPorTerceros = new DetalleCuenta();
        this.displayGastosVenDistriServPorTerceros = true;
        this.editarGastosVenDistriServPorTerceros = false;
    }

    cancelarModalGastosVenDistriServPorTerceros() {
        this.gastosVenDistriServPorTerceros = new DetalleCuenta();
        this.displayGastosVenDistriServPorTerceros = false;
        this.editarGastosVenDistriServPorTerceros = false;
    }

    guardarModalGastosVenDistriServPorTerceros() {
        const t = new Tabla();
        if (!this.editarGastosVenDistriServPorTerceros) {
            t.id = this.formulario.listaGastosVenDistriServPorTerceros.length;
        } else {
            t.id = this.gastosVenDistriServPorTerceros.id;
        }
        t.descripcion = this.gastosVenDistriServPorTerceros.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosVenDistriServPorTerceros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosVenDistriServPorTerceros.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosVenDistriServPorTerceros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosVenDistriServPorTerceros.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosVenDistriServPorTerceros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosVenDistriServPorTerceros.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosVenDistriServPorTerceros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosVenDistriServPorTerceros.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosVenDistriServPorTerceros) {
            const bean: Tabla = this.formulario.listaGastosVenDistriServPorTerceros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosVenDistriServPorTerceros.indexOf(bean);
                this.formulario.listaGastosVenDistriServPorTerceros[index] = t;
            }
        } else {
            this.formulario.listaGastosVenDistriServPorTerceros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosVenDistriServPorTerceros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosVenDistriServPorTerceros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosVenDistriServPorTerceros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosVenDistriServPorTerceros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosVenDistriServPorTerceros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosVenDistriServPorTerceros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[0].cantidad = suma1 + Number(this.gastosVenDistriServPorTerceros.anioA);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[1].cantidad = suma2 + Number(this.gastosVenDistriServPorTerceros.anioB);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[2].cantidad = suma3 + Number(this.gastosVenDistriServPorTerceros.anioC);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[3].cantidad = suma4 + Number(this.gastosVenDistriServPorTerceros.anioD);

        this.displayGastosVenDistriServPorTerceros = false;
        this.gastosVenDistriServPorTerceros = new DetalleCuenta();
        this.editarGastosVenDistriServPorTerceros = false;
    }

    editarComponenteGastosVenDistriServPorTerceros(tabla: Tabla) {
        this.displayGastosVenDistriServPorTerceros = true;
        this.editarGastosVenDistriServPorTerceros = true;
        this.gastosVenDistriServPorTerceros = new DetalleCuenta();
        this.gastosVenDistriServPorTerceros.id = tabla.id;
        this.gastosVenDistriServPorTerceros.descripcion = tabla.descripcion;
        this.gastosVenDistriServPorTerceros.anioA = tabla.componentes[0].cantidad;
        this.gastosVenDistriServPorTerceros.anioB = tabla.componentes[1].cantidad;
        this.gastosVenDistriServPorTerceros.anioC = tabla.componentes[2].cantidad;
        this.gastosVenDistriServPorTerceros.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosVenDistriServPorTerceros(tabla: Tabla) {
        const t = this.formulario.listaGastosVenDistriServPorTerceros.splice(this.formulario.listaGastosVenDistriServPorTerceros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosVenDistriServPorTerceros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // GastosDiversionGestion ----------------------------------------------------------------------------------

    mostrarDialogGastosDiversionGestion() {
        this.gastosDiversionGestion = new DetalleCuenta();
        this.displayGastosDiversionGestion = true;
        this.editarGastosDiversionGestion = false;
    }

    cancelarModalGastosDiversionGestion() {
        this.gastosDiversionGestion = new DetalleCuenta();
        this.displayGastosDiversionGestion = false;
        this.editarGastosDiversionGestion = false;
    }

    guardarModalGastosDiversionGestion() {
        const t = new Tabla();
        if (!this.editarGastosDiversionGestion) {
            t.id = this.formulario.listaGastosDiversionGestion.length;
        } else {
            t.id = this.gastosDiversionGestion.id;
        }
        t.descripcion = this.gastosDiversionGestion.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION + '_' + this.formulario.listaGastosDiversionGestion.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosDiversionGestion.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION + '_' + this.formulario.listaGastosDiversionGestion.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosDiversionGestion.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION + '_' + this.formulario.listaGastosDiversionGestion.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosDiversionGestion.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_CARGOS_DIVERSOS_GESTION + '_' + this.formulario.listaGastosDiversionGestion.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosDiversionGestion.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosDiversionGestion) {
            const bean: Tabla = this.formulario.listaGastosDiversionGestion.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosDiversionGestion.indexOf(bean);
                this.formulario.listaGastosDiversionGestion[index] = t;
            }
        } else {
            this.formulario.listaGastosDiversionGestion.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosDiversionGestion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosDiversionGestion[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosDiversionGestion[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosDiversionGestion[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosDiversionGestion[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosDiversionGestion[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosDiversionGestion.componentes[0].cantidad = suma1 + Number(this.gastosDiversionGestion.anioA);
        this.formulario.totalGastosDiversionGestion.componentes[1].cantidad = suma2 + Number(this.gastosDiversionGestion.anioB);
        this.formulario.totalGastosDiversionGestion.componentes[2].cantidad = suma3 + Number(this.gastosDiversionGestion.anioC);
        this.formulario.totalGastosDiversionGestion.componentes[3].cantidad = suma4 + Number(this.gastosDiversionGestion.anioD);

        this.displayGastosDiversionGestion = false;
        this.gastosDiversionGestion = new DetalleCuenta();
        this.editarGastosDiversionGestion = false;
    }

    editarComponenteGastosDiversionGestion(tabla: Tabla) {
        this.displayGastosDiversionGestion = true;
        this.editarGastosDiversionGestion = true;
        this.gastosDiversionGestion = new DetalleCuenta();
        this.gastosDiversionGestion.id = tabla.id;
        this.gastosDiversionGestion.descripcion = tabla.descripcion;
        this.gastosDiversionGestion.anioA = tabla.componentes[0].cantidad;
        this.gastosDiversionGestion.anioB = tabla.componentes[1].cantidad;
        this.gastosDiversionGestion.anioC = tabla.componentes[2].cantidad;
        this.gastosDiversionGestion.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosDiversionGestion(tabla: Tabla) {
        const t = this.formulario.listaGastosDiversionGestion.splice(this.formulario.listaGastosDiversionGestion.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosDiversionGestion.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosDiversionGestion.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosDiversionGestion.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosDiversionGestion.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // Provisiones ----------------------------------------------------------------------------------

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
            t.id = this.formulario.listaProvisiones.length;
        } else {
            t.id = this.provisiones.id;
        }
        t.descripcion = this.provisiones.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_PROVISIONES + '_' + this.formulario.listaProvisiones.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.provisiones.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_PROVISIONES + '_' + this.formulario.listaProvisiones.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.provisiones.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_PROVISIONES + '_' + this.formulario.listaProvisiones.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.provisiones.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_PROVISIONES + '_' + this.formulario.listaProvisiones.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.provisiones.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarProvisiones) {
            const bean: Tabla = this.formulario.listaProvisiones.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaProvisiones.indexOf(bean);
                this.formulario.listaProvisiones[index] = t;
            }
        } else {
            this.formulario.listaProvisiones.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaProvisiones.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaProvisiones[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaProvisiones[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaProvisiones[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaProvisiones[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaProvisiones[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalProvisiones.componentes[0].cantidad = suma1 + Number(this.provisiones.anioA);
        this.formulario.totalProvisiones.componentes[1].cantidad = suma2 + Number(this.provisiones.anioB);
        this.formulario.totalProvisiones.componentes[2].cantidad = suma3 + Number(this.provisiones.anioC);
        this.formulario.totalProvisiones.componentes[3].cantidad = suma4 + Number(this.provisiones.anioD);

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
        const t = this.formulario.listaProvisiones.splice(this.formulario.listaProvisiones.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalProvisiones.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalProvisiones.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalProvisiones.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalProvisiones.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // GastosAdministracion ----------------------------------------------------------------------------------

    mostrarDialogGastosAdministracion() {
        this.gastosAdministracion = new DetalleCuenta();
        this.displayGastosAdministracion = true;
        this.editarGastosAdministracion = false;
    }

    cancelarModalGastosAdministracion() {
        this.gastosAdministracion = new DetalleCuenta();
        this.displayGastosAdministracion = false;
        this.editarGastosAdministracion = false;
    }

    guardarModalGastosAdministracion() {
        const t = new Tabla();
        if (!this.editarGastosAdministracion) {
            t.id = this.formulario.listaGastosAdministracion.length;
        } else {
            t.id = this.gastosAdministracion.id;
        }
        t.descripcion = this.gastosAdministracion.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_ADMINISTRACION + '_' + this.formulario.listaGastosAdministracion.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosAdministracion.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_ADMINISTRACION + '_' + this.formulario.listaGastosAdministracion.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosAdministracion.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_ADMINISTRACION + '_' + this.formulario.listaGastosAdministracion.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosAdministracion.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_ADMINISTRACION + '_' + this.formulario.listaGastosAdministracion.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosAdministracion.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosAdministracion) {
            const bean: Tabla = this.formulario.listaGastosAdministracion.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosAdministracion.indexOf(bean);
                this.formulario.listaGastosAdministracion[index] = t;
            }
        } else {
            this.formulario.listaGastosAdministracion.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosAdministracion.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosAdministracion[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosAdministracion[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosAdministracion[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosAdministracion[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosAdministracion[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosAdministracion.componentes[0].cantidad = suma1 + Number(this.gastosAdministracion.anioA);
        this.formulario.totalGastosAdministracion.componentes[1].cantidad = suma2 + Number(this.gastosAdministracion.anioB);
        this.formulario.totalGastosAdministracion.componentes[2].cantidad = suma3 + Number(this.gastosAdministracion.anioC);
        this.formulario.totalGastosAdministracion.componentes[3].cantidad = suma4 + Number(this.gastosAdministracion.anioD);

        this.displayGastosAdministracion = false;
        this.gastosAdministracion = new DetalleCuenta();
        this.editarGastosAdministracion = false;
    }

    editarComponenteGastosAdministracion(tabla: Tabla) {
        this.displayGastosAdministracion = true;
        this.editarGastosAdministracion = true;
        this.gastosAdministracion = new DetalleCuenta();
        this.gastosAdministracion.id = tabla.id;
        this.gastosAdministracion.descripcion = tabla.descripcion;
        this.gastosAdministracion.anioA = tabla.componentes[0].cantidad;
        this.gastosAdministracion.anioB = tabla.componentes[1].cantidad;
        this.gastosAdministracion.anioC = tabla.componentes[2].cantidad;
        this.gastosAdministracion.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosAdministracion(tabla: Tabla) {
        const t = this.formulario.listaGastosAdministracion.splice(this.formulario.listaGastosAdministracion.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosAdministracion.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosAdministracion.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosAdministracion.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosAdministracion.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // GastosDentroAdminServPorTerceros ----------------------------------------------------------------------------------

    mostrarDialogGastosDentroAdminServPorTerceros() {
        this.gastosDentroAdminServPorTerceros = new DetalleCuenta();
        this.displayGastosDentroAdminServPorTerceros = true;
        this.editarGastosDentroAdminServPorTerceros = false;
    }

    cancelarModalGastosDentroAdminServPorTerceros() {
        this.gastosDentroAdminServPorTerceros = new DetalleCuenta();
        this.displayGastosDentroAdminServPorTerceros = false;
        this.editarGastosDentroAdminServPorTerceros = false;
    }

    guardarModalGastosDentroAdminServPorTerceros() {
        const t = new Tabla();
        if (!this.editarGastosDentroAdminServPorTerceros) {
            t.id = this.formulario.listaGastosDentroAdminServPorTerceros.length;
        } else {
            t.id = this.gastosDentroAdminServPorTerceros.id;
        }
        t.descripcion = this.gastosDentroAdminServPorTerceros.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosDentroAdminServPorTerceros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosDentroAdminServPorTerceros.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosDentroAdminServPorTerceros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosDentroAdminServPorTerceros.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosDentroAdminServPorTerceros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosDentroAdminServPorTerceros.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_DENTRO_ADMINISTRACION_GASTOS_SERVICIOS_PRESTADOS_TERCEROS + '_' +
            this.formulario.listaGastosDentroAdminServPorTerceros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosDentroAdminServPorTerceros.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosDentroAdminServPorTerceros) {
            const bean: Tabla = this.formulario.listaGastosDentroAdminServPorTerceros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosDentroAdminServPorTerceros.indexOf(bean);
                this.formulario.listaGastosDentroAdminServPorTerceros[index] = t;
            }
        } else {
            this.formulario.listaGastosDentroAdminServPorTerceros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosDentroAdminServPorTerceros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosDentroAdminServPorTerceros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[0].cantidad = suma1 + Number(this.gastosDentroAdminServPorTerceros.anioA);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[1].cantidad = suma2 + Number(this.gastosDentroAdminServPorTerceros.anioB);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[2].cantidad = suma3 + Number(this.gastosDentroAdminServPorTerceros.anioC);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[3].cantidad = suma4 + Number(this.gastosDentroAdminServPorTerceros.anioD);

        this.displayGastosDentroAdminServPorTerceros = false;
        this.gastosDentroAdminServPorTerceros = new DetalleCuenta();
        this.editarGastosDentroAdminServPorTerceros = false;
    }

    editarComponenteGastosDentroAdminServPorTerceros(tabla: Tabla) {
        this.displayGastosDentroAdminServPorTerceros = true;
        this.editarGastosDentroAdminServPorTerceros = true;
        this.gastosDentroAdminServPorTerceros = new DetalleCuenta();
        this.gastosDentroAdminServPorTerceros.id = tabla.id;
        this.gastosDentroAdminServPorTerceros.descripcion = tabla.descripcion;
        this.gastosDentroAdminServPorTerceros.anioA = tabla.componentes[0].cantidad;
        this.gastosDentroAdminServPorTerceros.anioB = tabla.componentes[1].cantidad;
        this.gastosDentroAdminServPorTerceros.anioC = tabla.componentes[2].cantidad;
        this.gastosDentroAdminServPorTerceros.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosDentroAdminServPorTerceros(tabla: Tabla) {
        const t = this.formulario.listaGastosDentroAdminServPorTerceros.splice(this.formulario.listaGastosDentroAdminServPorTerceros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosDentroAdminServPorTerceros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // IngresosFinancieros ----------------------------------------------------------------------------------

    mostrarDialogIngresosFinancieros() {
        this.ingresosFinancieros = new DetalleCuenta();
        this.displayIngresosFinancieros = true;
        this.editarIngresosFinancieros = false;
    }

    cancelarModalIngresosFinancieros() {
        this.ingresosFinancieros = new DetalleCuenta();
        this.displayIngresosFinancieros = false;
        this.editarIngresosFinancieros = false;
    }

    guardarModalIngresosFinancieros() {
        const t = new Tabla();
        if (!this.editarIngresosFinancieros) {
            t.id = this.formulario.listaIngresosFinancieros.length;
        } else {
            t.id = this.ingresosFinancieros.id;
        }
        t.descripcion = this.ingresosFinancieros.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_INGRESOS_FINANCIEROS + '_' + this.formulario.listaIngresosFinancieros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ingresosFinancieros.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_INGRESOS_FINANCIEROS + '_' + this.formulario.listaIngresosFinancieros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ingresosFinancieros.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_INGRESOS_FINANCIEROS + '_' + this.formulario.listaIngresosFinancieros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ingresosFinancieros.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_INGRESOS_FINANCIEROS + '_' + this.formulario.listaIngresosFinancieros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ingresosFinancieros.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarIngresosFinancieros) {
            const bean: Tabla = this.formulario.listaIngresosFinancieros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaIngresosFinancieros.indexOf(bean);
                this.formulario.listaIngresosFinancieros[index] = t;
            }
        } else {
            this.formulario.listaIngresosFinancieros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaIngresosFinancieros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaIngresosFinancieros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaIngresosFinancieros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaIngresosFinancieros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaIngresosFinancieros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaIngresosFinancieros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalIngresosFinancieros.componentes[0].cantidad = suma1 + Number(this.ingresosFinancieros.anioA);
        this.formulario.totalIngresosFinancieros.componentes[1].cantidad = suma2 + Number(this.ingresosFinancieros.anioB);
        this.formulario.totalIngresosFinancieros.componentes[2].cantidad = suma3 + Number(this.ingresosFinancieros.anioC);
        this.formulario.totalIngresosFinancieros.componentes[3].cantidad = suma4 + Number(this.ingresosFinancieros.anioD);

        this.displayIngresosFinancieros = false;
        this.ingresosFinancieros = new DetalleCuenta();
        this.editarIngresosFinancieros = false;
    }

    editarComponenteIngresosFinancieros(tabla: Tabla) {
        this.displayIngresosFinancieros = true;
        this.editarIngresosFinancieros = true;
        this.ingresosFinancieros = new DetalleCuenta();
        this.ingresosFinancieros.id = tabla.id;
        this.ingresosFinancieros.descripcion = tabla.descripcion;
        this.ingresosFinancieros.anioA = tabla.componentes[0].cantidad;
        this.ingresosFinancieros.anioB = tabla.componentes[1].cantidad;
        this.ingresosFinancieros.anioC = tabla.componentes[2].cantidad;
        this.ingresosFinancieros.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteIngresosFinancieros(tabla: Tabla) {
        const t = this.formulario.listaIngresosFinancieros.splice(this.formulario.listaIngresosFinancieros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalIngresosFinancieros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalIngresosFinancieros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalIngresosFinancieros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalIngresosFinancieros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // GastosFinancieros ----------------------------------------------------------------------------------

    mostrarDialogGastosFinancieros() {
        this.gastosFinancieros = new DetalleCuenta();
        this.displayGastosFinancieros = true;
        this.editarGastosFinancieros = false;
    }

    cancelarModalGastosFinancieros() {
        this.gastosFinancieros = new DetalleCuenta();
        this.displayGastosFinancieros = false;
        this.editarGastosFinancieros = false;
    }

    guardarModalGastosFinancieros() {
        const t = new Tabla();
        if (!this.editarGastosFinancieros) {
            t.id = this.formulario.listaGastosFinancieros.length;
        } else {
            t.id = this.gastosFinancieros.id;
        }
        t.descripcion = this.gastosFinancieros.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_FINANCIEROS + '_' + this.formulario.listaGastosFinancieros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.gastosFinancieros.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_FINANCIEROS + '_' + this.formulario.listaGastosFinancieros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.gastosFinancieros.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_FINANCIEROS + '_' + this.formulario.listaGastosFinancieros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.gastosFinancieros.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_GASTOS_FINANCIEROS + '_' + this.formulario.listaGastosFinancieros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.gastosFinancieros.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarGastosFinancieros) {
            const bean: Tabla = this.formulario.listaGastosFinancieros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaGastosFinancieros.indexOf(bean);
                this.formulario.listaGastosFinancieros[index] = t;
            }
        } else {
            this.formulario.listaGastosFinancieros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaGastosFinancieros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaGastosFinancieros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaGastosFinancieros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaGastosFinancieros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaGastosFinancieros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaGastosFinancieros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosFinancieros.componentes[0].cantidad = suma1 + Number(this.gastosFinancieros.anioA);
        this.formulario.totalGastosFinancieros.componentes[1].cantidad = suma2 + Number(this.gastosFinancieros.anioB);
        this.formulario.totalGastosFinancieros.componentes[2].cantidad = suma3 + Number(this.gastosFinancieros.anioC);
        this.formulario.totalGastosFinancieros.componentes[3].cantidad = suma4 + Number(this.gastosFinancieros.anioD);

        this.displayGastosFinancieros = false;
        this.gastosFinancieros = new DetalleCuenta();
        this.editarGastosFinancieros = false;
    }

    editarComponenteGastosFinancieros(tabla: Tabla) {
        this.displayGastosFinancieros = true;
        this.editarGastosFinancieros = true;
        this.gastosFinancieros = new DetalleCuenta();
        this.gastosFinancieros.id = tabla.id;
        this.gastosFinancieros.descripcion = tabla.descripcion;
        this.gastosFinancieros.anioA = tabla.componentes[0].cantidad;
        this.gastosFinancieros.anioB = tabla.componentes[1].cantidad;
        this.gastosFinancieros.anioC = tabla.componentes[2].cantidad;
        this.gastosFinancieros.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteGastosFinancieros(tabla: Tabla) {
        const t = this.formulario.listaGastosFinancieros.splice(this.formulario.listaGastosFinancieros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalGastosFinancieros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalGastosFinancieros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalGastosFinancieros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalGastosFinancieros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // OtrosIngresos ----------------------------------------------------------------------------------

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
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_INGRESOS + '_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosIngresos.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_INGRESOS + '_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosIngresos.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_INGRESOS + '_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosIngresos.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_INGRESOS + '_' + this.formulario.listaOtrosIngresos.length + '_' + this.anios[3];
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
        this.formulario.totalOtrosIngresos.componentes[0].cantidad = suma1 + Number(this.otrosIngresos.anioA);
        this.formulario.totalOtrosIngresos.componentes[1].cantidad = suma2 + Number(this.otrosIngresos.anioB);
        this.formulario.totalOtrosIngresos.componentes[2].cantidad = suma3 + Number(this.otrosIngresos.anioC);
        this.formulario.totalOtrosIngresos.componentes[3].cantidad = suma4 + Number(this.otrosIngresos.anioD);

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
    }

    // OtrosEgresos ----------------------------------------------------------------------------------

    mostrarDialogOtrosEgresos() {
        this.otrosEgresos = new DetalleCuenta();
        this.displayOtrosEgresos = true;
        this.editarOtrosEgresos = false;
    }

    cancelarModalOtrosEgresos() {
        this.otrosEgresos = new DetalleCuenta();
        this.displayOtrosEgresos = false;
        this.editarOtrosEgresos = false;
    }

    guardarModalOtrosEgresos() {
        const t = new Tabla();
        if (!this.editarOtrosEgresos) {
            t.id = this.formulario.listaOtrosEgresos.length;
        } else {
            t.id = this.otrosEgresos.id;
        }
        t.descripcion = this.otrosEgresos.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_EGRESOS + '_' + this.formulario.listaOtrosEgresos.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosEgresos.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_EGRESOS + '_' + this.formulario.listaOtrosEgresos.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosEgresos.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_EGRESOS + '_' + this.formulario.listaOtrosEgresos.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosEgresos.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM1ANEX1D_COD_OTROS_EGRESOS + '_' + this.formulario.listaOtrosEgresos.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosEgresos.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosEgresos) {
            const bean: Tabla = this.formulario.listaOtrosEgresos.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaOtrosEgresos.indexOf(bean);
                this.formulario.listaOtrosEgresos[index] = t;
            }
        } else {
            this.formulario.listaOtrosEgresos.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaOtrosEgresos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaOtrosEgresos[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaOtrosEgresos[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaOtrosEgresos[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaOtrosEgresos[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaOtrosEgresos[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        this.formulario.totalOtrosEgresos.componentes[0].cantidad = suma1 + Number(this.otrosEgresos.anioA);
        this.formulario.totalOtrosEgresos.componentes[1].cantidad = suma2 + Number(this.otrosEgresos.anioB);
        this.formulario.totalOtrosEgresos.componentes[2].cantidad = suma3 + Number(this.otrosEgresos.anioC);
        this.formulario.totalOtrosEgresos.componentes[3].cantidad = suma4 + Number(this.otrosEgresos.anioD);

        this.displayOtrosEgresos = false;
        this.otrosEgresos = new DetalleCuenta();
        this.editarOtrosEgresos = false;
    }

    editarComponenteOtrosEgresos(tabla: Tabla) {
        this.displayOtrosEgresos = true;
        this.editarOtrosEgresos = true;
        this.otrosEgresos = new DetalleCuenta();
        this.otrosEgresos.id = tabla.id;
        this.otrosEgresos.descripcion = tabla.descripcion;
        this.otrosEgresos.anioA = tabla.componentes[0].cantidad;
        this.otrosEgresos.anioB = tabla.componentes[1].cantidad;
        this.otrosEgresos.anioC = tabla.componentes[2].cantidad;
        this.otrosEgresos.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosEgresos(tabla: Tabla) {
        const t = this.formulario.listaOtrosEgresos.splice(this.formulario.listaOtrosEgresos.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalOtrosEgresos.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalOtrosEgresos.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalOtrosEgresos.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalOtrosEgresos.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'f1anex1d').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosAdministracion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosDentroAdminServPorTerceros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosDiversionGestion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosFinancieros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosVenDistriServPorTerceros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaGastosVentasDistribucion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaIngresosFinancieros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaOtrosEgresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaOtrosIngresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaProvisiones, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosAdministracion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosDentroAdminServPorTerceros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosDiversionGestion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosFinancieros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosVenDistriServPorTerceros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalGastosVentasDistribucion, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalIngresosFinancieros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalOtrosEgresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalOtrosIngresos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalProvisiones, this.nCodffina);
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
