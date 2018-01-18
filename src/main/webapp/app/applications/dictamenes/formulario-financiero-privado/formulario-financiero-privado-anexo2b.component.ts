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
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Constants } from './constants';
import { FormControl } from '@angular/forms';
import { Tabla } from './tabla.model';
import { Componente } from './componente.model';
import { FormularioAnexo2B } from './formulario-anexo2b.model';
import { FormfinancDetalleService } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-privado-anexo2b',
    templateUrl: './formulario-financiero-privado-anexo2b.component.html',
    styleUrls: ['formulario-financiero-privado.scss']
})

export class FormularioFinancieroPrivadoAnexo2BComponent implements OnInit, OnDestroy {
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
    formulario: FormularioAnexo2B;
    constantes: Constants;

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
        this.formulario = new FormularioAnexo2B();

        const listaADesc: string[] = [this.constantes.FORM2ANEX2B_SALDOENE + this.anios[0],
        this.constantes.FORM2ANEX2B_CPC,
        this.constantes.FORM2ANEX2B_CE,
        this.constantes.FORM2ANEX2B_SIR,
        this.constantes.FORM2ANEX2B_CPRI,
        this.constantes.FORM2ANEX2B_GNE,
        this.constantes.FORM2ANEX2B_ORI,
        this.constantes.FORM2ANEX2B_RITE,
        this.constantes.FORM2ANEX2B_DRDP,
        this.constantes.FORM2ANEX2B_EP,
        this.constantes.FORM2ANEX2B_RAAI,
        this.constantes.FORM2ANEX2B_IAP,
        this.constantes.FORM2ANEX2B_DDP,
        this.constantes.FORM2ANEX2B_ICPS,
        this.constantes.FORM2ANEX2B_ITAPC,
        this.constantes.FORM2ANEX2B_ITOCP,
        this.constantes.FORM2ANEX2B_TIP,
        this.constantes.FORM2ANEX2B_SALDODIC + this.anios[0]];
        const listaACod: string[] = [this.constantes.FORM2ANEX2B_COD_SALDOENE + this.anios[0],
        this.constantes.FORM2ANEX2B_COD_CPC,
        this.constantes.FORM2ANEX2B_COD_CE,
        this.constantes.FORM2ANEX2B_COD_SIR,
        this.constantes.FORM2ANEX2B_COD_CPRI,
        this.constantes.FORM2ANEX2B_COD_GNE,
        this.constantes.FORM2ANEX2B_COD_ORI,
        this.constantes.FORM2ANEX2B_COD_RITE,
        this.constantes.FORM2ANEX2B_COD_DRDP,
        this.constantes.FORM2ANEX2B_COD_EP,
        this.constantes.FORM2ANEX2B_COD_RAAI,
        this.constantes.FORM2ANEX2B_COD_IAP,
        this.constantes.FORM2ANEX2B_COD_DDP,
        this.constantes.FORM2ANEX2B_COD_ICPS,
        this.constantes.FORM2ANEX2B_COD_ITAPC,
        this.constantes.FORM2ANEX2B_COD_ITOCP,
        this.constantes.FORM2ANEX2B_COD_TIP,
        this.constantes.FORM2ANEX2B_COD_SALDODIC + this.anios[1]];
        this.formulario.listaA = this.crearlistacomponentes(listaADesc, listaACod, false, this.anios[0]);

