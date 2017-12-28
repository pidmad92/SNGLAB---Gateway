import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ValidarUsuarioModel } from './validarusuario.model';
import { LoginService } from '../../../shared/login/login.service';
import { StateStorageService } from '../../../shared/auth/state-storage.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ValidarUsuarioService } from './validarusuario.service';

import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { Pernatural } from '../../../entities/pernatural';
import { Dirdenun } from '../../../entities/dirdenun';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'jhi-validarruc',
    templateUrl: './validarusuario.component.html'
})

export class ValidarUsuarioComponent implements OnInit {
    validarUsuario: ValidarUsuarioModel;
    messages: Message[] = [];
    messagesForm: Message[] = [];
    messageList: any;
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayNuevoUsuario: boolean;
    tipodocs: ComboModel[];
    block: boolean;
    selectedTipodoc: ComboModel;
    pernatural: Pernatural;
    indexTab: number;
    disableTab1: boolean;
    disableTab2: boolean;
    cambiaDir: boolean;
    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];
    tviasLista: ComboModel[];
    tzonasLista: ComboModel[];
    tviaSelected: ComboModel;
    tzonaSelected: ComboModel;
    dirdenunDirec: Dirdenun;
    selectedDeparts: ComboModel;
    selectedProvins: ComboModel;
    selectedDistris: ComboModel;
    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private messageService: MessageService,
        private validarUsuarioService: ValidarUsuarioService,
    ) {
        this.pernatural = new Pernatural();
    }

    loadAll() {
        this.block = true;
        this.validarUsuarioService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.currentSearch = '';
                this.block = false;
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
        );
    }

    clear() {
        this.validarUsuario.username = '';
        this.validarUsuario.password = '';
    }
    ngOnInit() {
        this.isSaving = false;
        this.validarUsuario = new ValidarUsuarioModel(false, '', false, '', '');
        this.displayNuevoUsuario = false;
        this.block = false;
        this.indexTab = 0;
        this.disableTab1 = false;
        this.disableTab2 = true;
        this.cambiaDir = false;
        this.pernatural = new Pernatural();
        this.dirdenunDirec = new Dirdenun();
        this.departs = [];
        this.provins = [];
        this.distris = [];
        this.tviasLista = [];
        this.tzonasLista = [];
    }

    validarDatoPersona() {
        this.messageList = [];
        if (this.selectedTipodoc === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un tipo de documento.' });
        } else if (this.pernatural.vNumdoc === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el número de documento.' });
        } else if (this.selectedTipodoc !== undefined && !(this.selectedTipodoc.totaldig === this.pernatural.vNumdoc.trim().length)) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar un numero de documento valido.' });
        } else if (this.pernatural.vApepat === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el apellido paterno.' });
        } else if (this.pernatural.vApemat === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar el apellido materno.' });
        } else if (this.pernatural.vNombres === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar sus nombres.' });
        } else if (this.pernatural.vEmailper === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su correo electronico.' });
        } else if (this.pernatural.vTelefono === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su telefono.' });
        } else if (this.pernatural.vCelular === '') {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su celular.' });
        } else {
            console.log(this.pernatural.vApepat);
            console.log(this.pernatural.vApemat);
            console.log(this.pernatural.vNombres);
            if (this.pernatural.vApepat === undefined || this.pernatural.vApepat.trim() === '') {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su apellido paterno' });
                this.block = false;
            } else if (this.pernatural.vApemat === undefined || this.pernatural.vApemat.trim() === '') {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su apellido materno' });
                this.block = false;
            } else if (this.pernatural.vNombres === undefined || this.pernatural.vNombres.trim() === '') {
                this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su nombre completo' });
                this.block = false;
            } else {
                this.block = true;
                this.messageList = [];
                this.validarUsuarioService.consultaPersonaValidaServicio(
                    {
                        TipoDoc: this.selectedTipodoc.name,
                        vApepat: this.pernatural.vApepat,
                        vApemat: this.pernatural.vApemat,
                        vNombres: this.pernatural.vNombres,
                        vNumdoc: this.pernatural.vNumdoc,
                        vTelefono: this.pernatural.vTelefono,
                        vCelular: this.pernatural.vCelular,
                        vEmailper: this.pernatural.vEmailper
                    }).subscribe(
                    (res: Pernatural) => {
                        this.pernatural = res;
                        if (this.pernatural.Resultado) {
                            this.validarUsuarioService.consultaDepa(this.pernatural.coddep).subscribe(
                                (dep: any) => {
                                    this.validarUsuarioService.consultaProv(this.pernatural.coddep, this.pernatural.codpro).subscribe(
                                        (prov: any) => {
                                            this.validarUsuarioService.consultaDist(this.pernatural.coddep, this.pernatural.codpro, this.pernatural.coddist).subscribe(
                                                (dist: any) => {
                                                    this.dirdenunDirec.vCoddepartDes = (dep.length > 0) ? dep[0].vDesdep : '';
                                                    this.dirdenunDirec.vCodprovinDes = (prov.length > 0) ? prov[0].vDespro : '';
                                                    this.dirdenunDirec.vCoddistriDes = (dist.length > 0) ? dist[0].vDesdis : '';
                                                    this.block = false;
                                                    this.avanzarVentana();
                                                },
                                                (dist: ResponseWrapper) => {
                                                    this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: prov }]);
                                                    this.block = false;
                                                });
                                        },
                                        (prov: ResponseWrapper) => {
                                            this.onErrorMultiple([{
                                                severity: 'error',
                                                summary: 'Mensaje de Error', detail: prov
                                            }]); this.block = false;
                                        });
                                },
                                (dep: ResponseWrapper) => this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: res }]));
                        } else {
                            this.onErrorMultiple([{
                                severity: 'error', summary: 'Mensaje de Error',
                                detail: 'Los datos del documento de identidad no corresponden a los ingresados.'
                            }])
                            this.block = false;
                        }
                    },
                    (res: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: res.json }]); this.block = false; }
                    );
            }
        }
        this.onErrorMultiple(this.messageList);
    }

    validarDatoPersonaDireccion() {
        this.block = true;
        this.messageList = [];
        if (this.cambiaDir === true && this.tviaSelected === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un tipo de via' });
            this.block = false;
        } else if (this.cambiaDir === true && (this.dirdenunDirec.vDesvia === '' || this.dirdenunDirec.vDesvia === undefined)) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la descripción de la via.' });
            this.block = false;
        } else if (this.cambiaDir === true && this.tzonaSelected === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un tipo de zona' });
            this.block = false;
        } else if (this.cambiaDir === true && (this.dirdenunDirec.vDeszona === '' || this.dirdenunDirec.vDesvia === undefined)) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar la descripción de la zona.' });
            this.block = false;
        } else if (this.cambiaDir === true && (this.dirdenunDirec.vDireccion === '' || this.dirdenunDirec.vDesvia === undefined)) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe ingresar su dirección completa' });
            this.block = false;
        } else if (this.cambiaDir === true && this.selectedDeparts === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el departamento.' });
            this.block = false;
        } else if (this.cambiaDir === true && this.selectedProvins === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar la provincia' });
            this.block = false;
        } else if (this.cambiaDir === true && this.selectedDistris === undefined) {
            this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar el distrito' });
            this.block = false;
        } else {
            this.pernatural.fecNacimiento = this.pernatural.dFecnac;
            this.pernatural.dFecnac = null;
            this.pernatural.vEstado = '1';
            this.pernatural.nSedereg = 1;
            this.pernatural.nUsuareg = 1;
            this.pernatural.tFecreg = 0;
            this.validarUsuarioService.regNuevoDenunciante(this.pernatural).subscribe(
                (resp: any) => {
                    console.log(resp);
                    this.dirdenunDirec.nCoddenute = resp.id;
                    // , this.pernatural.codpro, this.pernatural.coddist
                    if (this.cambiaDir === true) {
                        this.dirdenunDirec.nSedereg = 1;
                        this.dirdenunDirec.vUsuareg = '1';
                        this.dirdenunDirec.tFecreg = 0;
                        this.dirdenunDirec.vCoddepart = this.selectedDeparts.value;
                        this.dirdenunDirec.vCodprovin = this.selectedProvins.value;
                        this.dirdenunDirec.vCoddistri = this.selectedDistris.value;
                        this.dirdenunDirec.nCodtipvia = Number(this.tviaSelected.value);
                        this.dirdenunDirec.nCodtzona = Number(this.tzonaSelected.value);
                        this.dirdenunDirec.vDircomple = this.dirdenunDirec.vDireccion;
                    } else {
                        this.dirdenunDirec.nSedereg = 1;
                        this.dirdenunDirec.vUsuareg = '1';
                        this.dirdenunDirec.tFecreg = 0;
                        this.dirdenunDirec.vCoddepart = this.pernatural.coddep;
                        this.dirdenunDirec.vCodprovin = this.pernatural.codpro;
                        this.dirdenunDirec.vCoddistri = this.pernatural.coddist;
                        this.dirdenunDirec.nCodtipvia = 21;
                        this.dirdenunDirec.nCodtzona = 12;
                        this.dirdenunDirec.vDesvia = '';
                        this.dirdenunDirec.vDeszona = '';
                        this.dirdenunDirec.vDireccion = this.pernatural.direccion;
                        this.dirdenunDirec.vDircomple = this.pernatural.direccion;
                    }
                    this.validarUsuarioService.regDireccionDenunciante(this.dirdenunDirec).subscribe(
                        (respDir: any) => {
                            console.log(respDir);
                            this.displayNuevoUsuario = false;
                            this.block = false;
                        },
                        (respDir: ResponseWrapper) => {
                            console.log(respDir);
                            this.block = false;
                        });
                },
                (resp: ResponseWrapper) => {
                    console.log(resp);
                    this.block = false;
                });
        }
        this.onErrorMultiple(this.messageList);
    }

    cambiaDireccion() {
        this.block = true;
        this.messageList = [];
        this.validarUsuarioService.consultaDepas().subscribe(
            (deps: any) => {
                this.validarUsuarioService.consultaTVia().subscribe(
                    (tvias: ResponseWrapper) => {
                        this.validarUsuarioService.consultaTZona().subscribe(
                            (tzonas: ResponseWrapper) => {
                                // tslint:disable-next-line:forin
                                for (const i in deps) {
                                    this.departs.push(new ComboModel(deps[i].vDesdep, deps[i].vCoddep, 0));
                                }
                                this.tviasLista = tvias.json;
                                this.tzonasLista = tzonas.json;
                                this.cambiaDir = true;
                                this.block = false;
                            },
                            (tzonas: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: tzonas.json }]); this.block = false; }
                        );
                    },
                    (tvias: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: tvias.json }]); this.block = false; }
                );
            },
            (res: ResponseWrapper) => { this.onErrorMultiple([{ severity: 'error', summary: 'Mensaje de Error', detail: res.json }]); this.block = false; }
        );
    }

    retrocederVentada() {
        this.indexTab = 0;
        this.disableTab1 = false;
        this.disableTab2 = true;
    }

    avanzarVentana() {
        this.indexTab = 1;
        this.disableTab1 = true;
        this.disableTab2 = false;
    }

    cerrarNuevoUsuario() {
        this.displayNuevoUsuario = false;
    }

    showNuevoUsuario() {
        this.loadAll();
        this.displayNuevoUsuario = true;
    }

    onSubmit() {
    }

    submitNuevoUsuario() {
    }

    onChangeDepartamento() {
        this.block = true;
        this.messageList = [];
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
    }

    onChangeProvincia() {
        this.block = true;
        this.messageList = [];
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
}
