import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
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
import { ReginternoService } from './reginterno.service';
import { ValidarUsuarioService } from '../validar-usuario/validarusuario.service';
import { ReginternoModel } from './reginterno.model';
import { ComboModel } from '../../general/combobox.model';
import { UbigeodepaModel } from '../../general/ubigeodepa.model';
import { UbigeoprovModel } from '../../general/ubigeoprov.model';
import { UbigeodistModel } from '../../general/ubigeodist.model';
import { Pernatural } from '../../../entities/pernatural';
import { ES } from './../../applications.constant';

@Component({
    selector: 'jhi-formreginterno',
    templateUrl: './reginterno.component.html',
})

export class ReginternoComponent implements OnInit {
    messagesDenu: Message[] = [];
    messagesEmpleador: Message[] = [];
    messagesTrabajo: Message[] = [];
    messagesDireccion: Message[] = [];
    messagesDenuncia: Message[] = [];
    messagesCalifica: Message[] = [];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    isSaving: boolean;
    displayRepoSunafil: boolean;
    items: MenuItem[];
    msgs: Message[] = [];
    indexTab: number;
    block: boolean;
    disableTab0: boolean;
    disableTab1: boolean;
    disableTab2: boolean;
    disableTab3: boolean;
    disableTab4: boolean;
    nRuc: string;
    formregdenu: ReginternoModel;
    displayNuevaDireccion: boolean;
    departs: ComboModel[];
    provins: ComboModel[];
    distris: ComboModel[];
    tviasLista: ComboModel[];
    tzonasLista: ComboModel[];
    listamotivos: ComboModel[];
    listadetalle: ComboModel[];
    listacalifica: ComboModel[];
    listaorigendenu: ComboModel[];
    messageList: any;
    es: any;
    tipoDocDenu: string;
    numDocDenu: string;
    nombreDenu: string;
    numTelefonoDenu: string;
    correoDenu: string;
    denunte: Pernatural;
    validReg: boolean;
    validRegDenunte: boolean;
    validReserva: boolean;
    @ViewChild('fileDenuncia')
    fileDenuncia: any;

    constructor(
        private eventManager: JhiEventManager,
        private messageService: MessageService,
        private validarrucService: ValidarrucService,
        private regdenuService: RegdenuService,
        private califiService: CalifiService,
        private reginternoService: ReginternoService,
        private validarUsuarioService: ValidarUsuarioService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.indexTab = 0;
        this.block = false;
        this.formregdenu = new ReginternoModel();
        this.disableTab0 = false;
        this.disableTab1 = true;
        this.disableTab2 = true;
        this.disableTab3 = true;
        this.disableTab4 = true;
        this.displayNuevaDireccion = false;
        this.tviasLista = [];
        this.tzonasLista = [];
        this.validReg = false;
        this.validRegDenunte = false;
        this.validReserva = true;
    }

    buscarDenu() {
        if (this.tipoDocDenu === undefined) {
            this.onErrorDenunciante('Debe seleccionar el tipo de documento.');
        } else if (this.numDocDenu === undefined) {
            this.onErrorDenunciante('Ingrese el numero de documento.');
        } else {
            this.block = true;
            this.reginternoService.getPersonaServicio({
                TipoDoc: this.tipoDocDenu,
                vNumdoc: this.numDocDenu,
                vTelefono: this.numTelefonoDenu,
                vEmailper: this.correoDenu
            }).subscribe(
                (res: any) => {
                    this.denunte = res;
                    this.nombreDenu = this.denunte.vNombres + ' ' + this.denunte.vApepat + ' ' + this.denunte.vApemat;
                    this.validRegDenunte = true;
                    this.block = false;
                },
                (res: any) => {
                    this.numDocDenu = '';
                    this.nombreDenu = '';
                    this.onErrorDenunciante('Numero o tipo de documento incorrecto.');
                    this.block = false;
                });
        }
    }

    backDenunciante() {
        this.disableTab0 = false;
        this.disableTab1 = true;
        this.disableTab2 = true;
        this.disableTab3 = true;
        this.disableTab4 = true;
        this.indexTab = 0;
    }

    nextPerJuridica() {
        if (this.validRegDenunte === true) {
            this.disableTab0 = true;
            this.disableTab1 = false;
            this.disableTab2 = true;
            this.disableTab3 = true;
            this.disableTab4 = true;
            this.indexTab = 1;
        } else {
            this.onErrorDenunciante('Debe ingresar un numero de documento valido.');
        }
    }

    backPerJuridica() {
        this.disableTab0 = true;
        this.disableTab1 = false;
        this.disableTab2 = true;
        this.disableTab3 = true;
        this.disableTab4 = true;
        this.indexTab = 1;
    }

