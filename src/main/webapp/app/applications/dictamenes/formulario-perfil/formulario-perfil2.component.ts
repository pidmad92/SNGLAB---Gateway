import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { ActivatedRoute, Router } from '@angular/router';
import { TabViewModule, MultiSelectModule } from 'primeng/primeng';
import { Solicitud, SolicitudService } from '../../../entities/solicitud/index';
import { Solicform, SolicformService } from '../../../entities/solicform/index';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Direccion, DireccionService } from '../../../entities/direccion/index';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { Message } from 'primeng/components/common/api';
import { ComboModel } from '../../general/combobox.model';
import { Tipdoc, TipdocService } from '../../../entities/tipdoc/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { FormularioPerfilService } from './index';
import { Persona } from '../../general/servicesmodel/persona.model';
import { CarnetExtranjeria } from '../../general/servicesmodel/carnetextranjeria.model';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService } from '../../../entities/anexlaboral/index';
import { DatePipe } from '@angular/common';
import { ReglaboralService, Reglaboral } from '../../../entities/reglaboral/index';
import { Formulario } from './formulario.model';
import { FormGroup } from '@angular/forms';
import { PerreglabService } from '../../../entities/perreglab/index';

@Component({
    selector: 'jhi-formulario-perfil2',
    templateUrl: './formulario-perfil2.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfil2Component implements OnInit, OnDestroy {
    currentAccount: Account;
    eventSubscriber: Subscription;
    subscription: Subscription;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Variables de edicion y bloqueo
    block: boolean;
    editarUnd: boolean;
    editarAccion: boolean;
    editarMercado: boolean;
    editarObra: boolean;
    editarInv: boolean;

    // Combos de Sector, Plan Contable y Tipo Documento
    sector: ComboModel[];
    planContable: ComboModel[];
    regimenLaboral: ComboModel[];
    tipodocs: ComboModel[];

    // Seleccion de Sector, Plan Contable y Tipo Documento
    selectedSector: ComboModel;
    selectedPlan: ComboModel;
    selectedDoc: ComboModel;
    @LocalStorage('regimenLaboral')
    selectedRegimen: ComboModel[];

    // Flags de dialogs
    displayUnidad: boolean;
    displayPartiAccionaria: boolean;
    displayPartiMercado: boolean;
    displayObras: boolean;
    displayInvProy: boolean;
    displayGuardar: boolean;

    // Datos de Perfil
    @LocalStorage('solicitud')
    solicitud: Solicitud;
    @LocalStorage('solicform')
    solicForm: Solicform;
    @LocalStorage('formperfil')
    formPerfil: Formperfil;

    // Listados de dato
    @LocalStorage('undNegocios')
    undNegocios: Undnegocio[];
    @LocalStorage('participacionesAccionarias')
    participacionesAccionarias: Participa[];
    @LocalStorage('participacionesMercado')
    participacionesMercados: Participa[];
    @LocalStorage('obras')
    obras: Hechoinver[];
    @LocalStorage('proyectos')
    proyectos: Hechoinver[];
    @LocalStorage('direcciones')
    direcciones: Direccion[];
    @LocalStorage('solicitante')
    solicitante: Negocolect;
    @LocalStorage('organizaciones')
    organizaciones: Negocolect[];
    @LocalStorage('resultadoNegociaciones')
    resultadoNegociaciones: Resulnegoc[];
    @LocalStorage('responInfoFinanciera')
    responInfoFinanciera: Respinforma;
    @LocalStorage('responeInfoLaboral')
    responeInfoLaboral: Respinforma;
    @LocalStorage('anexoLaboral')
    formulario: Formulario[];

    // Flags de Inicio
    @LocalStorage('inicioUnidad')
    inicioUnidad: boolean;
    @LocalStorage('inicioAccionaria')
    inicioAccionaria: boolean;
    @LocalStorage('inicioMercado')
    inicioMercado: boolean;
    @LocalStorage('inicioObra')
    inicioObra: boolean;
    @LocalStorage('inicioProyecto')
    inicioProyecto: boolean;

    // Objetos CUD
    undNegocio: Undnegocio;
    participacionAccionaria: Participa;
    participacionMercado: Participa;
    obra: Hechoinver;
    proyecto: Hechoinver;
    empresa: Empresa;
    persona: Persona;
    carnetExtranjeria: CarnetExtranjeria;

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
        private direccionService: DireccionService,
        private undnegocioService: UndnegocioService,
        private participaService: ParticipaService,
        private hechoinverService: HechoinverService,
        private negocolectService: NegocolectService,
        private resulnegocService: ResulnegocService,
        private respinformaService: RespinformaService,
        private anexlaboralService: AnexlaboralService,
        private formularioPerfilService: FormularioPerfilService,
        private reglaboralService: ReglaboralService,
        private perreglabService: PerreglabService,
        private datepipe: DatePipe,
    ) { }

    ngOnInit() {
        this.inicializarVariables();
        this.loadAll();
    }

    inicializarVariables() {
        // Iniciar Combos
        this.sector = [];
        this.sector.push(new ComboModel('Privado', '1', 0));
        this.sector.push(new ComboModel('Público', '2', 0));
        this.sector.push(new ComboModel('Otros', '3', 0));

        this.selectedSector = new ComboModel('Privado', '1', 0);

        // Iniciar Combos
        this.planContable = [];
        this.planContable.push(new ComboModel('Plan Contable General Empresarial-PCGE', 'PCGE', 0));
        this.planContable.push(new ComboModel('Plan Contable del Sistema Financiero-PCSF', 'PCSF', 0));
        this.planContable.push(new ComboModel('Plan Contable Gubernamental-PCG', 'PCG', 0));

        this.selectedPlan = new ComboModel('Plan Contable General Empresarial-PCGE', 'PCGE', 0);

        this.regimenLaboral = new Array<ComboModel>();
        this.obtenerRegLaboral();

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
        this.displayGuardar = false;

        this.undNegocio = new Undnegocio;
        this.participacionAccionaria = new Participa;
        this.participacionMercado = new Participa;
        this.obra = new Hechoinver;
        this.proyecto = new Hechoinver;

        if (this.formPerfil.vSector === undefined || this.formPerfil.vSector === null) {
            this.formPerfil.vSector = this.sector[0].value;
        }

        if (this.formPerfil.vPlancont === undefined || this.formPerfil.vPlancont === null) {
            this.formPerfil.vPlancont = this.planContable[0].value;
        }

        this.inicioAccionaria = this.iniciarFlags(this.inicioAccionaria);
        this.inicioMercado = this.iniciarFlags(this.inicioMercado);
        this.inicioObra = this.iniciarFlags(this.inicioObra);
        this.inicioProyecto = this.iniciarFlags(this.inicioProyecto);
    }

    iniciarFlags(flg: boolean): boolean {
        if (flg === null || flg === undefined) {
            flg = true;
        } else {
            flg = false;
        }
        return flg;
    }

    onChangeSector() {
        this.obtenerRegLaboral();
    }

    obtenerRegLaboral() {
        switch (this.selectedSector.value) {
            case '1':
                this.reglaboralService.obtenerRegimenesLaboralesPrivado().subscribe(
                    (res: ResponseWrapper) => {
                        this.regimenLaboral = [];
                        const obj: Reglaboral[] = res.json;
                        for (let i = 0; i < obj.length; i++) {
                            this.regimenLaboral.push(new ComboModel(obj[i].vDesabrreg, obj[i].nCodreglab.toString(), 0));
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
                break;
            case '2':
                this.reglaboralService.obtenerRegimenesLaboralesPublico().subscribe(
                    (res: ResponseWrapper) => {
                        this.regimenLaboral = [];
                        const obj: Reglaboral[] = res.json;
                        for (let i = 0; i < obj.length; i++) {
                            this.regimenLaboral.push(new ComboModel(obj[i].vDesabrreg, obj[i].nCodreglab.toString(), 0));
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
                break;
            case '3':
                this.reglaboralService.obtenerRegimenesLaboralesOtros().subscribe(
                    (res: ResponseWrapper) => {
                        this.regimenLaboral = [];
                        const obj: Reglaboral[] = res.json;
                        for (let i = 0; i < obj.length; i++) {
                            this.regimenLaboral.push(new ComboModel(obj[i].vDesabrreg, obj[i].nCodreglab.toString(), 0));
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
                break;
            default: break;
        }
    }

    loadAll() {
        this.load(this.solicForm.nCodfperf);
    }

    load(nCodfperf) {

        // Inicializacion de listados
        if (this.inicioUnidad) {
            this.undNegocios = new Array<Undnegocio>();
            this.undnegocioService.obtenerUnidadNegocio(nCodfperf).subscribe(
                (res: ResponseWrapper) => {
                    if (this.undNegocios.length === 0 && this.inicioUnidad) {
                        this.undNegocios = res.json;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        if (this.inicioAccionaria) {
            this.participacionesAccionarias = new Array<Participa>();
            this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'A').subscribe(
                (res: ResponseWrapper) => {
                    if (this.participacionesAccionarias.length === 0 && this.inicioAccionaria) {
                        this.participacionesAccionarias = res.json;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        if (this.inicioMercado) {
            this.participacionesMercados = new Array<Participa>();
            this.participaService.obtenerParticipacionPorTipo(nCodfperf, 'M').subscribe(
                (res: ResponseWrapper) => {
                    if (this.participacionesMercados.length === 0 && this.inicioMercado) {
                        this.participacionesMercados = res.json;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        if (this.inicioObra) {
            this.obras = new Array<Hechoinver>();
            this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'H').subscribe(
                (res: ResponseWrapper) => {
                    if (this.obras.length === 0 && this.inicioObra) {
                        this.obras = res.json;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        if (this.inicioProyecto) {
            this.proyectos = new Array<Hechoinver>();
            this.hechoinverService.obtenerHechoInversionPorTipo(nCodfperf, 'I').subscribe(
                (res: ResponseWrapper) => {
                    if (this.proyectos.length === 0 && this.inicioProyecto) {
                        this.proyectos = res.json;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        this.formularioPerfilService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.block = false;
                if (this.tipodocs != null && this.selectedDoc !== undefined) {
                    this.selectedDoc = this.tipodocs[0];
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
        );
    }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (event.charCode === 46) {
            // Check if the text already contains the . character
            if (this.participacionAccionaria.nPorcasig.toString().indexOf('.') !== -1) {
                event.preventDefault();
            }
        } else if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    actualizarPorcetanje(event: any) { }

    asignarTipoDocAccionaria() {
        this.participacionAccionaria.vRazonsoc = '';
        this.participacionAccionaria.vTipodoc = this.selectedDoc.name;
        this.participacionAccionaria.vCodTipodoc = this.selectedDoc.value;
    }

    asignarTipoDocMercado() {
        this.participacionMercado.vRazonsoc = '';
        this.participacionMercado.vTipodoc = this.selectedDoc.name;
        this.participacionMercado.vCodTipodoc = this.selectedDoc.value;
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
        this.selectedDoc = this.tipodocs[0];
        this.participacionAccionaria.vTipodoc = this.selectedDoc.name;
        this.participacionAccionaria.vCodTipodoc = this.selectedDoc.value
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
                this.participacionAccionaria.vTipodoc = this.selectedDoc.name;
                this.participacionAccionaria.vCodTipodoc = this.selectedDoc.value;
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
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el porcetaje asignado' });
            error = false;
        } else if (this.participacionAccionaria.nPorcasig !== undefined && this.participacionAccionaria.nPorcasig !== null) {

            if (this.participacionAccionaria.nPorcasig <= 10) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado debe ser mayor a 10%' });
                error = false;
            } else if (this.participacionAccionaria.nPorcasig > 100) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado máximo es 100%' });
                error = false;
            } else {
                this.messageList = [];
                this.messagesForm = [];
                error = true;
            }

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
        this.selectedDoc = this.tipodocs[0];
        this.participacionMercado.vTipodoc = this.selectedDoc.name;
        this.participacionMercado.vCodTipodoc = this.selectedDoc.value
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
                this.participacionMercado.vTipodoc = this.selectedDoc.name;
                this.participacionMercado.vCodTipodoc = this.selectedDoc.value;
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
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el porcetaje asignado' });
            error = false;
        } else if (this.participacionMercado.nPorcasig !== undefined && this.participacionMercado.nPorcasig !== null) {

            if (this.participacionMercado.nPorcasig <= 10) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado debe ser mayor a 10%' });
                error = false;
            } else if (this.participacionMercado.nPorcasig > 100) {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'El porcentaje asignado máximo es 100%' });
                error = false;
            } else {
                this.messageList = [];
                this.messagesForm = [];
                error = true;
            }

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

    buscarNombrePorDocumentoAccionaria() {
        this.messageList = [];
        this.messagesForm = [];
        if (this.selectedDoc.value === '2') {
            // RUC
            this.empresa = new Empresa;
            if (this.participacionAccionaria.vNumdocum !== undefined
                && this.participacionAccionaria.vNumdocum !== null
                && this.participacionAccionaria.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosGenerales(this.participacionAccionaria.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.empresa = <Empresa>res.json[0];
                        if (this.empresa.ddp_nombre !== undefined && this.empresa.ddp_nombre !== null) {
                            this.participacionAccionaria.vRazonsoc = this.empresa.ddp_nombre;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos con el RUC ' + this.participacionAccionaria.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el RUC de la Participacion Accionaria.' });
                this.onErrorMultiple(this.messageList);
            }
        } else if (this.selectedDoc.value === '1') {
            // DNI
            this.persona = new Persona;
            if (this.participacionAccionaria.vNumdocum !== undefined
                && this.participacionAccionaria.vNumdocum !== null
                && this.participacionAccionaria.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosReniec(this.participacionAccionaria.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.persona = <Persona>res.json[0];
                        if (this.persona.nombres !== undefined && this.persona.nombres !== null) {
                            this.participacionAccionaria.vRazonsoc = this.persona.apellidoPaterno + ' ' + this.persona.apellidoMaterno + ' ' + this.persona.nombres;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos con el DNI ' + this.participacionAccionaria.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el DNI del Participante Accionario.' });
                this.onErrorMultiple(this.messageList);
            }
        } else if (this.selectedDoc.value === '4') {
            // PASAPORTE
        } else if (this.selectedDoc.value === '3') {
            // CARNET EXTRANJERIA
            this.carnetExtranjeria = new CarnetExtranjeria;
            if (this.participacionAccionaria.vNumdocum !== undefined
                && this.participacionAccionaria.vNumdocum !== null
                && this.participacionAccionaria.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosMigracion(this.participacionAccionaria.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.carnetExtranjeria = <CarnetExtranjeria>res.json[0];
                        if (this.carnetExtranjeria.strNombres !== undefined && this.carnetExtranjeria.strNombres !== null) {
                            this.participacionAccionaria.vRazonsoc = this.carnetExtranjeria.strPrimerApellido + ' ' +
                                this.carnetExtranjeria.strSegundoApellido + ' ' + this.carnetExtranjeria.strNombres;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos del Carnet de Extranjeria ' + this.participacionAccionaria.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el numero de Carnet de Extranjeria de la Participacion Accionaria.' });
                this.onErrorMultiple(this.messageList);
            }
        }
    }

    buscarNombrePorDocumentoMercado() {
        this.messageList = [];
        this.messagesForm = [];
        if (this.selectedDoc.value === '2') {
            // RUC
            this.empresa = new Empresa;
            if (this.participacionMercado.vNumdocum !== undefined
                && this.participacionMercado.vNumdocum !== null
                && this.participacionMercado.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosGenerales(this.participacionMercado.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.empresa = <Empresa>res.json[0];
                        if (this.empresa.ddp_nombre !== undefined && this.empresa.ddp_nombre !== null) {
                            this.participacionMercado.vRazonsoc = this.empresa.ddp_nombre;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos con el RUC ' + this.participacionMercado.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el RUC de la Participacion Accionaria.' });
                this.onErrorMultiple(this.messageList);
            }
        } else if (this.selectedDoc.value === '1') {
            // DNI
            this.persona = new Persona;
            if (this.participacionMercado.vNumdocum !== undefined
                && this.participacionMercado.vNumdocum !== null
                && this.participacionMercado.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosReniec(this.participacionMercado.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.persona = <Persona>res.json[0];
                        if (this.persona.nombres !== undefined && this.persona.nombres !== null) {
                            this.participacionMercado.vRazonsoc = this.persona.apellidoPaterno + ' ' + this.persona.apellidoMaterno + ' ' + this.persona.nombres;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos con el DNI ' + this.participacionMercado.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el DNI del Participante Accionario.' });
                this.onErrorMultiple(this.messageList);
            }
        } else if (this.selectedDoc.value === '4') {
            // PASAPORTE
        } else if (this.selectedDoc.value === '3') {
            // CARNET EXTRANJERIA
            this.carnetExtranjeria = new CarnetExtranjeria;
            if (this.participacionMercado.vNumdocum !== undefined
                && this.participacionMercado.vNumdocum !== null
                && this.participacionMercado.vNumdocum !== '') {
                this.formularioPerfilService.obtenerDatosMigracion(this.participacionMercado.vNumdocum)
                    .subscribe(
                    (res: ResponseWrapper) => {
                        this.carnetExtranjeria = <CarnetExtranjeria>res.json[0];
                        if (this.carnetExtranjeria.strNombres !== undefined && this.carnetExtranjeria.strNombres !== null) {
                            this.participacionMercado.vRazonsoc = this.carnetExtranjeria.strPrimerApellido + ' ' +
                                this.carnetExtranjeria.strSegundoApellido + ' ' + this.carnetExtranjeria.strNombres;
                        } else {
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos del Carnet de Extranjeria ' + this.participacionMercado.vNumdocum + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json),
                );
            } else {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el numero de Carnet de Extranjeria de la Participacion Accionaria.' });
                this.onErrorMultiple(this.messageList);
            }
        }
    }

    guardarFormularioPerfil() {
        if (this.solicitud !== undefined && this.solicForm !== undefined) {
            this.messagesForm = this.formularioPerfilService.validarDatosObligatorios(this.solicitud, this.formPerfil, this.obras, this.solicitante);
            if (this.messagesForm.length === 0) {
                this.formularioPerfilService.guardarFormularioPerfil(this.datepipe, this.solicitud, this.solicForm,
                    this.formPerfil, this.undNegocios, this.participacionesAccionarias, this.participacionesMercados,
                    this.obras, this.proyectos, this.direcciones, this.organizaciones, this.solicitante,
                    this.resultadoNegociaciones, this.responInfoFinanciera, this.responeInfoLaboral, this.formulario, this.selectedRegimen,
                    this.formperfilService, this.undnegocioService, this.participaService, this.hechoinverService,
                    this.direccionService, this.negocolectService, this.resulnegocService, this.respinformaService, this.anexlaboralService, this.perreglabService);
                this.router.navigate(['./dictamenes/control-informacion/' + this.solicitud.nCodsolic]);
            }
        }
    }

    mostrarGuardar() {
        this.displayGuardar = true;
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

    ngOnDestroy() { }
}
