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
import { Tabla } from './tabla.model';
import { Anexo1B } from './anexo1b.model';
import { Volumen } from './volumen.model';
import { Componente } from './componente.model';
import { FormfinancDetalleService, FormfinancDetalle } from '../entities/index';

@Component({
    selector: 'jhi-formulario-financiero-privado-anexo1b',
    templateUrl: './formulario-financiero-privado-anexo1b.component.html',
    styleUrls: ['formulario-financiero-privado.scss']
})

export class FormularioFinancieroPrivadoAnexo1BComponent implements OnInit, OnDestroy {
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
    constantes: Constants;
    formulario: Anexo1B;
    volumen: Volumen;

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
        const fechaReg = this.datepipe.transform(this.solicitud.tFecreg, 'yyyy');
        const fecha: number = Number(fechaReg);
        this.anios = Array<number>();
        this.anios.push(fecha - 3);
        this.anios.push(fecha - 2);
        this.anios.push(fecha - 1);
        this.anios.push(fecha);
        this.display = false;
        this.constantes = new Constants();
        this.formulario = new Anexo1B();
        this.volumen = new Volumen();
        this.construirFormulario();
    }

    load(nCodffina) {
        this.nCodffina = nCodffina;
    }

    mostrarDialog() {
        this.volumen = new Volumen();
        this.display = true;
        this.editar = false;
    }

    cancelarModal() {
        this.volumen = new Volumen();
        this.display = false;
        this.editar = false;
    }

    guardarModal() {
        const t = new Tabla();

        if (!this.editar) {
            this.volumen.id = this.formulario.listaProductos.length;
        }

        t.id = this.volumen.id;
        t.descripcion = this.volumen.producto;
        t.unidadmedida = this.volumen.unidadMedida;

        t.componentes = new Array<Componente>();

        t.componentes[0] = new Componente();
        t.componentes[0].codigo = this.constantes.FORM1ANEX1B_COD_VOLUMEN + '_' + this.volumen.id + '_' + this.anios[0];
        t.componentes[0].cantidad = this.volumen.anioAvolumen;

        t.componentes[1] = new Componente();
        t.componentes[1].codigo = this.constantes.FORM1ANEX1B_COD_VOLUMEN + '_' + this.volumen.id + '_' + this.anios[1];
        t.componentes[1].cantidad = this.volumen.anioBvolumen;

        t.componentes[2] = new Componente();
        t.componentes[2].codigo = this.constantes.FORM1ANEX1B_COD_VOLUMEN + '_' + this.volumen.id + '_' + this.anios[2];
        t.componentes[2].cantidad = this.volumen.anioCvolumen;

        t.componentes[3] = new Componente();
        t.componentes[3].codigo = this.constantes.FORM1ANEX1B_COD_VOLUMEN + '_' + this.volumen.id + '_' + this.anios[3];
        t.componentes[3].cantidad = this.volumen.anioDvolumen;

        if (this.editar) {
            const bean: Tabla = this.formulario.listaProductos.find((x) => x.id === t.id);
            if (bean !== undefined) {
                const index = this.formulario.listaProductos.indexOf(bean);
                this.formulario.listaProductos[index] = t;
            }
        } else {
            this.formulario.listaProductos.push(t);
        }
        this.volumen = new Volumen();
        this.display = false;
        this.editar = false;
    }

    editarComponente(tabla: Tabla) {
        this.volumen = new Volumen();

        this.volumen.id = tabla.id;
        this.volumen.producto = tabla.descripcion;
        this.volumen.unidadMedida = tabla.unidadmedida;
        this.volumen.anioAvolumen = tabla.componentes[0].cantidad;
        this.volumen.anioBvolumen = tabla.componentes[1].cantidad;
        this.volumen.anioCvolumen = tabla.componentes[2].cantidad;
        this.volumen.anioDvolumen = tabla.componentes[3].cantidad;

        this.display = true;
        this.editar = true;
    }

    eliminarComponente(tabla: Tabla) {
        const t = this.formulario.listaProductos.splice(this.formulario.listaProductos.indexOf(tabla), 1);
    }

    // ---------------------------------------
    construirFormulario() {
        this.formulario.listaProductos = new Array<Tabla>();

        this.obtenerValores(this.constantes.FORM1ANEX1B_COD_VOLUMEN, true);
    }

    obtenerValores(componente: string, nacional: boolean) {
        const excluido = 'subtotal';
        const componentes = new Array<Componente>();
        this.formfinancdetalleService.obtenerListaComponenteExcluido(this.nCodffina, componente, excluido).subscribe(
            (res: ResponseWrapper) => {
                let cont = 1;
                let i = 0;
                const objetos: FormfinancDetalle[] = res.json;
                if (objetos.length > 0) {
                    while ((cont - 1) < objetos.length) {
                        if (this.formulario.listaProductos[i] === undefined) {
                            this.formulario.listaProductos[i] = new Tabla();
                            if (this.formulario.listaProductos[i].componentes === undefined) {
                                this.formulario.listaProductos[i].componentes = new Array<Componente>();
                            }
                        }
                        // componentes[i] = new Componente();
                        const comp: Componente = new Componente();
                        comp.codigo = objetos[cont - 1].vCompone;
                        comp.cantidad = objetos[cont - 1].nValffina;
                        comp.id = objetos[cont - 1].nCodfdetal;
                        comp.vUsureg = objetos[cont - 1].vUsuareg;
                        comp.tFecReg = objetos[cont - 1].tFecreg;
                        comp.nSedeReg = objetos[cont - 1].nSedereg;

                        this.formulario.listaProductos[i].descripcion = objetos[cont - 1].vDesffina;
                        this.formulario.listaProductos[i].unidadmedida = objetos[cont - 1].vUndffina;
                        this.formulario.listaProductos[i].componentes.push(comp);
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
        this.formfinancdetalleService.desactivarFormulario(this.nCodffina, 'f1anex1b').subscribe(
            (res: ResponseWrapper) => {
                this.formfinancdetalleService.guardarFormFinancieroTablas(this.datepipe, this.formulario.listaProductos, this.nCodffina);
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
