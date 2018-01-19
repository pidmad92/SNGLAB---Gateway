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
import { Formulario6 } from './formulario6.model';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancService } from '../entities/formfinanc.service';
import { FormfinancDetalleService } from '../entities/formfinancdetalle.service';
import { FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-financiero-n6',
    templateUrl: './formulario-financiero-financiero-n6.component.html',
    styleUrls: ['formulario-financiero-financiero.scss']
})

export class FormularioFinancieroFinancieroN6Component implements OnInit, OnDestroy {
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
    formulario: Formulario6;
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
        this.formulario = new Formulario6();

        const creditosDesc = [
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_AGRICULTURA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_PESCA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_MINERIA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_INDMANUFACTURERA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ALIMENTOS,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_TEXTILES,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_MADERA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_FABSUSTANCIASQUIMICAS,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_FABPRODUCTOSCAUCHO,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_FABPRODUCTOSMINERALES,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_FABMETALES,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_MAQUINARIA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_FABVEHICULOSTRANSPORTE,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_RESTOMANUFACTURA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ELECGASAGUA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_CONSTRUCCION,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_COMERCIO,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_VENTAREPARACIONVEHICULOS,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_COMERCIOMAYOR,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_COMERCIOMENOR,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_HOTELESRESTAURANTES,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_TRANSPORTEALMCOMUNI,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_INTERFINANCIERA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASEMPRALQUI,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASALQUI,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ACTEMPRESARIAL,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ADMINISTRACIONPUBLICA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_ENSEÑANZA,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_SERVSOCIALESSALUD,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_OTRASACTIVIDADES,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_HOGARESPRIVADOS,
            this.constantes.FORM6_DIRECTIPOCREDSECTECO_TOTAL
        ];
        const creditosCod = [
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_AGRICULTURA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_PESCA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_MINERIA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_INDMANUFACTURERA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ALIMENTOS,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_TEXTILES,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_MADERA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_FABSUSTANCIASQUIMICAS,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_FABPRODUCTOSCAUCHO,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_FABPRODUCTOSMINERALES,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_FABMETALES,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_MAQUINARIA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_FABVEHICULOSTRANSPORTE,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_RESTOMANUFACTURA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ELECGASAGUA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_CONSTRUCCION,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIO,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_VENTAREPARACIONVEHICULOS,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIOMAYOR,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_COMERCIOMENOR,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_HOTELESRESTAURANTES,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_TRANSPORTEALMCOMUNI,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_INTERFINANCIERA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASEMPRALQUI,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ACTINMOBILIARIASALQUI,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ACTEMPRESARIAL,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ADMINISTRACIONPUBLICA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_ENSEÑANZA,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_SERVSOCIALESSALUD,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_OTRASACTIVIDADES,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_HOGARESPRIVADOS,
            this.constantes.FORM6_COD_DIRECTIPOCREDSECTECO_TOTAL
        ];
        this.formulario.listaCreditos = this.crearlistacomponentes(creditosDesc, creditosCod, true);

        const creditosHipDesc = [this.constantes.FORM6_CREDITOSHIPOTECARIOSVIVIENDA];
        const creditosHipCod = [this.constantes.FORM6_COD_CREDITOSHIPOTECARIOSVIVIENDA];
        this.formulario.listaCreditosHipotecarios = this.crearlistacomponentes(creditosHipDesc, creditosHipCod, false);

        const creditosConsumoDesc = [this.constantes.FORM6_CREDITOSCONSUMO];
        const creditosConsumoCod = [this.constantes.FORM6_COD_CREDITOSCONSUMO];
        this.formulario.listaCreditosConsumo = this.crearlistacomponentes(creditosConsumoDesc, creditosConsumoCod, false);

        const totalDesc = [this.constantes.FORM6_TOTALCREDITOS];
        const totalCod = [this.constantes.FORM6_COD_TOTALCREDITOS];
        this.formulario.totalCreditos = this.creartotales(totalDesc, totalCod);
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
    subtotalCreditos(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaCreditos.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaCreditos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaCreditos[i].componentes.length; j++) {
                if (this.formulario.listaCreditos[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaCreditos[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaCreditos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaCreditos[i].componentes.length; j++) {
                if (this.formulario.listaCreditos[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaCreditos[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaCreditos[idy].componentes[idx].cantidad = suma;
        this.totalCreditos();
    }

    subtotalCreditosHipotecarios(event: any) {
        const columna: string[] = event.target.id.split('_');
        for (let i = 0; i < this.formulario.listaCreditosHipotecarios.length; i++) {
            for (let j = 0; j < this.formulario.listaCreditosHipotecarios[i].componentes.length; j++) {
                if (this.formulario.listaCreditosHipotecarios[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaCreditosHipotecarios[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
        this.totalCreditos();
    }

    subtotalCreditosConsumo(event: any) {
        const columna: string[] = event.target.id.split('_');

        for (let i = 0; i < this.formulario.listaCreditosConsumo.length; i++) {
            for (let j = 0; j < this.formulario.listaCreditosConsumo[i].componentes.length; j++) {
                if (this.formulario.listaCreditosConsumo[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaCreditosConsumo[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        this.totalCreditos();
    }

    totalCreditos() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;

        const idx = this.formulario.listaCreditos.length - 1;

        ingreso1 = this.formulario.listaCreditos[idx].componentes[0].cantidad +
            this.formulario.listaCreditosHipotecarios[0].componentes[0].cantidad +
            this.formulario.listaCreditosConsumo[0].componentes[0].cantidad;
        ingreso2 = this.formulario.listaCreditos[idx].componentes[1].cantidad +
            this.formulario.listaCreditosHipotecarios[0].componentes[1].cantidad +
            this.formulario.listaCreditosConsumo[0].componentes[1].cantidad;
        ingreso3 = this.formulario.listaCreditos[idx].componentes[2].cantidad +
            this.formulario.listaCreditosHipotecarios[0].componentes[2].cantidad +
            this.formulario.listaCreditosConsumo[0].componentes[2].cantidad;
        ingreso4 = this.formulario.listaCreditos[idx].componentes[3].cantidad +
            this.formulario.listaCreditosHipotecarios[0].componentes[3].cantidad +
            this.formulario.listaCreditosConsumo[0].componentes[3].cantidad;

        this.formulario.totalCreditos.componentes[0].cantidad = ingreso1;
        this.formulario.totalCreditos.componentes[1].cantidad = ingreso2;
        this.formulario.totalCreditos.componentes[2].cantidad = ingreso3;
        this.formulario.totalCreditos.componentes[3].cantidad = ingreso4;
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'ff6').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCreditos, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCreditosHipotecarios, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaCreditosConsumo, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalCreditos, this.nCodffina);
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
