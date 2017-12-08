import { Component, OnInit, OnDestroy, } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { SolicitudService, Solicitud } from '../../../entities/solicitud';
import { SolicformService, Solicform } from '../../../entities/solicform';
import { DireccionService, Direccion } from '../../../entities/direccion';
import { ActivatedRoute, Router } from '@angular/router';
import { Formperfil, FormperfilService } from '../../../entities/formperfil';
import { Actiecon, ActieconService } from '../../../entities/actiecon/index';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { ComboModel } from '../../general/combobox.model';
import { Message } from 'primeng/components/common/api';
import { ValidarUsuarioService } from '../../denuncias/validar-usuario/validarusuario.service';
import { Undnegocio, UndnegocioService } from '../../../entities/undnegocio/index';
import { Participa, ParticipaService } from '../../../entities/participa/index';
import { Hechoinver, HechoinverService } from '../../../entities/hechoinver/index';
import { Negocolect, NegocolectService } from '../../../entities/negocolect/index';
import { Resulnegoc, ResulnegocService } from '../../../entities/resulnegoc/index';
import { Respinforma, RespinformaService } from '../../../entities/respinforma/index';
import { ModelAnexo } from '../../../entities/anexlaboral/modelanexo.model';
import { AnexlaboralService } from '../../../entities/anexlaboral/index';
import { DatePipe } from '@angular/common';
import { FormularioPerfilService } from './index';

