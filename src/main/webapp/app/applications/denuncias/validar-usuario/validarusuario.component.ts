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
import { Pernatural } from '../../../entities/pernatural';
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

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private messageService: MessageService,
        private validarUsuarioService: ValidarUsuarioService,
    ) {
        this.pernatural = new Pernatural();
    }

    loadAll() {
        this.validarUsuarioService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
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
        this.disableTab1 = true;
        this.disableTab2 = false;

    }

    validarDatoPersona() {
        this.messageList = [];
        console.log(this.selectedTipodoc);
        console.log(this.pernatural);

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
            this.validarUsuarioService.consultaPersonaValidaServicio({TipoDoc: this.selectedTipodoc.name,
                vApepat: this.pernatural.vApepat,
                vApemat: this.pernatural.vApemat,
                vNombres: this.pernatural.vNombres,
                vNumdoc: this.pernatural.vNumdoc
            }).subscribe(
                (res: Pernatural) => {
                    this.pernatural = res;
                    this.indexTab = 1;
                    this.disableTab1 = true;
                    this.disableTab2 = false;
                },
                (res: ResponseWrapper) => this.onError(res.json)
            );
        }
        this.onErrorMultiple(this.messageList);
    }

    retrocederVentada() {
        this.indexTab = 0;
        this.disableTab1 = false;
        this.disableTab2 = true;
    }

    cerrarNuevoUsuario() {
        this.displayNuevoUsuario = false;
    }

    onSubmit() {
    }

    submitNuevoUsuario() {
    }

    showNuevoUsuario() {
        this.loadAll();
        this.displayNuevoUsuario = true;
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
