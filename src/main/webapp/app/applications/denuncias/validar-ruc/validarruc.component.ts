import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Validarruc } from './validarruc.model';
import { ValidarrucService } from './validarruc.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-validarruc',
    templateUrl: './validarruc.component.html'
})

export class ValidarrucComponent implements OnInit {
    validarruc: Validarruc;
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayRepoSunafil: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private validarrucService: ValidarrucService,
        private messageService: MessageService
    ) {
    }

    loadAll() {
    }

    clear() {
        this.validarruc.nRuc = '';
    }
    ngOnInit() {
        this.isSaving = false;
        this.validarruc = new Validarruc();
        this.displayRepoSunafil = false;
    }

    validar() {
        if (this.validarruc.nRuc.trim().length <= 0) {
            this.onError({ message : 'Debe ingresar el número RUC de la empresa'});
        }  else if (!((new RegExp('^[0-9]+$')).test(this.validarruc.nRuc))) {
            this.onError({ message : 'Debe ingresar un valor valido'});
        } else if (this.validarruc.nRuc.trim().length !== 11) {
            this.onError({ message : 'Debe ingresar un valor valido'});
        } else {
            this.validarrucService.validarRuc(Number(this.validarruc.nRuc))
            .subscribe((data) => {
                if (data === 200) {
                    this.onError({ message : 'Si es compentencia'});
                } else {
                    this.abrirModalSunafil();
                }
                this.validarruc.nRuc = 'Ingrese un dato';
            });
        }
    }

    abrirModalSunafil() {
        this.displayRepoSunafil = true;
    }

    cerrarModalSunafil() {
        this.displayRepoSunafil = false;
    }

    private onError(error: any) {

        this.messages = [];
        this.messages.push({severity: 'error', summary: 'Mensaje de Error', detail: error.message});
    }
}
