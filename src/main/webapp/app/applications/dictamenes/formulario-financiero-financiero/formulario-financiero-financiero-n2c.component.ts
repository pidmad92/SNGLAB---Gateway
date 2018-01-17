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
import { Formulario2C } from './formulario2c.model';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancService } from '../entities/formfinanc.service';
import { FormfinancDetalleService } from '../entities/formfinancdetalle.service';
import { FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-financiero-n2c',
    templateUrl: './formulario-financiero-financiero-n2c.component.html',
    styleUrls: ['formulario-financiero-financiero.scss']
})

export class FormularioFinancieroFinancieroN2CComponent implements OnInit, OnDestroy {
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
    formulario: Formulario2C;
    constantes: Constants;

    nCodffina: number;

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
        this.display = false;
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
        this.construirFormulario();
    }

    construirFormulario() {
        this.formulario = new Formulario2C();

        const acdispDesc = [this.constantes.FORM2C_AC_DISPONIBLE_CAJA,
        this.constantes.FORM2C_AC_DISPONIBLE_BCRP,
        this.constantes.FORM2C_AC_DISPONIBLE_BANCOTRASEMPFINAN,
        this.constantes.FORM2C_AC_DISPONIBLE_BANCOINSTIFINAN,
        this.constantes.FORM2C_AC_DISPONIBLE_CANJE,
        this.constantes.FORM2C_AC_DISPONIBLE_OTROSDISP,
        this.constantes.FORM2C_AC_DISPONIBLE_TOTAL];
        const acdispCod = [this.constantes.FORM2C_COD_AC_DISPONIBLE_CAJA,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_BCRP,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_BANCOTRASEMPFINAN,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_BANCOINSTIFINAN,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_CANJE,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_OTROSDISP,
        this.constantes.FORM2C_COD_AC_DISPONIBLE_TOTAL];
        this.formulario.listaACDisponible = this.crearlistacomponentes(acdispDesc, acdispCod, true);

        const acCarCredNetDesc = [this.constantes.FORM2C_AC_CARTERANETO_VIG_CUENTASCORRIENTES,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_TARJETACREDITO,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_DESCUENTOS,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_FACTORING,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_PRESTAMOS,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_ARRENFINANC,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_HIPVIVIENDA,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_COMEREXTERIOR,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_CREDLIQUIDAR,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_OTROS,
        this.constantes.FORM2C_AC_CARTERANETO_VIG_TOTAL];
        const acCarCredNetCod = [this.constantes.FORM2C_AC_CARTERANETO_VIG_CUENTASCORRIENTES,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_TARJETACREDITO,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_DESCUENTOS,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_FACTORING,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_PRESTAMOS,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_ARRENFINANC,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_HIPVIVIENDA,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_COMEREXTERIOR,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_CREDLIQUIDAR,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_OTROS,
        this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_TOTAL];
        this.formulario.listaACCateraCredNetos = this.crearlistacomponentes(acCarCredNetDesc, acCarCredNetCod, true);

        const acRefReesDesc = [this.constantes.FORM2C_COD_AC_CARTERANETO_REFINANREESTRUC];
        const acRefReesCod = [this.constantes.FORM2C_COD_AC_CARTERANETO_REFINANREESTRUC];
        this.formulario.listaACRefinanReestruc = this.crearlistacomponentes(acRefReesDesc, acRefReesCod, false);

        const acAtrasadosDesc = [this.constantes.FORM2C_AC_CARTERANETO_ATRASADOS_VENCIDOS,
        this.constantes.FORM2C_AC_CARTERANETO_ATRASADOS_COBRAJUDICIAL,
        this.constantes.FORM2C_AC_CARTERANETO_ATRASADOS_PROVISIONES,
        this.constantes.FORM2C_AC_CARTERANETO_ATRASADOS_INTCOMINODEVENGADOS,
        this.constantes.FORM2C_AC_CARTERANETO_ATRASADOS_TOTAL];
        const acAtrasadosCod = [this.constantes.FORM2C_COD_AC_CARTERANETO_ATRASADOS_VENCIDOS,
        this.constantes.FORM2C_COD_AC_CARTERANETO_ATRASADOS_COBRAJUDICIAL,
        this.constantes.FORM2C_COD_AC_CARTERANETO_ATRASADOS_PROVISIONES,
        this.constantes.FORM2C_COD_AC_CARTERANETO_ATRASADOS_INTCOMINODEVENGADOS,
        this.constantes.FORM2C_COD_AC_CARTERANETO_ATRASADOS_TOTAL];
        this.formulario.listaACAtrasados = this.crearlistacomponentes(acAtrasadosDesc, acAtrasadosCod, true);

        const actotalDesc = [this.constantes.FORM2C_AC_CARTERANETO_TOTAL];
        const actotalCod = [this.constantes.FORM2C_COD_AC_CARTERANETO_TOTAL];
        this.formulario.totalACTotal = this.creartotales(actotalDesc, actotalCod);

        const actotalOtrosDesc = [this.constantes.FORM2C_AC_OTROSCORRIENTES_TOTAL];
        const actotalOtrosCod = [this.constantes.FORM2C_COD_AC_OTROSCORRIENTES_TOTAL];
        this.formulario.totalACOtros = this.creartotales(actotalOtrosDesc, actotalOtrosCod);

        // ANC
        const ancCarCredNetDesc = [this.constantes.FORM2C_ANC_CARTERANETOS_VIG_CUENTASCORRIENTES,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_TARJETACREDITO,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_DESCUENTOS,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_FACTORING,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_PRESTAMOS,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_ARRENFINANC,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_HIPVIVIENDA,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_COMEREXTERIOR,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_CREDLIQUIDAR,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_OTROS,
        this.constantes.FORM2C_ANC_CARTERANETOS_VIG_TOTAL];
        const ancCarCredNetCod = [this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_CUENTASCORRIENTES,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_TARJETACREDITO,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_DESCUENTOS,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_FACTORING,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_PRESTAMOS,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_ARRENFINANC,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_HIPVIVIENDA,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_COMEREXTERIOR,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_CREDLIQUIDAR,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_OTROS,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_VIG_TOTAL];
        this.formulario.listaANCCateraCredNetos = this.crearlistacomponentes(ancCarCredNetDesc, ancCarCredNetCod, true);

        const ancRefReesDesc = [this.constantes.FORM2C_ANC_CARTERANETOS_REFINANREESTRUC];
        const ancRefReesCod = [this.constantes.FORM2C_COD_ANC_CARTERANETOS_REFINANREESTRUC];
        this.formulario.listaANCRefinanReestruc = this.crearlistacomponentes(ancRefReesDesc, ancRefReesCod, false);

        const ancAtrasadosDesc = [this.constantes.FORM2C_ANC_CARTERANETOS_ATRASADOS_VENCIDOS,
        this.constantes.FORM2C_ANC_CARTERANETOS_ATRASADOS_COBRAJUDICIAL,
        this.constantes.FORM2C_ANC_CARTERANETOS_ATRASADOS_PROVISIONES,
        this.constantes.FORM2C_ANC_CARTERANETOS_ATRASADOS_INTCOMINODEVENGADOS,
        this.constantes.FORM2C_ANC_CARTERANETOS_ATRASADOS_TOTAL];
        const ancAtrasadosCod = [this.constantes.FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_VENCIDOS,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_COBRAJUDICIAL,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_PROVISIONES,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_INTCOMINODEVENGADOS,
        this.constantes.FORM2C_COD_ANC_CARTERANETOS_ATRASADOS_TOTAL];
        this.formulario.listaANCAtrasados = this.crearlistacomponentes(ancAtrasadosDesc, ancAtrasadosCod, true);

        const anctotalDesc = [this.constantes.FORM2C_ANC_CARTERANETOS_TOTAL];
        const anctotalCod = [this.constantes.FORM2C_COD_ANC_CARTERANETOS_TOTAL];
        this.formulario.totalANCTotal = this.creartotales(anctotalDesc, anctotalCod);

        const anctotalOtrosDesc = [this.constantes.FORM2C_ANC_OTROSCORRIENTES_TOTAL];
        const anctotalOtrosCod = [this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES_TOTAL];
        this.formulario.totalANCOtros = this.creartotales(anctotalOtrosDesc, anctotalOtrosCod);

        const totalPCDesc = [this.constantes.FORM2C_PC_OTROS_TOTAL];
        const totalPCCod = [this.constantes.FORM2C_COD_PC_OTROS_TOTAL];
        this.formulario.totalPCOtros = this.creartotales(totalPCDesc, totalPCCod);

        const totalPNCDesc = [this.constantes.FORM2C_COD_PNC_OTROS_TOTAL];
        const totalPNCCod = [this.constantes.FORM2C_COD_PNC_OTROS_TOTAL];
        this.formulario.totalPNCOtros = this.creartotales(totalPNCDesc, totalPNCCod);

        this.formulario.listaACOtros = new Array<Tabla>();
        this.formulario.listaANCOtros = new Array<Tabla>();
        this.formulario.listaPCOtros = new Array<Tabla>();
        this.formulario.listaPNCOtros = new Array<Tabla>();

        this.obtenerValores(this.constantes.FORM2C_COD_AC_OTROSCORRIENTES, 1);
        this.obtenerValores(this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES, 2);
        this.obtenerValores(this.constantes.FORM2C_COD_PC_OTROS, 3);
        this.obtenerValores(this.constantes.FORM2C_COD_PNC_OTROS, 4);

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
                                if (this.formulario.listaACOtros[i] === undefined) {
                                    this.formulario.listaACOtros[i] = new Tabla();
                                    if (this.formulario.listaACOtros[i].componentes === undefined) {
                                        this.formulario.listaACOtros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaACOtros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaACOtros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaACOtros[i].componentes.push(comp);
                                break;
                            case 2:
                                if (this.formulario.listaANCOtros[i] === undefined) {
                                    this.formulario.listaANCOtros[i] = new Tabla();
                                    if (this.formulario.listaANCOtros[i].componentes === undefined) {
                                        this.formulario.listaANCOtros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaANCOtros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaANCOtros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaANCOtros[i].componentes.push(comp);
                                break;
                            case 3:
                                if (this.formulario.listaPCOtros[i] === undefined) {
                                    this.formulario.listaPCOtros[i] = new Tabla();
                                    if (this.formulario.listaPCOtros[i].componentes === undefined) {
                                        this.formulario.listaPCOtros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCOtros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCOtros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCOtros[i].componentes.push(comp);
                                break;
                            case 4:
                                if (this.formulario.listaPNCOtros[i] === undefined) {
                                    this.formulario.listaPNCOtros[i] = new Tabla();
                                    if (this.formulario.listaPNCOtros[i].componentes === undefined) {
                                        this.formulario.listaPNCOtros[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPNCOtros[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPNCOtros[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPNCOtros[i].componentes.push(comp);
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'ff2c').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACDisponible, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACCateraCredNetos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACRefinanReestruc, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACAtrasados, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaANCCateraCredNetos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaANCRefinanReestruc, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaANCAtrasados, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaANCOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPNCOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalANCOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACTotal, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalANCTotal, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCOtros, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPNCOtros, this.nCodffina);
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
