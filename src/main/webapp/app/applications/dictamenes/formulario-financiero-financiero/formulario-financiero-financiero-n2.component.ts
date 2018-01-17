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
import { Formulario2 } from './formulario2.model';
import { Constants } from './constants';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormfinancService } from '../entities/formfinanc.service';
import { FormfinancDetalleService } from '../entities/formfinancdetalle.service';
import { FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-financiero-n2',
    templateUrl: './formulario-financiero-financiero-n2.component.html',
    styleUrls: ['formulario-financiero-financiero.scss']
})

export class FormularioFinancieroFinancieroN2Component implements OnInit, OnDestroy {
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
    formulario: Formulario2;
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
        this.formulario = new Formulario2();

        const activocorrienteDesc = [
            this.constantes.FORM2_AC_DISPONIBLE,
            this.constantes.FORM2_AC_FONDOSINTERBANCARIOS,
            this.constantes.FORM2_AC_INVCAMBIORESUL,
            this.constantes.FORM2_AC_INVDISPONIBLEVENTA,
            this.constantes.FORM2_AC_INVVENCIMIENTO,
            this.constantes.FORM2_AC_CARTERACREDNETOS,
            this.constantes.FORM2_AC_CARTERACREDVIG,
            this.constantes.FORM2_AC_CARTERACREDREEST,
            this.constantes.FORM2_AC_CARTERACREDREFIN,
            this.constantes.FORM2_AC_CARTERACREDVENC,
            this.constantes.FORM2_AC_CARTERACREDCOBRA,
            this.constantes.FORM2_AC_PROVCRED,
            this.constantes.FORM2_AC_DERIVADOSNEGOC,
            this.constantes.FORM2_AC_DEVIVADOSCOBER,
            this.constantes.FORM2_AC_CUENTASCOBRAR,
            this.constantes.FORM2_AC_IMPCORRIENTES,
            this.constantes.FORM2_AC_OTROS,
            this.constantes.FORM2_AC_TOTAL
        ];
        const activocorrienteCod = [
            this.constantes.FORM2_COD_AC_DISPONIBLE,
            this.constantes.FORM2_COD_AC_FONDOSINTERBANCARIOS,
            this.constantes.FORM2_COD_AC_INVCAMBIORESUL,
            this.constantes.FORM2_COD_AC_INVDISPONIBLEVENTA,
            this.constantes.FORM2_COD_AC_INVVENCIMIENTO,
            this.constantes.FORM2_COD_AC_CARTERACREDNETOS,
            this.constantes.FORM2_COD_AC_CARTERACREDVIG,
            this.constantes.FORM2_COD_AC_CARTERACREDREEST,
            this.constantes.FORM2_COD_AC_CARTERACREDREFIN,
            this.constantes.FORM2_COD_AC_CARTERACREDVENC,
            this.constantes.FORM2_COD_AC_CARTERACREDCOBRA,
            this.constantes.FORM2_COD_AC_PROVCRED,
            this.constantes.FORM2_COD_AC_DERIVADOSNEGOC,
            this.constantes.FORM2_COD_AC_DEVIVADOSCOBER,
            this.constantes.FORM2_COD_AC_CUENTASCOBRAR,
            this.constantes.FORM2_COD_AC_IMPCORRIENTES,
            this.constantes.FORM2_COD_AC_OTROS,
            this.constantes.FORM2_COD_AC_TOTAL
        ];
        this.formulario.listaActivoCorriente = this.crearlistacomponentes(activocorrienteDesc, activocorrienteCod, true);

