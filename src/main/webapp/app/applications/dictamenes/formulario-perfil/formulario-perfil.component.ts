import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal, ResponseWrapper } from '../../../shared/index';
import { Subscription } from 'rxjs/Subscription';
import { SolicitudService, Solicitud } from '../../../entities/solicitud';
import { SolicformService, Solicform } from '../../../entities/solicform';
import { DireccionService, Direccion } from '../../../entities/direccion';
import { ActivatedRoute, Router } from '@angular/router';
import { Formperfil, FormperfilService } from '../../../entities/formperfil';
import { Actiecon, ActieconService } from '../../../entities/actiecon/index';
import { SessionStorage } from 'ng2-webstorage';
import { ComboModel } from '../../general/combobox.model';
import { Message } from 'primeng/components/common/api';
import { ValidarUsuarioService } from '../../denuncias/validar-usuario/validarusuario.service';
import { Undnegocio } from '../../../entities/undnegocio/index';
import { Participa } from '../../../entities/participa/index';
import { Hechoinver } from '../../../entities/hechoinver/index';
import { Negocolect } from '../../../entities/negocolect/index';

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

    // Mensajes
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;

    block: boolean;
    editar: boolean;

    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];

    selectedDeparts: ComboModel;
    selectedProvins: ComboModel;
    selectedDistris: ComboModel;

    // Listados de dato
    @SessionStorage('solicitud')
    solicitud: Solicitud;
    @SessionStorage('solicform')
    solicForm: Solicform;
    @SessionStorage('formperfil')
    formPerfil: Formperfil;
    @SessionStorage('direcciones')
    direcciones: Direccion[];
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
    @SessionStorage('solicitante')
    solicitante: Negocolect;
    @SessionStorage('organizaciones')
    organizaciones: Negocolect[];

    constructor(
        private solicitudService: SolicitudService,
        private formperfilService: FormperfilService,
        private solicfromService: SolicformService,
        private direccionService: DireccionService,
        private actieconService: ActieconService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private route: ActivatedRoute,
        private router: Router,
        private validarUsuarioService: ValidarUsuarioService,
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
        this.direccionRegistro = new Direccion;
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() { }

    load(nCodfperf) {
        if (this.solicitud == null) {
            this.solicfromService.find(nCodfperf).subscribe((solicForm) => {
                this.solicForm = solicForm;
                const nCodsolic = solicForm.nCodsolic;

                if (this.solicitud == null) {
                    // tslint:disable-next-line:no-shadowed-variable
                    const nCodfperf = solicForm.nCodfperf;
                    this.solicitudService.find(nCodsolic).subscribe((solicitud) => {
                        this.solicitud = solicitud;
                    });
                }
                if (this.formPerfil == null) {
                    this.formperfilService.find(nCodfperf).subscribe((formPerfil) => {
                        this.formPerfil = formPerfil;
                    });

                    this.direccionService.obtenerDireccion(nCodfperf).subscribe(
                        (res: ResponseWrapper) => this.direcciones = res.json,
                        (res: ResponseWrapper) => this.onError(res.json)
                    );
                }
            });
        }
        this.actieconService.query().subscribe(
            (res: ResponseWrapper) => this.actiecon = res.json,
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

    previousState() {
        window.history.back();
    }

    showDialogDireccion() {
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
            this.selectedDeparts.value = this.direccionRegistro.vCodDepa;
        }
        if (this.selectedProvins != null) {
            this.selectedProvins.value = this.direccionRegistro.vCodProv;
        }
        if (this.selectedDistris != null) {
            this.selectedDistris.value = this.direccionRegistro.vCodDist;
        }
        this.displayDireccion = true;
    }

    eliminarDireccion(obj: Direccion) {
        this.direcciones.splice(this.direcciones.indexOf(obj), 1);
    }

    irPerfil2() {
        this.router.navigate(['./dictamenes/formulario-perfil2']);
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
}
