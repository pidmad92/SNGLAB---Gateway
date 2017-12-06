import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { MenuItem } from 'primeng/primeng';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ValidarrucService } from '../validar-ruc/validarruc.service';
import { FormregdenunciaService } from '.';
import { FormregdenunciaModel } from './formregdenuncia.model';

@Component({
    selector: 'jhi-validarruc',
    templateUrl: './formregdenuncia.component.html',
})

export class FormregdenunciaComponent implements OnInit {
    messagesEmpleador: Message[] = [];
    messagesTrabajo: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayRepoSunafil: boolean;
    items: MenuItem[];
    msgs: Message[] = [];
    indexTab: number;
    block: boolean;
    disableTab1: boolean;
    disableTab2: boolean;
    nRuc: string;
    formregdenu: FormregdenunciaModel;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private formregdenunciaService: FormregdenunciaService
    ) {
    }

    ngOnInit() {
        this.indexTab = 0;
        this.block = false;
        // this.disableTab1 = false;
        // this.disableTab2 = true;
    }

    pasoDatosTrabajo() {
        this.indexTab = 1;
        this.disableTab1 = false;
        this.disableTab2 = true;
    }

    validarRuc() {
        this.block = true;
        if (this.nRuc.trim().length <= 0) {
            this.onErrorEmpleador({ message: 'Debe ingresar el número RUC de la empresa' });
        } else if (!((new RegExp('^[0-9]+$')).test(this.nRuc))) {
            this.onErrorEmpleador({ message: 'Debe ingresar un valor valido' });
        } else if (this.nRuc.trim().length !== 11) {
            this.onErrorEmpleador({ message: 'Debe ingresar un valor valido' });
        } else {
            this.validarrucService.validarRuc(Number(this.nRuc))
                .subscribe((data) => {
                    if (data === 200) {
                        this.formregdenunciaService.validarRuc({
                            ddp_numruc: this.nRuc.trim()
                        }).consultaTipoDocIdentidad().subscribe(
                            (res: ResponseWrapper) => {
                                this.formregdenu.desc_ciiu = res.json.desc_ciiu;
                                this.formregdenu.desc_sectoeco = res.json.desc_sectoeco;
                                this.formregdenu.domicilioLegal = res.json.domicilioLegal;
                                this.formregdenu.desc_estado = res.json.desc_estado;
                                this.formregdenu.ddp_nombre = res.json.ddp_nombre;
                                this.formregdenu.desc_dep = res.json.desc_dep;
                                this.formregdenu.desc_prov = res.json.desc_prov;
                                this.formregdenu.desc_dist = res.json.desc_dist;
                                this.formregdenu.desc_tpoemp = res.json.desc_tpoemp;
                                this.formregdenu.desc_ciiu = res.json.desc_ciiu;
                                this.block = false;
                            },
                            (res: ResponseWrapper) => {
                                this.nRuc = '';
                                this.onErrorEmpleador(res.json);
                                this.block = false;
                            });
                    } else {
                        this.nRuc = '';
                    }
                });
        }
    }

    private onErrorEmpleador(error: any) {
        this.messagesEmpleador = [];
        this.messagesEmpleador.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
