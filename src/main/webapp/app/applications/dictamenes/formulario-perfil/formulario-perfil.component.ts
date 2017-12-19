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
import { Formulario } from './formulario.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PerreglabService } from '../../../entities/perreglab/index';

@Component({
    selector: 'jhi-formulario-perfil',
    templateUrl: './formulario-perfil.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfilComponent implements OnInit, OnDestroy {
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

    // Combos de Ubigeo
    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];

    // Seleccion de Ubigeo
    selectedDeparts: ComboModel;
    selectedProvins: ComboModel;
    selectedDistris: ComboModel;

    // Flags de dialogs
    displayDireccion: boolean;
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
    @LocalStorage('regimenLaboral')
    selectedRegimen: ComboModel[];

    // Flags de Inicio
    @LocalStorage('inicioDir')
    inicioDir: boolean;

    // Objetos CUD
    actiecon: Actiecon[];
    direccionRegistro: Direccion;

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
        private actieconService: ActieconService,
        private formularioPerfilService: FormularioPerfilService,
        private perreglabService: PerreglabService,
        private fb: FormBuilder,
        private datepipe: DatePipe,
    ) { }

    loadAll() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['nCodfperf']);
        });
    }

    ngOnInit() {
        this.inicializarVariables();
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    inicializarVariables() {
        // Variables de edicion y bloqueo
        this.editar = false;
        this.block = false;
        // Combos de Ubigeo
        this.departs = new Array<ComboModel>();
        this.provins = new Array<ComboModel>();
        this.distris = new Array<ComboModel>();
        // Flags de dialogs
        this.displayDireccion = false;
        this.displayGuardar = false;

        // Objetos CUD
        this.direccionRegistro = new Direccion;
        this.undNegocios = this.iniciarArrayAny(this.undNegocios);
        this.participacionesAccionarias = this.iniciarArrayAny(this.participacionesAccionarias);
        this.participacionesMercados = this.iniciarArrayAny(this.participacionesMercados);
        this.obras = this.iniciarArrayAny(this.obras);
        this.proyectos = this.iniciarArrayAny(this.proyectos);
        this.direcciones = this.iniciarArrayAny(this.direcciones);
        this.organizaciones = this.iniciarArrayAny(this.organizaciones);
        this.resultadoNegociaciones = this.iniciarArrayAny(this.resultadoNegociaciones);
        this.proyectos = this.iniciarArrayAny(this.proyectos);
        this.proyectos = this.iniciarArrayAny(this.proyectos);
        this.formulario = this.iniciarArray(this.formulario, new Array<Formulario>());
        this.solicitante = this.iniciarCUD(this.solicitante, new Negocolect());
        this.responInfoFinanciera = this.iniciarCUD(this.responInfoFinanciera, new Respinforma());
        this.responeInfoLaboral = this.iniciarCUD(this.responeInfoLaboral, new Respinforma());
        this.inicioDir = this.iniciarFlags(this.inicioDir);
    }

    iniciarFlags(flg: boolean): boolean {
        if (flg === null || flg === undefined) {
            flg = true;
        } else {
            flg = false;
        }
        return flg;
    }

    iniciarArrayAny(arr: any[]): any[] {
        if (arr === undefined || arr === null) {
            arr = [];
        }
        return arr;
    }

    iniciarArray(list: any[], arr: Array<any>): Array<any> {
        if (list === undefined || list === null) {
            list = arr;
        }
        return list;
    }

    iniciarCUD(obj: any, objnew: any): any {
        if (obj === undefined || obj === null) {
            obj = objnew;
        }
        return obj;
    }

    load(nCodfperf) {
        this.solicfromService.obtenerSolicitudFormulario(nCodfperf).subscribe((solicForm) => {
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
            if (this.inicioDir) {
                this.direcciones = new Array<Direccion>();
                this.direccionService.obtenerDireccion(nCodfperf).subscribe(
                    (res: ResponseWrapper) => {
                        this.direcciones = res.json;
                        for (let i = 0; i < this.direcciones.length; i++) {
                            this.direcciones[i].id = i;
                            this.direcciones[i].bNotifica = this.direcciones[i].nNotifica === 1 ? true : false;
                        }
                    },
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            }

        });
        this.actieconService.query().subscribe(
            (res: ResponseWrapper) => this.actiecon = res.json,
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    // --------------------------- Eventos ------------------------------------
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
            this.formularioPerfilService.consultaProvs(this.selectedDeparts.value).subscribe(
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
            this.formularioPerfilService.consultaDists(this.selectedDeparts.value, this.selectedProvins.value).subscribe(
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
    // --------------------------- Direccion ------------------------------------
    showDialogDireccion() {
        this.messageList = [];
        this.messagesForm = [];
        this.editar = false;
        this.formularioPerfilService.consultaDepas().subscribe(
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

    mostrarGuardar() {
        this.displayGuardar = true;
    }
    // --------------------------- Guardar Formulario Perfil ------------------------------------
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

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
    }

    verControlInformacion() {
        this.router.navigate(['../../dictamenes/control-informacion/' + this.solicitud.nCodsolic])
    }

    ngOnDestroy() { }
}
