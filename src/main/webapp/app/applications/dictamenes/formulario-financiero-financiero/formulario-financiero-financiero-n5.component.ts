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
import { Formulario5 } from './formulario5.model';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancService } from '../entities/formfinanc.service';
import { FormfinancDetalleService } from '../entities/formfinancdetalle.service';
import { FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-financiero-n5',
    templateUrl: './formulario-financiero-financiero-n5.component.html',
    styleUrls: ['formulario-financiero-financiero.scss']
})

export class FormularioFinancieroFinancieroN5Component implements OnInit, OnDestroy {
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
    formulario: Formulario5;
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
        this.formulario = new Formulario5();

        const totalcoorpDesc = [this.constantes.FORM5_TOTAL_CREDCORPORATIVOS];
        const totalcoorpCod = [this.constantes.FORM5_COD_TOTAL_CREDCORPORATIVOS];
        this.formulario.totalCredCoorporativos = this.creartotales(totalcoorpDesc, totalcoorpCod);

        const totalgrandesDesc = [this.constantes.FORM5_TOTAL_CREDGRANDESEMPRESAS];
        const totalgrandesCod = [this.constantes.FORM5_COD_TOTAL_CREDGRANDESEMPRESAS];
        this.formulario.totalCredGrandesEmpresas = this.creartotales(totalgrandesDesc, totalgrandesCod);

        const totalmedianasDesc = [this.constantes.FORM5_TOTAL_CREDMEDIANASEMPRESAS];
        const totalmedianasCod = [this.constantes.FORM5_COD_TOTAL_CREDMEDIANASEMPRESAS];
        this.formulario.totalCredMedianasEmpresas = this.creartotales(totalmedianasDesc, totalmedianasCod);

        const totalpequeniasDesc = [this.constantes.FORM5_TOTAL_CREDPEQUENIASEMPRESAS];
        const totalpequeniasCod = [this.constantes.FORM5_COD_TOTAL_CREDPEQUENIASEMPRESAS];
        this.formulario.totalCredPequeniasEmpresas = this.creartotales(totalpequeniasDesc, totalpequeniasCod);

        const totalmicroDesc = [this.constantes.FORM5_TOTAL_CREDMICROEMPRESAS];
        const totalmicroCod = [this.constantes.FORM5_COD_TOTAL_CREDMICROEMPRESAS];
        this.formulario.totalCredMicroEmpresas = this.creartotales(totalmicroDesc, totalmicroCod);

        const totalconsumoDesc = [this.constantes.FORM5_TOTAL_CREDCONSUMO];
        const totalconsumoCod = [this.constantes.FORM5_COD_TOTAL_CREDCONSUMO];
        this.formulario.totalCredConsumo = this.creartotales(totalconsumoDesc, totalconsumoCod);

        const totalhipotecarioDesc = [this.constantes.FORM5_TOTAL_CREDHIPOVIVIENDA];
        const totalhipotecarioCod = [this.constantes.FORM5_COD_TOTAL_CREDHIPOVIVIENDA];
        this.formulario.totalCredHipotecariosVivienda = this.creartotales(totalhipotecarioDesc, totalhipotecarioCod);

