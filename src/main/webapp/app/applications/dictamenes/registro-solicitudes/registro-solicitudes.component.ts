import { Component, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { SolicitudService, Solicitud } from '../../../entities/solicitud/index';
import { UsusolService, Ususol } from '../../../entities/ususol/index';
import { FieldsetModule, Message, BlockableUI, ProgressBarModule } from 'primeng/primeng';
import { Empresa } from '../../general/servicesmodel/empresa.model';
import { Persona } from '../../general/servicesmodel/persona.model';
import { RegistroSolicitudesService } from './index';
import { Organizacio } from '../../../entities/organizacio/index';
import { Usuario } from '../../../entities/usuario/index';
import { Pernatural } from '../../../entities/pernatural/index';
import { DatePipe } from '@angular/common';
import { UsusolId } from '../../../entities/ususol/ususolid.model';
import { Formperfil, FormperfilService } from '../../../entities/formperfil/index';
import { SolicformService, Solicform } from '../../../entities/solicform/index';

@Component({
    selector: 'jhi-registro-solicitudes',
    templateUrl: './registro-solicitudes.component.html',
    styleUrls: ['registro-solicitudes.scss']
})

export class RegistroSolicitudesComponent implements OnInit, OnDestroy, BlockableUI {
    currentAccount: Account;
    eventSubscriber: Subscription;
    display: boolean
    rucSearch: string;
    razonSocialSearch: string;

    @ViewChild('pnldialog') pnldialog;

    block: boolean;
    blockDialog: boolean;
    editar: boolean;
    displayEliminar: boolean;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    // Solicitudes
    listaSolicitudes: Solicitud[];
    solicitudTemporal: Solicitud;

    empresa: Empresa;
    arbitro: Empresa;
    sindicato: Organizacio;
    // coordinador: Usuario;

    nombreArbitro: string;
    nombreEmpresa: string;
    nombreSindicato: string;
    // nombreCoordinador: string;

    numdoc: string;

    // Usuario Solicitud
    tipoUsuario = 'ADMINISTRADOR';

    vigenciaInicio: any;
    vigenciaFinal: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal,
        private router: Router,
        private solicitudService: SolicitudService,
        private ususolService: UsusolService,
        private registroSolicitudesService: RegistroSolicitudesService,
        private formperfilService: FormperfilService,
        private solicformService: SolicformService,
        private datepipe: DatePipe,
    ) { }

    loadAll() {
        this.obtenerListaSolicitud();
    }

    ngOnInit() {
        this.loadAll();
        this.block = false;
        this.editar = false;
        this.displayEliminar = false;
        this.blockDialog = false;
        this.rucSearch = '';
        this.razonSocialSearch = '';
        this.display = false;
        this.arbitro = new Empresa;
        this.empresa = new Empresa;
        this.sindicato = new Organizacio;

        // this.coordinador.pernatural = new Pernatural;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() { }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    buscarSolicitudes() {
        this.block = true;
        this.solicitudService.buscarSolicitudes(this.rucSearch, this.razonSocialSearch).subscribe(
            (res: ResponseWrapper) => this.listaSolicitudes = res.json,
            (res: ResponseWrapper) => this.onError(res.json),
        );
        this.block = false;
    }

    obtenerListaSolicitud() {
        this.solicitudService.obtenerlistaSolicitudes().subscribe(
            (res: ResponseWrapper) => {
                this.listaSolicitudes = res.json
                for (let i = 0; i < this.listaSolicitudes.length; i++) {
                    this.ususolService.obtenerUsuarioPorTipo(this.listaSolicitudes[i].nCodsolic, 'CO').subscribe(
                        (ususol) => {
                            if (ususol !== undefined && ususol !== null) {
                                this.listaSolicitudes[i].vNombres = ususol.vNombres;
                            }
                        }
                    );
                }
            },
            (res: ResponseWrapper) => this.onError(res.json),
        );
    }

    buscarSindicato() {
        this.messageList = [];
        this.messagesForm = [];
        this.blockDialog = true;

        // DNI
        if (this.sindicato.cDesdocruc !== undefined
            && this.sindicato.cDesdocruc !== null
            && this.sindicato.cDesdocruc !== '') {
            this.registroSolicitudesService.obtenerSindicato(this.sindicato.cDesdocruc)
                .subscribe(
                (res: ResponseWrapper) => {
                    if (res.json[0] !== null && res.json[0] !== undefined && res.json[0] !== []) {
                        this.sindicato = <Organizacio>res.json[0];
                        if (this.sindicato.vDesorgani !== undefined && this.sindicato.vDesorgani !== null) {
                            this.nombreSindicato = this.sindicato.vDesorgani.toString().trim();
                        } else {
                            this.sindicato = new Organizacio();
                            this.messageList.push({
                                severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                    'datos con el RUC ' + this.sindicato.vDesorgani + '.'
                            });
                            this.onErrorMultiple(this.messageList);
                        }
                    } else {
                        this.sindicato = new Organizacio();
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el RUC ' + this.sindicato.vDesorgani + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                    this.blockDialog = false;

                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            console.log('entro 6');
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el número de documento del Sindicato.' });
            this.onErrorMultiple(this.messageList);
            this.blockDialog = false;

        }

    }

    /*buscarCoordinador() {
        this.messageList = [];
        this.messagesForm = [];
        // DNI
        if (this.numdoc !== undefined
            && this.numdoc !== null
            && this.numdoc !== '') {
            this.registroSolicitudesService.obtenerCoordinador(this.numdoc)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.coordinador = <Usuario>res.json[0];
                    if (this.coordinador.pernatural !== undefined && this.coordinador.pernatural !== null) {
                        const obj: Pernatural = (<Pernatural>this.coordinador.pernatural);
                        this.nombreCoordinador = obj.vApepat + ' ' + obj.vApemat + ' ' + obj.vNombres;
                    } else {
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el DNI ' + this.arbitro.ddp_numruc + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el número de documento del Coordinador.' });
            this.onErrorMultiple(this.messageList);
        }

    }*/

    buscarArbitroRuc() {
        this.messageList = [];
        this.messagesForm = [];
        this.blockDialog = true;
        // DNI
        if (this.arbitro.ddp_numruc !== undefined
            && this.arbitro.ddp_numruc !== null
            && this.arbitro.ddp_numruc !== '') {
            this.registroSolicitudesService.obtenerDatosGenerales(this.arbitro.ddp_numruc)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.arbitro = <Empresa>res.json[0];
                    if (this.arbitro.ddp_nombre !== undefined && this.arbitro.ddp_nombre !== null) {
                        this.nombreArbitro = this.arbitro.ddp_nombre.toString().trim();
                    } else {
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el RUC ' + this.arbitro.ddp_numruc + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                    this.blockDialog = false;
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el número de documento del Árbitro.' });
            this.onErrorMultiple(this.messageList);
            this.blockDialog = false;
        }
    }

    buscarEmpresaRuc() {
        this.messageList = [];
        this.messagesForm = [];
        this.blockDialog = true;
        // RUC
        if (this.empresa.ddp_numruc !== undefined
            && this.empresa.ddp_numruc !== null
            && this.empresa.ddp_numruc !== '') {
            this.registroSolicitudesService.obtenerDatosGenerales(this.empresa.ddp_numruc)
                .subscribe(
                (res: ResponseWrapper) => {
                    this.empresa = <Empresa>res.json[0];
                    if (this.empresa.ddp_nombre !== undefined && this.empresa.ddp_nombre !== null) {
                        this.nombreEmpresa = this.empresa.ddp_nombre.toString().trim();
                    } else {
                        this.messageList.push({
                            severity: 'error', summary: 'Mensaje de Error', detail: 'No se encontraron ' +
                                'datos con el RUC ' + this.empresa.ddp_numruc + '.'
                        });
                        this.onErrorMultiple(this.messageList);
                    }
                    this.blockDialog = false;
                },
                (res: ResponseWrapper) => this.onError(res.json),
            );
        } else {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Ingresar el número de documento de la Empresa.' });
            this.onErrorMultiple(this.messageList);
            this.blockDialog = false;
        }
    }

    mostrarModalRegistro() {
        this.display = true;
    }

    mostrarModalEliminar(obj: Solicitud) {
        this.displayEliminar = true;
        this.solicitudTemporal = new Solicitud();
        this.solicitudTemporal.nCodsolic = obj.nCodsolic;
    }

    // Unidad de Negocio
    showUnidad() {
        this.block = true;
        this.display = true;
        this.editar = false;
    }
    cancelarUnidad() {
        this.block = false;
        this.display = false;
        this.editar = false;
    }
    /*guardarUnidad() {
        if (this.validarUnidad()) {
            if (!this.editar) {

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
            this.display = false;
            this.block = false;
            this.editar = false;
        }
    }*/
    mostrareditar(obj: Solicitud) {
        this.solicitudTemporal = new Solicitud();
        this.solicitudTemporal.nCodsolic = obj.nCodsolic;
        this.display = true;
        this.editar = true;
    }

    eliminarSolicitud() {
        this.solicitudService.eliminarSolicitud(this.solicitudTemporal.nCodsolic).subscribe(
            (res: ResponseWrapper) => {
                this.obtenerListaSolicitud();
            },
            (res: ResponseWrapper) => this.onError(res.json),
        );
        this.displayEliminar = false;
        this.solicitudTemporal = new Solicitud();
    }

    /*validarUnidad(): boolean {
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
    }*/

    guardarSolicitud() {
        this.messageList = [];
        this.messagesForm = [];
        if (this.validarDatos()) {
            this.blockDialog = true;

            // Solicitud
            const solicitud: Solicitud = new Solicitud;

            solicitud.vFlgest = 'P';
            solicitud.vArbitro = this.nombreArbitro;
            solicitud.vSindicato = this.nombreSindicato;
            solicitud.vEmpleador = this.nombreEmpresa;
            solicitud.vSolicita = this.nombreSindicato;
            solicitud.nFlgactivo = true;
            solicitud.nSedereg = 0;
            solicitud.vUsuareg = 'UsuarioReg1'
            solicitud.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
            solicitud.tFecsolic = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
            solicitud.tFecvigde = this.datepipe.transform(this.vigenciaInicio, 'yyyy-MM-dd HH:mm:ss');
            solicitud.tFecvigha = this.datepipe.transform(this.vigenciaFinal, 'yyyy-MM-dd HH:mm:ss');
            solicitud.vRegistro = this.empresa.ddp_numreg;
            solicitud.vRucsol = this.empresa.ddp_numruc;
            solicitud.vVoucher = '';

            this.solicitudService.create(solicitud).subscribe(
                (sol: Solicitud) => {
                    // Creacion de Formulario Perfil
                    const fp: Formperfil = new Formperfil;
                    fp.nFlgactivo = true;
                    fp.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    fp.nSedereg = 0;
                    fp.vUsuareg = 'UsuarioReg1';
                    this.formperfilService.create(fp).subscribe(
                        (formPerfil) => {
                            const solicForm: Solicform = new Solicform;
                            solicForm.nCodsolic = sol.nCodsolic;
                            solicForm.nCodfperf = formPerfil.nCodfperf;
                            solicForm.nFlgactivo = true;
                            solicForm.nFlgoblig = true;
                            solicForm.vFlgest = 'P';
                            solicForm.vNomform = 'Formulario Perfil';
                            solicForm.vTipoform = 'G';
                            solicForm.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                            solicForm.nSedereg = 0;
                            solicForm.vUsuareg = 'UsuarioReg1';
                            this.solicformService.create(solicForm).subscribe();
                        },
                    );
                    // Empresa
                    const e: Ususol = new Ususol;
                    const eid: UsusolId = new UsusolId;

                    eid.vCodusu = this.empresa.ddp_numruc;
                    eid.nCodsolic = sol.nCodsolic;
                    e.vNombres = this.nombreEmpresa;
                    e.vTipousu = 'EM';
                    e.ususolId = eid;
                    e.vUsuareg = 'UsuarioReg1';
                    e.nSedereg = 0;
                    e.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    this.ususolService.create(e).subscribe();

                    // Sindicato
                    const u: Ususol = new Ususol;
                    const uid: UsusolId = new UsusolId;

                    uid.vCodusu = this.sindicato.cDesdocruc;
                    uid.nCodsolic = sol.nCodsolic;
                    u.vNombres = this.nombreSindicato;
                    u.vTipousu = 'SI';
                    u.ususolId = uid;
                    u.vUsuareg = 'UsuarioReg1';
                    u.nSedereg = 0;
                    u.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    this.ususolService.create(u).subscribe();

                    if (this.nombreArbitro !== '' || this.nombreArbitro !== undefined || this.nombreArbitro !== null) {
                        // Arbitro
                        const a: Ususol = new Ususol;
                        const aid: UsusolId = new UsusolId;

                        aid.vCodusu = this.arbitro.ddp_numruc;
                        aid.nCodsolic = sol.nCodsolic;
                        a.vNombres = this.nombreArbitro;
                        a.vTipousu = 'AR';
                        a.ususolId = aid;
                        a.vUsuareg = 'UsuarioReg1';
                        a.nSedereg = 0;
                        a.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                        this.ususolService.create(a).subscribe();
                    }

                    /*
                    // Coordinador
                    const c: Ususol = new Ususol;
                    const cid: UsusolId = new UsusolId;

                    // Buscar conexion entre arbitro y usuario
                    cid.vCodusu = this.arbitro.ddp_numruc;
                    cid.nCodsolic = sol.nCodsolic;

                    c.vNombres = this.nombreCoordinador;
                    c.vTipousu = 'CO';
                    c.ususolId = cid;
                    c.vUsuareg = 'UsuarioReg1';
                    c.nSedereg = 0;
                    c.tFecreg = this.datepipe.transform((new Date), 'yyyy-MM-dd HH:mm:ss');
                    this.ususolService.create(c).subscribe();*/
                    this.empresa = new Empresa;
                    this.sindicato = new Organizacio;
                    this.arbitro = new Empresa;
                    this.obtenerListaSolicitud();
                    this.blockDialog = false;

                },
            );
            this.blockDialog = false;
            this.display = false;

        }
    }

    validarDatos(): boolean {
        let messagesForm: Message[] = [];
        let messageList: any = [];
        let error: boolean;

        if ((this.nombreSindicato === undefined || this.nombreSindicato === null || this.nombreSindicato === '')
            || (this.sindicato.cDesdocruc === undefined || this.sindicato.cDesdocruc === null || this.sindicato.cDesdocruc === '')) {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de ruc del Sindicato.' });
            error = false;
        } else if ((this.nombreEmpresa === undefined || this.nombreEmpresa === null || this.nombreEmpresa === '')
            || (this.empresa.ddp_numruc === undefined || this.empresa.ddp_numruc === null || this.empresa.ddp_numruc === '')) {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el numero de ruc de la Empresa.' });
            error = false;
        } else if (this.vigenciaInicio === undefined || this.vigenciaInicio === null || this.vigenciaInicio === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la Vigencia Inicial' });
            error = false;
        } else if (this.vigenciaFinal === undefined || this.vigenciaFinal === null || this.vigenciaFinal === '') {
            messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la Vigencia Final' });
            error = false;
        } else {
            messageList = [];
            messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(messageList);
        return error;
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    getBlockableElement(): HTMLElement {
        throw new Error('Method not implemented.');
    }
}
