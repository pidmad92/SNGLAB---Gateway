import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule } from 'primeng/primeng';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Direccion } from '../../../entities/direccion/index';
import { SessionStorage } from 'ng2-webstorage';
import { Message } from 'primeng/components/common/api';
import { ComboModel } from '../../general/combobox.model';

@Component({
    selector: 'jhi-formulario-perfil2',
    templateUrl: './formulario-perfil2.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil2Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editarUnd: boolean;
    editarAccion: boolean;
    editarMercado: boolean;
    editarObra: boolean;
    editarInv: boolean;

    // Flags de dialogs
    displayUnidad: boolean;
    displayPartiAccionaria: boolean;
    displayPartiMercado: boolean;
    displayObras: boolean;
    displayInvProy: boolean;

    // Datos de Perfil
    @SessionStorage('solicitud')
    solicitud: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;

    // Listados de dato
    @SessionStorage('undNegocios')
    undNegocios: Undnegocio[];
    @SessionStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @SessionStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @SessionStorage('obras')
    obras: Hechoinver[];
    @SessionStorage('proyectos')
    proyectos: Hechoinver[];
    @SessionStorage('direcciones')
    direcciones: Direccion[];

    // Objetos CUD
    undNegocio: Undnegocio;
    participacionAccionaria: Participa;
    participacionMercado: Participa;
    obra: Hechoinver;
    proyecto: Hechoinver;

    // Combos
    sector: ComboModel[];
    selectedSector: ComboModel;

    planContable: ComboModel[];
    selectedPlan: ComboModel;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        // Servicios
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private undNegocioService: UndnegocioService,
        private participaService: ParticipaService,
        private hechoinverService: HechoinverService,
    ) { }

    ngOnInit() {

        this.loadAll();

        // Iniciar Combos
        this.sector = [];
        this.sector.push(new ComboModel('Privado', '1', 0));
        this.sector.push(new ComboModel('Público', '2', 0));

        // Iniciar Combos
        this.planContable = [];
        this.planContable.push(new ComboModel('Plan Contable General Empresarial-PCGE', 'PCGE', 0));
        this.planContable.push(new ComboModel('Plan Contable del Sistema Financiero-PCSF', 'PCSF', 0));
        this.planContable.push(new ComboModel('Plan Contable Gubernamental-PCG', 'PCG', 0));

        this.editarUnd = false;
        this.editarAccion = false;
        this.editarMercado = false;
        this.editarObra = false;
        this.editarInv = false;
        this.block = false;

        this.displayUnidad = false;
        this.displayPartiAccionaria = false;
        this.displayPartiMercado = false;
        this.displayObras = false;
        this.displayInvProy = false;

        this.undNegocio = new Undnegocio;
        this.participacionAccionaria = new Participa;
        this.participacionMercado = new Participa;
        this.obra = new Hechoinver;
        this.proyecto = new Hechoinver;
    }

    ngOnDestroy() { }

    previousState() {
        window.history.back();
    }

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {

        // Inicializacion de listados
        this.undNegocios = new Array<Undnegocio>();
        this.participacionesAccionarias = new Array<Participa>();
        this.participacionesMercados = new Array<Participa>();
        this.obras = new Array<Hechoinver>();
        this.proyectos = new Array<Hechoinver>();

        this.undNegocioService.obtenerUnidadNegocio(nCodfperf).subscribe(
            (res: ResponseWrapper) => this.undNegocios = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'A').subscribe(
            (res: ResponseWrapper) => this.participacionesAccionarias = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'M').subscribe(
            (res: ResponseWrapper) => this.participacionesMercados = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'H').subscribe(
            (res: ResponseWrapper) => this.obras = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'I').subscribe(
            (res: ResponseWrapper) => this.proyectos = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        console.log('inputChar: ' + inputChar);
        console.log('participacionAccionaria.nPorcasig: ' + this.participacionAccionaria.nPorcasig);
        if (event.charCode === 46) {
            // Check if the text already contains the . character
            if (this.participacionAccionaria.nPorcasig.toString().indexOf('.') !== -1) {
                event.preventDefault();
            }
        } else if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    actualizarPorcetanje(event: any) {

    }

    setTwoNumberDecimal($event) {
        $event.target.value = parseFloat($event.target.value).toFixed(2);
    }

    // Unidad de Negocio
    showUnidad() {
        this.block = true;
        this.displayUnidad = true;
        this.editarUnd = false;
    }
    cancelarUnidad() {
        this.block = false;
        this.undNegocio = new Undnegocio;
        this.displayUnidad = false;
        this.editarUnd = false;
    }
    guardarUnidad() {
        if (this.validarUnidad()) {
            if (!this.editarUnd) {

                this.undNegocio.id = this.undNegocios.length;
                if (this.undNegocios.lastIndexOf(this.undNegocio, 1) === -1) {
                    this.undNegocios.push(this.undNegocio);
                }

            } else {
                const unidadGuardado: Undnegocio = this.undNegocios.find((x) => x.id === this.undNegocio.id);
                if (unidadGuardado !== undefined) {
                    const index = this.undNegocios.indexOf(unidadGuardado);
                    this.undNegocios[index] = this.undNegocio;
                }
            }
            this.undNegocio = new Undnegocio;
            this.displayUnidad = false;
            this.block = false;
            this.editarUnd = false;
        }
    }
    editarUnidad(obj: Undnegocio) {
        // this.undNegocio = obj;
        this.undNegocio.id = obj.id;
        this.undNegocio.nFlgactivo = obj.nFlgactivo;
        this.undNegocio.vDesundng = obj.vDesundng;

        this.block = true;
        this.displayUnidad = true;
        this.editarUnd = true;
    }
    eliminarUnidad(obj: Undnegocio) {
        this.undNegocios.splice(this.undNegocios.indexOf(obj), 1);
    }

    validarUnidad(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.undNegocio.vDesundng === undefined || this.undNegocio.vDesundng === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar una Unidad de Negocio.' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    // Participacion Accionaria
    showPartiAccionaria() {
        this.block = true;
        this.editarAccion = false;
        this.displayPartiAccionaria = true;
    }
    cancelarPartiAccionaria() {
        this.block = false;
        this.participacionAccionaria = new Participa;
        this.displayPartiAccionaria = false;
        this.editarAccion = false;
    }
    guardarPartiAccionaria() {

        if (this.validarPartiAccionaria()) {
            if (!this.editarAccion) {
                this.participacionAccionaria.id = this.participacionesAccionarias.length;
                if (this.participacionesAccionarias.lastIndexOf(this.participacionAccionaria, 1) === -1) {
                    this.participacionesAccionarias.push(this.participacionAccionaria);
                }

            } else {
                const partiAccionariaGuardado: Participa = this.participacionesAccionarias.find((x) => x.id === this.participacionAccionaria.id);
                if (partiAccionariaGuardado !== undefined) {
                    const index = this.participacionesAccionarias.indexOf(partiAccionariaGuardado);
                    this.participacionesAccionarias[index] = this.participacionAccionaria;
                }
            }

            this.participacionAccionaria = new Participa;
            this.displayPartiAccionaria = false;
            this.block = false;
            this.editarAccion = false;
        }

    }
    editarPartiAccionaria(obj: Participa) {
        // this.participacionAccionaria = obj;

        this.participacionAccionaria.id = obj.id;
        this.participacionAccionaria.nFlgactivo = obj.nFlgactivo;
        this.participacionAccionaria.nPorcasig = obj.nPorcasig;
        this.participacionAccionaria.vTipodoc = obj.vTipodoc;
        this.participacionAccionaria.vNumdocum = obj.vNumdocum;
        this.participacionAccionaria.vRazonsoc = obj.vRazonsoc;
        this.participacionAccionaria.vTipopart = obj.vTipopart;

        this.block = true;
        this.displayPartiAccionaria = true;
        this.editarAccion = true;
    }
    eliminarPartiAccionaria(obj: Participa) {
        this.participacionesAccionarias.splice(this.participacionesAccionarias.indexOf(obj), 1);
    }
    validarPartiAccionaria(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.participacionAccionaria.vTipodoc === undefined || this.participacionAccionaria.vTipodoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un tipo de documento.' });
            error = false;
        } else if (this.participacionAccionaria.vNumdocum === undefined || this.participacionAccionaria.vNumdocum === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de documento.' });
            error = false;
        } else if (this.participacionAccionaria.vRazonsoc === undefined || this.participacionAccionaria.vRazonsoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la razón social.' });
            error = false;
        } else if (this.participacionAccionaria.nPorcasig === undefined || this.participacionAccionaria.nPorcasig === null) {

            if (this.participacionAccionaria.nPorcasig > 10) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado debe ser mayor a 10%' });
            } else if (this.participacionAccionaria.nPorcasig > 100) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado máximo es 100%' });
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el porcetaje asignado' });
            }

            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    // Participacion de Mercado
    showPartiMercado() {
        this.block = true;
        this.displayPartiMercado = true;
        this.editarMercado = false;
    }
    cancelarPartiMercado() {
        this.participacionMercado = new Participa;
        this.displayPartiMercado = false;
        this.block = false;
        this.editarMercado = false;
    }
    guardarPartiMercado() {
        if (this.validarPartiMercado()) {
            if (!this.editarMercado) {
                this.participacionMercado.id = this.participacionesMercados.length;
                if (this.participacionesMercados.lastIndexOf(this.participacionMercado, 1) === -1) {
                    this.participacionesMercados.push(this.participacionMercado);
                }

            } else {
                const partiMercadoGuardado: Participa = this.participacionesMercados.find((x) => x.id === this.participacionMercado.id);
                if (partiMercadoGuardado !== undefined) {
                    const index = this.participacionesMercados.indexOf(partiMercadoGuardado);
                    this.participacionesMercados[index] = this.participacionMercado;
                }
            }

            this.participacionMercado = new Participa;
            this.displayPartiMercado = false;
            this.block = false;
            this.editarMercado = false;
        }
    }
    editarPartiMercado(obj: Participa) {
        // this.participacionMercado = obj;

        this.participacionMercado.id = obj.id;
        this.participacionMercado.nFlgactivo = obj.nFlgactivo;
        this.participacionMercado.nPorcasig = obj.nPorcasig;
        this.participacionMercado.vTipodoc = obj.vTipodoc;
        this.participacionMercado.vNumdocum = obj.vNumdocum;
        this.participacionMercado.vRazonsoc = obj.vRazonsoc;
        this.participacionMercado.vTipopart = obj.vTipopart;

        this.displayPartiMercado = true;
        this.block = true;
        this.editarMercado = true;
    }
    eliminarPartiMercado(obj: Participa) {
        this.participacionesMercados.splice(this.participacionesMercados.indexOf(obj), 1);
    }
    validarPartiMercado(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.participacionMercado.vTipodoc === undefined || this.participacionMercado.vTipodoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un tipo de documento.' });
            error = false;
        } else if (this.participacionMercado.vNumdocum === undefined || this.participacionMercado.vNumdocum === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de documento.' });
            error = false;
        } else if (this.participacionMercado.vRazonsoc === undefined || this.participacionMercado.vRazonsoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la razón social.' });
            error = false;
        } else if (this.participacionMercado.nPorcasig === undefined || this.participacionMercado.nPorcasig === null) {

            if (this.participacionMercado.nPorcasig > 10) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado debe ser mayor a 10%' });
            } else if (this.participacionMercado.nPorcasig > 100) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado máximo es 100%' });
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el porcetaje asignado' });
            }

            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    // Principales Obras
    showObras() {
        this.block = true;
        this.displayObras = true;
        this.editarObra = false;
    }
    cancelarObras() {
        this.obra = new Hechoinver;
        this.displayObras = false;
        this.block = false;
        this.editarObra = false;
    }
    guardarObras() {
        if (this.obras == null) {
            this.obras = new Array<Hechoinver>();
        }

        if (!this.editarObra) {
            this.obra.id = this.obras.length;
            if (this.obras.lastIndexOf(this.obra, 1) === -1) {
                this.obras.push(this.obra);
            }

        } else {
            const obraGuardada: Participa = this.obras.find((x) => x.id === this.obra.id);
            if (obraGuardada !== undefined) {
                const index = this.obras.indexOf(obraGuardada);
                this.obras[index] = this.obra;
            }
        }

        this.obra = new Hechoinver;
        this.displayObras = false;
        this.block = false;
        this.editarObra = false;
    }
    editarObras(obj: Hechoinver) {
        // this.obra = obj;

        this.obra.id = obj.id;
        this.obra.nFlgactivo = obj.nFlgactivo;
        this.obra.vDeshinve = obj.vDeshinve;
        this.obra.vTipohinv = obj.vTipohinv;

        this.block = true;
        this.displayObras = true;
        this.editarObra = true;
    }
    eliminarObras(obj: Hechoinver) {
        this.obras.splice(this.obras.indexOf(obj), 1);
    }
    validarObras(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.obra.vDeshinve === undefined || this.obra.vDeshinve === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar una Obra.' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    // Inversiones y Proyectos
    showInvProy() {
        this.block = true;
        this.displayInvProy = true;
        this.editarInv = false;
    }
    cancelarInvProy() {
        this.proyecto = new Hechoinver;
        this.displayInvProy = false;
        this.block = false;
        this.editarInv = false;
    }
    guardarInvProy() {
        if (this.proyectos == null) {
            this.proyectos = new Array<Hechoinver>();
        }

        if (!this.editarInv) {
            this.proyecto.id = this.proyectos.length;
            if (this.proyectos.lastIndexOf(this.proyecto, 1) === -1) {
                this.proyectos.push(this.proyecto);
            }

        } else {
            const proyectoGuardado: Participa = this.proyectos.find((x) => x.id === this.proyecto.id);
            if (proyectoGuardado !== undefined) {
                const index = this.proyectos.indexOf(proyectoGuardado);
                this.proyectos[index] = this.proyecto;
            }
        }

        this.proyecto = new Hechoinver;
        this.displayInvProy = false;
        this.block = false;
        this.editarInv = false;
    }
    editarInvProy(obj: Hechoinver) {
        // this.proyecto = obj;

        this.proyecto.id = obj.id;
        this.proyecto.nFlgactivo = obj.nFlgactivo;
        this.proyecto.vDeshinve = obj.vDeshinve;
        this.proyecto.vTipohinv = obj.vTipohinv;

        this.displayInvProy = true;
        this.block = true;
        this.editarInv = true;
    }
    eliminarInvProy(obj: Hechoinver) {
        this.proyectos.splice(this.proyectos.indexOf(obj), 1);
    }
    validarInvProy(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.proyecto.vDeshinve === undefined || this.proyecto.vDeshinve === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar una Inversión o Proyecto.' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    // Router
    irPerfil3() {
        this.router.navigate(['./dictamenes/formulario-perfil3']);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

    irPerfil() {
        this.router.navigate(['./dictamenes/formulario-perfil/' + this.solicForm.nCodfperf]);
    }

    // Error
    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
