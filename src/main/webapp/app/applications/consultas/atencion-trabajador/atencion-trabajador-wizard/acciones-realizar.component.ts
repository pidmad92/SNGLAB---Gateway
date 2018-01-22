import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atencion } from '../../models/atencion.model';
import { Accionadop } from '../../models/accionadop.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';

import { ResponseWrapper } from '../../../../shared';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Datlab } from '../../models/datlab.model';
import { Trabajador } from '../../models/trabajador.model';
import { Empleador } from '../../models/empleador.model';
import { Motcese } from '../../models/motcese.model';
import { Motateselec } from '../../models/motateselec.model';
import { Motatenofic } from '../../models/motatenofic.model';
import { Docpresate } from '../../models/docpresate.model';
import { Docinperdlb } from '../../models/docinperdlb.model';
import { Accadoate } from '../../models/accadoate.model';
import { Tipvinculo } from '../../models/tipvinculo.model';
import { Sucesor } from '../../models/sucesor.model';
import { Oficina } from '../../models/oficina.model';
import { Pasegl } from '../../models/pasegl.model';
import { Pernatural } from '../../models/pernatural.model';
import { Perjuridica } from '../../models/perjuridica.model';

@Component({
    selector: 'jhi-acciones-realizar',
    templateUrl: './acciones-realizar.component.html',
    providers: [ConfirmationService]
})
export class AccionesRealizarComponent implements OnInit, OnDestroy {

    atencion: any;
    datlab: Datlab;
    trabajador: Trabajador;
    trabaja: any;
    empleador: Empleador;
    emplea: any;
    motcese: Motcese;
    sucesor: Sucesor;
    // pase: Pasegl;
    pase: any;

    motateselec: Motateselec[];
    docinperdlb: Docinperdlb[];
    docpresate: Docpresate[];
    accadoate: Accadoate[];

    accionAdopSelecs: Accadoate[];
    accionAdopSelec: Accadoate;

    listAccionAdop: Accionadop[];
    selectListAccionAdop: Accionadop[];

    actividadSelec: string;

    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private subscriptionLista: Subscription;

    fechoy: Date;
    displayDialog: boolean;
    selectedOficina: Oficina;
    oficinas: Oficina[];
    motatenofic: any = [];
    selectmotatenofic: Motatenofic[];
    motsel: Motateselec;
    motsels: Motateselec[];
    checkedsel = [];
    trabajadorx: string;
    empleadorx: string;

