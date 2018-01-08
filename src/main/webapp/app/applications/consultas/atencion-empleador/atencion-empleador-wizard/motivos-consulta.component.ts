import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
// import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Atencion } from '../../models/atencion.model';
import { Motate } from '../../models/motate.model';
import { Motatenofic } from '../../models/motatenofic.model';
import { Motateselec } from '../../models/motateselec.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';

import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-motivos-consulta',
    templateUrl: './motivos-consulta.component.html'
})
export class MotivosConsultaComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;
    motatenofic: Motatenofic[];
    selectmotatenofic: Motatenofic[];
    motsel: Motateselec;
    motsels: Motateselec[];

    // cols: any[];
    idoficOrigen: number;
    atencion: any;

    checkedsel = [];
    actividadSelec: string;

    fechoy: Date;
    maxlengthDocIdent: number;
    numOficina = 5;

    constructor(
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        private route: ActivatedRoute,
        private router: Router,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {
    }
    loadMotivOfic(idofic) {
        this.atencionEmpleadorService.findListaMotatenOfic(idofic).subscribe(
            (res: ResponseWrapper) => {
                this.motatenofic = res.json;
                console.log('Motivofic: ' + JSON.stringify(this.motatenofic[0]));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    ngOnInit() {
        this.fechoy = new Date();
        this.atencion = new Atencion();
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-empleador']);
                } else if (this.actividadSelec === '3') {
                    // Consultar los motivos generales por oficina y los motivos marcados
                    this.atencionEmpleadorService.findListaMotateSelec(atencion.id, this.numOficina).subscribe(() => {

                    });
                } else {
                    // Cargar los motivos por el código de la oficina de consultas laborales '5'
                    this.loadMotivOfic(this.numOficina);
                    // Consultar de forma interna por los motivos seleccionados
                    this.registroAtencionWizard.motateSeleccionado.subscribe((motatesel) => {
                        this.motsels = motatesel;
                        this.selectmotatenofic = [];
                        if (motatesel.length !== 0) {
                            for (const selmot of motatesel) {
                                this.selectmotatenofic.push(selmot.motatenofic)
                            }
                        }
                    });
                }
            });
        });
        this.registerChangeInMotivos();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
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
        console.log('Save1:' + JSON.stringify(event));
        this.motsel = new Motateselec();
        this.motsel.motatenofic = event.data;
        if (this.motsels.length === 0) {
            this.motsels = [];
        }
        this.motsels.push(this.motsel);
        this.checkedsel.push(event.data.id);
        // console.log('Array1:' + this.checkedsel);
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

    private subscribeToSaveResponse(result: Observable<Motateselec>) {
        result.subscribe((res: Motateselec) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }
    private onSaveSuccess(result: Motateselec) {
        this.loadMotivOfic(this.numOficina);
        // this.eventManager.broadcast({ name: 'moduloEntidadListModification', content: 'OK'});
        // this.isSaving = false;
    }
    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        // this.isSaving = false;
        this.onError(error);
    }

    registerChangeInMotivos() {
        this.eventSubscriber = this.eventManager.subscribe('saveMotivos',
        (response) => {
            console.log('PasarObjetoMot' + JSON.stringify(this.motsels));
            this.registroAtencionWizard.cambiarMotivos(this.motsels);
        });
    }
    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
