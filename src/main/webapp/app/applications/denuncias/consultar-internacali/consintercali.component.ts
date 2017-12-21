import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { MenuItem } from 'primeng/primeng';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';
import { SessionStorage, LocalStorage } from 'ng2-webstorage';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ValidarrucService } from '../validar-ruc/validarruc.service';
import { RegdenuService } from '../registro-denuncia/regdenu.service';
import { CalifiService } from '../califi-denuncia/califi.service';
import { ConsintercaliService } from './consintercali.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';
import { ConsintercaliModel } from './consintercali.model';
import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-formreginternocali',
    templateUrl: './consintercali.component.html',
})

export class ConsintercaliComponent implements OnInit {
    block: boolean;
    messageList: any;
    messagesSolicitaInformacion: any;
    criterioBus: number;
    criterioTipoDoc: string;
    criterioNumDoc: string;
    listaResultado: ConsintercaliModel[];
    selectedResultado: ConsintercaliModel[];
    listaRespuestas: ConsintercaliModel[];
    es: any;
    @LocalStorage('serialize')
    serialize: number;
    displayInfoAdicional: boolean;
    infoSolicitada: string;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private califiService: CalifiService,
        private consintercaliService: ConsintercaliService,
        private validarUsuarioService: ValidarUsuarioService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.block = false;
        this.criterioBus = 0;
        this.listaResultado = [];
        this.listaRespuestas = [];
        this.selectedResultado = [];
        this.serialize = 0;
        this.displayInfoAdicional = false;
    }

    consultaInformacionAdicional() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar una sola denuncia.');
        } else {
            this.block = true;
            this.consintercaliService.getFiltroInfoSoli({
                nCoddenu: this.selectedResultado[0].serialize
            }).subscribe(
                (res: any) => {
                    this.listaRespuestas = res;
                    this.infoSolicitada = '';
                    this.block = false;
                    this.displayInfoAdicional = true;
                },
                (res: any) => {
                    this.onError(res);
                    this.block = false;
                });
        }
    }

    nuevaDenuncia() {
        this.router.navigate(['/denuncias/formregdenu']);
    }

    enviarConsulta() {
        if (this.infoSolicitada === undefined || this.infoSolicitada.length === 0) {
            this.onErrorSolicitaMensaje('Debe ingresar la informacion solicitada.');
        } else {
            this.block = true;
            this.consintercaliService.regInfoSoli({
                vInfosoli: this.infoSolicitada,
                nCoddenu: this.selectedResultado[0].serialize,
                tFecsoli: new Date()
            }).subscribe(
                (res: any) => {
                    this.block = false;
                    this.consultaInformacionAdicional();
                },
                (res: any) => {
                    this.onErrorSolicitaMensaje(res);
                    this.block = false;
                });
        }
    }

    registrarCalificacion() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar una sola denuncia.');
        } else {
            this.serialize = this.selectedResultado[0].serialize;
            this.router.navigate(['/denuncias/calififormregdenuncia']);
        }
    }

    buscarDenuncias() {
        switch (this.criterioBus) {
            case 0:
                if (this.criterioTipoDoc === undefined) {
                    this.onError('Debe seleccionar el tipo de documento.');
                } else if (this.criterioNumDoc === undefined || this.criterioNumDoc.trim().length === 0) {
                    this.onError('Debe ingresar el numero de RUC del empleado.');
                } else {
                    this.block = true;
                    this.consintercaliService.getFiltro({
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
    private onErrorSolicitaMensaje(error: any) {
        this.messagesSolicitaInformacion = [];
        this.messagesSolicitaInformacion.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}