        const listaBDesc: string[] = [this.constantes.FORM2ANEX2B_SALDOENE + this.anios[1],
        this.constantes.FORM2ANEX2B_CPC,
        this.constantes.FORM2ANEX2B_CE,
        this.constantes.FORM2ANEX2B_SIR,
        this.constantes.FORM2ANEX2B_CPRI,
        this.constantes.FORM2ANEX2B_GNE,
        this.constantes.FORM2ANEX2B_ORI,
        this.constantes.FORM2ANEX2B_RITE,
        this.constantes.FORM2ANEX2B_DRDP,
        this.constantes.FORM2ANEX2B_EP,
        this.constantes.FORM2ANEX2B_RAAI,
        this.constantes.FORM2ANEX2B_IAP,
        this.constantes.FORM2ANEX2B_DDP,
        this.constantes.FORM2ANEX2B_ICPS,
        this.constantes.FORM2ANEX2B_ITAPC,
        this.constantes.FORM2ANEX2B_ITOCP,
        this.constantes.FORM2ANEX2B_TIP,
        this.constantes.FORM2ANEX2B_SALDODIC];
        const listaBCod: string[] = [this.constantes.FORM2ANEX2B_COD_SALDOENE + this.anios[1],
        this.constantes.FORM2ANEX2B_COD_CPC,
        this.constantes.FORM2ANEX2B_COD_CE,
        this.constantes.FORM2ANEX2B_COD_SIR,
        this.constantes.FORM2ANEX2B_COD_CPRI,
        this.constantes.FORM2ANEX2B_COD_GNE,
        this.constantes.FORM2ANEX2B_COD_ORI,
        this.constantes.FORM2ANEX2B_COD_RITE,
        this.constantes.FORM2ANEX2B_COD_DRDP,
        this.constantes.FORM2ANEX2B_COD_EP,
        this.constantes.FORM2ANEX2B_COD_RAAI,
        this.constantes.FORM2ANEX2B_COD_IAP,
        this.constantes.FORM2ANEX2B_COD_DDP,
        this.constantes.FORM2ANEX2B_COD_ICPS,
        this.constantes.FORM2ANEX2B_COD_ITAPC,
        this.constantes.FORM2ANEX2B_COD_ITOCP,
        this.constantes.FORM2ANEX2B_COD_TIP,
        this.constantes.FORM2ANEX2B_COD_SALDODIC];
        this.formulario.listaB = this.crearlistacomponentes(listaBDesc, listaBCod, false, this.anios[1]);
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

