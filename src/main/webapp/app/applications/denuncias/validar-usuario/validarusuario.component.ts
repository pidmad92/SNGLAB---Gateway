import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Validators, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ValidarUsuarioModel } from './validarusuario.model';
import { LoginService } from '../../../shared/login/login.service';
import { StateStorageService } from '../../../shared/auth/state-storage.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

import {ComboModel} from '../../general/combobox.model';

@Component({
    selector: 'jhi-validarruc',
    templateUrl: './validarusuario.component.html'
})

export class ValidarUsuarioComponent implements OnInit {
    validarUsuario: ValidarUsuarioModel;
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayNuevoUsuario: boolean;
    tipodocs: ComboModel[];
    block: boolean;
    selectedTipodoc: ComboModel;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private messageService: MessageService
    ) {
    }

    loadAll() {
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
    }

    validar() {
    }

    cerrarNuevoUsuario() {
        this.displayNuevoUsuario = false;
    }

    onSubmit() {
    }

    showNuevoUsuario() {
        this.displayNuevoUsuario = true;
    }

    private onError(error: any) {

        this.messages = [];
        this.messages.push({severity: 'error', summary: 'Mensaje de Error', detail: error.message});
    }
}
