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
import { FormularioAnexo2A } from './formulario-anexo2a.model';
import { FormfinancDetalleService } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-anexo2a',
    templateUrl: './formulario-financiero-anexo2a.component.html',
    styleUrls: ['formulario-financiero.scss']
})

export class FormularioFinancieroAnexo2AComponent implements OnInit, OnDestroy {
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
    formulario: FormularioAnexo2A;
    constantes: Constants;

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
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.construirFormulario();
    }
    construirFormulario() {
        this.formulario = new FormularioAnexo2A();

        const lista1Desc: string[] = [this.constantes.FORM2ANEX2A_FEAOC1,
                                      this.constantes.FORM2ANEX2A_FEAOC2,
                                      this.constantes.FORM2ANEX2A_FEAOC3,
                                      this.constantes.FORM2ANEX2A_FEAOC4,
                                      this.constantes.FORM2ANEX2A_FEAOC5];
        const lista1Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAOC1,
                                     this.constantes.FORM2ANEX2A_COD_FEAOC2,
                                     this.constantes.FORM2ANEX2A_COD_FEAOC3,
                                     this.constantes.FORM2ANEX2A_COD_FEAOC4,
                                     this.constantes.FORM2ANEX2A_COD_FEAOC5];
        this.formulario.lista1 = this.crearlistacomponentes(lista1Desc, lista1Cod, false);

        const lista2Desc: string[] = [this.constantes.FORM2ANEX2A_FEAOP1,
                                    this.constantes.FORM2ANEX2A_FEAOP2,
                                    this.constantes.FORM2ANEX2A_FEAOP3,
                                    this.constantes.FORM2ANEX2A_FEAOP4,
                                    this.constantes.FORM2ANEX2A_FEAOP5];
        const lista2Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAOP1,
                                    this.constantes.FORM2ANEX2A_COD_FEAOP2,
                                    this.constantes.FORM2ANEX2A_COD_FEAOP3,
                                    this.constantes.FORM2ANEX2A_COD_FEAOP4,
                                    this.constantes.FORM2ANEX2A_COD_FEAOP5];
        this.formulario.lista2 = this.crearlistacomponentes(lista2Desc, lista2Cod, false);

        const lista3Desc: string[] = [this.constantes.FORM2ANEX2A_FEAOEE1,
                                    this.constantes.FORM2ANEX2A_FEAOEE2,
                                    this.constantes.FORM2ANEX2A_FEAOEE3,
                                    this.constantes.FORM2ANEX2A_FEAOEE4,
                                    this.constantes.FORM2ANEX2A_FEAOEE5,
                                    this.constantes.FORM2ANEX2A_FEAOEE6];
        const lista3Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAOEE1,
                                    this.constantes.FORM2ANEX2A_COD_FEAOEE2,
                                    this.constantes.FORM2ANEX2A_COD_FEAOEE3,
                                    this.constantes.FORM2ANEX2A_COD_FEAOEE4,
                                    this.constantes.FORM2ANEX2A_COD_FEAOEE5,
                                    this.constantes.FORM2ANEX2A_COD_FEAOEE6];
        this.formulario.lista3 = this.crearlistacomponentes(lista3Desc, lista3Cod, false);

        const lista4Desc: string[] = [this.constantes.FORM2ANEX2A_FEAIC1,
                                    this.constantes.FORM2ANEX2A_FEAIC2,
                                    this.constantes.FORM2ANEX2A_FEAIC3,
                                    this.constantes.FORM2ANEX2A_FEAIC4,
                                    this.constantes.FORM2ANEX2A_FEAIC5,
                                    this.constantes.FORM2ANEX2A_FEAIC6,
                                    this.constantes.FORM2ANEX2A_FEAIC7,
                                    this.constantes.FORM2ANEX2A_FEAIC8,
                                    this.constantes.FORM2ANEX2A_FEAIC9,
                                    this.constantes.FORM2ANEX2A_FEAIC10,
                                    this.constantes.FORM2ANEX2A_FEAIC11,
                                    this.constantes.FORM2ANEX2A_FEAIC12];
        const lista4Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAIC1,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC2,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC3,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC4,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC5,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC6,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC7,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC8,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC9,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC10,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC11,
                                    this.constantes.FORM2ANEX2A_COD_FEAIC12];
        this.formulario.lista4 = this.crearlistacomponentes(lista4Desc, lista4Cod, false);

        const lista5Desc: string[] = [this.constantes.FORM2ANEX2A_FEAIP1,
                                    this.constantes.FORM2ANEX2A_FEAIP2,
                                    this.constantes.FORM2ANEX2A_FEAIP3,
                                    this.constantes.FORM2ANEX2A_FEAIP4,
                                    this.constantes.FORM2ANEX2A_FEAIP5,
                                    this.constantes.FORM2ANEX2A_FEAIP6,
                                    this.constantes.FORM2ANEX2A_FEAIP7,
                                    this.constantes.FORM2ANEX2A_FEAIP8,
                                    this.constantes.FORM2ANEX2A_FEAIP9,
                                    this.constantes.FORM2ANEX2A_FEAIP10,
                                    this.constantes.FORM2ANEX2A_FEAIP11,
                                    this.constantes.FORM2ANEX2A_FEAIP12];
        const lista5Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAIP1,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP2,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP3,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP4,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP5,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP6,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP7,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP8,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP9,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP10,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP11,
                                    this.constantes.FORM2ANEX2A_COD_FEAIP12];
        this.formulario.lista5 = this.crearlistacomponentes(lista5Desc, lista5Cod, false);

        const lista6Desc: string[] = [this.constantes.FORM2ANEX2A_FEAFC1,
                                    this.constantes.FORM2ANEX2A_FEAFC2,
                                    this.constantes.FORM2ANEX2A_FEAFC3,
                                    this.constantes.FORM2ANEX2A_FEAFC4,
                                    this.constantes.FORM2ANEX2A_FEAFC5,
                                    this.constantes.FORM2ANEX2A_FEAFC6];
        const lista6Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAFC1,
                                    this.constantes.FORM2ANEX2A_COD_FEAFC2,
                                    this.constantes.FORM2ANEX2A_COD_FEAFC3,
                                    this.constantes.FORM2ANEX2A_COD_FEAFC4,
                                    this.constantes.FORM2ANEX2A_COD_FEAFC5,
                                    this.constantes.FORM2ANEX2A_COD_FEAFC6];
        this.formulario.lista6 = this.crearlistacomponentes(lista6Desc, lista6Cod, false);

        const lista7Desc: string[] = [this.constantes.FORM2ANEX2A_FEAFP1,
                                    this.constantes.FORM2ANEX2A_FEAFP2,
                                    this.constantes.FORM2ANEX2A_FEAFP3,
                                    this.constantes.FORM2ANEX2A_FEAFP4,
                                    this.constantes.FORM2ANEX2A_FEAFP5,
                                    this.constantes.FORM2ANEX2A_FEAFP6,
                                    this.constantes.FORM2ANEX2A_FEAFP7,
                                    this.constantes.FORM2ANEX2A_FEAFP8,
                                    this.constantes.FORM2ANEX2A_FEAFP9,
                                    this.constantes.FORM2ANEX2A_FEAFP10];
        const lista7Cod: string[] = [this.constantes.FORM2ANEX2A_COD_FEAFP1,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP2,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP3,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP4,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP5,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP6,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP7,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP8,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP9,
                                    this.constantes.FORM2ANEX2A_COD_FEAFP10];
        this.formulario.lista7 = this.crearlistacomponentes(lista7Desc, lista7Cod, false);

        const lista8Desc: string[] = [this.constantes.FORM2ANEX2A_EVTCEEE1];
        const lista8Cod: string[] = [this.constantes.FORM2ANEX2A_COD_EVTCEEE1];
        this.formulario.lista8 = this.crearcomponentes(lista8Desc, lista8Cod);

        const lista9Desc: string[] = [this.constantes.FORM2ANEX2A_EEEIE1];
        const lista9Cod: string[] = [this.constantes.FORM2ANEX2A_COD_EEEIE1];
        this.formulario.lista9 = this.crearcomponentes(lista9Desc, lista9Cod);

        const total1Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL1];
        const total1Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL1];
        this.formulario.total1 = this.creartotales(total1Desc, total1Cod);

        const total2Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL2];
        const total2Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL2];
        this.formulario.total2 = this.creartotales(total2Desc, total2Cod);

        const total3Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL3];
        const total3Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL3];
        this.formulario.total3 = this.creartotales(total3Desc, total3Cod);

        const total4Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL4];
        const total4Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL4];
        this.formulario.total4 = this.creartotales(total4Desc, total4Cod);

        const total5Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL5];
        const total5Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL5];
        this.formulario.total5 = this.creartotales(total5Desc, total5Cod);

        const total6Desc: string[] = [this.constantes.FORM2ANEX2A_TOTAL6];
        const total6Cod: string[] = [this.constantes.FORM2ANEX2A_COD_TOTAL6];
        this.formulario.total6 = this.creartotales(total6Desc, total6Cod);
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
    actualizarCampos1Total1(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista1.length - 1;

        for (let i = 0; i < this.formulario.lista1.length; i++) {
            for (let j = 0; j < this.formulario.lista1[i].componentes.length; j++) {
                if (this.formulario.lista1[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista1[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total1();
    }

    actualizarCampos2Total1(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista2.length - 1;

        for (let i = 0; i < this.formulario.lista2.length; i++) {
            for (let j = 0; j < this.formulario.lista2[i].componentes.length; j++) {
                if (this.formulario.lista2[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista2[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total1();
    }

    actualizarCampos3Total1(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista3.length - 1;

        for (let i = 0; i < this.formulario.lista3.length; i++) {
            for (let j = 0; j < this.formulario.lista3[i].componentes.length; j++) {
                if (this.formulario.lista3[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista3[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total1();
    }

    total1() {
        let suma1 = 0;
        let suma2 = 0;

        for (let i = 0; i < this.formulario.lista1.length; i++) {
            for (let j = 0; j < this.formulario.lista1[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista1[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista1[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        for (let i = 0; i < this.formulario.lista2.length; i++) {
            for (let j = 0; j < this.formulario.lista2[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista2[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista2[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        for (let i = 0; i < this.formulario.lista3.length; i++) {
            for (let j = 0; j < this.formulario.lista3[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista3[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista3[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        this.formulario.total1.componentes[0].cantidad = suma1;
        this.formulario.total1.componentes[1].cantidad = suma2;
        this.total_I_II_II();

    }

    actualizarCampos1Total2(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista4.length - 1;

        for (let i = 0; i < this.formulario.lista4.length; i++) {
            for (let j = 0; j < this.formulario.lista4[i].componentes.length; j++) {
                if (this.formulario.lista4[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista4[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total2();
    }

    actualizarCampos2Total2(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista5.length - 1;

        for (let i = 0; i < this.formulario.lista5.length; i++) {
            for (let j = 0; j < this.formulario.lista5[i].componentes.length; j++) {
                if (this.formulario.lista5[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista5[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total2();
    }

    total2() {
        let suma1 = 0;
        let suma2 = 0;

        for (let i = 0; i < this.formulario.lista4.length; i++) {
            for (let j = 0; j < this.formulario.lista4[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista4[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista4[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        for (let i = 0; i < this.formulario.lista5.length; i++) {
            for (let j = 0; j < this.formulario.lista5[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista5[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista5[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        this.formulario.total2.componentes[0].cantidad = suma1;
        this.formulario.total2.componentes[1].cantidad = suma2;
        this.total_I_II_II();

    }

    actualizarCampos1Total3(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista6.length - 1;

        for (let i = 0; i < this.formulario.lista6.length; i++) {
            for (let j = 0; j < this.formulario.lista6[i].componentes.length; j++) {
                if (this.formulario.lista6[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista6[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total3();
    }

    actualizarCampos2Total3(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista7.length - 1;

        for (let i = 0; i < this.formulario.lista7.length; i++) {
            for (let j = 0; j < this.formulario.lista7[i].componentes.length; j++) {
                if (this.formulario.lista7[i].componentes[j].codigo === event.target.id) {
                    this.formulario.lista7[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }
       this.total3();
    }

    total3() {
        let suma1 = 0;
        let suma2 = 0;

        for (let i = 0; i < this.formulario.lista6.length; i++) {
            for (let j = 0; j < this.formulario.lista6[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista6[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista6[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        for (let i = 0; i < this.formulario.lista7.length; i++) {
            for (let j = 0; j < this.formulario.lista7[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += this.formulario.lista7[i].componentes[j].cantidad;
                        break;
                    case 1: suma2 += this.formulario.lista7[i].componentes[j].cantidad;
                        break;
                }
            }
        }

        this.formulario.total3.componentes[0].cantidad = suma1;
        this.formulario.total3.componentes[1].cantidad = suma2;
        this.total_I_II_II();
    }

    total_I_II_II() {
        this.formulario.total4.componentes[0].cantidad = this.formulario.total1.componentes[0].cantidad +
                                                         this.formulario.total2.componentes[0].cantidad +
                                                         this.formulario.total3.componentes[0].cantidad;

        this.formulario.total4.componentes[1].cantidad = this.formulario.total1.componentes[1].cantidad +
                                                         this.formulario.total2.componentes[1].cantidad +
                                                         this.formulario.total3.componentes[1].cantidad;
        this.total5();
    }

    actualizarCampos1Total5(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista8.componentes.length - 1;

        for (let j = 0; j < this.formulario.lista8.componentes.length; j++) {
            if (this.formulario.lista8.componentes[j].codigo === event.target.id) {
                this.formulario.lista8.componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.total5();
    }

    total5() {
        let suma1 = 0;
        let suma2 = 0;

        for (let j = 0; j < this.formulario.lista8.componentes.length; j++) {
            switch (j) {
                case 0: suma1 += this.formulario.lista8.componentes[j].cantidad;
                    break;
                case 1: suma2 += this.formulario.lista8.componentes[j].cantidad;
                    break;
            }
        }

        this.formulario.total5.componentes[0].cantidad = suma1 + this.formulario.total4.componentes[0].cantidad;
        this.formulario.total5.componentes[1].cantidad = suma2 + this.formulario.total4.componentes[1].cantidad;
        this.total6();
    }

    actualizarCampos1Total6(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.lista9.componentes.length - 1;

        for (let j = 0; j < this.formulario.lista9.componentes.length; j++) {
            if (this.formulario.lista9.componentes[j].codigo === event.target.id) {
                this.formulario.lista9.componentes[j].cantidad = Number(event.target.value);
            }
        }
        this.total6();
    }

    total6() {
        let suma1 = 0;
        let suma2 = 0;

        for (let j = 0; j < this.formulario.lista9.componentes.length; j++) {
            switch (j) {
                case 0: suma1 += this.formulario.lista9.componentes[j].cantidad;
                    break;
                case 1: suma2 += this.formulario.lista9.componentes[j].cantidad;
                    break;
            }
        }

        this.formulario.total6.componentes[0].cantidad = suma1 + this.formulario.total5.componentes[0].cantidad;
        this.formulario.total6.componentes[1].cantidad = suma2 + this.formulario.total5.componentes[0].cantidad;
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
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista1, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista2, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista3, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista4, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista5, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista6, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.lista7, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.lista8, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.lista9, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total1, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total2, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total3, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total4, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total5, this.nCodffina);
        this.formfinancdetalleService.guardarFormFinanciero(this.datepipe, this.formulario.total6, this.nCodffina);
        this.verControlInformacion();
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