        const activonocorrienteDesc = [
            this.constantes.FORM2_ANC_CATERACREDNETOS,
            this.constantes.FORM2_ANC_CARTERACREDVIG,
            this.constantes.FORM2_ANC_CARTERACREDREEST,
            this.constantes.FORM2_ANC_CARTERACREDREFIN,
            this.constantes.FORM2_ANC_CARTERACREDVENC,
            this.constantes.FORM2_ANC_CARTERACREDCOBRANZA,
            this.constantes.FORM2_ANC_PROVCREDITOS,
            this.constantes.FORM2_ANC_BIENES,
            this.constantes.FORM2_ANC_PARTICIPACIONES,
            this.constantes.FORM2_ANC_INMMOBEQUIPONETO,
            this.constantes.FORM2_ANC_ACTIVOSINTANGIBLES,
            this.constantes.FORM2_ANC_IMPCORRIENTES,
            this.constantes.FORM2_ANC_IMPDIFERIDO,
            this.constantes.FORM2_ANC_MANTENIDOSVENTA,
            this.constantes.FORM2_ANC_OTROS,
            this.constantes.FORM2_ANC_TOTAL
        ];
        const activonocorrienteCod = [
            this.constantes.FORM2_COD_ANC_CATERACREDNETOS,
            this.constantes.FORM2_COD_ANC_CARTERACREDVIG,
            this.constantes.FORM2_COD_ANC_CARTERACREDREEST,
            this.constantes.FORM2_COD_ANC_CARTERACREDREFIN,
            this.constantes.FORM2_COD_ANC_CARTERACREDVENC,
            this.constantes.FORM2_COD_ANC_CARTERACREDCOBRANZA,
            this.constantes.FORM2_COD_ANC_PROVCREDITOS,
            this.constantes.FORM2_COD_ANC_BIENES,
            this.constantes.FORM2_COD_ANC_PARTICIPACIONES,
            this.constantes.FORM2_COD_ANC_INMMOBEQUIPONETO,
            this.constantes.FORM2_COD_ANC_ACTIVOSINTANGIBLES,
            this.constantes.FORM2_COD_ANC_IMPCORRIENTES,
            this.constantes.FORM2_COD_ANC_IMPDIFERIDO,
            this.constantes.FORM2_COD_ANC_MANTENIDOSVENTA,
            this.constantes.FORM2_COD_ANC_OTROS,
            this.constantes.FORM2_COD_ANC_TOTAL
        ];
        this.formulario.listaActivoNoCorriente = this.crearlistacomponentes(activonocorrienteDesc, activonocorrienteCod, true);

        const totalActivoDesc = [this.constantes.FORM2_TOTALACTIVO];
        const totalActivoCod = [this.constantes.FORM2_COD_TOTALACTIVO];
        this.formulario.totalActivo = this.creartotales(totalActivoDesc, totalActivoCod);

        const pasivocorrienteDesc = [
            this.constantes.FORM2_PC_OBLIGPUBLICO,
            this.constantes.FORM2_PC_FONDOSINTER,
            this.constantes.FORM2_PC_DEPSISFINANCIERO,
            this.constantes.FORM2_PC_ADEUDOSOBLIGFINAN,
            this.constantes.FORM2_PC_DERIVADOSNEGOC,
            this.constantes.FORM2_PC_DERIVADOSCOBER,
            this.constantes.FORM2_PC_CUENTASPAGAR,
            this.constantes.FORM2_PC_PROVISIONES,
            this.constantes.FORM2_PC_IMPCORRIENTES,
            this.constantes.FORM2_PC_IMPDIFERIDO,
            this.constantes.FORM2_PC_OTROS,
            this.constantes.FORM2_PC_TOTAL
        ];
        const pasivocorrienteCod = [
            this.constantes.FORM2_COD_PC_OBLIGPUBLICO,
            this.constantes.FORM2_COD_PC_FONDOSINTER,
            this.constantes.FORM2_COD_PC_DEPSISFINANCIERO,
            this.constantes.FORM2_COD_PC_ADEUDOSOBLIGFINAN,
            this.constantes.FORM2_COD_PC_DERIVADOSNEGOC,
            this.constantes.FORM2_COD_PC_DERIVADOSCOBER,
            this.constantes.FORM2_COD_PC_CUENTASPAGAR,
            this.constantes.FORM2_COD_PC_PROVISIONES,
            this.constantes.FORM2_COD_PC_IMPCORRIENTES,
            this.constantes.FORM2_COD_PC_IMPDIFERIDO,
            this.constantes.FORM2_COD_PC_OTROS,
            this.constantes.FORM2_COD_PC_TOTAL
        ];
        this.formulario.listaPasivoCorriente = this.crearlistacomponentes(pasivocorrienteDesc, pasivocorrienteCod, true);