@Component({
    selector: 'jhi-formulario-perfil',
    templateUrl: './formulario-perfil.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfilComponent implements OnInit, OnDestroy {
    actiecon: Actiecon[];
    currentAccount: Account;
    eventSubscriber: Subscription;
    displayDireccion: boolean;
    direccionRegistro: Direccion;
    private subscription: Subscription;
    displayGuardar: boolean;

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;
    @LocalStorage('inicio')
    inicioDir: boolean;

    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];

    selectedDeparts: ComboModel;
    selectedProvins: ComboModel;
    selectedDistris: ComboModel;

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
    anexoLaboral: ModelAnexo[];

    constructor(
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
        private actieconService: ActieconService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private validarUsuarioService: ValidarUsuarioService,
        private datepipe: DatePipe,
        private formularioPerfilService: FormularioPerfilService,
    ) { }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    ngOnInit() {
        this.editar = false;
        this.block = false;
        this.departs = new Array<ComboModel>();
        this.provins = new Array<ComboModel>();
        this.distris = new Array<ComboModel>();
        this.displayDireccion = false;
        this.displayGuardar = false;
        this.direccionRegistro = new Direccion;
        this.iniciarDatos();
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() { }

    load(nCodfperf) {
        this.solicfromService.find(nCodfperf).subscribe((solicForm) => {
            this.solicForm = solicForm;
            const nCodsolic = solicForm.nCodsolic;

            if (this.solicitud === null) {
                // tslint:disable-next-line:no-shadowed-variable
                const nCodfperf = solicForm.nCodfperf;
                this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
                    this.solicitud = solicitud;
                });
            }
            if (this.formPerfil === null) {
                this.formperfilService.find(nCodfperf).subscribe((formPerfil) => {
                    this.formPerfil = formPerfil;
                    this.formPerfil.tFecreg = this.datepipe.transform((this.formPerfil.tFecreg), 'yyyy-MM-dd HH:mm:ss')
                });
            }
            this.direccionService.obtenerDireccion(nCodfperf).subscribe(
                (res: ResponseWrapper) => {
                    if (this.direcciones.length === 0 && this.inicioDir) {
                        this.direcciones = res.json;
                    } else {
                        /*const direccionesTmp: Direccion[] = res.json;
                        for (let i = 0; i < direccionesTmp.length; i++) {
                            const direccionGuardado: Direccion = this.direcciones.find((x) => x.nCoddirec === direccionesTmp[i].nCoddirec);
                            console.log('direccionGuardado: ' + direccionGuardado);
                            console.log('direccionesTmp[i].nCoddirec: ' + direccionesTmp[i].nCoddirec);
                            if (direccionGuardado === undefined || direccionGuardado === null) {
                                this.direcciones.push(direccionesTmp[i]);
                            }
                        }*/
                    }
                    for (let i = 0; i < this.direcciones.length; i++) {
                        this.direcciones[i].id = i;
                        this.direcciones[i].bNotifica = this.direcciones[i].nNotifica === 1 ? true : false;
                    }
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );

        });
        this.actieconService.query().subscribe(
            (res: ResponseWrapper) => this.actiecon = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    iniciarDatos() {
        if (this.undNegocios === undefined || this.undNegocios === null) {
            this.undNegocios = [];
        }
        if (this.participacionesAccionarias === undefined || this.participacionesAccionarias === null) {
            this.participacionesAccionarias = [];
        }
        if (this.participacionesMercados === undefined || this.participacionesMercados === null) {
            this.participacionesMercados = [];
        }
        if (this.obras === undefined || this.obras === null) {
            this.obras = [];
        }
        if (this.proyectos === undefined || this.proyectos === null) {
            this.proyectos = [];
        }
        if (this.direcciones === undefined || this.direcciones === null) {
            this.direcciones = [];
        }
        if (this.solicitante === undefined || this.solicitante === null) {
            this.solicitante = new Negocolect;
        }
        if (this.organizaciones === undefined || this.organizaciones === null) {
            this.organizaciones = [];
        }
        if (this.resultadoNegociaciones === undefined || this.resultadoNegociaciones === null) {
            this.resultadoNegociaciones = [];
        }
        if (this.responInfoFinanciera === undefined || this.responInfoFinanciera === null) {
            this.responInfoFinanciera = new Respinforma;
        }
        if (this.responeInfoLaboral === undefined || this.responeInfoLaboral === null) {
            this.responeInfoLaboral = new Respinforma;
        }
        if (this.anexoLaboral === undefined || this.anexoLaboral === null) {
            this.anexoLaboral = [];
        }
        if (this.inicioDir === null || this.inicioDir === undefined) {
            this.inicioDir = true;
        } else {
            this.inicioDir = false;
        }
    }

    // Solo numeros
    keyPress(event: any) {
        const pattern = /[0-9]/;
        const inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onChangeNotificacion(obj: Direccion) {
        if (obj.bNotifica) {
            obj.nNotifica = 1;
        } else {
            obj.nNotifica = 0;
        }
        const direccionGuardado: Direccion = this.direcciones.find((x) => x.id === obj.id);
        if (direccionGuardado !== undefined) {
            const index = this.direcciones.indexOf(direccionGuardado);
            this.direcciones[index] = obj;
        }
    }

    onChangeDepartamento() {
        this.block = true;
        this.messageList = [];
        this.messagesForm = [];
        if (this.selectedDeparts === undefined) {
            this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un departamento' }]);
            this.block = false;
        } else {
            this.validarUsuarioService.consultaProvs(this.selectedDeparts.value).subscribe(
                (tprovs: ResponseWrapper) => {
                    this.provins = [];
                    // tslint:disable-next-line:forin
                    for (const i in tprovs) {
                        this.provins.push(new ComboModel(tprovs[i].vDespro, tprovs[i].vCodpro, 0));
                    }
                    this.block = false;
                },
                (tprovs: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: tprovs.json }]); this.block = false; }
            );
        }
        this.selectedProvins = undefined;
        this.selectedDistris = undefined;
    }

    onChangeProvincia() {
        this.block = true;
        this.messageList = [];
        this.messagesForm = [];
        if (this.selectedDeparts === undefined) {
            this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un departamento' }]);
            this.block = false;
        } else if (this.selectedProvins === undefined) {
            this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar una provincia' }]);
            this.block = false;
        } else {
            this.validarUsuarioService.consultaDists(this.selectedDeparts.value, this.selectedProvins.value).subscribe(
                (tdists: ResponseWrapper) => {
                    this.distris = [];
                    // tslint:disable-next-line:forin
                    for (const i in tdists) {
                        this.distris.push(new ComboModel(tdists[i].vDesdis, tdists[i].vCoddis, 0));
                    }
                    this.block = false;
                },
                (tdists: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: tdists.json }]); this.block = false; }
            );
        }
        this.selectedDistris = undefined;
    }

    showDialogDireccion() {
        this.messageList = [];
        this.messagesForm = [];
        this.editar = false;
        this.validarUsuarioService.consultaDepas().subscribe(
            (deps: any) => {
                this.departs = [];
                // tslint:disable-next-line:forin
                for (const i in deps) {
                    this.departs.push(new ComboModel(deps[i].vDesdep, deps[i].vCoddep, 0));
                }
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: res.json }]); this.block = false; }
        );
        this.selectedDeparts = undefined;
        this.selectedProvins = undefined;
        this.selectedDistris = undefined;
        this.displayDireccion = true;
    }
    guardarDireccion() {

        if (this.validarDireccion()) {
            this.direccionRegistro.vDepart = this.selectedDeparts.name;
            this.direccionRegistro.vCodDepa = this.selectedDeparts.value;

            this.direccionRegistro.vProvincia = this.selectedProvins.name;
            this.direccionRegistro.vCodProv = this.selectedProvins.value;

            this.direccionRegistro.vDistrito = this.selectedDistris.name;
            this.direccionRegistro.vCodDist = this.selectedDistris.value;

            if (!this.editar) {
                this.direccionRegistro.id = this.direcciones.length;
                if (this.direcciones.lastIndexOf(this.direccionRegistro, 1) === -1) {
                    this.direcciones.push(this.direccionRegistro);
                }
            } else {
                const direccionGuardado: Direccion = this.direcciones.find((x) => x.id === this.direccionRegistro.id);
                if (direccionGuardado !== undefined) {
                    const index = this.direcciones.indexOf(direccionGuardado);
                    this.direcciones[index] = this.direccionRegistro;
                }

            }

            this.direccionRegistro = new Direccion;
            this.displayDireccion = false;
        }
    }

    validarDireccion(): boolean {
        let error: boolean;
        this.messageList = [];
        this.messagesForm = [];
        if (this.selectedDeparts === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un Departamento.' });
            error = false;
        } else if (this.selectedProvins === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar una Provincia.' });
            error = false;
        } else if (this.selectedDistris === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un Distrito.' });
            error = false;
        } else if (this.direccionRegistro.vDireccion === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su Direccion.' });
            error = false;
        } else {
            this.messageList = [];
            this.messagesForm = [];
            error = true;
        }
        this.onErrorMultiple(this.messageList);
        return error;
    }

    cancelarDireccion() {
        this.direccionRegistro = new Direccion;
        this.displayDireccion = false;
    }

    editarDireccion(obj: Direccion) {
        this.editar = true;
        this.direccionRegistro.vCodDepa = obj.vCodDepa;
        this.direccionRegistro.vCodProv = obj.vCodProv;
        this.direccionRegistro.vCodDist = obj.vCodDist;
        this.direccionRegistro.vReferen = obj.vReferen;
        this.direccionRegistro.nNotifica = obj.nNotifica;
        this.direccionRegistro.vDireccion = obj.vDireccion;
        this.direccionRegistro.vProvincia = obj.vProvincia;
        this.direccionRegistro.vDistrito = obj.vDistrito;
        this.direccionRegistro.id = obj.id;

        if (this.selectedDeparts != null) {
            this.selectedDeparts.name = this.direccionRegistro.vDepart;
        }
        if (this.selectedProvins != null) {
            this.selectedProvins.name = this.direccionRegistro.vProvincia;
        }
        if (this.selectedDistris != null) {
            this.selectedDistris.name = this.direccionRegistro.vDistrito;
        }
        this.displayDireccion = true;
    }

    eliminarDireccion(obj: Direccion) {
        this.direcciones.splice(this.direcciones.indexOf(obj), 1);
    }

    guardarFormularioPerfil() {
        if (this.solicitud !== undefined && this.solicForm !== undefined) {
            this.messagesForm = this.formularioPerfilService.validarDatosObligatorios(this.solicitud, this.formPerfil, this.obras, this.solicitante);
            if (this.messagesForm.length === 0) {
                this.formularioPerfilService.guardarFormularioPerfil(this.datepipe, this.solicitud, this.solicForm,
                    this.formPerfil, this.undNegocios, this.participacionesAccionarias, this.participacionesMercados,
                    this.obras, this.proyectos, this.direcciones, this.organizaciones, this.solicitante,
                    this.resultadoNegociaciones, this.responInfoFinanciera, this.responeInfoLaboral, this.anexoLaboral,
                    this.formperfilService, this.undnegocioService, this.participaService, this.hechoinverService,
                    this.direccionService, this.negocolectService, this.resulnegocService, this.respinformaService)
                this.router.navigate(['./dictamenes/control-informacion/' + this.solicitud.nCodsolic]);
            }
        }
    }
    mostrarGuardar() {
        this.displayGuardar = true;
    }

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }

    private onError(error: any) {
        this.messages = [];
        this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

}
