import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { MenuItem } from 'primeng/primeng';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ValidarrucService } from '../validar-ruc/validarruc.service';
import { RegdenuService } from '../registro-denuncia/regdenu.service';
import { CalifiService } from '../califi-denuncia/califi.service';
import { ConsinterService } from './consinter.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';
import { ConsinterModel } from './consinter.model';
import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-formreginterno',
    templateUrl: './consinter.component.html',
})

export class ConsinterComponent implements OnInit {
    block: boolean;
    messageList: any;
    criterioBus: number;
    criterioTipoDoc: string;
    criterioNumDoc: string;
    listaResultado: ConsinterModel[];
    selectedResultado: ConsinterModel[];
    es: any;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private califiService: CalifiService,
        private consinterService: ConsinterService,
        private validarUsuarioService: ValidarUsuarioService,
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.block = false;
        this.criterioBus = 0;
        this.listaResultado = [];
    }

    buscarDenuncias() {
        switch (this.criterioBus) {
            case 0:
                if (this.criterioNumDoc === undefined || this.criterioNumDoc.trim().length === 0) {
                    this.onError('Debe ingresar el numero de RUC del empleado');
                } else {
                    this.block = true;
                    this.consinterService.getFiltro({
                        criterio: this.criterioBus,
                        tipoDoc: '',
                        numDoc: this.criterioNumDoc
                    }).subscribe(
                        (res: any) => {
                            this.listaResultado = res;
                            this.block = false;
                        },
                        (res: any) => {
                            this.onError(res);
                            this.block = false;
                        });
                }
                break;
        }
    }

    private onError(error: any) {
        this.messageList = [];
        this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}