    crearlistacomponentes(desc: string[], cod: string[], subtotal: boolean, anio: number): Tabla[] {
        const t = new Array<Tabla>();
        for (let j = 0; j < desc.length; j++) {
            console.log('j: ' + j);
            t[j] = new Tabla();
            t[j].descripcion = desc[j];
            t[j].componentes = new Array<Componente>();
            for (let i = 0; i < 14; i++) {
                console.log('i: ' + i);
                t[j].componentes[i] = new Componente();
                t[j].componentes[i].codigo = cod[j] + '_' + i + '_' + anio;
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
                t[j].componentes[i].año = anio;
                if (subtotal && j === desc.length - 1) {
                    // logica no necesaria
                } else {
                    const fc: FormControl = new FormControl();
                    this.formGroup.addControl(cod[j] + '_' + i + '_' + anio, new FormControl);
                    this.formGroup.controls[cod[j] + '_' + i + '_' + anio].setValue(0);
                }
            }

        }
        return t;
    }
    // -------------------------------------------------------------------
    // Calculos del Formulario
    // -------------------------------------------------------------------
    actualizarCampoListaA(event: any) {
        const columna: string[] = event.target.id.split('_');

        for (let i = 0; i < this.formulario.listaA.length; i++) {
            for (let j = 0; j < this.formulario.listaA[i].componentes.length; j++) {
                if (this.formulario.listaA[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaA[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        this.subtotalListaA();
    }
    subtotalListaA() {
        let sumaSubtotal = 0;
        let sumaTotal = 0;

        const suma1: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const suma2: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const suma3: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < this.formulario.listaA.length; i++) {
            sumaSubtotal = 0;
            sumaTotal = 0;
            for (let j = 0; j < this.formulario.listaA[i].componentes.length; j++) {
                if (j <= 4) {
                    sumaTotal += this.formulario.listaA[i].componentes[j].cantidad;
                }
                if (j > 4 && j <= 11) {
                    sumaSubtotal += this.formulario.listaA[i].componentes[j].cantidad;
                }
                if (j === 12) {
                    this.formulario.listaA[i].componentes[j].cantidad = sumaSubtotal;
                }
                if (j === 13) {
                    this.formulario.listaA[i].componentes[j].cantidad = sumaTotal + sumaSubtotal;
                }

                if (i < 3) {
                    switch (j) {
                        case 0: suma1[0] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 1: suma1[1] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 2: suma1[2] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 3: suma1[3] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 4: suma1[4] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 5: suma1[5] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 6: suma1[6] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 7: suma1[7] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 8: suma1[8] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 9: suma1[9] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 10: suma1[10] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 11: suma1[11] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 12: suma1[12] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 13: suma1[13] += this.formulario.listaA[i].componentes[j].cantidad; break;
                    }
                }

                if (i === 3) {
                    switch (j) {
                        case 0: this.formulario.listaA[i].componentes[j].cantidad = suma1[0]; break;
                        case 1: this.formulario.listaA[i].componentes[j].cantidad = suma1[1]; break;
                        case 2: this.formulario.listaA[i].componentes[j].cantidad = suma1[2]; break;
                        case 3: this.formulario.listaA[i].componentes[j].cantidad = suma1[3]; break;
                        case 4: this.formulario.listaA[i].componentes[j].cantidad = suma1[4]; break;
                        case 5: this.formulario.listaA[i].componentes[j].cantidad = suma1[5]; break;
                        case 6: this.formulario.listaA[i].componentes[j].cantidad = suma1[6]; break;
                        case 7: this.formulario.listaA[i].componentes[j].cantidad = suma1[7]; break;
                        case 8: this.formulario.listaA[i].componentes[j].cantidad = suma1[8]; break;
                        case 9: this.formulario.listaA[i].componentes[j].cantidad = suma1[9]; break;
                        case 10: this.formulario.listaA[i].componentes[j].cantidad = suma1[10]; break;
                        case 11: this.formulario.listaA[i].componentes[j].cantidad = suma1[11]; break;
                        case 12: this.formulario.listaA[i].componentes[j].cantidad = suma1[12]; break;
                        case 13: this.formulario.listaA[i].componentes[j].cantidad = suma1[13]; break;
                    }
                }

                if (i === 5 || i === 6) {
                    switch (j) {
                        case 0: suma2[0] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 1: suma2[1] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 2: suma2[2] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 3: suma2[3] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 4: suma2[4] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 5: suma2[5] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 6: suma2[6] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 7: suma2[7] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 8: suma2[8] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 9: suma2[9] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 10: suma2[10] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 11: suma2[11] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 12: suma2[12] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 13: suma2[13] += this.formulario.listaA[i].componentes[j].cantidad; break;
                    }
                }

                if (i === 7) {
                    switch (j) {
                        case 0: this.formulario.listaA[i].componentes[j].cantidad = suma2[0]; break;
                        case 1: this.formulario.listaA[i].componentes[j].cantidad = suma2[1]; break;
                        case 2: this.formulario.listaA[i].componentes[j].cantidad = suma2[2]; break;
                        case 3: this.formulario.listaA[i].componentes[j].cantidad = suma2[3]; break;
                        case 4: this.formulario.listaA[i].componentes[j].cantidad = suma2[4]; break;
                        case 5: this.formulario.listaA[i].componentes[j].cantidad = suma2[5]; break;
                        case 6: this.formulario.listaA[i].componentes[j].cantidad = suma2[6]; break;
                        case 7: this.formulario.listaA[i].componentes[j].cantidad = suma2[7]; break;
                        case 8: this.formulario.listaA[i].componentes[j].cantidad = suma2[8]; break;
                        case 9: this.formulario.listaA[i].componentes[j].cantidad = suma2[9]; break;
                        case 10: this.formulario.listaA[i].componentes[j].cantidad = suma2[10]; break;
                        case 11: this.formulario.listaA[i].componentes[j].cantidad = suma2[11]; break;
                        case 12: this.formulario.listaA[i].componentes[j].cantidad = suma2[12]; break;
                        case 13: this.formulario.listaA[i].componentes[j].cantidad = suma2[13]; break;
                    }
                }

                if (i >= 8 && i < 16) {
                    switch (j) {
                        case 0: suma3[0] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 1: suma3[1] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 2: suma3[2] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 3: suma3[3] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 4: suma3[4] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 5: suma3[5] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 6: suma3[6] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 7: suma3[7] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 8: suma3[8] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 9: suma3[9] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 10: suma3[10] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 11: suma3[11] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 12: suma3[12] += this.formulario.listaA[i].componentes[j].cantidad; break;
                        case 13: suma3[13] += this.formulario.listaA[i].componentes[j].cantidad; break;
                    }
                }

                if (i === this.formulario.listaA.length - 2) {
                    switch (j) {
                        case 0: this.formulario.listaA[i].componentes[j].cantidad = suma3[0] + suma2[0]; break;
                        case 1: this.formulario.listaA[i].componentes[j].cantidad = suma3[1] + suma2[1]; break;
                        case 2: this.formulario.listaA[i].componentes[j].cantidad = suma3[2] + suma2[2]; break;
                        case 3: this.formulario.listaA[i].componentes[j].cantidad = suma3[3] + suma2[3]; break;
                        case 4: this.formulario.listaA[i].componentes[j].cantidad = suma3[4] + suma2[4]; break;
                        case 5: this.formulario.listaA[i].componentes[j].cantidad = suma3[5] + suma2[5]; break;
                        case 6: this.formulario.listaA[i].componentes[j].cantidad = suma3[6] + suma2[6]; break;
                        case 7: this.formulario.listaA[i].componentes[j].cantidad = suma3[7] + suma2[7]; break;
                        case 8: this.formulario.listaA[i].componentes[j].cantidad = suma3[8] + suma2[8]; break;
                        case 9: this.formulario.listaA[i].componentes[j].cantidad = suma3[9] + suma2[9]; break;
                        case 10: this.formulario.listaA[i].componentes[j].cantidad = suma3[10] + suma2[10]; break;
                        case 11: this.formulario.listaA[i].componentes[j].cantidad = suma3[11] + suma2[11]; break;
                        case 12: this.formulario.listaA[i].componentes[j].cantidad = suma3[12] + suma2[12]; break;
                        case 13: this.formulario.listaA[i].componentes[j].cantidad = suma3[13] + suma2[13]; break;
                    }
                }

                if (i === this.formulario.listaA.length - 1) {
                    switch (j) {
                        case 0: this.formulario.listaA[i].componentes[j].cantidad = suma3[0] + suma2[0] + suma1[0];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[0] + suma2[0] + suma1[0];
                            break;
                        case 1: this.formulario.listaA[i].componentes[j].cantidad = suma3[1] + suma2[1] + suma1[1];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[1] + suma2[1] + suma1[1];
                            break;
                        case 2: this.formulario.listaA[i].componentes[j].cantidad = suma3[2] + suma2[2] + suma1[2];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[2] + suma2[2] + suma1[2];
                            break;
                        case 3: this.formulario.listaA[i].componentes[j].cantidad = suma3[3] + suma2[3] + suma1[3];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[3] + suma2[3] + suma1[3];
                            break;
                        case 4: this.formulario.listaA[i].componentes[j].cantidad = suma3[4] + suma2[4] + suma1[4];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[4] + suma2[4] + suma1[4];
                            break;
                        case 5: this.formulario.listaA[i].componentes[j].cantidad = suma3[5] + suma2[5] + suma1[5];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[5] + suma2[5] + suma1[5];
                            break;
                        case 6: this.formulario.listaA[i].componentes[j].cantidad = suma3[6] + suma2[6] + suma1[6];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[6] + suma2[6] + suma1[6];
                            break;
                        case 7: this.formulario.listaA[i].componentes[j].cantidad = suma3[7] + suma2[7] + suma1[7];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[7] + suma2[7] + suma1[7];
                            break;
                        case 8: this.formulario.listaA[i].componentes[j].cantidad = suma3[8] + suma2[8] + suma1[8];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[8] + suma2[8] + suma1[8];
                            break;
                        case 9: this.formulario.listaA[i].componentes[j].cantidad = suma3[9] + suma2[9] + suma1[9];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[9] + suma2[9] + suma1[9];
                            break;
                        case 10: this.formulario.listaA[i].componentes[j].cantidad = suma3[10] + suma2[10] + suma1[10];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[10] + suma2[10] + suma1[10];
                            break;
                        case 11: this.formulario.listaA[i].componentes[j].cantidad = suma3[11] + suma2[11] + suma1[11];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[11] + suma2[11] + suma1[11];
                            break;
                        case 12: this.formulario.listaA[i].componentes[j].cantidad = suma3[12] + suma2[12] + suma1[12];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[12] + suma2[12] + suma1[12];
                            break;
                        case 13: this.formulario.listaA[i].componentes[j].cantidad = suma3[13] + suma2[13] + suma1[13];
                            this.formulario.listaB[0].componentes[j].cantidad = suma3[13] + suma2[13] + suma1[13];
                            break;
                    }

                }
            }
        }
        this.subtotalListaB();
    }
    actualizarCampoListaB(event: any) {
        const columna: string[] = event.target.id.split('_');

        for (let i = 0; i < this.formulario.listaB.length; i++) {
            for (let j = 0; j < this.formulario.listaB[i].componentes.length; j++) {
                if (this.formulario.listaB[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaB[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        this.subtotalListaB();
    }

    subtotalListaB() {
        let sumaSubtotal = 0;
        let sumaTotal = 0;

        const suma1: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const suma2: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const suma3: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i = 0; i < this.formulario.listaB.length; i++) {
            sumaSubtotal = 0;
            sumaTotal = 0;
            for (let j = 0; j < this.formulario.listaB[i].componentes.length; j++) {
                if (j <= 4) {
                    sumaTotal += this.formulario.listaB[i].componentes[j].cantidad;
                }
                if (j > 4 && j <= 11) {
                    sumaSubtotal += this.formulario.listaB[i].componentes[j].cantidad;
                }
                if (j === 12) {
                    this.formulario.listaB[i].componentes[j].cantidad = sumaSubtotal;
                }
                if (j === 13) {
                    this.formulario.listaB[i].componentes[j].cantidad = sumaTotal + sumaSubtotal;
                }

                if (i < 3) {
                    switch (j) {
                        case 0: suma1[0] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 1: suma1[1] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 2: suma1[2] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 3: suma1[3] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 4: suma1[4] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 5: suma1[5] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 6: suma1[6] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 7: suma1[7] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 8: suma1[8] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 9: suma1[9] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 10: suma1[10] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 11: suma1[11] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 12: suma1[12] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 13: suma1[13] += this.formulario.listaB[i].componentes[j].cantidad; break;
                    }
                }

                if (i === 3) {
                    switch (j) {
                        case 0: this.formulario.listaB[i].componentes[j].cantidad = suma1[0]; break;
                        case 1: this.formulario.listaB[i].componentes[j].cantidad = suma1[1]; break;
                        case 2: this.formulario.listaB[i].componentes[j].cantidad = suma1[2]; break;
                        case 3: this.formulario.listaB[i].componentes[j].cantidad = suma1[3]; break;
                        case 4: this.formulario.listaB[i].componentes[j].cantidad = suma1[4]; break;
                        case 5: this.formulario.listaB[i].componentes[j].cantidad = suma1[5]; break;
                        case 6: this.formulario.listaB[i].componentes[j].cantidad = suma1[6]; break;
                        case 7: this.formulario.listaB[i].componentes[j].cantidad = suma1[7]; break;
                        case 8: this.formulario.listaB[i].componentes[j].cantidad = suma1[8]; break;
                        case 9: this.formulario.listaB[i].componentes[j].cantidad = suma1[9]; break;
                        case 10: this.formulario.listaB[i].componentes[j].cantidad = suma1[10]; break;
                        case 11: this.formulario.listaB[i].componentes[j].cantidad = suma1[11]; break;
                        case 12: this.formulario.listaB[i].componentes[j].cantidad = suma1[12]; break;
                        case 13: this.formulario.listaB[i].componentes[j].cantidad = suma1[13]; break;
                    }
                }

                if (i === 5 || i === 6) {
                    switch (j) {
                        case 0: suma2[0] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 1: suma2[1] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 2: suma2[2] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 3: suma2[3] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 4: suma2[4] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 5: suma2[5] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 6: suma2[6] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 7: suma2[7] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 8: suma2[8] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 9: suma2[9] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 10: suma2[10] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 11: suma2[11] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 12: suma2[12] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 13: suma2[13] += this.formulario.listaB[i].componentes[j].cantidad; break;
                    }
                }

                if (i === 7) {
                    switch (j) {
                        case 0: this.formulario.listaB[i].componentes[j].cantidad = suma2[0]; break;
                        case 1: this.formulario.listaB[i].componentes[j].cantidad = suma2[1]; break;
                        case 2: this.formulario.listaB[i].componentes[j].cantidad = suma2[2]; break;
                        case 3: this.formulario.listaB[i].componentes[j].cantidad = suma2[3]; break;
                        case 4: this.formulario.listaB[i].componentes[j].cantidad = suma2[4]; break;
                        case 5: this.formulario.listaB[i].componentes[j].cantidad = suma2[5]; break;
                        case 6: this.formulario.listaB[i].componentes[j].cantidad = suma2[6]; break;
                        case 7: this.formulario.listaB[i].componentes[j].cantidad = suma2[7]; break;
                        case 8: this.formulario.listaB[i].componentes[j].cantidad = suma2[8]; break;
                        case 9: this.formulario.listaB[i].componentes[j].cantidad = suma2[9]; break;
                        case 10: this.formulario.listaB[i].componentes[j].cantidad = suma2[10]; break;
                        case 11: this.formulario.listaB[i].componentes[j].cantidad = suma2[11]; break;
                        case 12: this.formulario.listaB[i].componentes[j].cantidad = suma2[12]; break;
                        case 13: this.formulario.listaB[i].componentes[j].cantidad = suma2[13]; break;
                    }
                }

                if (i >= 8 && i < 16) {
                    switch (j) {
                        case 0: suma3[0] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 1: suma3[1] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 2: suma3[2] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 3: suma3[3] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 4: suma3[4] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 5: suma3[5] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 6: suma3[6] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 7: suma3[7] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 8: suma3[8] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 9: suma3[9] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 10: suma3[10] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 11: suma3[11] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 12: suma3[12] += this.formulario.listaB[i].componentes[j].cantidad; break;
                        case 13: suma3[13] += this.formulario.listaB[i].componentes[j].cantidad; break;
                    }
                }

                if (i === this.formulario.listaB.length - 2) {
                    switch (j) {
                        case 0: this.formulario.listaB[i].componentes[j].cantidad = suma3[0] + suma2[0]; break;
                        case 1: this.formulario.listaB[i].componentes[j].cantidad = suma3[1] + suma2[1]; break;
                        case 2: this.formulario.listaB[i].componentes[j].cantidad = suma3[2] + suma2[2]; break;
                        case 3: this.formulario.listaB[i].componentes[j].cantidad = suma3[3] + suma2[3]; break;
                        case 4: this.formulario.listaB[i].componentes[j].cantidad = suma3[4] + suma2[4]; break;
                        case 5: this.formulario.listaB[i].componentes[j].cantidad = suma3[5] + suma2[5]; break;
                        case 6: this.formulario.listaB[i].componentes[j].cantidad = suma3[6] + suma2[6]; break;
                        case 7: this.formulario.listaB[i].componentes[j].cantidad = suma3[7] + suma2[7]; break;
                        case 8: this.formulario.listaB[i].componentes[j].cantidad = suma3[8] + suma2[8]; break;
                        case 9: this.formulario.listaB[i].componentes[j].cantidad = suma3[9] + suma2[9]; break;
                        case 10: this.formulario.listaB[i].componentes[j].cantidad = suma3[10] + suma2[10]; break;
                        case 11: this.formulario.listaB[i].componentes[j].cantidad = suma3[11] + suma2[11]; break;
                        case 12: this.formulario.listaB[i].componentes[j].cantidad = suma3[12] + suma2[12]; break;
                        case 13: this.formulario.listaB[i].componentes[j].cantidad = suma3[13] + suma2[13]; break;
                    }
                }

                if (i === this.formulario.listaB.length - 1) {
                    switch (j) {
                        case 0: this.formulario.listaB[i].componentes[j].cantidad = suma3[0] + suma2[0] + suma1[0];
                            break;
                        case 1: this.formulario.listaB[i].componentes[j].cantidad = suma3[1] + suma2[1] + suma1[1];
                            break;
                        case 2: this.formulario.listaB[i].componentes[j].cantidad = suma3[2] + suma2[2] + suma1[2];
                            break;
                        case 3: this.formulario.listaB[i].componentes[j].cantidad = suma3[3] + suma2[3] + suma1[3];
                            break;
                        case 4: this.formulario.listaB[i].componentes[j].cantidad = suma3[4] + suma2[4] + suma1[4];
                            break;
                        case 5: this.formulario.listaB[i].componentes[j].cantidad = suma3[5] + suma2[5] + suma1[5];
                            break;
                        case 6: this.formulario.listaB[i].componentes[j].cantidad = suma3[6] + suma2[6] + suma1[6];
                            break;
                        case 7: this.formulario.listaB[i].componentes[j].cantidad = suma3[7] + suma2[7] + suma1[7];
                            break;
                        case 8: this.formulario.listaB[i].componentes[j].cantidad = suma3[8] + suma2[8] + suma1[8];
                            break;
                        case 9: this.formulario.listaB[i].componentes[j].cantidad = suma3[9] + suma2[9] + suma1[9];
                            break;
                        case 10: this.formulario.listaB[i].componentes[j].cantidad = suma3[10] + suma2[10] + suma1[10];
                            break;
                        case 11: this.formulario.listaB[i].componentes[j].cantidad = suma3[11] + suma2[11] + suma1[11];
                            break;
                        case 12: this.formulario.listaB[i].componentes[j].cantidad = suma3[12] + suma2[12] + suma1[12];
                            break;
                        case 13: this.formulario.listaB[i].componentes[j].cantidad = suma3[13] + suma2[13] + suma1[13];
                            break;
                    }

                }
            }
        }
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'f2anex2b').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaA, this.nCodffina);
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaB, this.nCodffina);
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
