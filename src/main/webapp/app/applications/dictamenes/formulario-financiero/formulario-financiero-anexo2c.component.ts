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
import { FormularioAnexo2C } from './formulario-anexo2c.model';
import { DetalleCuenta } from './detallecuenta.model';
import { FormfinancDetalleService, FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-anexo2c',
    templateUrl: './formulario-financiero-anexo2c.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroAnexo2CComponent implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    displayACCuentasCobrarComerciales: boolean;
    displayACCuentasCobrarComercialesRelacionadas: boolean;
    displayACCuentasCobrarDiversas: boolean;
    displayACOtrasCuentas: boolean;
    displayANCOtrasCuentas: boolean;
    displayPCCuentasPagarComerciales: boolean;
    displayPCCuentasPagarComercialesRelacionadas: boolean;
    displayPCObligacionesFinancieras: boolean;
    displayPCProvisiones: boolean;
    displayPCOtrasCuentas: boolean;
    displayPNCObligacionesFinancieras: boolean;
    displayPNCProvisiones: boolean;
    displayPNCOtrasCuentas: boolean;
    displayPResultadosNoRealizados: boolean;

    editarACCuentasCobrarComerciales: boolean;
    editarACCuentasCobrarComercialesRelacionadas: boolean;
    editarACCuentasCobrarDiversas: boolean;
    editarACOtrasCuentas: boolean;
    editarANCOtrasCuentas: boolean;
    editarPCCuentasPagarComerciales: boolean;
    editarPCCuentasPagarComercialesRelacionadas: boolean;
    editarPCObligacionesFinancieras: boolean;
    editarPCProvisiones: boolean;
    editarPCOtrasCuentas: boolean;
    editarPNCObligacionesFinancieras: boolean;
    editarPNCProvisiones: boolean;
    editarPNCOtrasCuentas: boolean;
    editarPResultadosNoRealizados: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    anios: number[];
    formGroup: FormGroup;
    formulario: FormularioAnexo2C;
    constantes: Constants;

    nCodffina: number;

    ACCuentasCobrarComerciales: DetalleCuenta;
    ACCuentasCobrarComercialesRelacionadas: DetalleCuenta;
    ACCuentasCobrarDiversas: DetalleCuenta;
    ACOtrasCuentas: DetalleCuenta;
    ANCOtrasCuentas: DetalleCuenta;
    PCCuentasPagarComerciales: DetalleCuenta;
    PCCuentasPagarComercialesRelacionadas: DetalleCuenta;
    PCObligacionesFinancieras: DetalleCuenta;
    PCProvisiones: DetalleCuenta;
    PCOtrasCuentas: DetalleCuenta;
    PNCObligacionesFinancieras: DetalleCuenta;
    PNCProvisiones: DetalleCuenta;
    PNCOtrasCuentas: DetalleCuenta;
    PResultadosNoRealizados: DetalleCuenta;

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

        this.displayACCuentasCobrarComerciales = false;
        this.displayACCuentasCobrarComercialesRelacionadas = false;
        this.displayACCuentasCobrarDiversas = false;
        this.displayACOtrasCuentas = false;
        this.displayANCOtrasCuentas = false;
        this.displayPCCuentasPagarComerciales = false;
        this.displayPCCuentasPagarComercialesRelacionadas = false;
        this.displayPCObligacionesFinancieras = false;
        this.displayPCProvisiones = false;
        this.displayPCOtrasCuentas = false;
        this.displayPNCObligacionesFinancieras = false;
        this.displayPNCProvisiones = false;
        this.displayPNCOtrasCuentas = false;
        this.displayPResultadosNoRealizados = false;

        this.editarACCuentasCobrarComerciales = false;
        this.editarACCuentasCobrarComercialesRelacionadas = false;
        this.editarACCuentasCobrarDiversas = false;
        this.editarACOtrasCuentas = false;
        this.editarANCOtrasCuentas = false;
        this.editarPCCuentasPagarComerciales = false;
        this.editarPCCuentasPagarComercialesRelacionadas = false;
        this.editarPCObligacionesFinancieras = false;
        this.editarPCProvisiones = false;
        this.editarPCOtrasCuentas = false;
        this.editarPNCObligacionesFinancieras = false;
        this.editarPNCProvisiones = false;
        this.editarPNCOtrasCuentas = false;
        this.editarPResultadosNoRealizados = false;

        this.ACCuentasCobrarComerciales = new DetalleCuenta();
        this.ACCuentasCobrarComercialesRelacionadas = new DetalleCuenta();
        this.ACCuentasCobrarDiversas = new DetalleCuenta();
        this.ACOtrasCuentas = new DetalleCuenta();
        this.ANCOtrasCuentas = new DetalleCuenta();
        this.PCCuentasPagarComerciales = new DetalleCuenta();
        this.PCCuentasPagarComercialesRelacionadas = new DetalleCuenta();
        this.PCObligacionesFinancieras = new DetalleCuenta();
        this.PCProvisiones = new DetalleCuenta();
        this.PCOtrasCuentas = new DetalleCuenta();
        this.PNCObligacionesFinancieras = new DetalleCuenta();
        this.PNCProvisiones = new DetalleCuenta();
        this.PNCOtrasCuentas = new DetalleCuenta();
        this.PResultadosNoRealizados = new DetalleCuenta();

        this.construirFormulario();
    }
    construirFormulario() {
        this.formulario = new FormularioAnexo2C();

        this.formulario.listaACCuentasCobrarComerciales = new Array<Tabla>();
        this.formulario.listaACCuentasCobrarComercialesRelacionadas = new Array<Tabla>();
        this.formulario.listaACCuentasCobrarDiversas = new Array<Tabla>();
        this.formulario.listaACOtrasCuentas = new Array<Tabla>();
        this.formulario.listaANCOtrasCuentas = new Array<Tabla>();
        this.formulario.listaPCCuentasPagarComerciales = new Array<Tabla>();
        this.formulario.listaPCCuentasPagarComercialesRelacionadas = new Array<Tabla>();
        this.formulario.listaPCObligacionesFinancieras = new Array<Tabla>();
        this.formulario.listaPCProvisiones = new Array<Tabla>();
        this.formulario.listaPCOtrasCuentas = new Array<Tabla>();
        this.formulario.listaPNCObligacionesFinancieras = new Array<Tabla>();
        this.formulario.listaPNCOtrasCuentas = new Array<Tabla>();
        this.formulario.listaPNCProvisiones = new Array<Tabla>();
        this.formulario.listaPResultadosNoRealizados = new Array<Tabla>();

        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES, 1);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS, 2);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS, 3);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_ACOTRASCUENTAS, 4);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_ANCOTRASCUENTAS, 5);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES, 6);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS, 7);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS, 8);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PCPROVISIONES, 9);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PCOTRASCUENTAS, 10);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS, 11);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PNCOTRASCUENTAS, 12);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PNCPROVISIONES, 13);
        this.obtenerValores(this.constantes.FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS, 14);

        const totalACCuentasCobrarComercialesDesc: string[] = [this.constantes.FORM2ANEX2C_ACCUENTASCOBRARCOMERCIALES];
        const totalACCuentasCobrarComercialesCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARCOMERCIALES];
        this.formulario.totalACCuentasCobrarComerciales = this.creartotales(totalACCuentasCobrarComercialesDesc, totalACCuentasCobrarComercialesCod);

        const totalACCuentasCobrarComercialesRelacionadasDesc: string[] = [this.constantes.FORM2ANEX2C_ACCUENTASCOBRARCOMERCIALESRELACIONADAS];
        const totalACCuentasCobrarComercialesRelacionadasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARCOMERCIALESRELACIONADAS];
        // tslint:disable-next-line:max-line-length
        this.formulario.totalACCuentasCobrarComercialesRelacionadas = this.creartotales(totalACCuentasCobrarComercialesRelacionadasDesc, totalACCuentasCobrarComercialesRelacionadasCod);

        const totalACCuentasCobrarDiversasDesc: string[] = [this.constantes.FORM2ANEX2C_ACCUENTASCOBRARDIVERSAS];
        const totalACCuentasCobrarDiversasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_ACCUENTASCOBRARDIVERSAS];
        this.formulario.totalACCuentasCobrarDiversas = this.creartotales(totalACCuentasCobrarDiversasDesc, totalACCuentasCobrarDiversasCod);

        const totalACOtrasCuentasDesc: string[] = [this.constantes.FORM2ANEX2C_ACOTRASCUENTAS];
        const totalACOtrasCuentasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_ACOTRASCUENTAS];
        this.formulario.totalACOtrasCuentas = this.creartotales(totalACOtrasCuentasDesc, totalACOtrasCuentasCod);

        const totalANCOtrasCuentasDesc: string[] = [this.constantes.FORM2ANEX2C_ANCOTRASCUENTAS];
        const totalANCOtrasCuentasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_ANCOTRASCUENTAS];
        this.formulario.totalANCOtrasCuentas = this.creartotales(totalANCOtrasCuentasDesc, totalANCOtrasCuentasCod);

        const totalPCCuentasPagarComercialesDesc: string[] = [this.constantes.FORM2ANEX2C_PCCUENTASPAGARCOMERCIALES];
        const totalPCCuentasPagarComercialesCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PCCUENTASPAGARCOMERCIALES];
        this.formulario.totalPCCuentasPagarComerciales = this.creartotales(totalPCCuentasPagarComercialesDesc, totalPCCuentasPagarComercialesCod);

        const totalPCCuentasPagarComercialesRelacionadasDesc: string[] = [this.constantes.FORM2ANEX2C_PCCUENTASPAGARCOMERCIALESRELACIONADAS];
        const totalPCCuentasPagarComercialesRelacionadasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PCCUENTASPAGARCOMERCIALESRELACIONADAS];
        // tslint:disable-next-line:max-line-length
        this.formulario.totalPCCuentasPagarComercialesRelacionadas = this.creartotales(totalPCCuentasPagarComercialesRelacionadasDesc, totalPCCuentasPagarComercialesRelacionadasCod);

        const totalPCObligacionesFinancierasDesc: string[] = [this.constantes.FORM2ANEX2C_PCOBLIGACIONESFINANCIERAS];
        const totalPCObligacionesFinancierasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PCOBLIGACIONESFINANCIERAS];
        this.formulario.totalPCObligacionesFinancieras = this.creartotales(totalPCObligacionesFinancierasDesc, totalPCObligacionesFinancierasCod);

        const totalPCProvisionesDesc: string[] = [this.constantes.FORM2ANEX2C_PCPROVISIONES];
        const totalPCProvisionesCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PCPROVISIONES];
        this.formulario.totalPCProvisiones = this.creartotales(totalPCProvisionesDesc, totalPCProvisionesCod);

        const totalPCOtrasCuentasDesc: string[] = [this.constantes.FORM2ANEX2C_PCOTRASCUENTAS];
        const totalPCOtrasCuentasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PCOTRASCUENTAS];
        this.formulario.totalPCOtrasCuentas = this.creartotales(totalPCOtrasCuentasDesc, totalPCOtrasCuentasCod);

        const totalPNCObligacionesFinancierasDesc: string[] = [this.constantes.FORM2ANEX2C_PNCOBLIGACIONESFINANCIERAS];
        const totalPNCObligacionesFinancierasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PNCOBLIGACIONESFINANCIERAS];
        this.formulario.totalPNCObligacionesFinancieras = this.creartotales(totalPNCObligacionesFinancierasDesc, totalPNCObligacionesFinancierasCod);

        const totalPNCOtrasCuentasDesc: string[] = [this.constantes.FORM2ANEX2C_PNCOTRASCUENTAS];
        const totalPNCOtrasCuentasCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PNCOTRASCUENTAS];
        this.formulario.totalPNCOtrasCuentas = this.creartotales(totalPNCOtrasCuentasDesc, totalPNCOtrasCuentasCod);

        const totalPNCProvisionesDesc: string[] = [this.constantes.FORM2ANEX2C_PNCPROVISIONES];
        const totalPNCProvisionesCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PNCPROVISIONES];
        this.formulario.totalPNCProvisiones = this.creartotales(totalPNCProvisionesDesc, totalPNCProvisionesCod);

        const totalPResultadosNoRealizadosDesc: string[] = [this.constantes.FORM2ANEX2C_PRESULTADOSNOREALIZADOS];
        const totalPResultadosNoRealizadosCod: string[] = [this.constantes.FORM2ANEX2C_COD_TOTAL_PRESULTADOSNOREALIZADOS];
        this.formulario.totalPResultadosNoRealizados = this.creartotales(totalPResultadosNoRealizadosDesc, totalPResultadosNoRealizadosCod);

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
                                if (this.formulario.listaACCuentasCobrarComerciales[i] === undefined) {
                                    this.formulario.listaACCuentasCobrarComerciales[i] = new Tabla();
                                    if (this.formulario.listaACCuentasCobrarComerciales[i].componentes === undefined) {
                                        this.formulario.listaACCuentasCobrarComerciales[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaACCuentasCobrarComerciales[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaACCuentasCobrarComerciales[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaACCuentasCobrarComerciales[i].componentes.push(comp);
                            break;
                            case 2:
                                if (this.formulario.listaACCuentasCobrarComercialesRelacionadas[i] === undefined) {
                                    this.formulario.listaACCuentasCobrarComercialesRelacionadas[i] = new Tabla();
                                    if (this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes === undefined) {
                                        this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes.push(comp);
                            break;
                            case 3:
                                if (this.formulario.listaACCuentasCobrarDiversas[i] === undefined) {
                                    this.formulario.listaACCuentasCobrarDiversas[i] = new Tabla();
                                    if (this.formulario.listaACCuentasCobrarDiversas[i].componentes === undefined) {
                                        this.formulario.listaACCuentasCobrarDiversas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaACCuentasCobrarDiversas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaACCuentasCobrarDiversas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaACCuentasCobrarDiversas[i].componentes.push(comp);
                            break;
                            case 4:
                                if (this.formulario.listaACOtrasCuentas[i] === undefined) {
                                    this.formulario.listaACOtrasCuentas[i] = new Tabla();
                                    if (this.formulario.listaACOtrasCuentas[i].componentes === undefined) {
                                        this.formulario.listaACOtrasCuentas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaACOtrasCuentas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaACOtrasCuentas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaACOtrasCuentas[i].componentes.push(comp);
                            break;
                            case 5:
                                if (this.formulario.listaANCOtrasCuentas[i] === undefined) {
                                    this.formulario.listaANCOtrasCuentas[i] = new Tabla();
                                    if (this.formulario.listaANCOtrasCuentas[i].componentes === undefined) {
                                        this.formulario.listaANCOtrasCuentas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaANCOtrasCuentas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaANCOtrasCuentas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaANCOtrasCuentas[i].componentes.push(comp);
                            break;
                            case 6:
                                if (this.formulario.listaPCCuentasPagarComerciales[i] === undefined) {
                                    this.formulario.listaPCCuentasPagarComerciales[i] = new Tabla();
                                    if (this.formulario.listaPCCuentasPagarComerciales[i].componentes === undefined) {
                                        this.formulario.listaPCCuentasPagarComerciales[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCCuentasPagarComerciales[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCCuentasPagarComerciales[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCCuentasPagarComerciales[i].componentes.push(comp);
                            break;
                            case 7:
                                if (this.formulario.listaPCCuentasPagarComercialesRelacionadas[i] === undefined) {
                                    this.formulario.listaPCCuentasPagarComercialesRelacionadas[i] = new Tabla();
                                    if (this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes === undefined) {
                                        this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes.push(comp);
                            break;
                            case 8:
                                if (this.formulario.listaPCObligacionesFinancieras[i] === undefined) {
                                    this.formulario.listaPCObligacionesFinancieras[i] = new Tabla();
                                    if (this.formulario.listaPCObligacionesFinancieras[i].componentes === undefined) {
                                        this.formulario.listaPCObligacionesFinancieras[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCObligacionesFinancieras[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCObligacionesFinancieras[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCObligacionesFinancieras[i].componentes.push(comp);
                            break;
                            case 9:
                                if (this.formulario.listaPCProvisiones[i] === undefined) {
                                    this.formulario.listaPCProvisiones[i] = new Tabla();
                                    if (this.formulario.listaPCProvisiones[i].componentes === undefined) {
                                        this.formulario.listaPCProvisiones[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCProvisiones[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCProvisiones[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCProvisiones[i].componentes.push(comp);
                            break;
                            case 10:
                                if (this.formulario.listaPCOtrasCuentas[i] === undefined) {
                                    this.formulario.listaPCOtrasCuentas[i] = new Tabla();
                                    if (this.formulario.listaPCOtrasCuentas[i].componentes === undefined) {
                                        this.formulario.listaPCOtrasCuentas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPCOtrasCuentas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPCOtrasCuentas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPCOtrasCuentas[i].componentes.push(comp);
                            break;
                            case 11:
                                if (this.formulario.listaPNCObligacionesFinancieras[i] === undefined) {
                                    this.formulario.listaPNCObligacionesFinancieras[i] = new Tabla();
                                    if (this.formulario.listaPNCObligacionesFinancieras[i].componentes === undefined) {
                                        this.formulario.listaPNCObligacionesFinancieras[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPNCObligacionesFinancieras[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPNCObligacionesFinancieras[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPNCObligacionesFinancieras[i].componentes.push(comp);
                            break;
                            case 12:
                                if (this.formulario.listaPNCOtrasCuentas[i] === undefined) {
                                    this.formulario.listaPNCOtrasCuentas[i] = new Tabla();
                                    if (this.formulario.listaPNCOtrasCuentas[i].componentes === undefined) {
                                        this.formulario.listaPNCOtrasCuentas[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPNCOtrasCuentas[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPNCOtrasCuentas[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPNCOtrasCuentas[i].componentes.push(comp);
                            break;
                            case 13:
                                if (this.formulario.listaPNCProvisiones[i] === undefined) {
                                    this.formulario.listaPNCProvisiones[i] = new Tabla();
                                    if (this.formulario.listaPNCProvisiones[i].componentes === undefined) {
                                        this.formulario.listaPNCProvisiones[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPNCProvisiones[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPNCProvisiones[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPNCProvisiones[i].componentes.push(comp);
                            break;
                            case 14:
                                if (this.formulario.listaPResultadosNoRealizados[i] === undefined) {
                                    this.formulario.listaPResultadosNoRealizados[i] = new Tabla();
                                    if (this.formulario.listaPResultadosNoRealizados[i].componentes === undefined) {
                                        this.formulario.listaPResultadosNoRealizados[i].componentes = new Array<Componente>();
                                    }
                                }
                                this.formulario.listaPResultadosNoRealizados[i].descripcion = objetos[cont - 1].vDesffina;
                                this.formulario.listaPResultadosNoRealizados[i].unidadmedida = objetos[cont - 1].vUndffina;
                                this.formulario.listaPResultadosNoRealizados[i].componentes.push(comp);
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

    // ACCuentasCobrarComerciales ----------------------------------------------------------------------------------
    mostrarDialogACCuentasCobrarComerciales() {
        this.ACCuentasCobrarComerciales = new DetalleCuenta();
        this.displayACCuentasCobrarComerciales = true;
        this.editarACCuentasCobrarComerciales = false;
    }

    cancelarModalACCuentasCobrarComerciales() {
        this.ACCuentasCobrarComerciales = new DetalleCuenta();
        this.displayACCuentasCobrarComerciales = false;
        this.editarACCuentasCobrarComerciales = false;
    }

    guardarModalACCuentasCobrarComerciales() {
        const t = new Tabla();
        if (!this.editarACCuentasCobrarComerciales) {
            t.id = this.formulario.listaACCuentasCobrarComerciales.length;
        } else {
            t.id = this.ACCuentasCobrarComerciales.id;
        }
        t.descripcion = this.ACCuentasCobrarComerciales.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES + '_' + this.formulario.listaACCuentasCobrarComerciales.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ACCuentasCobrarComerciales.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES + '_' + this.formulario.listaACCuentasCobrarComerciales.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ACCuentasCobrarComerciales.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES + '_' + this.formulario.listaACCuentasCobrarComerciales.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ACCuentasCobrarComerciales.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALES + '_' + this.formulario.listaACCuentasCobrarComerciales.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ACCuentasCobrarComerciales.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarACCuentasCobrarComerciales) {
            const bean: Tabla = this.formulario.listaACCuentasCobrarComerciales.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaACCuentasCobrarComerciales.indexOf(bean);
                this.formulario.listaACCuentasCobrarComerciales[index] = t;
            }
        } else {
            this.formulario.listaACCuentasCobrarComerciales.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaACCuentasCobrarComerciales.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACCuentasCobrarComerciales[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaACCuentasCobrarComerciales[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaACCuentasCobrarComerciales[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaACCuentasCobrarComerciales[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaACCuentasCobrarComerciales[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarComerciales.componentes[0].cantidad = suma1 + Number(this.ACCuentasCobrarComerciales.anioA);
        this.formulario.totalACCuentasCobrarComerciales.componentes[1].cantidad = suma2 + Number(this.ACCuentasCobrarComerciales.anioB);
        this.formulario.totalACCuentasCobrarComerciales.componentes[2].cantidad = suma3 + Number(this.ACCuentasCobrarComerciales.anioC);
        this.formulario.totalACCuentasCobrarComerciales.componentes[3].cantidad = suma4 + Number(this.ACCuentasCobrarComerciales.anioD);

        this.displayACCuentasCobrarComerciales = false;
        this.ACCuentasCobrarComerciales = new DetalleCuenta();
        this.editarACCuentasCobrarComerciales = false;
    }

    editarComponenteACCuentasCobrarComerciales(tabla: Tabla) {
        this.displayACCuentasCobrarComerciales = true;
        this.editarACCuentasCobrarComerciales = true;
        this.ACCuentasCobrarComerciales = new DetalleCuenta();
        this.ACCuentasCobrarComerciales.id = tabla.id;
        this.ACCuentasCobrarComerciales.descripcion = tabla.descripcion;
        this.ACCuentasCobrarComerciales.anioA = tabla.componentes[0].cantidad;
        this.ACCuentasCobrarComerciales.anioB = tabla.componentes[1].cantidad;
        this.ACCuentasCobrarComerciales.anioC = tabla.componentes[2].cantidad;
        this.ACCuentasCobrarComerciales.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteACCuentasCobrarComerciales(tabla: Tabla) {
        const t = this.formulario.listaACCuentasCobrarComerciales.splice(this.formulario.listaACCuentasCobrarComerciales.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarComerciales.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalACCuentasCobrarComerciales.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalACCuentasCobrarComerciales.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalACCuentasCobrarComerciales.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // ACCuentasCobrarComercialesRelacionadas ----------------------------------------------------------------------------------
    mostrarDialogACCuentasCobrarComercialesRelacionadas() {
        this.ACCuentasCobrarComercialesRelacionadas = new DetalleCuenta();
        this.displayACCuentasCobrarComercialesRelacionadas = true;
        this.editarACCuentasCobrarComercialesRelacionadas = false;
    }

    cancelarModalACCuentasCobrarComercialesRelacionadas() {
        this.ACCuentasCobrarComercialesRelacionadas = new DetalleCuenta();
        this.displayACCuentasCobrarComercialesRelacionadas = false;
        this.editarACCuentasCobrarComercialesRelacionadas = false;
    }

    guardarModalACCuentasCobrarComercialesRelacionadas() {
        const t = new Tabla();
        if (!this.editarACCuentasCobrarComercialesRelacionadas) {
            t.id = this.formulario.listaACCuentasCobrarComercialesRelacionadas.length;
        } else {
            t.id = this.ACCuentasCobrarComercialesRelacionadas.id;
        }
        t.descripcion = this.ACCuentasCobrarComercialesRelacionadas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaACCuentasCobrarComercialesRelacionadas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ACCuentasCobrarComercialesRelacionadas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaACCuentasCobrarComercialesRelacionadas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ACCuentasCobrarComercialesRelacionadas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaACCuentasCobrarComercialesRelacionadas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ACCuentasCobrarComercialesRelacionadas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaACCuentasCobrarComercialesRelacionadas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ACCuentasCobrarComercialesRelacionadas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarACCuentasCobrarComercialesRelacionadas) {
            const bean: Tabla = this.formulario.listaACCuentasCobrarComercialesRelacionadas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaACCuentasCobrarComercialesRelacionadas.indexOf(bean);
                this.formulario.listaACCuentasCobrarComercialesRelacionadas[index] = t;
            }
        } else {
            this.formulario.listaACCuentasCobrarComercialesRelacionadas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaACCuentasCobrarComercialesRelacionadas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaACCuentasCobrarComercialesRelacionadas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[0].cantidad = suma1 + Number(this.ACCuentasCobrarComercialesRelacionadas.anioA);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[1].cantidad = suma2 + Number(this.ACCuentasCobrarComercialesRelacionadas.anioB);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[2].cantidad = suma3 + Number(this.ACCuentasCobrarComercialesRelacionadas.anioC);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[3].cantidad = suma4 + Number(this.ACCuentasCobrarComercialesRelacionadas.anioD);

        this.displayACCuentasCobrarComercialesRelacionadas = false;
        this.ACCuentasCobrarComercialesRelacionadas = new DetalleCuenta();
        this.editarACCuentasCobrarComercialesRelacionadas = false;
    }

    editarComponenteACCuentasCobrarComercialesRelacionadas(tabla: Tabla) {
        this.displayACCuentasCobrarComercialesRelacionadas = true;
        this.editarACCuentasCobrarComercialesRelacionadas = true;
        this.ACCuentasCobrarComercialesRelacionadas = new DetalleCuenta();
        this.ACCuentasCobrarComercialesRelacionadas.id = tabla.id;
        this.ACCuentasCobrarComercialesRelacionadas.descripcion = tabla.descripcion;
        this.ACCuentasCobrarComercialesRelacionadas.anioA = tabla.componentes[0].cantidad;
        this.ACCuentasCobrarComercialesRelacionadas.anioB = tabla.componentes[1].cantidad;
        this.ACCuentasCobrarComercialesRelacionadas.anioC = tabla.componentes[2].cantidad;
        this.ACCuentasCobrarComercialesRelacionadas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteACCuentasCobrarComercialesRelacionadas(tabla: Tabla) {
        const t = this.formulario.listaACCuentasCobrarComercialesRelacionadas.splice(this.formulario.listaACCuentasCobrarComercialesRelacionadas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalACCuentasCobrarComercialesRelacionadas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // ACCuentasCobrarDiversas ----------------------------------------------------------------------------------
    mostrarDialogACCuentasCobrarDiversas() {
        this.ACCuentasCobrarDiversas = new DetalleCuenta();
        this.displayACCuentasCobrarDiversas = true;
        this.editarACCuentasCobrarDiversas = false;
    }

    cancelarModalACCuentasCobrarDiversas() {
        this.ACCuentasCobrarDiversas = new DetalleCuenta();
        this.displayACCuentasCobrarDiversas = false;
        this.editarACCuentasCobrarDiversas = false;
    }

    guardarModalACCuentasCobrarDiversas() {
        const t = new Tabla();
        if (!this.editarACCuentasCobrarDiversas) {
            t.id = this.formulario.listaACCuentasCobrarDiversas.length;
        } else {
            t.id = this.ACCuentasCobrarDiversas.id;
        }
        t.descripcion = this.ACCuentasCobrarDiversas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS + '_' +
                                 this.formulario.listaACCuentasCobrarDiversas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ACCuentasCobrarDiversas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS + '_' +
                                 this.formulario.listaACCuentasCobrarDiversas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ACCuentasCobrarDiversas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS + '_' +
                                 this.formulario.listaACCuentasCobrarDiversas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ACCuentasCobrarDiversas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_ACCUENTASCOBRARDIVERSAS + '_' +
                                 this.formulario.listaACCuentasCobrarDiversas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ACCuentasCobrarDiversas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarACCuentasCobrarDiversas) {
            const bean: Tabla = this.formulario.listaACCuentasCobrarDiversas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaACCuentasCobrarDiversas.indexOf(bean);
                this.formulario.listaACCuentasCobrarDiversas[index] = t;
            }
        } else {
            this.formulario.listaACCuentasCobrarDiversas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaACCuentasCobrarDiversas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACCuentasCobrarDiversas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaACCuentasCobrarDiversas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaACCuentasCobrarDiversas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaACCuentasCobrarDiversas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaACCuentasCobrarDiversas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarDiversas.componentes[0].cantidad = suma1 + Number(this.ACCuentasCobrarDiversas.anioA);
        this.formulario.totalACCuentasCobrarDiversas.componentes[1].cantidad = suma2 + Number(this.ACCuentasCobrarDiversas.anioB);
        this.formulario.totalACCuentasCobrarDiversas.componentes[2].cantidad = suma3 + Number(this.ACCuentasCobrarDiversas.anioC);
        this.formulario.totalACCuentasCobrarDiversas.componentes[3].cantidad = suma4 + Number(this.ACCuentasCobrarDiversas.anioD);

        this.displayACCuentasCobrarDiversas = false;
        this.ACCuentasCobrarDiversas = new DetalleCuenta();
        this.editarACCuentasCobrarDiversas = false;
    }

    editarComponenteACCuentasCobrarDiversas(tabla: Tabla) {
        this.displayACCuentasCobrarDiversas = true;
        this.editarACCuentasCobrarDiversas = true;
        this.ACCuentasCobrarDiversas = new DetalleCuenta();
        this.ACCuentasCobrarDiversas.id = tabla.id;
        this.ACCuentasCobrarDiversas.descripcion = tabla.descripcion;
        this.ACCuentasCobrarDiversas.anioA = tabla.componentes[0].cantidad;
        this.ACCuentasCobrarDiversas.anioB = tabla.componentes[1].cantidad;
        this.ACCuentasCobrarDiversas.anioC = tabla.componentes[2].cantidad;
        this.ACCuentasCobrarDiversas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteACCuentasCobrarDiversas(tabla: Tabla) {
        const t = this.formulario.listaACCuentasCobrarDiversas.splice(this.formulario.listaACCuentasCobrarDiversas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACCuentasCobrarDiversas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalACCuentasCobrarDiversas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalACCuentasCobrarDiversas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalACCuentasCobrarDiversas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // ACOtrasCuentas ----------------------------------------------------------------------------------
    mostrarDialogACOtrasCuentas() {
        this.ACOtrasCuentas = new DetalleCuenta();
        this.displayACOtrasCuentas = true;
        this.editarACOtrasCuentas = false;
    }

    cancelarModalACOtrasCuentas() {
        this.ACOtrasCuentas = new DetalleCuenta();
        this.displayACOtrasCuentas = false;
        this.editarACOtrasCuentas = false;
    }

    guardarModalACOtrasCuentas() {
        const t = new Tabla();
        if (!this.editarACOtrasCuentas) {
            t.id = this.formulario.listaACOtrasCuentas.length;
        } else {
            t.id = this.ACOtrasCuentas.id;
        }
        t.descripcion = this.ACOtrasCuentas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_ACOTRASCUENTAS + '_' + this.formulario.listaACOtrasCuentas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ACOtrasCuentas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_ACOTRASCUENTAS + '_' + this.formulario.listaACOtrasCuentas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ACOtrasCuentas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_ACOTRASCUENTAS + '_' + this.formulario.listaACOtrasCuentas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ACOtrasCuentas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_ACOTRASCUENTAS + '_' + this.formulario.listaACOtrasCuentas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ACOtrasCuentas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarACOtrasCuentas) {
            const bean: Tabla = this.formulario.listaACOtrasCuentas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaACOtrasCuentas.indexOf(bean);
                this.formulario.listaACOtrasCuentas[index] = t;
            }
        } else {
            this.formulario.listaACOtrasCuentas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaACOtrasCuentas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACOtrasCuentas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaACOtrasCuentas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaACOtrasCuentas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaACOtrasCuentas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaACOtrasCuentas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACOtrasCuentas.componentes[0].cantidad = suma1 + Number(this.ACOtrasCuentas.anioA);
        this.formulario.totalACOtrasCuentas.componentes[1].cantidad = suma2 + Number(this.ACOtrasCuentas.anioB);
        this.formulario.totalACOtrasCuentas.componentes[2].cantidad = suma3 + Number(this.ACOtrasCuentas.anioC);
        this.formulario.totalACOtrasCuentas.componentes[3].cantidad = suma4 + Number(this.ACOtrasCuentas.anioD);

        this.displayACOtrasCuentas = false;
        this.ACOtrasCuentas = new DetalleCuenta();
        this.editarACOtrasCuentas = false;
    }

    editarComponenteACOtrasCuentas(tabla: Tabla) {
        this.displayACOtrasCuentas = true;
        this.editarACOtrasCuentas = true;
        this.ACOtrasCuentas = new DetalleCuenta();
        this.ACOtrasCuentas.id = tabla.id;
        this.ACOtrasCuentas.descripcion = tabla.descripcion;
        this.ACOtrasCuentas.anioA = tabla.componentes[0].cantidad;
        this.ACOtrasCuentas.anioB = tabla.componentes[1].cantidad;
        this.ACOtrasCuentas.anioC = tabla.componentes[2].cantidad;
        this.ACOtrasCuentas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteACOtrasCuentas(tabla: Tabla) {
        const t = this.formulario.listaACOtrasCuentas.splice(this.formulario.listaACOtrasCuentas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACOtrasCuentas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalACOtrasCuentas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalACOtrasCuentas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalACOtrasCuentas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // ANCOtrasCuentas ----------------------------------------------------------------------------------
    mostrarDialogANCOtrasCuentas() {
        this.ANCOtrasCuentas = new DetalleCuenta();
        this.displayANCOtrasCuentas = true;
        this.editarANCOtrasCuentas = false;
    }

    cancelarModalANCOtrasCuentas() {
        this.ANCOtrasCuentas = new DetalleCuenta();
        this.displayANCOtrasCuentas = false;
        this.editarANCOtrasCuentas = false;
    }

    guardarModalANCOtrasCuentas() {
        const t = new Tabla();
        if (!this.editarANCOtrasCuentas) {
            t.id = this.formulario.listaANCOtrasCuentas.length;
        } else {
            t.id = this.ANCOtrasCuentas.id;
        }
        t.descripcion = this.ANCOtrasCuentas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_ANCOTRASCUENTAS + '_' + this.formulario.listaANCOtrasCuentas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.ANCOtrasCuentas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_ANCOTRASCUENTAS + '_' + this.formulario.listaANCOtrasCuentas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.ANCOtrasCuentas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_ANCOTRASCUENTAS + '_' + this.formulario.listaANCOtrasCuentas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.ANCOtrasCuentas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_ANCOTRASCUENTAS + '_' + this.formulario.listaANCOtrasCuentas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.ANCOtrasCuentas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarANCOtrasCuentas) {
            const bean: Tabla = this.formulario.listaANCOtrasCuentas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaANCOtrasCuentas.indexOf(bean);
                this.formulario.listaANCOtrasCuentas[index] = t;
            }
        } else {
            this.formulario.listaANCOtrasCuentas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaANCOtrasCuentas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCOtrasCuentas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaANCOtrasCuentas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaANCOtrasCuentas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaANCOtrasCuentas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaANCOtrasCuentas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalANCOtrasCuentas.componentes[0].cantidad = suma1 + Number(this.ANCOtrasCuentas.anioA);
        this.formulario.totalANCOtrasCuentas.componentes[1].cantidad = suma2 + Number(this.ANCOtrasCuentas.anioB);
        this.formulario.totalANCOtrasCuentas.componentes[2].cantidad = suma3 + Number(this.ANCOtrasCuentas.anioC);
        this.formulario.totalANCOtrasCuentas.componentes[3].cantidad = suma4 + Number(this.ANCOtrasCuentas.anioD);

        this.displayANCOtrasCuentas = false;
        this.ANCOtrasCuentas = new DetalleCuenta();
        this.editarANCOtrasCuentas = false;
    }

    editarComponenteANCOtrasCuentas(tabla: Tabla) {
        this.displayANCOtrasCuentas = true;
        this.editarANCOtrasCuentas = true;
        this.ANCOtrasCuentas = new DetalleCuenta();
        this.ANCOtrasCuentas.id = tabla.id;
        this.ANCOtrasCuentas.descripcion = tabla.descripcion;
        this.ANCOtrasCuentas.anioA = tabla.componentes[0].cantidad;
        this.ANCOtrasCuentas.anioB = tabla.componentes[1].cantidad;
        this.ANCOtrasCuentas.anioC = tabla.componentes[2].cantidad;
        this.ANCOtrasCuentas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteANCOtrasCuentas(tabla: Tabla) {
        const t = this.formulario.listaANCOtrasCuentas.splice(this.formulario.listaANCOtrasCuentas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalANCOtrasCuentas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalANCOtrasCuentas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalANCOtrasCuentas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalANCOtrasCuentas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // PCCuentasPagarComerciales ----------------------------------------------------------------------------------
    mostrarDialogPCCuentasPagarComerciales() {
        this.PCCuentasPagarComerciales = new DetalleCuenta();
        this.displayPCCuentasPagarComerciales = true;
        this.editarPCCuentasPagarComerciales = false;
    }

    cancelarModalPCCuentasPagarComerciales() {
        this.PCCuentasPagarComerciales = new DetalleCuenta();
        this.displayPCCuentasPagarComerciales = false;
        this.editarPCCuentasPagarComerciales = false;
    }

    guardarModalPCCuentasPagarComerciales() {
        const t = new Tabla();
        if (!this.editarPCCuentasPagarComerciales) {
            t.id = this.formulario.listaPCCuentasPagarComerciales.length;
        } else {
            t.id = this.PCCuentasPagarComerciales.id;
        }
        t.descripcion = this.PCCuentasPagarComerciales.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES + '_' + this.formulario.listaPCCuentasPagarComerciales.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PCCuentasPagarComerciales.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES + '_' + this.formulario.listaPCCuentasPagarComerciales.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PCCuentasPagarComerciales.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES + '_' + this.formulario.listaPCCuentasPagarComerciales.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PCCuentasPagarComerciales.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALES + '_' + this.formulario.listaPCCuentasPagarComerciales.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PCCuentasPagarComerciales.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPCCuentasPagarComerciales) {
            const bean: Tabla = this.formulario.listaPCCuentasPagarComerciales.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCCuentasPagarComerciales.indexOf(bean);
                this.formulario.listaPCCuentasPagarComerciales[index] = t;
            }
        } else {
            this.formulario.listaPCCuentasPagarComerciales.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCCuentasPagarComerciales.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCCuentasPagarComerciales[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCCuentasPagarComerciales[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCCuentasPagarComerciales[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCCuentasPagarComerciales[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCCuentasPagarComerciales[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCCuentasPagarComerciales.componentes[0].cantidad = suma1 + Number(this.PCCuentasPagarComerciales.anioA);
        this.formulario.totalPCCuentasPagarComerciales.componentes[1].cantidad = suma2 + Number(this.PCCuentasPagarComerciales.anioB);
        this.formulario.totalPCCuentasPagarComerciales.componentes[2].cantidad = suma3 + Number(this.PCCuentasPagarComerciales.anioC);
        this.formulario.totalPCCuentasPagarComerciales.componentes[3].cantidad = suma4 + Number(this.PCCuentasPagarComerciales.anioD);

        this.displayPCCuentasPagarComerciales = false;
        this.PCCuentasPagarComerciales = new DetalleCuenta();
        this.editarPCCuentasPagarComerciales = false;
    }

    editarComponentePCCuentasPagarComerciales(tabla: Tabla) {
        this.displayPCCuentasPagarComerciales = true;
        this.editarPCCuentasPagarComerciales = true;
        this.PCCuentasPagarComerciales = new DetalleCuenta();
        this.PCCuentasPagarComerciales.id = tabla.id;
        this.PCCuentasPagarComerciales.descripcion = tabla.descripcion;
        this.PCCuentasPagarComerciales.anioA = tabla.componentes[0].cantidad;
        this.PCCuentasPagarComerciales.anioB = tabla.componentes[1].cantidad;
        this.PCCuentasPagarComerciales.anioC = tabla.componentes[2].cantidad;
        this.PCCuentasPagarComerciales.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePCCuentasPagarComerciales(tabla: Tabla) {
        const t = this.formulario.listaPCCuentasPagarComerciales.splice(this.formulario.listaPCCuentasPagarComerciales.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCCuentasPagarComerciales.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCCuentasPagarComerciales.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCCuentasPagarComerciales.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCCuentasPagarComerciales.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    // PCCuentasPagarComercialesRelacionadas ----------------------------------------------------------------------------------
    mostrarDialogPCCuentasPagarComercialesRelacionadas() {
        this.PCCuentasPagarComercialesRelacionadas = new DetalleCuenta();
        this.displayPCCuentasPagarComercialesRelacionadas = true;
        this.editarPCCuentasPagarComercialesRelacionadas = false;
    }

    cancelarModalPCCuentasPagarComercialesRelacionadas() {
        this.PCCuentasPagarComercialesRelacionadas = new DetalleCuenta();
        this.displayPCCuentasPagarComercialesRelacionadas = false;
        this.editarPCCuentasPagarComercialesRelacionadas = false;
    }

    guardarModalPCCuentasPagarComercialesRelacionadas() {
        const t = new Tabla();
        if (!this.editarPCCuentasPagarComercialesRelacionadas) {
            t.id = this.formulario.listaPCCuentasPagarComercialesRelacionadas.length;
        } else {
            t.id = this.PCCuentasPagarComercialesRelacionadas.id;
        }
        t.descripcion = this.PCCuentasPagarComercialesRelacionadas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaPCCuentasPagarComercialesRelacionadas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PCCuentasPagarComercialesRelacionadas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaPCCuentasPagarComercialesRelacionadas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PCCuentasPagarComercialesRelacionadas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaPCCuentasPagarComercialesRelacionadas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PCCuentasPagarComercialesRelacionadas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PCCUENTASPAGARCOMERCIALESRELACIONADAS + '_' +
                                 this.formulario.listaPCCuentasPagarComercialesRelacionadas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PCCuentasPagarComercialesRelacionadas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPCCuentasPagarComercialesRelacionadas) {
            const bean: Tabla = this.formulario.listaPCCuentasPagarComercialesRelacionadas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCCuentasPagarComercialesRelacionadas.indexOf(bean);
                this.formulario.listaPCCuentasPagarComercialesRelacionadas[index] = t;
            }
        } else {
            this.formulario.listaPCCuentasPagarComercialesRelacionadas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCCuentasPagarComercialesRelacionadas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCCuentasPagarComercialesRelacionadas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[0].cantidad = suma1 + Number(this.PCCuentasPagarComercialesRelacionadas.anioA);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[1].cantidad = suma2 + Number(this.PCCuentasPagarComercialesRelacionadas.anioB);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[2].cantidad = suma3 + Number(this.PCCuentasPagarComercialesRelacionadas.anioC);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[3].cantidad = suma4 + Number(this.PCCuentasPagarComercialesRelacionadas.anioD);

        this.displayPCCuentasPagarComercialesRelacionadas = false;
        this.PCCuentasPagarComercialesRelacionadas = new DetalleCuenta();
        this.editarPCCuentasPagarComercialesRelacionadas = false;
    }

    editarComponentePCCuentasPagarComercialesRelacionadas(tabla: Tabla) {
        this.displayPCCuentasPagarComercialesRelacionadas = true;
        this.editarPCCuentasPagarComercialesRelacionadas = true;
        this.PCCuentasPagarComercialesRelacionadas = new DetalleCuenta();
        this.PCCuentasPagarComercialesRelacionadas.id = tabla.id;
        this.PCCuentasPagarComercialesRelacionadas.descripcion = tabla.descripcion;
        this.PCCuentasPagarComercialesRelacionadas.anioA = tabla.componentes[0].cantidad;
        this.PCCuentasPagarComercialesRelacionadas.anioB = tabla.componentes[1].cantidad;
        this.PCCuentasPagarComercialesRelacionadas.anioC = tabla.componentes[2].cantidad;
        this.PCCuentasPagarComercialesRelacionadas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePCCuentasPagarComercialesRelacionadas(tabla: Tabla) {
        const t = this.formulario.listaPCCuentasPagarComercialesRelacionadas.splice(this.formulario.listaPCCuentasPagarComercialesRelacionadas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCCuentasPagarComercialesRelacionadas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PCObligacionesFinancieras ----------------------------------------------------------------------------------
    mostrarDialogPCObligacionesFinancieras() {
        this.PCObligacionesFinancieras = new DetalleCuenta();
        this.displayPCObligacionesFinancieras = true;
        this.editarPCObligacionesFinancieras = false;
    }

    cancelarModalPCObligacionesFinancieras() {
        this.PCObligacionesFinancieras = new DetalleCuenta();
        this.displayPCObligacionesFinancieras = false;
        this.editarPCObligacionesFinancieras = false;
    }

    guardarModalPCObligacionesFinancieras() {
        const t = new Tabla();
        if (!this.editarPCObligacionesFinancieras) {
            t.id = this.formulario.listaPCObligacionesFinancieras.length;
        } else {
            t.id = this.PCObligacionesFinancieras.id;
        }
        t.descripcion = this.PCObligacionesFinancieras.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS + '_' +
                                 this.formulario.listaPCObligacionesFinancieras.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PCObligacionesFinancieras.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS + '_' +
                                 this.formulario.listaPCObligacionesFinancieras.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PCObligacionesFinancieras.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS + '_' +
                                 this.formulario.listaPCObligacionesFinancieras.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PCObligacionesFinancieras.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PCOBLIGACIONESFINANCIERAS + '_' +
                                 this.formulario.listaPCObligacionesFinancieras.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PCObligacionesFinancieras.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPCObligacionesFinancieras) {
            const bean: Tabla = this.formulario.listaPCObligacionesFinancieras.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCObligacionesFinancieras.indexOf(bean);
                this.formulario.listaPCObligacionesFinancieras[index] = t;
            }
        } else {
            this.formulario.listaPCObligacionesFinancieras.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCObligacionesFinancieras.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCObligacionesFinancieras[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCObligacionesFinancieras[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCObligacionesFinancieras[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCObligacionesFinancieras[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCObligacionesFinancieras[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCObligacionesFinancieras.componentes[0].cantidad = suma1 + Number(this.PCObligacionesFinancieras.anioA);
        this.formulario.totalPCObligacionesFinancieras.componentes[1].cantidad = suma2 + Number(this.PCObligacionesFinancieras.anioB);
        this.formulario.totalPCObligacionesFinancieras.componentes[2].cantidad = suma3 + Number(this.PCObligacionesFinancieras.anioC);
        this.formulario.totalPCObligacionesFinancieras.componentes[3].cantidad = suma4 + Number(this.PCObligacionesFinancieras.anioD);

        this.displayPCObligacionesFinancieras = false;
        this.PCObligacionesFinancieras = new DetalleCuenta();
        this.editarPCObligacionesFinancieras = false;
    }

    editarComponentePCObligacionesFinancieras(tabla: Tabla) {
        this.displayPCObligacionesFinancieras = true;
        this.editarPCObligacionesFinancieras = true;
        this.PCObligacionesFinancieras = new DetalleCuenta();
        this.PCObligacionesFinancieras.id = tabla.id;
        this.PCObligacionesFinancieras.descripcion = tabla.descripcion;
        this.PCObligacionesFinancieras.anioA = tabla.componentes[0].cantidad;
        this.PCObligacionesFinancieras.anioB = tabla.componentes[1].cantidad;
        this.PCObligacionesFinancieras.anioC = tabla.componentes[2].cantidad;
        this.PCObligacionesFinancieras.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePCObligacionesFinancieras(tabla: Tabla) {
        const t = this.formulario.listaPCObligacionesFinancieras.splice(this.formulario.listaPCObligacionesFinancieras.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCObligacionesFinancieras.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCObligacionesFinancieras.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCObligacionesFinancieras.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCObligacionesFinancieras.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PCProvisiones ----------------------------------------------------------------------------------
    mostrarDialogPCProvisiones() {
        this.PCProvisiones = new DetalleCuenta();
        this.displayPCProvisiones = true;
        this.editarPCProvisiones = false;
    }

    cancelarModalPCProvisiones() {
        this.PCProvisiones = new DetalleCuenta();
        this.displayPCProvisiones = false;
        this.editarPCProvisiones = false;
    }

    guardarModalPCProvisiones() {
        const t = new Tabla();
        if (!this.editarPCProvisiones) {
            t.id = this.formulario.listaPCProvisiones.length;
        } else {
            t.id = this.PCProvisiones.id;
        }
        t.descripcion = this.PCProvisiones.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PCPROVISIONES + '_' + this.formulario.listaPCProvisiones.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PCProvisiones.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PCPROVISIONES + '_' + this.formulario.listaPCProvisiones.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PCProvisiones.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PCPROVISIONES + '_' + this.formulario.listaPCProvisiones.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PCProvisiones.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PCPROVISIONES + '_' + this.formulario.listaPCProvisiones.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PCProvisiones.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPCProvisiones) {
            const bean: Tabla = this.formulario.listaPCProvisiones.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCProvisiones.indexOf(bean);
                this.formulario.listaPCProvisiones[index] = t;
            }
        } else {
            this.formulario.listaPCProvisiones.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCProvisiones.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCProvisiones[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCProvisiones[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCProvisiones[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCProvisiones[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCProvisiones[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCProvisiones.componentes[0].cantidad = suma1 + Number(this.PCProvisiones.anioA);
        this.formulario.totalPCProvisiones.componentes[1].cantidad = suma2 + Number(this.PCProvisiones.anioB);
        this.formulario.totalPCProvisiones.componentes[2].cantidad = suma3 + Number(this.PCProvisiones.anioC);
        this.formulario.totalPCProvisiones.componentes[3].cantidad = suma4 + Number(this.PCProvisiones.anioD);

        this.displayPCProvisiones = false;
        this.PCProvisiones = new DetalleCuenta();
        this.editarPCProvisiones = false;
    }

    editarComponentePCProvisiones(tabla: Tabla) {
        this.displayPCProvisiones = true;
        this.editarPCProvisiones = true;
        this.PCProvisiones = new DetalleCuenta();
        this.PCProvisiones.id = tabla.id;
        this.PCProvisiones.descripcion = tabla.descripcion;
        this.PCProvisiones.anioA = tabla.componentes[0].cantidad;
        this.PCProvisiones.anioB = tabla.componentes[1].cantidad;
        this.PCProvisiones.anioC = tabla.componentes[2].cantidad;
        this.PCProvisiones.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePCProvisiones(tabla: Tabla) {
        const t = this.formulario.listaPCProvisiones.splice(this.formulario.listaPCProvisiones.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCProvisiones.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCProvisiones.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCProvisiones.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCProvisiones.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PCOtrasCuentas ----------------------------------------------------------------------------------
    mostrarDialogPCOtrasCuentas() {
        this.PCOtrasCuentas = new DetalleCuenta();
        this.displayPCOtrasCuentas = true;
        this.editarPCOtrasCuentas = false;
    }

    cancelarModalPCOtrasCuentas() {
        this.PCOtrasCuentas = new DetalleCuenta();
        this.displayPCOtrasCuentas = false;
        this.editarPCOtrasCuentas = false;
    }

    guardarModalPCOtrasCuentas() {
        const t = new Tabla();
        if (!this.editarPCOtrasCuentas) {
            t.id = this.formulario.listaPCOtrasCuentas.length;
        } else {
            t.id = this.PCOtrasCuentas.id;
        }
        t.descripcion = this.PCOtrasCuentas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PCOTRASCUENTAS + '_' + this.formulario.listaPCOtrasCuentas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PCOtrasCuentas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PCOTRASCUENTAS + '_' + this.formulario.listaPCOtrasCuentas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PCOtrasCuentas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PCOTRASCUENTAS + '_' + this.formulario.listaPCOtrasCuentas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PCOtrasCuentas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PCOTRASCUENTAS + '_' + this.formulario.listaPCOtrasCuentas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PCOtrasCuentas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPCOtrasCuentas) {
            const bean: Tabla = this.formulario.listaPCOtrasCuentas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCOtrasCuentas.indexOf(bean);
                this.formulario.listaPCOtrasCuentas[index] = t;
            }
        } else {
            this.formulario.listaPCOtrasCuentas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCOtrasCuentas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCOtrasCuentas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCOtrasCuentas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCOtrasCuentas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCOtrasCuentas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCOtrasCuentas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCOtrasCuentas.componentes[0].cantidad = suma1 + Number(this.PCOtrasCuentas.anioA);
        this.formulario.totalPCOtrasCuentas.componentes[1].cantidad = suma2 + Number(this.PCOtrasCuentas.anioB);
        this.formulario.totalPCOtrasCuentas.componentes[2].cantidad = suma3 + Number(this.PCOtrasCuentas.anioC);
        this.formulario.totalPCOtrasCuentas.componentes[3].cantidad = suma4 + Number(this.PCOtrasCuentas.anioD);

        this.displayPCOtrasCuentas = false;
        this.PCOtrasCuentas = new DetalleCuenta();
        this.editarPCOtrasCuentas = false;
    }

    editarComponentePCOtrasCuentas(tabla: Tabla) {
        this.displayPCOtrasCuentas = true;
        this.editarPCOtrasCuentas = true;
        this.PCOtrasCuentas = new DetalleCuenta();
        this.PCOtrasCuentas.id = tabla.id;
        this.PCOtrasCuentas.descripcion = tabla.descripcion;
        this.PCOtrasCuentas.anioA = tabla.componentes[0].cantidad;
        this.PCOtrasCuentas.anioB = tabla.componentes[1].cantidad;
        this.PCOtrasCuentas.anioC = tabla.componentes[2].cantidad;
        this.PCOtrasCuentas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePCOtrasCuentas(tabla: Tabla) {
        const t = this.formulario.listaPCOtrasCuentas.splice(this.formulario.listaPCOtrasCuentas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCOtrasCuentas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCOtrasCuentas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCOtrasCuentas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCOtrasCuentas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PNCObligacionesFinancieras ----------------------------------------------------------------------------------
    mostrarDialogPNCObligacionesFinancieras() {
        this.PNCObligacionesFinancieras = new DetalleCuenta();
        this.displayPNCObligacionesFinancieras = true;
        this.editarPNCObligacionesFinancieras = false;
    }

    cancelarModalPNCObligacionesFinancieras() {
        this.PNCObligacionesFinancieras = new DetalleCuenta();
        this.displayPNCObligacionesFinancieras = false;
        this.editarPNCObligacionesFinancieras = false;
    }

    guardarModalPNCObligacionesFinancieras() {
        const t = new Tabla();
        if (!this.editarPNCObligacionesFinancieras) {
            t.id = this.formulario.listaPNCObligacionesFinancieras.length;
        } else {
            t.id = this.PNCObligacionesFinancieras.id;
        }
        t.descripcion = this.PNCObligacionesFinancieras.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS + '_' + this.formulario.listaPNCObligacionesFinancieras.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PNCObligacionesFinancieras.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS + '_' + this.formulario.listaPNCObligacionesFinancieras.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PNCObligacionesFinancieras.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS + '_' + this.formulario.listaPNCObligacionesFinancieras.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PNCObligacionesFinancieras.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PNCOBLIGACIONESFINANCIERAS + '_' + this.formulario.listaPNCObligacionesFinancieras.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PNCObligacionesFinancieras.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPNCObligacionesFinancieras) {
            const bean: Tabla = this.formulario.listaPNCObligacionesFinancieras.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPNCObligacionesFinancieras.indexOf(bean);
                this.formulario.listaPNCObligacionesFinancieras[index] = t;
            }
        } else {
            this.formulario.listaPNCObligacionesFinancieras.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPNCObligacionesFinancieras.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPNCObligacionesFinancieras[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPNCObligacionesFinancieras[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPNCObligacionesFinancieras[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPNCObligacionesFinancieras[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPNCObligacionesFinancieras[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCObligacionesFinancieras.componentes[0].cantidad = suma1 + Number(this.PNCObligacionesFinancieras.anioA);
        this.formulario.totalPNCObligacionesFinancieras.componentes[1].cantidad = suma2 + Number(this.PNCObligacionesFinancieras.anioB);
        this.formulario.totalPNCObligacionesFinancieras.componentes[2].cantidad = suma3 + Number(this.PNCObligacionesFinancieras.anioC);
        this.formulario.totalPNCObligacionesFinancieras.componentes[3].cantidad = suma4 + Number(this.PNCObligacionesFinancieras.anioD);

        this.displayPNCObligacionesFinancieras = false;
        this.PNCObligacionesFinancieras = new DetalleCuenta();
        this.editarPNCObligacionesFinancieras = false;
    }

    editarComponentePNCObligacionesFinancieras(tabla: Tabla) {
        this.displayPNCObligacionesFinancieras = true;
        this.editarPNCObligacionesFinancieras = true;
        this.PNCObligacionesFinancieras = new DetalleCuenta();
        this.PNCObligacionesFinancieras.id = tabla.id;
        this.PNCObligacionesFinancieras.descripcion = tabla.descripcion;
        this.PNCObligacionesFinancieras.anioA = tabla.componentes[0].cantidad;
        this.PNCObligacionesFinancieras.anioB = tabla.componentes[1].cantidad;
        this.PNCObligacionesFinancieras.anioC = tabla.componentes[2].cantidad;
        this.PNCObligacionesFinancieras.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePNCObligacionesFinancieras(tabla: Tabla) {
        const t = this.formulario.listaPNCObligacionesFinancieras.splice(this.formulario.listaPNCObligacionesFinancieras.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCObligacionesFinancieras.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPNCObligacionesFinancieras.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPNCObligacionesFinancieras.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPNCObligacionesFinancieras.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PNCProvisiones ----------------------------------------------------------------------------------
    mostrarDialogPNCProvisiones() {
        this.PNCProvisiones = new DetalleCuenta();
        this.displayPNCProvisiones = true;
        this.editarPNCProvisiones = false;
    }

    cancelarModalPNCProvisiones() {
        this.PNCProvisiones = new DetalleCuenta();
        this.displayPNCProvisiones = false;
        this.editarPNCProvisiones = false;
    }

    guardarModalPNCProvisiones() {
        const t = new Tabla();
        if (!this.editarPNCProvisiones) {
            t.id = this.formulario.listaPNCProvisiones.length;
        } else {
            t.id = this.PNCProvisiones.id;
        }
        t.descripcion = this.PNCProvisiones.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PNCPROVISIONES + '_' + this.formulario.listaPNCProvisiones.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PNCProvisiones.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PNCPROVISIONES + '_' + this.formulario.listaPNCProvisiones.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PNCProvisiones.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PNCPROVISIONES + '_' + this.formulario.listaPNCProvisiones.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PNCProvisiones.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PNCPROVISIONES + '_' + this.formulario.listaPNCProvisiones.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PNCProvisiones.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPNCProvisiones) {
            const bean: Tabla = this.formulario.listaPNCProvisiones.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPNCProvisiones.indexOf(bean);
                this.formulario.listaPNCProvisiones[index] = t;
            }
        } else {
            this.formulario.listaPNCProvisiones.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPNCProvisiones.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPNCProvisiones[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPNCProvisiones[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPNCProvisiones[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPNCProvisiones[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPNCProvisiones[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCProvisiones.componentes[0].cantidad = suma1 + Number(this.PNCProvisiones.anioA);
        this.formulario.totalPNCProvisiones.componentes[1].cantidad = suma2 + Number(this.PNCProvisiones.anioB);
        this.formulario.totalPNCProvisiones.componentes[2].cantidad = suma3 + Number(this.PNCProvisiones.anioC);
        this.formulario.totalPNCProvisiones.componentes[3].cantidad = suma4 + Number(this.PNCProvisiones.anioD);

        this.displayPNCProvisiones = false;
        this.PNCProvisiones = new DetalleCuenta();
        this.editarPNCProvisiones = false;
    }

    editarComponentePNCProvisiones(tabla: Tabla) {
        this.displayPNCProvisiones = true;
        this.editarPNCProvisiones = true;
        this.PNCProvisiones = new DetalleCuenta();
        this.PNCProvisiones.id = tabla.id;
        this.PNCProvisiones.descripcion = tabla.descripcion;
        this.PNCProvisiones.anioA = tabla.componentes[0].cantidad;
        this.PNCProvisiones.anioB = tabla.componentes[1].cantidad;
        this.PNCProvisiones.anioC = tabla.componentes[2].cantidad;
        this.PNCProvisiones.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePNCProvisiones(tabla: Tabla) {
        const t = this.formulario.listaPNCProvisiones.splice(this.formulario.listaPNCProvisiones.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCProvisiones.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPNCProvisiones.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPNCProvisiones.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPNCProvisiones.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PNCOtrasCuentas ----------------------------------------------------------------------------------
    mostrarDialogPNCOtrasCuentas() {
        this.PNCOtrasCuentas = new DetalleCuenta();
        this.displayPNCOtrasCuentas = true;
        this.editarPNCOtrasCuentas = false;
    }

    cancelarModalPNCOtrasCuentas() {
        this.PNCOtrasCuentas = new DetalleCuenta();
        this.displayPNCOtrasCuentas = false;
        this.editarPNCOtrasCuentas = false;
    }

    guardarModalPNCOtrasCuentas() {
        const t = new Tabla();
        if (!this.editarPNCOtrasCuentas) {
            t.id = this.formulario.listaPNCOtrasCuentas.length;
        } else {
            t.id = this.PNCOtrasCuentas.id;
        }
        t.descripcion = this.PNCOtrasCuentas.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PNCOTRASCUENTAS + '_' + this.formulario.listaPNCOtrasCuentas.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PNCOtrasCuentas.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PNCOTRASCUENTAS + '_' + this.formulario.listaPNCOtrasCuentas.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PNCOtrasCuentas.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PNCOTRASCUENTAS + '_' + this.formulario.listaPNCOtrasCuentas.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PNCOtrasCuentas.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PNCOTRASCUENTAS + '_' + this.formulario.listaPNCOtrasCuentas.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PNCOtrasCuentas.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPNCOtrasCuentas) {
            const bean: Tabla = this.formulario.listaPNCOtrasCuentas.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPNCOtrasCuentas.indexOf(bean);
                this.formulario.listaPNCOtrasCuentas[index] = t;
            }
        } else {
            this.formulario.listaPNCOtrasCuentas.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPNCOtrasCuentas.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPNCOtrasCuentas[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPNCOtrasCuentas[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPNCOtrasCuentas[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPNCOtrasCuentas[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPNCOtrasCuentas[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCOtrasCuentas.componentes[0].cantidad = suma1 + Number(this.PNCOtrasCuentas.anioA);
        this.formulario.totalPNCOtrasCuentas.componentes[1].cantidad = suma2 + Number(this.PNCOtrasCuentas.anioB);
        this.formulario.totalPNCOtrasCuentas.componentes[2].cantidad = suma3 + Number(this.PNCOtrasCuentas.anioC);
        this.formulario.totalPNCOtrasCuentas.componentes[3].cantidad = suma4 + Number(this.PNCOtrasCuentas.anioD);

        this.displayPNCOtrasCuentas = false;
        this.PNCOtrasCuentas = new DetalleCuenta();
        this.editarPNCOtrasCuentas = false;
    }

    editarComponentePNCOtrasCuentas(tabla: Tabla) {
        this.displayPNCOtrasCuentas = true;
        this.editarPNCOtrasCuentas = true;
        this.PNCOtrasCuentas = new DetalleCuenta();
        this.PNCOtrasCuentas.id = tabla.id;
        this.PNCOtrasCuentas.descripcion = tabla.descripcion;
        this.PNCOtrasCuentas.anioA = tabla.componentes[0].cantidad;
        this.PNCOtrasCuentas.anioB = tabla.componentes[1].cantidad;
        this.PNCOtrasCuentas.anioC = tabla.componentes[2].cantidad;
        this.PNCOtrasCuentas.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePNCOtrasCuentas(tabla: Tabla) {
        const t = this.formulario.listaPNCOtrasCuentas.splice(this.formulario.listaPNCOtrasCuentas.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCOtrasCuentas.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPNCOtrasCuentas.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPNCOtrasCuentas.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPNCOtrasCuentas.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }
    // PResultadosNoRealizados ----------------------------------------------------------------------------------
    mostrarDialogPResultadosNoRealizados() {
        this.PResultadosNoRealizados = new DetalleCuenta();
        this.displayPResultadosNoRealizados = true;
        this.editarPResultadosNoRealizados = false;
    }

    cancelarModalPResultadosNoRealizados() {
        this.PResultadosNoRealizados = new DetalleCuenta();
        this.displayPResultadosNoRealizados = false;
        this.editarPResultadosNoRealizados = false;
    }

    guardarModalPResultadosNoRealizados() {
        const t = new Tabla();
        if (!this.editarPResultadosNoRealizados) {
            t.id = this.formulario.listaPResultadosNoRealizados.length;
        } else {
            t.id = this.PResultadosNoRealizados.id;
        }
        t.descripcion = this.PResultadosNoRealizados.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS + '_' + this.formulario.listaPResultadosNoRealizados.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.PResultadosNoRealizados.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS + '_' + this.formulario.listaPResultadosNoRealizados.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.PResultadosNoRealizados.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS + '_' + this.formulario.listaPResultadosNoRealizados.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.PResultadosNoRealizados.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2ANEX2C_COD_PRESULTADOSNOREALIZADOS + '_' + this.formulario.listaPResultadosNoRealizados.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.PResultadosNoRealizados.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarPResultadosNoRealizados) {
            const bean: Tabla = this.formulario.listaPResultadosNoRealizados.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPResultadosNoRealizados.indexOf(bean);
                this.formulario.listaPResultadosNoRealizados[index] = t;
            }
        } else {
            this.formulario.listaPResultadosNoRealizados.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPResultadosNoRealizados.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPResultadosNoRealizados[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPResultadosNoRealizados[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPResultadosNoRealizados[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPResultadosNoRealizados[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPResultadosNoRealizados[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPResultadosNoRealizados.componentes[0].cantidad = suma1 + Number(this.PResultadosNoRealizados.anioA);
        this.formulario.totalPResultadosNoRealizados.componentes[1].cantidad = suma2 + Number(this.PResultadosNoRealizados.anioB);
        this.formulario.totalPResultadosNoRealizados.componentes[2].cantidad = suma3 + Number(this.PResultadosNoRealizados.anioC);
        this.formulario.totalPResultadosNoRealizados.componentes[3].cantidad = suma4 + Number(this.PResultadosNoRealizados.anioD);

        this.displayPResultadosNoRealizados = false;
        this.PResultadosNoRealizados = new DetalleCuenta();
        this.editarPResultadosNoRealizados = false;
    }

    editarComponentePResultadosNoRealizados(tabla: Tabla) {
        this.displayPResultadosNoRealizados = true;
        this.editarPResultadosNoRealizados = true;
        this.PResultadosNoRealizados = new DetalleCuenta();
        this.PResultadosNoRealizados.id = tabla.id;
        this.PResultadosNoRealizados.descripcion = tabla.descripcion;
        this.PResultadosNoRealizados.anioA = tabla.componentes[0].cantidad;
        this.PResultadosNoRealizados.anioB = tabla.componentes[1].cantidad;
        this.PResultadosNoRealizados.anioC = tabla.componentes[2].cantidad;
        this.PResultadosNoRealizados.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponentePResultadosNoRealizados(tabla: Tabla) {
        const t = this.formulario.listaPResultadosNoRealizados.splice(this.formulario.listaPResultadosNoRealizados.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPResultadosNoRealizados.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPResultadosNoRealizados.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPResultadosNoRealizados.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPResultadosNoRealizados.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
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
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACCuentasCobrarComerciales, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACCuentasCobrarComercialesRelacionadas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACCuentasCobrarDiversas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACCuentasCobrarDiversas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaACOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaANCOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCCuentasPagarComerciales, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCCuentasPagarComercialesRelacionadas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCObligacionesFinancieras, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPCProvisiones, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPNCObligacionesFinancieras, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPNCOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPNCProvisiones, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaPResultadosNoRealizados, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACCuentasCobrarComerciales, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACCuentasCobrarComercialesRelacionadas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACCuentasCobrarDiversas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalACOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCCuentasPagarComerciales, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCCuentasPagarComercialesRelacionadas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCObligacionesFinancieras, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPCProvisiones, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPNCObligacionesFinancieras, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPNCOtrasCuentas, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPNCProvisiones, this.nCodffina, 'f2anex2c');
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.totalPResultadosNoRealizados, this.nCodffina, 'f2anex2c');
        this.verControlInformacion();
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
