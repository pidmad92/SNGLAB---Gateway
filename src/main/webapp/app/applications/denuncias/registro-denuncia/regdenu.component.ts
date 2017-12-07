import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';
import { MenuItem } from 'primeng/primeng';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ValidarrucService } from '../validar-ruc/validarruc.service';
import { RegdenuService } from './regdenu.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';
import { RegdenuModel } from './regdenu.model';
import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-formregdenuncia',
    templateUrl: './regdenu.component.html',
})

export class RegdenuComponent implements OnInit {
    messagesEmpleador: Message[] = [];
    messagesTrabajo: Message[] = [];
    messagesDireccion: Message[] = [];
    messagesDenuncia: Message[] = [];
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
    disableTab3: boolean;
    nRuc: string;
    formregdenu: RegdenuModel;
    displayNuevaDireccion: boolean;
    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];
    tviasLista: ComboModel[];
    tzonasLista: ComboModel[];
    messageList: any;
    es: any;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private validarUsuarioService: ValidarUsuarioService,
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.indexTab = 0;
        this.block = false;
        this.formregdenu = new RegdenuModel();
        this.disableTab1 = false;
        this.disableTab2 = true;
        this.disableTab3 = true;
        this.displayNuevaDireccion = false;
        this.tviasLista = [];
        this.tzonasLista = [];
    }

    backPerJuridica() {
        this.disableTab1 = false;
        this.disableTab2 = true;
        this.disableTab3 = true;
        this.indexTab = 0;
    }

    backDatosTrabajo() {
        this.disableTab1 = true;
        this.disableTab2 = false;
        this.disableTab3 = true;
        this.indexTab = 1;
    }

    nextDatosTrabajo() {
        if (this.validarPersonaJuridica() === true) {
            this.disableTab1 = true;
            this.disableTab2 = false;
            this.disableTab3 = true;
            this.indexTab = 1;
        }
    }

    nextDatosDenuncia() {
        if (this.validarDatosTrabajo() === true) {
            this.regdenuService.getMotivosDenuncia().subscribe(
                (res: any) => {
                    console.log(res);
                    this.provins = [];
                    // tslint:disable-next-line:forin
                    for (const i in res) {
                        this.provins.push(new ComboModel(res[i].vDescrip, res[i].vCodpro, 0));
                    }
                    this.disableTab1 = true;
                    this.disableTab2 = true;
                    this.disableTab3 = false;
                    this.indexTab = 2;
                    this.block = false;
                },
                (res: any) => {
                    this.nRuc = '';
                    this.onErrorDatosTrabajo(res);
                    this.block = false;
                });
        }
    }

    validarPersonaJuridica(): boolean {
        if (this.nRuc === undefined) {
            this.onErrorEmpleador('Debe ingresar el número RUC de la empresa.');
            return false;
        } else if (this.formregdenu.ddpnombre === undefined) {
            this.onErrorEmpleador('Debe ingresar el número RUC de la empresa valido.');
            return false;
        } else {
            return true;
        }
    }

    validarDatosTrabajo(): boolean {
        if (this.formregdenu.fechainitrabajo === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la fecha de inicio del trabajo.');
            return false;
        } else if (this.formregdenu.flaglun === false &&
            this.formregdenu.flagmar === false &&
            this.formregdenu.flagmie === false &&
            this.formregdenu.flagjue === false &&
            this.formregdenu.flagvie === false &&
            this.formregdenu.flagsab === false &&
            this.formregdenu.flagdom === false
        ) {
            this.onErrorDatosTrabajo('Debe seleccionar como minimo un día de trabajo.');
            return false;
        } else if (this.formregdenu.horainicio === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la hora de inicio de trabajo.');
            return false;
        } else if (this.formregdenu.horafin === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la hora de fin de trabajo.');
            return false;
        } else if (this.formregdenu.numerotrabajado === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar el número de trabajo.');
            return false;
        } else if (this.formregdenu.correotrabajador === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar el correo de trabajo.');
            return false;
        } else if (this.formregdenu.flagtrabajando === false && this.formregdenu.fechacese === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la fecha de cese.');
            return false;
        } else if (this.formregdenu.flaggruposindical === true && this.formregdenu.organizacionsindical === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la descripción de la organización sindical.');
            return false;
        }
        return true;
    }

    validarDatosDenuncias() {
        if (this.formregdenu.horainiinspec === undefined) {
            this.onErrorDenuncia('Debe ingresar la hora de inicio de la inspección.');
        } else if (this.formregdenu.horafininspec === undefined) {
            this.onErrorDenuncia('Debe ingresar la hora de fin de la inspección.');
        } else if (this.formregdenu.selectmotivos === undefined) {
            this.onErrorDenuncia('Debe seleccionar el motivo de la inspección.');
        } else if (this.formregdenu.selectdetalle === undefined) {
            this.onErrorDenuncia('Debe seleccionar el detalle del motivo de la inspección.');
        } else if (this.formregdenu.observadenuncia === undefined) {
            this.onErrorDenuncia('Debe ingresar la observación de la denuncia.');
        } else if (this.formregdenu.flagdeclaracionverdadera === undefined) {
            this.onErrorDenuncia('Debe aceptar que la información ingresada es valida.');
        } else {
            console.log(this.formregdenu);
        }
    }

    validarRuc() {
        this.block = true;
        if (this.nRuc.trim().length <= 0) {
            this.onErrorEmpleador('Debe ingresar el número RUC de la empresa');
        } else if (!((new RegExp('^[0-9]+$')).test(this.nRuc))) {
            this.onErrorEmpleador('Debe ingresar un valor valido');
        } else if (this.nRuc.trim().length !== 11) {
            this.onErrorEmpleador('Debe ingresar un valor valido');
        } else {
            this.validarrucService.validarRuc(Number(this.nRuc))
                .subscribe((data) => {
                    if (data === 200) {
                        this.regdenuService.validarserviciosunat({
                            ddp_numruc: this.nRuc
                        }).subscribe(
                            (res: any) => {
                                console.log(res);
                                this.formregdenu.descciiu = res.desc_ciiu;
                                this.formregdenu.descsectoeco = res.desc_sectoeco;
                                this.formregdenu.domicilioLegal = res.domicilioLegal;
                                this.formregdenu.descestado = res.desc_estado;
                                this.formregdenu.ddpnombre = res.ddp_nombre;
                                this.formregdenu.coddep = res.cod_dep;
                                this.formregdenu.descdep = res.desc_dep;
                                this.formregdenu.codprov = res.cod_prov;
                                this.formregdenu.descprov = res.desc_prov;
                                this.formregdenu.coddist = res.cod_dist;
                                this.formregdenu.descdist = res.desc_dist;
                                this.formregdenu.ddptipvia = res.ddp_tipvia;
                                this.formregdenu.ddptipzon = res.ddp_tipzon;
                                this.formregdenu.ddpnomvia = res.ddp_nomvia;
                                this.formregdenu.ddpnomzon = res.ddp_nomzon;
                                this.formregdenu.desctpoemp = res.desc_tpoemp;
                                this.formregdenu.descciiu = res.desc_ciiu;
                                this.block = false;
                            },
                            (res: any) => {
                                this.nRuc = '';
                                this.onErrorEmpleador(res);
                                this.block = false;
                            });
                    } else {
                        this.nRuc = '';
                        this.block = false;
                        this.onErrorEmpleador('Esta empresa no es parte de la competencia del Ministerio de trabajo y promocion del empleo.');
                    }
                });
        }
    }

    onChangeDepartamento() {
        this.block = true;
        this.messageList = [];
        if (this.formregdenu.selectDepa === undefined) {
            this.onErrorDireccion('Debe seleccionar un departamento');
            this.block = false;
        } else {
            this.validarUsuarioService.consultaProvs(this.formregdenu.selectDepa.value).subscribe(
                (tprovs: ResponseWrapper) => {
                    this.provins = [];
                    // tslint:disable-next-line:forin
                    for (const i in tprovs) {
                        this.provins.push(new ComboModel(tprovs[i].vDespro, tprovs[i].vCodpro, 0));
                    }
                    this.block = false;
                },
                (tprovs: ResponseWrapper) => { this.onErrorDireccion(tprovs.json); this.block = false; }
            );
        }
    }

    onChangeProvincia() {
        this.block = true;
        this.messageList = [];
        if (this.formregdenu.selectDepa === undefined) {
            this.onErrorDireccion([{ severity: 'error', summary: 'Mensaje de Error', detail: 'Debe seleccionar un departamento' }]);
            this.block = false;
        } else if (this.formregdenu.selectProv === undefined) {
            this.onErrorDireccion('Debe seleccionar una provincia');
            this.block = false;
        } else {
            this.validarUsuarioService.consultaDists(this.formregdenu.selectDepa.value, this.formregdenu.selectProv.value).subscribe(
                (tdists: ResponseWrapper) => {
                    this.distris = [];
                    // tslint:disable-next-line:forin
                    for (const i in tdists) {
                        this.distris.push(new ComboModel(tdists[i].vDesdis, tdists[i].vCoddis, 0));
                    }
                    this.block = false;
                },
                (tdists: ResponseWrapper) => { this.onErrorDireccion(tdists.json); this.block = false; }
            );
        }
    }

    displayModalDireccion() {
        this.block = true;
        this.validarUsuarioService.consultaDepas().subscribe(
            (deps: any) => {
                this.validarUsuarioService.consultaTVia().subscribe(
                    (tvias: ResponseWrapper) => {
                        this.validarUsuarioService.consultaTZona().subscribe(
                            (tzonas: ResponseWrapper) => {
                                this.departs = [];
                                // tslint:disable-next-line:forin
                                for (const i in deps) {
                                    this.departs.push(new ComboModel(deps[i].vDesdep, deps[i].vCoddep, 0));
                                }
                                this.tviasLista = tvias.json;
                                this.tzonasLista = tzonas.json;
                                this.block = false;
                                this.displayNuevaDireccion = true;
                            },
                            (tzonas: ResponseWrapper) => { this.onErrorDireccion(tzonas.json); this.block = false; }
                        );
                    },
                    (tvias: ResponseWrapper) => { this.onErrorDireccion(tvias.json); this.block = false; }
                );
            },
            (res: ResponseWrapper) => { this.onErrorDireccion(res.json); this.block = false; }
        );
    }

    cancelarAgregaDireccion() {
        this.displayNuevaDireccion = false;
        this.formregdenu.selectVia = undefined;
        this.formregdenu.ddpnomvia_c = undefined;
        this.formregdenu.selectZona = undefined;
        this.formregdenu.ddpnomzon_c = undefined;
        this.formregdenu.domicilio_c = undefined;
        this.formregdenu.selectDepa = undefined;
        this.formregdenu.selectProv = undefined;
        this.formregdenu.selectDist = undefined;
        this.formregdenu.domicilioLegal_c = undefined;
    }

    agregarDireccion() {
        this.messagesDireccion = [];
        if (this.formregdenu.selectVia === undefined) {
            this.onErrorDireccion('Debe seleccionar una via.');
        } else if (this.formregdenu.ddpnomvia_c === undefined || this.formregdenu.ddpnomvia_c.trim().length === 0) {
            this.onErrorDireccion('Debe ingresar la descripcion de una via.');
        } else if (this.formregdenu.selectZona === undefined) {
            this.onErrorDireccion('Debe seleccionar una zona.');
        } else if (this.formregdenu.ddpnomzon_c === undefined || this.formregdenu.ddpnomzon_c.trim().length === 0) {
            this.onErrorDireccion('Debe ingresar la descripcion de una zona.');
        } else if (this.formregdenu.domicilio_c === undefined || this.formregdenu.domicilio_c.trim().length === 0) {
            this.onErrorDireccion('Debe ingresar el resto de la dirección.');
        } else if (this.formregdenu.selectDepa === undefined) {
            this.onErrorDireccion('Debe seleccionar un departamento.');
        } else if (this.formregdenu.selectProv === undefined) {
            this.onErrorDireccion('Debe seleccionar la provincia.');
        } else if (this.formregdenu.selectDist === undefined) {
            this.onErrorDireccion('Debe seleccionar el distrito.');
        } else {
            this.formregdenu.descdep_c = this.formregdenu.selectDepa.name;
            this.formregdenu.descprov_c = this.formregdenu.selectProv.name;
            this.formregdenu.descdist_c = this.formregdenu.selectDist.name;
            this.formregdenu.coddep_c = this.formregdenu.selectDepa.value;
            this.formregdenu.codprov_c = this.formregdenu.selectProv.value;
            this.formregdenu.coddist_c = this.formregdenu.selectDist.value;
            this.formregdenu.ddptipvia_c = this.formregdenu.selectVia.value;
            this.formregdenu.ddptipzon_c = this.formregdenu.selectZona.value;
            this.displayNuevaDireccion = false;
            this.formregdenu.flagOtradireccion = true;
        }
    }

    onKeyDireccion(value: string) {
        let dir: string;
        dir = '';
        if (this.formregdenu.selectVia !== undefined) {
            dir += this.formregdenu.selectVia.name + ' ';
            dir += this.formregdenu.ddpnomvia_c + ' ';
        }
        if (this.formregdenu.selectZona !== undefined) {
            dir += this.formregdenu.selectZona.name + ' ';
            dir += this.formregdenu.ddpnomzon_c + ' ';
        }
        dir += this.formregdenu.domicilio_c;
        this.formregdenu.domicilioLegal_c = dir;
    }

    private onErrorEmpleador(error: any) {
        this.messagesEmpleador = [];
        this.messagesEmpleador.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorDatosTrabajo(error: any) {
        this.messagesTrabajo = [];
        this.messagesTrabajo.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorDireccion(error: any) {
        this.messagesDireccion = [];
        this.messagesDireccion.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
    private onErrorDenuncia(error: any) {
        this.messagesDenuncia = [];
        this.messagesDenuncia.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}
