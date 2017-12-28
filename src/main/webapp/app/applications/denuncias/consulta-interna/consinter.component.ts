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
    messagesSolicitaInformacion: any;
    messagesAtenderdenu: any;
    messagesFinalizadenu: any;
    criterioBus: number;
    criterioTipoDoc: string;
    criterioNumDoc: string;
    criterioTipoDocDenu: string;
    criterioNumDocDenu: string;
    listaResultado: ConsinterModel[];
    selectedResultado: ConsinterModel[];
    listaRespuestas: ConsinterModel[];
    es: any;
    @LocalStorage('serialize')
    serialize: number;
    displayInfoAdicional: boolean;
    displayAtenderDenuncias: boolean;
    displayFinalizarDenuncias: boolean;
    infoSolicitada: string;
    listaMotfin: ComboModel[];
    selectMotfin: ComboModel;
    listaOrigen: ComboModel[];
    selectOrigen: ComboModel;
    infoObsFin: string;
    fechaInicio: Date;
    fechaFin: Date;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private califiService: CalifiService,
        private consinterService: ConsinterService,
        private validarUsuarioService: ValidarUsuarioService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.block = true;
        this.consinterService.getOrigendenuncia().subscribe(
            (res: any) => {
                this.listaOrigen = [];
                // tslint:disable-next-line:forin
                for (const i in res) {
                    this.listaOrigen.push(new ComboModel(res[i].vDescripcion, String(res[i].id), 0));
                }
                this.selectOrigen = undefined;
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
            },
            (res: any) => {
                this.onError(res);
                this.block = false;
            });
    }

    consultaInformacionAdicional() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar una sola denuncia.');
        } else {
            this.block = true;
            this.consinterService.getFiltroInfoSoli({
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

    buscarDenuncias() {
        console.log(this.criterioBus);
        switch (Number(this.criterioBus)) {
            case 0:
                if (this.criterioTipoDoc === undefined) {
                    this.onError('Debe seleccionar el tipo de documento');
                } else if (this.criterioNumDoc === undefined || this.criterioNumDoc.trim().length === 0) {
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
            case 1:
                if (this.criterioTipoDocDenu === undefined) {
                    this.onError('Debe seleccionar el tipo de documento del denunciante');
                } else if (this.criterioNumDocDenu === undefined || this.criterioNumDocDenu.trim().length === 0) {
                    this.onError('Debe ingresar el numero de documento del denunciante');
                } else {
                    this.block = true;
                    this.consinterService.getFiltro({
                        criterio: this.criterioBus,
                        tipoDoc: this.criterioTipoDocDenu,
                        numDoc: this.criterioNumDocDenu
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
            case 2:
                if (this.fechaInicio === undefined) {
                    this.onError('Debe ingresar la fecha de inicio');
                } else if (this.fechaFin === undefined) {
                    this.onError('Debe ingresar la fecha de fin');
                } else {
                    this.block = true;
                    this.consinterService.getFiltro({
                        criterio: this.criterioBus,
                        fecInicio: this.formattedDate(this.fechaInicio),
                        fecFin: this.formattedDate(this.fechaFin)
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
            case 3:
                if (this.selectOrigen === undefined) {
                    this.onError('Debe seleccionar el tipo de origen de la denuncia');
                } else {
                    this.block = true;
                    this.consinterService.getFiltro({
                        criterio: this.criterioBus,
                        serialize: this.selectOrigen.value
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

    formattedDate(d: Date): string {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return `${day}/${month}/${year}`;
    }

    enviarConsulta() {
        if (this.infoSolicitada === undefined || this.infoSolicitada.length === 0) {
            this.onErrorSolicitaMensaje('Debe ingresar la informacion solicitada.');
        } else {
            this.block = true;
            this.consinterService.regInfoSoli({
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

    enviarAtencion() {
        if (this.selectedResultado.length < 1) {
            this.onError('Debe seleccionar como minimo una denuncia.');
        } else {
            const codList: number[] = [];
            // tslint:disable-next-line:forin
            for (const i in this.selectedResultado) {
                codList.push(this.selectedResultado[i].serialize);
            }
            this.consinterService.regAtenderDenu({
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
            let rpt = false;
            // tslint:disable-next-line:forin
            for (const i in this.selectedResultado) {
                if (this.selectedResultado[i].estado === 'Atendido'
                    || this.selectedResultado[i].estado === 'Finalizado'
                ) {
                    rpt = true;
                    break;
                }
            }
            if (rpt) {
                this.onError('Solo debe seleccionar denuncias en estado "Calificado".');
            } else {
                this.displayAtenderDenuncias = true;
            }
        }
    }

    finalizaDenuncia() {
        if (this.selectedResultado.length < 1 || this.selectedResultado.length > 1) {
            this.onError('Debe seleccionar como minimo una denuncia.');
        } else {
            let rpt = false;
            // tslint:disable-next-line:forin
            for (const i in this.selectedResultado) {
                if (this.selectedResultado[i].estado === 'Atendido'
                    || this.selectedResultado[i].estado === 'Finalizado'
                ) {
                    rpt = true;
                    break;
                }
            }
            if (rpt) {
                this.onError('Solo debe seleccionar denuncias en estado "Calificado".');
            } else {
                this.block = true;
                this.consinterService.getFiltroMotFin().subscribe(
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
    }

    enviarFinalizacionDenuncia() {
        if (this.selectMotfin === undefined) {
            this.onErrorFinalizaDenu('Debe seleccionar el motivo de la finalización.');
        } else if (this.infoObsFin === undefined || this.infoObsFin.length === 0) {
            this.onErrorFinalizaDenu('Debe ingresar una observación para la finalización.');
        } else {
            this.block = true;
            this.consinterService.regFinalizaDenu({
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

    nuevaDenuncia() {
        this.router.navigate(['/denuncias/formreginterno']);
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