    loadAccionadop() {
        this.atencionTrabajadorService.findListaAccionadop().subscribe(
            (res: ResponseWrapper) => {
                this.listAccionAdop = res.json;
                // console.log(JSON.stringify(this.listAccionAdop));
                this.loadAccionadopSelec();
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadAccionadopSelec() {
        this.selectListAccionAdop = [];
        this.registroAtencionWizard.accionaSeleccionado.subscribe((accionadopSelec) => {
            // console.log('ACC:' + JSON.stringify(accionadopSelec));
            this.accionAdopSelecs = accionadopSelec;
            if (accionadopSelec.length !== 0) {
                for (const accion of accionadopSelec) {
                    this.selectListAccionAdop.push(accion.accionadop)
                    // console.log('FOR:' + JSON.stringify(this.selectListAccionAdop) + '||' + JSON.stringify(accion));
                }
                // console.log('SELEC:' + JSON.stringify(this.selectListAccionAdop));
            }
        });
    }

    loadOficinas() {
        this.atencionTrabajadorService.consultaOficinas().subscribe(
            (res: ResponseWrapper) => {
                this.oficinas = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    changeOficina() {
        this.pase.oficina = this.selectedOficina;
        this.loadMotivOfic(this.pase.oficina.id);
    }
    loadMotivOfic(idofic) {
        if (idofic !== undefined) {
            this.atencionTrabajadorService.findListaMotatenOfic(idofic).subscribe(
                (res: ResponseWrapper) => {
                    this.motatenofic = res.json;
                    this.loadMotivSelec();
                    // console.log('Motivofic2: ' + JSON.stringify(this.motatenofic));
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        }
    }
    loadMotivSelec() {
        this.subscriptionLista = this.registroAtencionWizard.motateSeleccionado.subscribe((motatesel) => {
            this.motsels = motatesel;
            // console.log('Motatesel1:' + JSON.stringify(motatesel));
            this.selectmotatenofic = [];
            if (motatesel.length !== 0) {
                for (const selmot of motatesel) {
                    let index = 0;
                    for (const motlist of this.motatenofic) {
                        if (motlist.id === selmot.motatenofic.id) {
                            this.motatenofic[index].observacion = selmot.vObsmoseat;
                        }
                        index++;
                    }
                    this.selectmotatenofic.push(selmot.motatenofic)
                    this.checkedsel.push(selmot.motatenofic.id);
                }
            }
        });
    }
    saveObservacion(event) {
        // console.log('EDIT1' + JSON.stringify(event));
        // console.log('EDIT2' + JSON.stringify(this.motsels));
        let motivocheck = false;
        for (const valid of this.checkedsel) {
            if (valid === event.data.id) {
                motivocheck = true;
            }
        }
        // console.log('MotivoCheck: ' + motivocheck);
        if (motivocheck === true) {
            for (const mots of this.motsels) {
                if ( mots.motatenofic.id === event.data.id) {
                    mots.vObsmoseat = event.data.observacion;
                }
            }
        }else {
            event.data.observacion = '';
        }
        // console.log('Mod' + JSON.stringify(this.motsels));
    }
    saveMotSel(event: any) {
        // console.log('Save1:' + JSON.stringify(event));
        this.motsel = new Motateselec();
        this.motsel.motatenofic = event.data;
        if (this.motsels.length === 0) {
            this.motsels = [];
        }
        this.motsels.push(this.motsel);
        this.checkedsel.push(event.data.id);
        // console.log('Array1:' + JSON.stringify(this.selectmotatenofic));
    }

    deleteMotSel(event: any) {
        // console.log('DEL1' + JSON.stringify(event.data));
        // console.log('DEL2' + JSON.stringify(this.motsels));
        let index = 0;
        for (const mots of this.motsels) {
            if ( mots.motatenofic.id === event.data.id) {
                break;
            }
            index++;
        }
        // console.log('DEL3' + index);
        this.motsels.splice(index, 1);
        this.checkedsel.splice(index, 1);
        // console.log('DEL4' + JSON.stringify(this.motsels));
        // console.log('Array2:' + this.checkedsel);
        // this.moduloEntidadService.delete(id).subscribe((response) => {});
    }
    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private registroAtencionWizard: RegistroAtencionWizardService,
        private router: Router,
        private confirmationService: ConfirmationService,
    ) {
    }

    ngOnInit() {
        this.trabajadorx = '';
        this.empleadorx = '';
        this.pase = new Pasegl();
        this.pase.pernatural = new Pernatural();
        this.pase.perjuridica = new Perjuridica();
        this.loadOficinas();
        this.displayDialog = false;
        this.fechoy = new Date();
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (atencion.vNumticket !== undefined) {
                    this.atencion.vNumticket = atencion.vNumticket.toUpperCase();
                }
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (this.actividadSelec === '3') {
                    // this.atencionTrabajadorService
                } else {
                    this.loadAccionadop();
                    this.registroAtencionWizard.trabajadorSeleccionado.subscribe((trabajador) => {
                        // console.log('Trabajador Final: ' + JSON.stringify(trabajador));
                        this.trabajador = trabajador;
                        this.trabaja = trabajador;
                        if (trabajador.id !== undefined) {
                            this.trabajadorx = this.trabaja.pernatural.vNombres + ' ' +  this.trabaja.pernatural.vApepat + ' ' + this.trabaja.pernatural.vApemat;
                        } else {
                            this.trabajadorx = '';
                        }
                    });
                    this.registroAtencionWizard.empleadorSeleccionado.subscribe((empleador) => {
                        // console.log('empleador Final: ' + JSON.stringify(empleador));
                        this.empleador = empleador;
                        this.emplea = empleador;
                        if (this.empleador.id !== undefined) {
                            if (this.empleador.perjuridica !== null) {
                                this.emplea.perjuridica = empleador.perjuridica;
                                console.log('empleador persona juridica: ' + JSON.stringify(empleador.perjuridica));
                                this.empleadorx = this.emplea.perjuridica.vRazsocial;
                            } else if (this.empleador.pernatural !== null) {
                                this.emplea.pernatural = empleador.pernatural;
                                console.log('empleador persona natural: ' + JSON.stringify(empleador.pernatural));
                                this.empleadorx = this.emplea.pernatural.vNombres + ' ' +  this.emplea.pernatural.vApepat + ' ' + this.emplea.pernatural.vApemat;

                            } else {
                                this.empleadorx = '';
                            }
                        }
                    });
                    this.registroAtencionWizard.datlabSeleccionado.subscribe((datlab) => {
                        // console.log('datlab Final: ' + JSON.stringify(datlab));
                        this.datlab = datlab;
                    });

                    this.registroAtencionWizard.motateSeleccionado.subscribe((motateselec) => {
                        // console.log('motateselec Final: ' + JSON.stringify(motateselec));
                        this.motateselec = motateselec;
                    });
                    this.registroAtencionWizard.docingSeleccionado.subscribe((docinperdlb) => {
                        // console.log('docinperdlb Final: ' + JSON.stringify(docinperdlb));
                        this.docinperdlb = docinperdlb;
                    });
                    this.registroAtencionWizard.docpresSeleccionado.subscribe((docpresate) => {
                        // console.log('docpresate Final: ' + JSON.stringify(docpresate));
                        this.docpresate = docpresate;
                    });
                    this.registroAtencionWizard.accionaSeleccionado.subscribe((accadoate) => {
                        // console.log('accadoate Final: ' + JSON.stringify(accadoate));
                        this.accadoate = accadoate;
                    });
                    this.registroAtencionWizard.sucesorSeleccionado.subscribe((sucesor) => {
                        // console.log('sucesor Final: ' + JSON.stringify(sucesor));
                        this.sucesor = sucesor;
                    });
                }
            });
            this.registerChangeInAccionadops();

        });
    }

    saveAccion(event: any) {
        // console.log('Save1:' + JSON.stringify(event));
        this.accionAdopSelec = new Accionadop();
        this.accionAdopSelec.accionadop = event.data;
        if (this.accionAdopSelecs.length === 0) {
            this.accionAdopSelecs = [];
        }
        this.accionAdopSelecs.push(this.accionAdopSelec);
        // console.log('Array1:' + this.checkedsel);
        // console.log('SAVE' + JSON.stringify(this.accionAdopSelecs));
        this.registroAtencionWizard.cambiarAccionadop(this.accionAdopSelecs);
    }

    deleteAccion(event: any) {
        let index = 0;
        for (const accion of this.accionAdopSelecs) {
            if ( accion.accionadop.id === event.data.id) {
                break;
            }
            index++;
        }
        this.accionAdopSelecs.splice(index, 1);
        this.registroAtencionWizard.cambiarAccionadop(this.accionAdopSelecs);
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }
    grabarDatoslab() {
        this.datlab.trabajador = this.trabajador;
        this.datlab.empleador = this.empleador;
        // this.datlab.tipvinculo = new Tipvinculo();
        // console.log('GrabarDAT' + JSON.stringify(this.datlab));
        this.subscribeToSaveResponse(
            this.atencionTrabajadorService.createDatoslab(this.datlab));
    }
    saveall() {
        this.grabarAtencion(this.datlab);
    }
    grabarAtencion(datlab) {
        // console.log('GrabarAten' + JSON.stringify(this.atencion));
        this.atencion.id = null;
        this.atencion.datlab = datlab;
        this.subscribeToSaveAtencionResponse(
            this.atencionTrabajadorService.createAtencion(this.atencion));
    }
    grabarMotateSelec(aten) {
        for (const motates of this.motateselec) {
            // console.log(motates);
            motates.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createMotateselec(motates));
        }
    }
    grabarAccadoate(aten) {
        for (const accado of this.accadoate) {
            // console.log(accado);
            accado.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createAccadoate(accado));
        }
    }
    grabarDocpresate(aten) {
        for (const docpres of this.docpresate) {
            // console.log(docpres);
            docpres.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createDocpresate(docpres));
        }
    }
    grabarDocinperdlb(datlab) {
        for (const docin of this.docinperdlb) {
            // console.log(docin);
            docin.datlab = datlab;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createDocinperdlb(docin));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datlab>) {
        result.subscribe((res: Datlab) => {
            // console.log('OK');
            this.grabarDocinperdlb(res);
            this.grabarAtencion(res);
            this.router.navigate(['/consultas/atencion-trabajador']);
        }, (res: Response) => this.onError('Error Datlab'));
    }
    private subscribeToSaveAtencionResponse(result: Observable<Atencion>) {
        result.subscribe((res: Atencion) => {
            // console.log('OK-ATEN');
            this.grabarMotateSelec(res);
            this.grabarDocpresate(res);
            this.grabarAccadoate(res);
        }, (res: Response) => this.onError('Error Atencion'));
    }
    private subscribeMotateSelecResponse(result: Observable<Motateselec>) {
        result.subscribe((res: Motateselec) => {
            // console.log('OK-motate');
        }, (res: Response) => this.onError('Error Atencion'));
    }

    confirmar() {
        this.confirmationService.confirm({
            message: '¿Esta seguro de registrar esta atención?',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.grabarDatoslab();
            }
        });
    }

    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe('saveAtencion',
        (response) => {
            this.confirmar();
        });
    }

    private onError(error: any) {
        console.log(error);
        // this.jhiAlertService.error(error.message, null, null);
    }

    close() {
        this.pase = new Pasegl();
        this.displayDialog = false;
    }

    showDialogPase() {
        this.pase = new Pasegl();
        if (this.atencion !== undefined) {
            this.pase.atencion = this.atencion;
        }
        this.displayDialog = true;

    }
}