        const coorpDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_DESCUENTOS,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_FACTORING,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_COMERCIOEXTERIOR,
        this.constantes.FORM5_OTROS];
        const coorpCod = [this.constantes.FORM5_COD_CREDCORPORATIVOS_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_DESCUENTOS,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_PRESTAMOS,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_FACTORING,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_ARRENFINANC,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDCORPORATIVOS_OTROS];
        this.formulario.listaCredCoorporativos = this.crearlistacomponentes(coorpDesc, coorpCod, false);

        const grandesDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_DESCUENTOS,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_FACTORING,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_COMERCIOEXTERIOR,
        this.constantes.FORM5_OTROS];
        const grandesCod = [this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_DESCUENTOS,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_PRESTAMOS,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_FACTORING,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_ARRENFINANC,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDGRANDESEMPRESAS_OTROS];
        this.formulario.listaCredGrandesEmpresas = this.crearlistacomponentes(grandesDesc, grandesCod, false);

        const medianasDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_DESCUENTOS,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_FACTORING,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_COMERCIOEXTERIOR,
        this.constantes.FORM5_OTROS];
        const medianasCod = [this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_DESCUENTOS,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_PRESTAMOS,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_FACTORING,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_ARRENFINANC,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDMEDIANASEMPRESAS_OTROS];
        this.formulario.listaCredMedianasEmpresas = this.crearlistacomponentes(medianasDesc, medianasCod, false);

        const pequeniasDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_DESCUENTOS,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_FACTORING,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_COMERCIOEXTERIOR,
        this.constantes.FORM5_OTROS];
        const pequeniasCod = [this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_DESCUENTOS,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_PRESTAMOS,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_FACTORING,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_ARRENFINANC,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDPEQUENIASEMPRESAS_OTROS];
        this.formulario.listaCredPequeniasEmpresas = this.crearlistacomponentes(pequeniasDesc, pequeniasCod, false);

        const microDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_DESCUENTOS,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_FACTORING,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_COMERCIOEXTERIOR,
        this.constantes.FORM5_OTROS];
        const microCod = [this.constantes.FORM5_COD_CREDMICROEMPRESAS_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_DESCUENTOS,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_PRESTAMOS,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_FACTORING,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_ARRENFINANC,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDMICROEMPRESAS_OTROS];
        this.formulario.listaCredMicroEmpresas = this.crearlistacomponentes(microDesc, microCod, false);

        const consumoDesc = [this.constantes.FORM5_TARJETACREDITO,
        this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_PRESTAMOSREVOLVENTES,
        this.constantes.FORM5_PRESTAMOSNOREVOLVENTES,
        this.constantes.FORM5_PRESTAMOSAUTOS,
        this.constantes.FORM5_ARRENFINANC,
        this.constantes.FORM5_OTROS];
        const consumoCod = [this.constantes.FORM5_COD_CREDCONSUMO_TARJETACREDITO,
        this.constantes.FORM5_COD_CREDCONSUMO_PRESTAMOS,
        this.constantes.FORM5_COD_CREDCONSUMO_PRESTAMOSREVOLVENTES,
        this.constantes.FORM5_COD_CREDCONSUMO_PRESTAMOSNOREVOLVENTES,
        this.constantes.FORM5_COD_CREDCONSUMO_PRESTAMOSAUTOS,
        this.constantes.FORM5_COD_CREDCONSUMO_COMERCIOEXTERIOR,
        this.constantes.FORM5_COD_CREDCONSUMO_OTROS];
        this.formulario.listaCredConsumo = this.crearlistacomponentes(consumoDesc, consumoCod, false);

        const hipotecarioDesc = [this.constantes.FORM5_PRESTAMOS,
        this.constantes.FORM5_PRESTAMOSMIVIVIENDA,
        this.constantes.FORM5_OTROS];
        const hipotecarioCod = [this.constantes.FORM5_COD_CREDHIPOVIVIENDA_PRESTAMOS,
        this.constantes.FORM5_COD_CREDHIPOVIVIENDA_PRESTAMOSMIVIVIENDA,
        this.constantes.FORM5_COD_CREDHIPOVIVIENDA_OTROS];
        this.formulario.listaCredHipotecariosVivienda = this.crearlistacomponentes(hipotecarioDesc, hipotecarioCod, false);

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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'ff5').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredCoorporativos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredGrandesEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredMedianasEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredPequeniasEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredMicroEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredConsumo, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCredHipotecariosVivienda, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredCoorporativos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredGrandesEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredMedianasEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredPequeniasEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredMicroEmpresas, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredConsumo, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCredHipotecariosVivienda, this.nCodffina);
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
