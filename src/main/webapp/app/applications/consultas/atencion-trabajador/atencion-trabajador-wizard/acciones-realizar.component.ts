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
import { Docpresate } from '../../models/docpresate.model';
import { Docinperdlb } from '../../models/docinperdlb.model';
import { Accadoate } from '../../models/accadoate.model';
import { Tipvinculo } from '../../models/tipvinculo.model';
import { Sucesor } from '../../models/sucesor.model';

@Component({
    selector: 'jhi-acciones-realizar',
    templateUrl: './acciones-realizar.component.html',
    providers: [ConfirmationService]
})
export class AccionesRealizarComponent implements OnInit, OnDestroy {

    atencion: any;
    datlab: Datlab;
    trabajador: Trabajador;
    empleador: Empleador;
    motcese: Motcese;
    sucesor: Sucesor;

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

    fechoy: Date;

    loadAccionadop() {
        this.atencionTrabajadorService.findListaAccionadop().subscribe(
            (res: ResponseWrapper) => {
                this.listAccionAdop = res.json;
                console.log(JSON.stringify(this.listAccionAdop));
                this.loadAccionadopSelec();
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadAccionadopSelec() {
        this.selectListAccionAdop = [];
        this.registroAtencionWizard.accionaSeleccionado.subscribe((accionadopSelec) => {
            console.log('ACC:' + JSON.stringify(accionadopSelec));
            this.accionAdopSelecs = accionadopSelec;
            if (accionadopSelec.length !== 0) {
                for (const accion of accionadopSelec) {
                    this.selectListAccionAdop.push(accion.accionadop)
                    console.log('FOR:' + JSON.stringify(this.selectListAccionAdop) + '||' + JSON.stringify(accion));
                }
                console.log('SELEC:' + JSON.stringify(this.selectListAccionAdop));
            }
        });
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
                        this.trabajador = trabajador;
                    });
                    this.registroAtencionWizard.empleadorSeleccionado.subscribe((empleador) => {
                        this.empleador = empleador;
                    });
                    this.registroAtencionWizard.datlabSeleccionado.subscribe((datlab) => {
                        this.datlab = datlab;
                    });

                    this.registroAtencionWizard.motateSeleccionado.subscribe((motateselec) => {
                        this.motateselec = motateselec;
                    });
                    this.registroAtencionWizard.docingSeleccionado.subscribe((docinperdlb) => {
                        this.docinperdlb = docinperdlb;
                    });
                    this.registroAtencionWizard.docpresSeleccionado.subscribe((docpresate) => {
                        this.docpresate = docpresate;
                    });
                    this.registroAtencionWizard.accionaSeleccionado.subscribe((accadoate) => {
                        this.accadoate = accadoate;
                    });
                    this.registroAtencionWizard.sucesorSeleccionado.subscribe((sucesor) => {
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
        console.log('SAVE' + JSON.stringify(this.accionAdopSelecs));
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
        console.log('GrabarDAT' + JSON.stringify(this.datlab));
        this.subscribeToSaveResponse(
            this.atencionTrabajadorService.createDatoslab(this.datlab));
    }
    grabarAtencion(datlab) {
        console.log('GrabarAten' + JSON.stringify(this.atencion));
        this.atencion.id = null;
        this.atencion.datlab = datlab;
        this.subscribeToSaveAtencionResponse(
            this.atencionTrabajadorService.createAtencion(this.atencion));
    }
    grabarMotateSelec(aten) {
        for (const motates of this.motateselec) {
            console.log(motates);
            motates.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createMotateselec(motates));
        }
    }
    grabarAccadoate(aten) {
        for (const accado of this.accadoate) {
            console.log(accado);
            accado.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createAccadoate(accado));
        }
    }
    grabarDocpresate(aten) {
        for (const docpres of this.docpresate) {
            console.log(docpres);
            docpres.atencion = aten;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createDocpresate(docpres));
        }
    }
    grabarDocinperdlb(datlab) {
        for (const docin of this.docinperdlb) {
            console.log(docin);
            docin.datlab = datlab;
            this.subscribeMotateSelecResponse(
                this.atencionTrabajadorService.createDocinperdlb(docin));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datlab>) {
        result.subscribe((res: Datlab) => {
            console.log('OK');
            this.grabarDocinperdlb(res);
            this.grabarAtencion(res);
        }, (res: Response) => this.onError('Error Datlab'));
    }
    private subscribeToSaveAtencionResponse(result: Observable<Atencion>) {
        result.subscribe((res: Atencion) => {
            console.log('OK-ATEN');
            this.grabarMotateSelec(res);
            this.grabarDocpresate(res);
            this.grabarAccadoate(res);
        }, (res: Response) => this.onError('Error Atencion'));
    }
    private subscribeMotateSelecResponse(result: Observable<Motateselec>) {
        result.subscribe((res: Motateselec) => {
            console.log('OK-motate');
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
}