        const pasivonocorrienteDesc = [
            this.constantes.FORM2_PNC_OBLIGPUBLICO,
            this.constantes.FORM2_PNC_DEPSISFINANCIERO,
            this.constantes.FORM2_PNC_ADEUDOSOBLIGFINAN,
            this.constantes.FORM2_PNC_IMPDIFERIDO,
            this.constantes.FORM2_PNC_PROVISIONES,
            this.constantes.FORM2_PNC_OTROS,
            this.constantes.FORM2_PNC_TOTAL
        ];
        const pasivonocorrienteCod = [
            this.constantes.FORM2_COD_PNC_OBLIGPUBLICO,
            this.constantes.FORM2_COD_PNC_DEPSISFINANCIERO,
            this.constantes.FORM2_COD_PNC_ADEUDOSOBLIGFINAN,
            this.constantes.FORM2_COD_PNC_IMPDIFERIDO,
            this.constantes.FORM2_COD_PNC_PROVISIONES,
            this.constantes.FORM2_COD_PNC_OTROS,
            this.constantes.FORM2_COD_PNC_TOTAL
        ];
        this.formulario.listaPasivoNoCorriente = this.crearlistacomponentes(pasivonocorrienteDesc, pasivonocorrienteCod, true);

        const totalPasivoDesc = [this.constantes.FORM2_TOTALPASIVO];
        const totalPasivoCod = [this.constantes.FORM2_COD_TOTALPASIVO];
        this.formulario.totalPasivo = this.creartotales(totalPasivoDesc, totalPasivoCod);

        const patrimonioDesc = [
            this.constantes.FORM2_PAT_CAPITALSOCIAL,
            this.constantes.FORM2_PAT_CAPITALADICIONAL,
            this.constantes.FORM2_PAT_RESERVAS,
            this.constantes.FORM2_PAT_AJUSTESPATRIMONIO,
            this.constantes.FORM2_PAT_RESULACUMULADOS,
            this.constantes.FORM2_PAT_RESULNETOEJERCICIO,
            this.constantes.FORM2_PAT_TOTALPATRIMONIO
        ];
        const patrimonioCod = [
            this.constantes.FORM2_COD_PAT_CAPITALSOCIAL,
            this.constantes.FORM2_COD_PAT_CAPITALADICIONAL,
            this.constantes.FORM2_COD_PAT_RESERVAS,
            this.constantes.FORM2_COD_PAT_AJUSTESPATRIMONIO,
            this.constantes.FORM2_COD_PAT_RESULACUMULADOS,
            this.constantes.FORM2_COD_PAT_RESULNETOEJERCICIO,
            this.constantes.FORM2_COD_PAT_TOTALPATRIMONIO
        ];
        this.formulario.listaPatrimonio = this.crearlistacomponentes(patrimonioDesc, patrimonioCod, true);

        const totalPasivoPatrimonioDesc = [this.constantes.FORM2_TOTALPASIVOPATRIMONIO];
        const totalPasivoPatrimonioCod = [this.constantes.FORM2_COD_TOTALPASIVOPATRIMONIO];
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'ff2').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaActivoCorriente, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaActivoNoCorriente, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPasivoCorriente, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPasivoNoCorriente, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPatrimonio, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalActivo, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPasivo, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPasivoPatrimonio, this.nCodffina);
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
