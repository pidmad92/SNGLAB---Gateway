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
import { DetalleCuenta } from './detallecuenta.model';

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
    displayOtrosAC: boolean;
    displayOtrosANC: boolean;
    displayOtrosPC: boolean;
    displayOtrosPNC: boolean;
    editarOtrosAC: boolean;
    editarOtrosANC: boolean;
    editarOtrosPC: boolean;
    editarOtrosPNC: boolean;

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

    otrosAC: DetalleCuenta;
    otrosANC: DetalleCuenta;
    otrosPC: DetalleCuenta;
    otrosPNC: DetalleCuenta;

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

        this.otrosAC = new DetalleCuenta();
        this.otrosANC = new DetalleCuenta();
        this.otrosPC = new DetalleCuenta();
        this.otrosPNC = new DetalleCuenta();

        this.construirFormulario();
    }

    mostrarDialogOtrosAC() {
        this.otrosAC = new DetalleCuenta();
        this.displayOtrosAC = true;
        this.editarOtrosAC = false;
    }

    cancelarModalOtrosAC() {
        this.otrosAC = new DetalleCuenta();
        this.displayOtrosAC = false;
        this.editarOtrosAC = false;
    }

    guardarModalOtrosAC() {
        const t = new Tabla();
        if (!this.editarOtrosAC) {
            t.id = this.formulario.listaACOtros.length;
        } else {
            t.id = this.otrosAC.id;
        }
        t.descripcion = this.otrosAC.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2C_COD_AC_OTROSCORRIENTES + 'a_' + this.formulario.listaACOtros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosAC.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2C_COD_AC_OTROSCORRIENTES + 'b_' + this.formulario.listaACOtros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosAC.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2C_COD_AC_OTROSCORRIENTES + 'c_' + this.formulario.listaACOtros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosAC.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2C_COD_AC_OTROSCORRIENTES + 'd_' + this.formulario.listaACOtros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosAC.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosAC) {
            const bean: Tabla = this.formulario.listaACOtros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaACOtros.indexOf(bean);
                this.formulario.listaACOtros[index] = t;
            }
        } else {
            this.formulario.listaACOtros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaACOtros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACOtros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaACOtros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaACOtros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaACOtros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaACOtros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACOtros.componentes[0].cantidad = Number(suma1) + Number(this.otrosAC.anioA);
        this.formulario.totalACOtros.componentes[1].cantidad = Number(suma2) + Number(this.otrosAC.anioB);
        this.formulario.totalACOtros.componentes[2].cantidad = Number(suma3) + Number(this.otrosAC.anioC);
        this.formulario.totalACOtros.componentes[3].cantidad = Number(suma4) + Number(this.otrosAC.anioD);

        this.displayOtrosAC = false;
        this.otrosAC = new DetalleCuenta();
        this.editarOtrosAC = false;
    }

    editarComponenteOtrosAC(tabla: Tabla) {
        this.displayOtrosAC = true;
        this.editarOtrosAC = true;
        this.otrosAC = new DetalleCuenta();
        this.otrosAC.id = tabla.id;
        this.otrosAC.descripcion = tabla.descripcion;
        this.otrosAC.anioA = tabla.componentes[0].cantidad;
        this.otrosAC.anioB = tabla.componentes[1].cantidad;
        this.otrosAC.anioC = tabla.componentes[2].cantidad;
        this.otrosAC.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosAC(tabla: Tabla) {
        const t = this.formulario.listaACOtros.splice(this.formulario.listaACOtros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalACOtros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalACOtros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalACOtros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalACOtros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    mostrarDialogOtrosANC() {
        this.otrosANC = new DetalleCuenta();
        this.displayOtrosANC = true;
        this.editarOtrosANC = false;
    }

    cancelarModalOtrosANC() {
        this.otrosANC = new DetalleCuenta();
        this.displayOtrosANC = false;
        this.editarOtrosANC = false;
    }

    guardarModalOtrosANC() {
        const t = new Tabla();
        if (!this.editarOtrosANC) {
            t.id = this.formulario.listaANCOtros.length;
        } else {
            t.id = this.otrosANC.id;
        }
        t.descripcion = this.otrosANC.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES + 'a_' + this.formulario.listaANCOtros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosANC.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES + 'b_' + this.formulario.listaANCOtros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosANC.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES + 'c_' + this.formulario.listaANCOtros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosANC.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2C_COD_ANC_OTROSCORRIENTES + 'd_' + this.formulario.listaANCOtros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosANC.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosANC) {
            const bean: Tabla = this.formulario.listaANCOtros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaANCOtros.indexOf(bean);
                this.formulario.listaANCOtros[index] = t;
            }
        } else {
            this.formulario.listaANCOtros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaANCOtros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCOtros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaANCOtros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaANCOtros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaANCOtros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaANCOtros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalANCOtros.componentes[0].cantidad = Number(suma1) + Number(this.otrosANC.anioA);
        this.formulario.totalANCOtros.componentes[1].cantidad = Number(suma2) + Number(this.otrosANC.anioB);
        this.formulario.totalANCOtros.componentes[2].cantidad = Number(suma3) + Number(this.otrosANC.anioC);
        this.formulario.totalANCOtros.componentes[3].cantidad = Number(suma4) + Number(this.otrosANC.anioD);

        this.displayOtrosANC = false;
        this.otrosANC = new DetalleCuenta();
        this.editarOtrosANC = false;
    }

    editarComponenteOtrosANC(tabla: Tabla) {
        this.displayOtrosANC = true;
        this.editarOtrosANC = true;
        this.otrosANC = new DetalleCuenta();
        this.otrosANC.id = tabla.id;
        this.otrosANC.descripcion = tabla.descripcion;
        this.otrosANC.anioA = tabla.componentes[0].cantidad;
        this.otrosANC.anioB = tabla.componentes[1].cantidad;
        this.otrosANC.anioC = tabla.componentes[2].cantidad;
        this.otrosANC.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosANC(tabla: Tabla) {
        const t = this.formulario.listaANCOtros.splice(this.formulario.listaANCOtros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalANCOtros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalANCOtros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalANCOtros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalANCOtros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    mostrarDialogOtrosPC() {
        this.otrosPC = new DetalleCuenta();
        this.displayOtrosPC = true;
        this.editarOtrosPC = false;
    }

    cancelarModalOtrosPC() {
        this.otrosPC = new DetalleCuenta();
        this.displayOtrosPC = false;
        this.editarOtrosPC = false;
    }

    guardarModalOtrosPC() {
        const t = new Tabla();
        if (!this.editarOtrosPC) {
            t.id = this.formulario.listaPCOtros.length;
        } else {
            t.id = this.otrosPC.id;
        }
        t.descripcion = this.otrosPC.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2C_COD_PC_OTROS + 'a_' + this.formulario.listaPCOtros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosPC.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2C_COD_PC_OTROS + 'b_' + this.formulario.listaPCOtros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosPC.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2C_COD_PC_OTROS + 'c_' + this.formulario.listaPCOtros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosPC.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2C_COD_PC_OTROS + 'd_' + this.formulario.listaPCOtros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosPC.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosPC) {
            const bean: Tabla = this.formulario.listaPCOtros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPCOtros.indexOf(bean);
                this.formulario.listaPCOtros[index] = t;
            }
        } else {
            this.formulario.listaPCOtros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPCOtros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPCOtros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPCOtros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPCOtros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPCOtros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPCOtros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCOtros.componentes[0].cantidad = Number(suma1) + Number(this.otrosPC.anioA);
        this.formulario.totalPCOtros.componentes[1].cantidad = Number(suma2) + Number(this.otrosPC.anioB);
        this.formulario.totalPCOtros.componentes[2].cantidad = Number(suma3) + Number(this.otrosPC.anioC);
        this.formulario.totalPCOtros.componentes[3].cantidad = Number(suma4) + Number(this.otrosPC.anioD);

        this.displayOtrosPC = false;
        this.otrosPC = new DetalleCuenta();
        this.editarOtrosPC = false;
    }

    editarComponenteOtrosPC(tabla: Tabla) {
        this.displayOtrosPC = true;
        this.editarOtrosPC = true;
        this.otrosPC = new DetalleCuenta();
        this.otrosPC.id = tabla.id;
        this.otrosPC.descripcion = tabla.descripcion;
        this.otrosPC.anioA = tabla.componentes[0].cantidad;
        this.otrosPC.anioB = tabla.componentes[1].cantidad;
        this.otrosPC.anioC = tabla.componentes[2].cantidad;
        this.otrosPC.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosPC(tabla: Tabla) {
        const t = this.formulario.listaPCOtros.splice(this.formulario.listaPCOtros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPCOtros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPCOtros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPCOtros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPCOtros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
    }

    mostrarDialogOtrosPNC() {
        this.otrosPNC = new DetalleCuenta();
        this.displayOtrosPNC = true;
        this.editarOtrosPNC = false;
    }

    cancelarModalOtrosPNC() {
        this.otrosPNC = new DetalleCuenta();
        this.displayOtrosPNC = false;
        this.editarOtrosPNC = false;
    }

    guardarModalOtrosPNC() {
        const t = new Tabla();
        if (!this.editarOtrosPNC) {
            t.id = this.formulario.listaPNCOtros.length;
        } else {
            t.id = this.otrosPNC.id;
        }
        t.descripcion = this.otrosPNC.descripcion;
        t.componentes = new Array<Componente>();

        const componenteAnioA = new Componente();
        componenteAnioA.codigo = this.constantes.FORM2C_COD_PNC_OTROS + 'a_' + this.formulario.listaPNCOtros.length + '_' + this.anios[0];
        componenteAnioA.cantidad = this.otrosPNC.anioA;
        t.componentes.push(componenteAnioA);

        const componenteAnioB = new Componente();
        componenteAnioB.codigo = this.constantes.FORM2C_COD_PNC_OTROS + 'b_' + this.formulario.listaPNCOtros.length + '_' + this.anios[1];
        componenteAnioB.cantidad = this.otrosPNC.anioB;
        t.componentes.push(componenteAnioB);

        const componenteAnioC = new Componente();
        componenteAnioC.codigo = this.constantes.FORM2C_COD_PNC_OTROS + 'c_' + this.formulario.listaPNCOtros.length + '_' + this.anios[2];
        componenteAnioC.cantidad = this.otrosPNC.anioC;
        t.componentes.push(componenteAnioC);

        const componenteAnioD = new Componente();
        componenteAnioD.codigo = this.constantes.FORM2C_COD_PNC_OTROS + 'd_' + this.formulario.listaPNCOtros.length + '_' + this.anios[3];
        componenteAnioD.cantidad = this.otrosPNC.anioD;
        t.componentes.push(componenteAnioD);
        if (this.editarOtrosPNC) {
            const bean: Tabla = this.formulario.listaPNCOtros.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaPNCOtros.indexOf(bean);
                this.formulario.listaPNCOtros[index] = t;
            }
        } else {
            this.formulario.listaPNCOtros.push(t);
        }

        let suma1 = 0;
        let suma2 = 0;
        let suma3 = 0;
        let suma4 = 0;
        for (let i = 0; i < this.formulario.listaPNCOtros.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaPNCOtros[i].componentes.length; j++) {
                switch (j) {
                    case 0: suma1 += Number(this.formulario.listaPNCOtros[i].componentes[0].cantidad);
                        break;
                    case 1: suma2 += Number(this.formulario.listaPNCOtros[i].componentes[1].cantidad);
                        break;
                    case 2: suma3 += Number(this.formulario.listaPNCOtros[i].componentes[2].cantidad);
                        break;
                    case 3: suma4 += Number(this.formulario.listaPNCOtros[i].componentes[3].cantidad);
                        break;
                }
            }
        }
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCOtros.componentes[0].cantidad = Number(suma1) + Number(this.otrosPNC.anioA);
        this.formulario.totalPNCOtros.componentes[1].cantidad = Number(suma2) + Number(this.otrosPNC.anioB);
        this.formulario.totalPNCOtros.componentes[2].cantidad = Number(suma3) + Number(this.otrosPNC.anioC);
        this.formulario.totalPNCOtros.componentes[3].cantidad = Number(suma4) + Number(this.otrosPNC.anioD);

        this.displayOtrosPNC = false;
        this.otrosPNC = new DetalleCuenta();
        this.editarOtrosPNC = false;
    }

    editarComponenteOtrosPNC(tabla: Tabla) {
        this.displayOtrosPNC = true;
        this.editarOtrosPNC = true;
        this.otrosPNC = new DetalleCuenta();
        this.otrosPNC.id = tabla.id;
        this.otrosPNC.descripcion = tabla.descripcion;
        this.otrosPNC.anioA = tabla.componentes[0].cantidad;
        this.otrosPNC.anioB = tabla.componentes[1].cantidad;
        this.otrosPNC.anioC = tabla.componentes[2].cantidad;
        this.otrosPNC.anioD = tabla.componentes[3].cantidad;
    }

    eliminarComponenteOtrosPNC(tabla: Tabla) {
        const t = this.formulario.listaPNCOtros.splice(this.formulario.listaPNCOtros.indexOf(tabla), 1);
        // Debido a que las listas no se refrescan hasta despues del render, se suma lo que esta en el modal
        this.formulario.totalPNCOtros.componentes[0].cantidad -= Number(tabla.componentes[0].cantidad);
        this.formulario.totalPNCOtros.componentes[1].cantidad -= Number(tabla.componentes[1].cantidad);
        this.formulario.totalPNCOtros.componentes[2].cantidad -= Number(tabla.componentes[2].cantidad);
        this.formulario.totalPNCOtros.componentes[3].cantidad -= Number(tabla.componentes[3].cantidad);
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
        const acCarCredNetCod = [this.constantes.FORM2C_COD_AC_CARTERANETO_VIG_CUENTASCORRIENTES,
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

        const acRefReesDesc = [this.constantes.FORM2C_AC_CARTERANETO_REFINANREESTRUC];
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
    subtotalActivosCorrientesDisp(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaACDisponible.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaACDisponible.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACDisponible[i].componentes.length; j++) {
                if (this.formulario.listaACDisponible[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaACDisponible[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaACDisponible.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACDisponible[i].componentes.length; j++) {
                if (this.formulario.listaACDisponible[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaACDisponible[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaACDisponible[idy].componentes[idx].cantidad = suma;
    }

    subtotalACCredNetoVig(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaACCateraCredNetos.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaACCateraCredNetos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACCateraCredNetos[i].componentes.length; j++) {
                if (this.formulario.listaACCateraCredNetos[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaACCateraCredNetos[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaACCateraCredNetos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACCateraCredNetos[i].componentes.length; j++) {
                if (this.formulario.listaACCateraCredNetos[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaACCateraCredNetos[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaACCateraCredNetos[idy].componentes[idx].cantidad = suma;
        this.totalCreditosNetos();
    }

    subtotalACReestructu(event: any) {
        const columna: string[] = event.target.id.split('_');

            for (let j = 0; j < this.formulario.listaACRefinanReestruc[0].componentes.length; j++) {
                if (this.formulario.listaACRefinanReestruc[0].componentes[j].codigo === event.target.id) {
                    this.formulario.listaACRefinanReestruc[0].componentes[j].cantidad = Number(event.target.value);
                }
            }
        this.totalCreditosNetos();
    }

    subtotalACAtrasados(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaACAtrasados.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaACAtrasados.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACAtrasados[i].componentes.length; j++) {
                if (this.formulario.listaACAtrasados[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaACAtrasados[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaACAtrasados.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaACAtrasados[i].componentes.length; j++) {
                if (this.formulario.listaACAtrasados[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaACAtrasados[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaACAtrasados[idy].componentes[idx].cantidad = suma;
        this.totalCreditosNetos();
    }

    totalCreditosNetos() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;

        const idx = this.formulario.listaACCateraCredNetos.length - 1;
        const jdx = this.formulario.listaACAtrasados.length - 1;

        ingreso1 += this.formulario.listaACCateraCredNetos[idx].componentes[0].cantidad;
        ingreso2 += this.formulario.listaACCateraCredNetos[idx].componentes[1].cantidad;
        ingreso3 += this.formulario.listaACCateraCredNetos[idx].componentes[2].cantidad;
        ingreso4 += this.formulario.listaACCateraCredNetos[idx].componentes[3].cantidad;

        ingreso1 += this.formulario.listaACRefinanReestruc[0].componentes[0].cantidad;
        ingreso2 += this.formulario.listaACRefinanReestruc[0].componentes[1].cantidad;
        ingreso3 += this.formulario.listaACRefinanReestruc[0].componentes[2].cantidad;
        ingreso4 += this.formulario.listaACRefinanReestruc[0].componentes[3].cantidad;

        ingreso1 += this.formulario.listaACAtrasados[jdx].componentes[0].cantidad;
        ingreso2 += this.formulario.listaACAtrasados[jdx].componentes[1].cantidad;
        ingreso3 += this.formulario.listaACAtrasados[jdx].componentes[2].cantidad;
        ingreso4 += this.formulario.listaACAtrasados[jdx].componentes[3].cantidad;

        this.formulario.totalACTotal.componentes[0].cantidad = ingreso1;
        this.formulario.totalACTotal.componentes[1].cantidad = ingreso2;
        this.formulario.totalACTotal.componentes[2].cantidad = ingreso3;
        this.formulario.totalACTotal.componentes[3].cantidad = ingreso4;
    }

    subtotalANCCredNetoVig(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaANCCateraCredNetos.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaANCCateraCredNetos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCCateraCredNetos[i].componentes.length; j++) {
                if (this.formulario.listaANCCateraCredNetos[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaANCCateraCredNetos[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaANCCateraCredNetos.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCCateraCredNetos[i].componentes.length; j++) {
                if (this.formulario.listaANCCateraCredNetos[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaANCCateraCredNetos[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaANCCateraCredNetos[idy].componentes[idx].cantidad = suma;
        this.totalANCCreditosNetos();
    }

    subtotalANCReestructu(event: any) {
        const columna: string[] = event.target.id.split('_');

            for (let j = 0; j < this.formulario.listaANCRefinanReestruc[0].componentes.length; j++) {
                if (this.formulario.listaANCRefinanReestruc[0].componentes[j].codigo === event.target.id) {
                    this.formulario.listaANCRefinanReestruc[0].componentes[j].cantidad = Number(event.target.value);
                }
        }
        this.totalANCCreditosNetos();
    }

    subtotalANCAtrasados(event: any) {
        const columna: string[] = event.target.id.split('_');
        const idx = columna[2];
        const idy = this.formulario.listaANCAtrasados.length - 1;
        let suma = 0;

        for (let i = 0; i < this.formulario.listaANCAtrasados.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCAtrasados[i].componentes.length; j++) {
                if (this.formulario.listaANCAtrasados[i].componentes[j].codigo === event.target.id) {
                    this.formulario.listaANCAtrasados[i].componentes[j].cantidad = Number(event.target.value);
                }
            }
        }

        for (let i = 0; i < this.formulario.listaANCAtrasados.length - 1; i++) {
            for (let j = 0; j < this.formulario.listaANCAtrasados[i].componentes.length; j++) {
                if (this.formulario.listaANCAtrasados[i].componentes[j].codigo.indexOf(columna[2] + '_' + columna[3]) !== -1) {
                    suma += Number(this.formulario.listaANCAtrasados[i].componentes[j].cantidad);
                }
            }
        }
        this.formulario.listaANCAtrasados[idy].componentes[idx].cantidad = suma;
        this.totalANCCreditosNetos();
    }

    totalANCCreditosNetos() {
        let ingreso1 = 0;
        let ingreso2 = 0;
        let ingreso3 = 0;
        let ingreso4 = 0;

        const idx = this.formulario.listaANCCateraCredNetos.length - 1;
        const jdx = this.formulario.listaANCAtrasados.length - 1;

        ingreso1 += this.formulario.listaANCCateraCredNetos[idx].componentes[0].cantidad;
        ingreso2 += this.formulario.listaANCCateraCredNetos[idx].componentes[1].cantidad;
        ingreso3 += this.formulario.listaANCCateraCredNetos[idx].componentes[2].cantidad;
        ingreso4 += this.formulario.listaANCCateraCredNetos[idx].componentes[3].cantidad;

        ingreso1 += this.formulario.listaANCRefinanReestruc[0].componentes[0].cantidad;
        ingreso2 += this.formulario.listaANCRefinanReestruc[0].componentes[1].cantidad;
        ingreso3 += this.formulario.listaANCRefinanReestruc[0].componentes[2].cantidad;
        ingreso4 += this.formulario.listaANCRefinanReestruc[0].componentes[3].cantidad;

        ingreso1 += this.formulario.listaANCAtrasados[jdx].componentes[0].cantidad;
        ingreso2 += this.formulario.listaANCAtrasados[jdx].componentes[1].cantidad;
        ingreso3 += this.formulario.listaANCAtrasados[jdx].componentes[2].cantidad;
        ingreso4 += this.formulario.listaANCAtrasados[jdx].componentes[3].cantidad;

        this.formulario.totalANCTotal.componentes[0].cantidad = ingreso1;
        this.formulario.totalANCTotal.componentes[1].cantidad = ingreso2;
        this.formulario.totalANCTotal.componentes[2].cantidad = ingreso3;
        this.formulario.totalANCTotal.componentes[3].cantidad = ingreso4;
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
