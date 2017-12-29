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
import { Constants } from './constants';
import { FormControl } from '@angular/forms';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { EmpresaServicio } from './empresaServicio.model';
import { FormularioN2 } from './formulario-n2model';

@Component({
    selector: 'jhi-formulario-financiero-n2',
    templateUrl: './formulario-financiero-n2.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroN2Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formGroup: FormGroup;
    formulario: FormularioN2;
    constantes: Constants;

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
    construirFormulario() {
        this.formulario = new FormularioN2();
        // Creacion de Tabla de Activo Corriente
        const activoCorrienteDesc: string[] = [this.constantes.FORM2_CAJA_BANCOS,
                                               this.constantes.FORM2_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA,
                                               this.constantes.FORM2_CUENTAS_COBRAR_COMERCIALES,
                                               this.constantes.FORM2_PROV_CUENTAS_COBRANZA_DUDOSA,
                                               this.constantes.FORM2_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS,
                                               this.constantes.FORM2_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES,
                                               this.constantes.FORM2_CUENTAS_COBRAR_DIVERSAS,
                                               this.constantes.FORM2_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO,
                                               this.constantes.FORM2_EXISTENCIAS,
                                               this.constantes.FORM2_OTRAS_CUENTAS,
                                               this.constantes.FORM2_TOTAL_ACTIVO_CORRIENTE];
        const activoCorrienteCod: string[] = [this.constantes.FORM2_COD_CAJA_BANCOS,
                                                this.constantes.FORM2_COD_INV_VALOR_RAZONABLE_DISPONIBLE_VENTA,
                                                this.constantes.FORM2_COD_CUENTAS_COBRAR_COMERCIALES,
                                                this.constantes.FORM2_COD_PROV_CUENTAS_COBRANZA_DUDOSA,
                                                this.constantes.FORM2_COD_CUENTAS_COBRAR_COMERCIALES_RELACIONADAS,
                                                this.constantes.FORM2_COD_CUENTAS_COBRAR_PERSONAL_ACCIONISTAS_SOCIOS_DIRECTORES_GERENTES,
                                                this.constantes.FORM2_COD_CUENTAS_COBRAR_DIVERSAS,
                                                this.constantes.FORM2_COD_SERVICIOS_OTROS_CONTRATADOS_ANTICIPADO,
                                                this.constantes.FORM2_COD_EXISTENCIAS,
                                                this.constantes.FORM2_COD_OTRAS_CUENTAS,
                                                this.constantes.FORM2_COD_TOTAL_ACTIVO_CORRIENTE];
        this.formulario.listaActivoCorriente = this.crearlistacomponentes(activoCorrienteDesc, activoCorrienteCod, true);

        // Creacion de Tabla de Activo No Corriente
        const activoNoCorrienteDesc: string[] = [this.constantes.FORM2_INVERSIONES_INMOBILIARIAS,
                                                this.constantes.FORM2_INVERSIONES_MOBILIARIAS,
                                                this.constantes.FORM2_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO,
                                                this.constantes.FORM2_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO,
                                                this.constantes.FORM2_INMUEBLES_MAQUINARIA_EQUIPO,
                                                this.constantes.FORM2_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO,
                                                this.constantes.FORM2_ACTIVOS_INTANGIBLES_NETO,
                                                this.constantes.FORM2_ACTIVOS_BIOLOGICOS,
                                                this.constantes.FORM2_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM,
                                                this.constantes.FORM2_ACTIVO_DIFERIDO,
                                                this.constantes.FORM2_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_TOTAL_ACTIVO_NO_CORRIENTE];
        const activoNoCorrienteCod: string[] = [this.constantes.FORM2_COD_INVERSIONES_INMOBILIARIAS,
                                                this.constantes.FORM2_COD_INVERSIONES_MOBILIARIAS,
                                                this.constantes.FORM2_COD_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO,
                                                this.constantes.FORM2_COD_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO,
                                                this.constantes.FORM2_COD_INMUEBLES_MAQUINARIA_EQUIPO,
                                                this.constantes.FORM2_COD_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO,
                                                this.constantes.FORM2_COD_ACTIVOS_INTANGIBLES_NETO,
                                                this.constantes.FORM2_COD_ACTIVOS_BIOLOGICOS,
                                                this.constantes.FORM2_COD_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM,
                                                this.constantes.FORM2_COD_ACTIVO_DIFERIDO,
                                                this.constantes.FORM2_COD_OTRAS_CUENTAS_ACTIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_COD_TOTAL_ACTIVO_NO_CORRIENTE];
        this.formulario.listaActivoNoCorriente = this.crearlistacomponentes(activoNoCorrienteDesc, activoNoCorrienteCod, true);

        // Creacion de Tabla de Pasivo Corriente
        const pasivoCorrienteDesc: string[] = [this.constantes.FORM2_SOBREGIROS_BANCARIOS,
                                                this.constantes.FORM2_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD,
                                                this.constantes.FORM2_REMUNERACIONES_PARTICIPACION_PAGAR,
                                                this.constantes.FORM2_CUENTAS_PAGAR_COMERCIALES,
                                                this.constantes.FORM2_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES,
                                                this.constantes.FORM2_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS,
                                                this.constantes.FORM2_OTRAS_CUENTAS_PAGAR_DIVERSAS,
                                                this.constantes.FORM2_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA,
                                                this.constantes.FORM2_PROVISIONES,
                                                this.constantes.FORM2_PASIVO_DIFERIDO,
                                                this.constantes.FORM2_OTRAS_CUENTAS_PASIVO_CORRIENTE,
                                                this.constantes.FORM2_TOTAL_PASIVO_CORRIENTE];
        const pasivoCorrienteCod: string[] = [this.constantes.FORM2_COD_SOBREGIROS_BANCARIOS,
                                                this.constantes.FORM2_COD_TRIBUTOS_CONTRAPRESTACIONES_APORTES_PENSIONES_SALUD,
                                                this.constantes.FORM2_COD_REMUNERACIONES_PARTICIPACION_PAGAR,
                                                this.constantes.FORM2_COD_CUENTAS_PAGAR_COMERCIALES,
                                                this.constantes.FORM2_COD_CUENTAS_PAGAR_ACCIONISTAS_DIRECTORES_GERENTES,
                                                this.constantes.FORM2_COD_CUENTAS_PAGAR_COMERCIALES_RELACIONADAS,
                                                this.constantes.FORM2_COD_OTRAS_CUENTAS_PAGAR_DIVERSAS,
                                                this.constantes.FORM2_COD_OBLIGACIONES_FINANCIERAS_PARTE_DEUDA,
                                                this.constantes.FORM2_COD_PROVISIONES,
                                                this.constantes.FORM2_COD_PASIVO_DIFERIDO,
                                                this.constantes.FORM2_COD_OTRAS_CUENTAS_PASIVO_CORRIENTE,
                                                this.constantes.FORM2_COD_TOTAL_PASIVO_CORRIENTE];
        this.formulario.listaPasivoCorriente = this.crearlistacomponentes(pasivoCorrienteDesc, pasivoCorrienteCod, true);

        // Creacion de Tabla de Pasivo No Corriente
        const pasivoNoCorrienteDesc: string[] = [this.constantes.FORM2_OBLIGACIONES_FINANCIERAS,
                                                this.constantes.FORM2_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS,
                                                this.constantes.FORM2_PROVISIONES_PASIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_TOTAL_PASIVO_NO_CORRIENTE];
        const pasivoNoCorrienteCod: string[] = [this.constantes.FORM2_COD_OBLIGACIONES_FINANCIERAS,
                                                this.constantes.FORM2_COD_CUENTAS_PAGAR_COMERCIALES_OTRAS_CUENTAS,
                                                this.constantes.FORM2_COD_PROVISIONES_PASIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_COD_OTRAS_CUENTAS_PASIVO_NO_CORRIENTE,
                                                this.constantes.FORM2_COD_TOTAL_PASIVO_NO_CORRIENTE];
        this.formulario.listaPasivoNoCorriente = this.crearlistacomponentes(pasivoNoCorrienteDesc, pasivoNoCorrienteCod, true);

        // Creacion de Tabla de Patrimonio
        const patrimonioDesc: string[] = [this.constantes.FORM2_CAPITAL,
                                            this.constantes.FORM2_CAPITAL_ADICIONAL,
                                            this.constantes.FORM2_ACCIONES_INVERSION,
                                            this.constantes.FORM2_RESERVAS,
                                            this.constantes.FORM2_RESULTADOS_ACUMULADOS,
                                            this.constantes.FORM2_EXCEDENTE_REVALUACION,
                                            this.constantes.FORM2_RESULTADOS_NO_REALIZADOS,
                                            this.constantes.FORM2_UTILIDAD,
                                            this.constantes.FORM2_TOTAL_PATRIMONIO];
        const patrimonioCod: string[] = [this.constantes.FORM2_COD_CAPITAL,
                                            this.constantes.FORM2_COD_CAPITAL_ADICIONAL,
                                            this.constantes.FORM2_COD_ACCIONES_INVERSION,
                                            this.constantes.FORM2_COD_RESERVAS,
                                            this.constantes.FORM2_COD_RESULTADOS_ACUMULADOS,
                                            this.constantes.FORM2_COD_EXCEDENTE_REVALUACION,
                                            this.constantes.FORM2_COD_RESULTADOS_NO_REALIZADOS,
                                            this.constantes.FORM2_COD_UTILIDAD,
                                            this.constantes.FORM2_COD_TOTAL_PATRIMONIO];
        this.formulario.listaPatrimonio = this.crearlistacomponentes(patrimonioDesc, patrimonioCod, true);

        // Creacion de Totales
        const totalActivosDesc: string[] = [this.constantes.FORM2_TOTAL_ACTIVOS];
        const totalActivosCod: string[] = [this.constantes.FORM2_COD_TOTAL_ACTIVOS];
        this.formulario.totalActivos = this.creartotales(totalActivosDesc, totalActivosCod);

        const totalPasivosDesc: string[] = [this.constantes.FORM2_TOTAL_PASIVOS];
        const totalPasivosCod: string[] = [this.constantes.FORM2_COD_TOTAL_PASIVOS];
        this.formulario.totalPasivos = this.creartotales(totalPasivosDesc, totalPasivosCod);

        const totalPasivoPatrimonioDesc: string[] = [this.constantes.FORM2_TOTAL_PASIVOS_PATRIMONIO];
        const totalPasivoPatrimonioCod: string[] = [this.constantes.FORM2_COD_TOTAL_PASIVOS_PATRIMONIO];
        this.formulario.totalPasivoPatrimonio = this.creartotales(totalPasivoPatrimonioDesc, totalPasivoPatrimonioCod);
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
    subtotalActivoCorriente(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaActivoCorriente.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaActivoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaActivoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaActivoCorriente[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaActivoCorriente[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaActivoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaActivoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaActivoCorriente[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    if (this.formulario.listaActivoCorriente[i].componentes[j].codigo.indexOf(this.constantes.FORM2_COD_PROV_CUENTAS_COBRANZA_DUDOSA) !== -1) {
                        suma -= Number(this.formulario.listaActivoCorriente[i].componentes[j].cantidad);
                    } else {
                        suma += Number(this.formulario.listaActivoCorriente[i].componentes[j].cantidad);
                    }
                }
            }
        }
        this.formulario.listaActivoCorriente[idy].componentes[idx].cantidad = suma;
        this.totalActivos();
    }

    subtotalActivoNoCorriente(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaActivoNoCorriente.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaActivoNoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaActivoNoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaActivoNoCorriente[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaActivoNoCorriente[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaActivoNoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaActivoNoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaActivoNoCorriente[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    // tslint:disable-next-line:max-line-length
                    if (this.formulario.listaActivoNoCorriente[i].componentes[j].codigo.indexOf(this.constantes.FORM2_COD_DEPRECIACION_ACTIVOS_ADQUIRIDOS_ARRENDAMIENTO_FINANCIERO) !== -1 ||
                        this.formulario.listaActivoNoCorriente[i].componentes[j].codigo.indexOf(this.constantes.FORM2_COD_DEPRECIACION_INMUEBLES_MAQUINARIA_EQUIPO) !== -1 ||
                        this.formulario.listaActivoNoCorriente[i].componentes[j].codigo.indexOf(this.constantes.FORM2_COD_DEPRECIACION_ACTIVO_BIOL_AMOR_AGOTA_ACUM) !== -1) {
                        suma -= Number(this.formulario.listaActivoNoCorriente[i].componentes[j].cantidad);
                    } else {
                        suma += Number(this.formulario.listaActivoNoCorriente[i].componentes[j].cantidad);
                    }
                }
            }
        }
        this.formulario.listaActivoNoCorriente[idy].componentes[idx].cantidad = suma;
        this.totalActivos();
    }

    totalActivos() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        const idx = this.formulario.listaActivoCorriente.length - 1;
        const jdx = this.formulario.listaActivoNoCorriente.length - 1;

        suma1 += this.formulario.listaActivoCorriente[idx].componentes[0].cantidad;
        suma2 += this.formulario.listaActivoCorriente[idx].componentes[1].cantidad;
        suma3 += this.formulario.listaActivoCorriente[idx].componentes[2].cantidad;
        suma4 += this.formulario.listaActivoCorriente[idx].componentes[3].cantidad;

        suma1 += this.formulario.listaActivoNoCorriente[jdx].componentes[0].cantidad;
        suma2 += this.formulario.listaActivoNoCorriente[jdx].componentes[1].cantidad;
        suma3 += this.formulario.listaActivoNoCorriente[jdx].componentes[2].cantidad;
        suma4 += this.formulario.listaActivoNoCorriente[jdx].componentes[3].cantidad;

        this.formulario.totalActivos.componentes[0].cantidad = suma1;
        this.formulario.totalActivos.componentes[1].cantidad = suma2;
        this.formulario.totalActivos.componentes[2].cantidad = suma3;
        this.formulario.totalActivos.componentes[3].cantidad = suma4;
    }

    subtotalPasivoCorriente(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaPasivoCorriente.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaPasivoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPasivoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaPasivoCorriente[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaPasivoCorriente[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaPasivoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPasivoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaPasivoCorriente[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaPasivoCorriente[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaPasivoCorriente[idy].componentes[idx].cantidad = suma;
        this.totalPasivos();
        this.totalPasivosPatrimonio();
    }

    subtotalPasivoNoCorriente(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaPasivoNoCorriente.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaPasivoNoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPasivoNoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaPasivoNoCorriente[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaPasivoNoCorriente[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaPasivoNoCorriente.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPasivoNoCorriente[i].componentes.length; j++) {
                if (this.formulario.listaPasivoNoCorriente[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaPasivoNoCorriente[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaPasivoNoCorriente[idy].componentes[idx].cantidad = suma;
        this.totalPasivos();
        this.totalPasivosPatrimonio();
    }

    totalPasivos() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        const idx = this.formulario.listaPasivoCorriente.length - 1;
        const jdx = this.formulario.listaPasivoNoCorriente.length - 1;

        suma1 += this.formulario.listaPasivoCorriente[idx].componentes[0].cantidad;
        suma2 += this.formulario.listaPasivoCorriente[idx].componentes[1].cantidad;
        suma3 += this.formulario.listaPasivoCorriente[idx].componentes[2].cantidad;
        suma4 += this.formulario.listaPasivoCorriente[idx].componentes[3].cantidad;

        suma1 += this.formulario.listaPasivoNoCorriente[jdx].componentes[0].cantidad;
        suma2 += this.formulario.listaPasivoNoCorriente[jdx].componentes[1].cantidad;
        suma3 += this.formulario.listaPasivoNoCorriente[jdx].componentes[2].cantidad;
        suma4 += this.formulario.listaPasivoNoCorriente[jdx].componentes[3].cantidad;

        this.formulario.totalPasivos.componentes[0].cantidad = suma1;
        this.formulario.totalPasivos.componentes[1].cantidad = suma2;
        this.formulario.totalPasivos.componentes[2].cantidad = suma3;
        this.formulario.totalPasivos.componentes[3].cantidad = suma4;
    }

    subtotalPatrimonio(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaPatrimonio.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaPatrimonio.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPatrimonio[i].componentes.length; j++) {
                if (this.formulario.listaPatrimonio[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaPatrimonio[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaPatrimonio.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPatrimonio[i].componentes.length; j++) {
                if (this.formulario.listaPatrimonio[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaPatrimonio[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaPatrimonio[idy].componentes[idx].cantidad = suma;
        this.totalPasivosPatrimonio();
    }

    totalPasivosPatrimonio() {
        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;

        const idx = this.formulario.listaPatrimonio.length - 1;

        suma1 += this.formulario.listaPatrimonio[idx].componentes[0].cantidad;
        suma2 += this.formulario.listaPatrimonio[idx].componentes[1].cantidad;
        suma3 += this.formulario.listaPatrimonio[idx].componentes[2].cantidad;
        suma4 += this.formulario.listaPatrimonio[idx].componentes[3].cantidad;

        suma1 += this.formulario.totalPasivos.componentes[0].cantidad;
        suma2 += this.formulario.totalPasivos.componentes[1].cantidad;
        suma3 += this.formulario.totalPasivos.componentes[2].cantidad;
        suma4 += this.formulario.totalPasivos.componentes[3].cantidad;

        this.formulario.totalPasivoPatrimonio.componentes[0].cantidad = suma1;
        this.formulario.totalPasivoPatrimonio.componentes[1].cantidad = suma2;
        this.formulario.totalPasivoPatrimonio.componentes[2].cantidad = suma3;
        this.formulario.totalPasivoPatrimonio.componentes[3].cantidad = suma4;
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
        this.verControlInformacion();
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