    backDatosTrabajo() {
        this.disableTab0 = true;
        this.disableTab1 = true;
        this.disableTab2 = false;
        this.disableTab3 = true;
        this.disableTab4 = true;
        this.indexTab = 2;
    }

    backDatosDenuncia() {
        this.disableTab0 = true;
        this.disableTab1 = true;
        this.disableTab2 = true;
        this.disableTab3 = false;
        this.disableTab4 = true;
        this.indexTab = 3;
    }

    nextDatosTrabajo() {
        if (this.validarPersonaJuridica() === true) {
            this.disableTab0 = true;
            this.disableTab1 = true;
            this.disableTab2 = false;
            this.disableTab3 = true;
            this.disableTab4 = true;
            this.indexTab = 2;
        }
    }

    nextDatosDenuncia() {
        if (this.validarDatosTrabajo() === true) {
            this.block = true;
            this.regdenuService.getMotivosDenuncia().subscribe(
                (res: any) => {
                    this.listamotivos = [];
                    // tslint:disable-next-line:forin
                    for (const i in res) {
                        this.listamotivos.push(new ComboModel(res[i].vDescrip, String(res[i].id), 0));
                    }
                    this.disableTab0 = true;
                    this.disableTab1 = true;
                    this.disableTab2 = true;
                    this.disableTab3 = false;
                    this.disableTab4 = true;
                    this.indexTab = 3;
                    /* */
                    if (this.formregdenu.flagtrabajando === true) {
                        this.formregdenu.flagreservaidentidad = true;
                    } else if (this.formregdenu.flagtrabajando === false) {
                        this.formregdenu.flagreservaidentidad = false;
                    }
                    /* */
                    this.block = false;
                },
                (res: any) => {
                    this.nRuc = '';
                    this.onErrorDatosTrabajo(res);
                    this.block = false;
                });
        }
    }

