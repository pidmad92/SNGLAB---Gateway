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
import { ConsexterService } from './consexter.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';
import { ConsexterModel } from './consexter.model';
import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-formregexterno',
    templateUrl: './consexter.component.html',
})

export class ConsexterComponent implements OnInit {
    block: boolean;
    messageList: any;
    messagesSolicitaInformacion: any;
    messagesAtenderdenu: any;
    messagesFinalizadenu: any;
    criterioBus: number;
    criterioTipoDoc: string;
    criterioNumDoc: string;
    listaResultado: ConsexterModel[];
    selectedResultado: ConsexterModel[];
    listaRespuestas: ConsexterModel[];
    es: any;
    @LocalStorage('serialize')
    serialize: number;
    displayInfoAdicional: boolean;
    displayAtenderDenuncias: boolean;
    displayFinalizarDenuncias: boolean;
    infoSolicitada: string;
    listaMotfin: ComboModel[];
    selectMotfin: ComboModel;
    infoObsFin: string;
    flagResponder: boolean;
    mensajeSolicitado: string;
    serializeCod: number;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private califiService: CalifiService,
        private consexterService: ConsexterService,
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
        this.displayInfoAdicional = false;
        this.displayAtenderDenuncias = false;
        this.displayFinalizarDenuncias = false;
        this.listaMotfin = [];
        this.infoObsFin = '';
        this.flagResponder = false;
        this.serializeCod = 0;
    }

    nuevaDenuncia() {
        this.router.navigate(['/denuncias/formregdenu']);
    }

    consultaInformacionAdicional() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar una sola denuncia.');
        } else {
            this.block = true;
            this.consexterService.getFiltroInfoSoli({
                nCoddenu: this.selectedResultado[0].serialize
            }).subscribe(
                (res: any) => {
                    this.listaRespuestas = res;
                    // tslint:disable-next-line:forin
                    for (const i in this.listaRespuestas) {
                        if (this.listaRespuestas[i].mensajeRespuesta === undefined || this.listaRespuestas[i].mensajeRespuesta === null) {
                            this.flagResponder = true;
                            this.mensajeSolicitado = this.listaRespuestas[i].mensajeSolicitado;
                            this.serializeCod = this.listaRespuestas[i].serialize;
                            break;
                        }
                    }
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

    buscarDenuncias() {
        switch (this.criterioBus) {
            case 0:
                if (this.criterioNumDoc === undefined || this.criterioNumDoc.trim().length === 0) {
                    this.onError('Debe ingresar el numero de RUC del empleado');
                } else {
                    this.block = true;
                    this.consexterService.getFiltro({
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

    responderConsulta() {
        if (this.infoSolicitada === undefined || this.infoSolicitada.length === 0) {
            this.onErrorSolicitaMensaje('Debe ingresar la informacion solicitada.');
        } else {
            this.block = true;
            this.consexterService.regInfoRespuesta({
                id: this.serializeCod,
                vRespuesta: this.infoSolicitada.trim(),
                tFecsoli: new Date(),
                vInfosoli: this.infoSolicitada.trim()
            }).subscribe(
                (res: any) => {
                    this.block = false;
                    this.serializeCod = undefined;
                    this.infoSolicitada = undefined;
                    this.consultaInformacionAdicional();
                },
                (res: any) => {
                    this.onErrorSolicitaMensaje(res);
                    this.block = false;
                });
        }
    }

    enviarAtencion() {
        if (this.selectedResultado.length < 1) {
            this.onError('Debe seleccionar como minimo una denuncia.');
        } else {
            const codList: number[] = [];
            // tslint:disable-next-line:forin
            for (const i in this.selectedResultado) {
                codList.push(this.selectedResultado[i].serialize);
            }
            this.consexterService.regAtenderDenu({
                codSerialize: codList
            }).subscribe(
                (res: any) => {
                    this.block = false;
                    this.displayAtenderDenuncias = false;
                    this.buscarDenuncias();
                },
                (res: any) => {
                    this.onErrorAtenderDenu(res);
                    this.block = false;
                });
        }
    }

    atenderDenuncia() {
        if (this.selectedResultado.length < 1) {
            this.onError('Debe seleccionar como minimo una denuncia.');
        } else {
            this.displayAtenderDenuncias = true;
        }
    }

    finalizaDenuncia() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar como minimo una denuncia.');
        } else {
            this.block = true;
            this.consexterService.getFiltroMotFin().subscribe(
                (res: any) => {
                    this.listaMotfin = [];
                    // tslint:disable-next-line:forin
                    for (const i in res) {
                        this.listaMotfin.push(new ComboModel(res[i].vDescrip, String(res[i].id), 0));
                    }
                    this.selectMotfin = undefined;
                    this.infoObsFin = '';
                    this.displayFinalizarDenuncias = true;
                    this.block = false;
                },
                (res: any) => {
                    this.onErrorAtenderDenu(res);
                    this.block = false;
                });
        }
    }

    enviarFinalizacionDenuncia() {
        if (this.selectMotfin === undefined) {
            this.onErrorFinalizaDenu('Debe seleccionar el motivo de la finalización.');
        } else if (this.infoObsFin === undefined || this.infoObsFin.length === 0) {
            this.onErrorFinalizaDenu('Debe ingresar una observación para la finalización.');
        } else {
            this.block = true;
            this.consexterService.regFinalizaDenu({
                CodDenuncia: this.selectedResultado[0].serialize,
                codFinaliza: this.selectMotfin.value,
                obsFinaliza: this.infoObsFin
            }).subscribe(
                (res: any) => {
                    this.displayFinalizarDenuncias = false;
                    this.block = false;
                    this.buscarDenuncias();
                },
                (res: any) => {
                    this.onErrorFinalizaDenu(res);
                    this.block = false;
                });
        }
    }

    customRowClass(rowData, rowIndex): string {
        if (rowData.cantInfosoli > 0) {
            return 'rowAmarillo';
        }
        return '';
    }

    private onError(error: any) {
        this.messageList = [];
        this.messageList.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorSolicitaMensaje(error: any) {
        this.messagesSolicitaInformacion = [];
        this.messagesSolicitaInformacion.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorAtenderDenu(error: any) {
        this.messagesAtenderdenu = [];
        this.messagesAtenderdenu.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorFinalizaDenu(error: any) {
        this.messagesFinalizadenu = [];
        this.messagesFinalizadenu.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}
