import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import {Message} from 'primeng/components/common/api';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
    selector: 'jhi-validarruc',
    templateUrl: './formulario-regdenuncia.component.html'
})

export class FormularioregdenunciaComponent implements OnInit {
    messages: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayRepoSunafil: boolean;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService
    ) {
    }

    loadAll() {
    }

    clear() {
    }
    ngOnInit() {
    }

    validar() {}
}