    onChangeMotivodenuncia() {
        if (this.formregdenu.selectmotivos === undefined) {
            this.onErrorDenuncia('Debe seleccionar un motivo de la denuncia');
        } else {
            this.block = true;
            this.regdenuService.getDetalleMotivosDenuncia(Number(this.formregdenu.selectmotivos.value)).subscribe(
                (res: any) => {
                    console.log(res);
                    this.listadetalle = [];
                    // tslint:disable-next-line:forin
                    for (const i in res) {
                        this.listadetalle.push(new ComboModel(res[i].vDescrip, res[i].id, 0));
                    }
                    this.disableTab0 = true;
                    this.disableTab1 = true;
                    this.disableTab2 = true;
                    this.disableTab3 = false;
                    this.disableTab4 = true;
                    this.indexTab = 3;
                    this.block = false;
                },
                (res: any) => {
                    this.nRuc = '';
                    this.onErrorDenuncia(res);
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
        } else if (this.validReg === false) {
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
        } else if (this.formregdenu.horafin.getTime() < this.formregdenu.horainicio.getTime()) {
            this.onErrorDatosTrabajo('La hora de fin de la jornada de trabajo debe ser mayor a la hora de inicio.');
            return false;
        } else if (this.formregdenu.numerotrabajado === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar el número de trabajo.');
            return false;
        } else if (this.formregdenu.correotrabajador === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar el correo de trabajo.');
            return false;
        } else if (this.formregdenu.flaggruposindical === true && this.formregdenu.organizacionsindical === undefined) {
            this.onErrorDatosTrabajo('Debe ingresar la descripción de la organización sindical.');
            return false;
        } else if (this.formregdenu.flagtrabajando === false) {
            if (this.formregdenu.fechacese === undefined) {
                this.onErrorDatosTrabajo('Debe ingresar la fecha de cese.');
                return false;
            } else if ((this.formregdenu.fechainitrabajo > this.formregdenu.fechacese)) {
                this.onErrorDatosTrabajo('La fecha de inicio de trabajo debe ser menor a la fecha de cese.');
                return false;
            }
        }
        return true;
    }

    validarDatosDenuncias() {
        if (this.formregdenu.flaggruposindical === true && this.formregdenu.numtrabajadores === undefined) {
            this.onErrorDenuncia('Debe ingresar el número de trabajadores afectados.');
        } else if (this.formregdenu.horainiinspec === undefined) {
            this.onErrorDenuncia('Debe ingresar la hora de inicio de la inspección.');
        } else if (this.formregdenu.horafininspec === undefined) {
            this.onErrorDenuncia('Debe ingresar la hora de fin de la inspección.');
        } else if (this.formregdenu.horainiinspec > this.formregdenu.horafininspec) {
            this.onErrorDenuncia('La hora de fin de la inspección no puede ser mayor a la hora de inicio.');
        } else if (this.formregdenu.selectmotivos === undefined) {
            this.onErrorDenuncia('Debe seleccionar el motivo de la inspección.');
        } else if (this.formregdenu.selectdetalle === undefined) {
            this.onErrorDenuncia('Debe seleccionar el detalle del motivo de la inspección.');
        } else if (this.formregdenu.observadenuncia === undefined) {
            this.onErrorDenuncia('Debe ingresar la observación de la denuncia.');
        } else if (this.formregdenu.flagdeclaracionverdadera === undefined) {
            this.onErrorDenuncia('Debe aceptar que la información ingresada es valida.');
        } else {
            this.block = true;
            this.califiService.getCalificas().subscribe(
                (res: any) => {
                    console.log(res);
                    this.reginternoService.getOrigendenuncia().subscribe(
                        (oridenres: any) => {
                            this.listacalifica = [];
                            this.listaorigendenu = [];
                            // tslint:disable-next-line:forin
                            for (const i in res) {
                                this.listacalifica.push(new ComboModel(res[i].vDescripcion, res[i].id, 0));
                            }
                            // tslint:disable-next-line:forin
                            for (const i in oridenres) {
                                this.listaorigendenu.push(new ComboModel(oridenres[i].vDescripcion, oridenres[i].id, 0));
                            }
                            this.disableTab0 = true;
                            this.disableTab1 = true;
                            this.disableTab2 = true;
                            this.disableTab3 = true;
                            this.disableTab4 = false;
                            this.indexTab = 4;
                            this.block = false;
                        },
                        (oridenres: any) => {
                            this.onErrorDenuncia(oridenres);
                            this.block = false;
                        });
                },
                (res: any) => {
                    this.onErrorDenuncia(res);
                    this.block = false;
                });

            /*  */
        }
    }

    validarDatosCalifica() {
        if (this.formregdenu.selectCalifica === undefined || this.formregdenu.selectCalifica.length === 0) {
            this.onErrorCalifica('Debe seleccionar como minimo un tipo de calificación');
        } else if (this.formregdenu.observaCalifica === undefined || this.formregdenu.observaCalifica.length === 0) {
            this.onErrorCalifica('Debe ingresar una observación para la calificación.');
        } else {
            this.block = true;
            const lista: number[] = [];
            // tslint:disable-next-line:forin
            for (const i in this.formregdenu.selectCalifica) {
                lista.push(Number(this.formregdenu.selectCalifica[i].value));
            }
            if (this.formregdenu.flagOtradireccion) {
                this.formregdenu.domicilio = this.formregdenu.domicilio_c;
                this.formregdenu.codVia = Number(this.formregdenu.selectVia.value);
                this.formregdenu.codZona = Number(this.formregdenu.selectZona.value);
                this.formregdenu.coddep = this.formregdenu.coddep_c;
                this.formregdenu.codprov = this.formregdenu.codprov_c;
                this.formregdenu.coddist = this.formregdenu.coddist_c;
            } else {
                this.formregdenu.codVia = Number(this.formregdenu.ddptipvia);
                this.formregdenu.codZona = Number(this.formregdenu.ddptipzon);
                this.formregdenu.domicilio = this.formregdenu.domicilioLegal;
                this.formregdenu.coddep = this.formregdenu.coddep;
                this.formregdenu.codprov = this.formregdenu.codprov;
                this.formregdenu.coddist = this.formregdenu.coddist;
            }
            this.reginternoService.guardarDenunciaInterna({
                numruc: this.formregdenu.numruc,
                ddpnombre: this.formregdenu.ddpnombre,
                domicilioLegal: this.formregdenu.domicilioLegal,
                fechainitrabajo: this.formregdenu.fechainitrabajo,
                flaglun: this.formregdenu.flaglun,
                flagmar: this.formregdenu.flagmar,
                flagmie: this.formregdenu.flagmie,
                flagjue: this.formregdenu.flagjue,
                flagvie: this.formregdenu.flagvie,
                flagsab: this.formregdenu.flagsab,
                flagdom: this.formregdenu.flagdom,
                horainicio: this.formregdenu.horainicio,
                horafin: this.formregdenu.horafin,
                flagtrabajando: this.formregdenu.flagtrabajando,
                flaggruposindical: this.formregdenu.flaggruposindical,
                fechacese: this.formregdenu.fechacese,
                organizacionsindical: this.formregdenu.organizacionsindical,
                codVia: this.formregdenu.codVia,
                codZona: this.formregdenu.codZona,
                ddpnomvia: this.formregdenu.ddpnomvia,
                ddpnomzon: this.formregdenu.ddpnomzon,
                domicilio: this.formregdenu.domicilio,
                codciiu: this.formregdenu.ddpciiu,
                coddep: this.formregdenu.coddep,
                codprov: this.formregdenu.codprov,
                coddist: this.formregdenu.coddist,
                numtrabajadores: this.formregdenu.numtrabajadores,
                descciiu: this.formregdenu.descciiu,
                descsectoeco: this.formregdenu.descsectoeco,
                codsececo: this.formregdenu.ddpsector,
                horainicioinsp: this.formregdenu.horainiinspec,
                horafininsp: this.formregdenu.horafininspec,
                observadenuncia: this.formregdenu.observadenuncia,
                observadenunciadetalle: this.formregdenu.observadenunciadetalle,
                codmotivodenu: this.formregdenu.selectmotivos.value,
                coddetmotivodenu: this.formregdenu.selectdetalle.value,
                flagOtradireccion: this.formregdenu.flagOtradireccion,
                numerotrabajado: this.formregdenu.numerotrabajado,
                correotrabajador: this.formregdenu.correotrabajador,
                flagreservaidentidad: this.formregdenu.flagreservaidentidad,
                codOrigendenu: Number(this.formregdenu.selectOridenu.value),
                listaCalifica: lista,
                observaCalifica: this.formregdenu.observaCalifica.trim(),
                fileString: this.formregdenu.fileString,
                persona: this.denunte
            }).subscribe(
                (dato: ResponseWrapper) => {
                    this.block = false;
                    this.router.navigate(['/denuncias/formconsinterno']);
                },
                (dato: ResponseWrapper) => { this.onErrorDatosTrabajo(dato.json); this.block = false; }
                );
        }
    }

    validarRuc() {
        if (this.nRuc.trim().length <= 0) {
            this.onErrorEmpleador('Debe ingresar el número RUC de la empresa');
        } else if (!((new RegExp('^[0-9]+$')).test(this.nRuc))) {
            this.onErrorEmpleador('Debe ingresar un valor valido');
        } else if (this.nRuc.trim().length !== 11) {
            this.onErrorEmpleador('Debe ingresar un valor valido');
        } else {
            this.block = true;
            this.validarrucService.validarRuc(Number(this.nRuc))
                .subscribe((data) => {
                    if (data === 200) {
                        this.regdenuService.validarserviciosunat({
                            ddp_numruc: this.nRuc
                        }).subscribe(
                            (res: any) => {
                                this.validReg = true;
                                this.formregdenu.numruc = this.nRuc;
                                this.formregdenu.descciiu = res.desc_ciiu;
                                this.formregdenu.descsectoeco = res.desc_sectoeco;
                                this.formregdenu.domicilioLegal = res.domicilioLegal;
                                this.formregdenu.descestado = res.desc_estado;
                                this.formregdenu.ddpnombre = res.ddp_nombre;
                                this.formregdenu.coddep = res.cod_dep;
                                this.formregdenu.descdep = res.desc_dep;
                                this.formregdenu.codprov = String(res.cod_prov).substring(2, String(res.cod_prov).length);
                                this.formregdenu.descprov = res.desc_prov;
                                this.formregdenu.coddist = String(res.cod_dist).substring(4, String(res.cod_dist).length);
                                this.formregdenu.descdist = res.desc_dist;
                                this.formregdenu.ddptipvia = res.ddp_tipvia;
                                this.formregdenu.ddptipzon = res.ddp_tipzon;
                                this.formregdenu.ddpnomvia = res.ddp_nomvia;
                                this.formregdenu.ddpnomzon = res.ddp_nomzon;
                                this.formregdenu.desctpoemp = res.desc_tpoemp;
                                this.formregdenu.descciiu = res.desc_ciiu;
                                this.formregdenu.ddpciiu = res.ddp_ciiu;
                                this.formregdenu.ddpsector = res.ddp_sector;
                                this.block = false;
                            },
                            (res: any) => {
                                this.nRuc = '';
                                this.validReg = false;
                                this.onErrorEmpleador(res);
                                this.block = false;
                            });
                    } else {
                        this.nRuc = '';
                        this.block = false;
                        this.onErrorEmpleador('Esta empresa no es parte de la competencia del Ministerio de trabajo y promocion del empleo.');
                    }
                },
                (data: any) => {
                    this.nRuc = '';
                    this.onErrorEmpleador(data);
                    this.block = false;
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
            this.block = false;
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

    handleInputChange(e) {
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        if (file.size > 0) {
            if ((Number(file.size) / 1000) < 5000) {
                const reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsDataURL(file);
            } else {
                this.fileDenuncia.nativeElement.value = '';
                this.onErrorDenuncia('El archivo no puede ser mayor de 5 megas.');
            }
        }
    }

    _handleReaderLoaded(e) {
        const reader = e.target;
        this.formregdenu.fileString = reader.result.split(',')[1];
        console.log(this.formregdenu.fileString);
    }
    private onErrorDenunciante(error: any) {
        this.messagesDenu = [];
        this.messagesDenu.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
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
    private onErrorCalifica(error: any) {
        this.messagesCalifica = [];
        this.messagesCalifica.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}
