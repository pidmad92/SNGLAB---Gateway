import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../../../../shared';

import { Datlab } from '../../models/datlab.model';
import { Docinperdlb } from '../../models/docinperdlb.model';
import { Docingrper } from '../../models/docingrper.model';
import { Motcese } from '../../models/motcese.model';
import { Regimenlab } from '../../models/regimenlab.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { Motivocese } from '../../../../entities/motivocese/index';
import { Modcontrato } from '../../models/modcontrato.model';

@Component({
    selector: 'jhi-vinculo-laboral',
    templateUrl: './vinculo-laboral.component.html'
})
export class VinculoLaboralComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    atencion: any;
    datosLab: Datlab;
    motivcese: Motcese[];
    modcontrato: Modcontrato[];
    motCese: Motcese;
    regimenlab: Regimenlab[] = [];

    documentoIngSelecs: Docinperdlb[];
    documentoIngSelec: Docinperdlb;

    listDocumentosIng: Docingrper[];
    selectListDocumentoIng: Docingrper[];

    documentosIngresos: any;
    selDocumentos: any;
    actividadSelec: string;

    viewAnotherMotiv = false;
    nuevoMotivo = '';

    checkedsel = [];
    fechoy: Date;
    tipoVinculo = '1';

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {}
    loadRegimenlab() {
        this.atencionTrabajadorService.findListaRegimenlab().subscribe(
            (res: ResponseWrapper) => {
                this.regimenlab = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadMotivCese(motiv?) {
        this.atencionTrabajadorService.findListaMotivcese().subscribe(
            (res: ResponseWrapper) => {
                this.motivcese = res.json;
                // console.log('Motivcese:' + JSON.stringify(this.motivcese));
                if (motiv !== undefined) {
                    this.atencion.datlab.motcese = motiv;
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadModcontrato() {
        this.atencionTrabajadorService.findListaModContrato().subscribe(
            (res: ResponseWrapper) => {
                this.modcontrato = res.json;
                // console.log('Modcontrato:' + JSON.stringify(this.modcontrato));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDocingper() {
        this.atencionTrabajadorService.findListaDocumentosPercibidosActivos().subscribe(
            (res: ResponseWrapper) => {
                this.listDocumentosIng = res.json;
                this.loadDocingSelec();
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDocingSelec() {
        // Consultar de forma interna por los documentos de ingreso seleccionados
        this.registroAtencionWizard.docingSeleccionado.subscribe((documentoIngSelec) => {
            // console.log('DOCS:' + JSON.stringify(documentoIngSelec))
            this.documentoIngSelecs = documentoIngSelec;
            this.selectListDocumentoIng = [];
            if (documentoIngSelec.length !== 0) {
                for (const docing of documentoIngSelec) {
                    this.selectListDocumentoIng.push(docing.docingrper)
                }
            }
        });
    }

    changeTipoVinculo() {
        if (this.tipoVinculo === '1') {
            this.atencion.datlab.nFlgsitlab = true;
        } else {
            this.atencion.datlab.nFlgsitlab = false;
        }
        this.registroAtencionWizard.cambiarDatlab(this.atencion.datlab);
    }

    ngOnInit() {
        this.fechoy = new Date();
        this.regimenlab = [];
        this.loadMotivCese();
        this.loadRegimenlab();
        this.loadModcontrato();
        // Cargar los documentos de ingresos percibidos
        this.loadDocingper();
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
                    // console.log('AtencionVinculo:' + JSON.stringify(this.atencion));
                    if (atencion.datlab !== undefined ) {
                        console.log('AC.');
                        // this.datosLab  = atencion.datlab;
                        this.atencion.datlab = atencion.datlab;
                        // console.log('Situacion Laboral: ' + this.datosLab.nFlgsitlab);
                        console.log('ATENCIONDATLAB: ' + JSON.stringify(atencion.datlab));
                        if (this.atencion.datlab.nFlgsitlab) {
                            this.tipoVinculo = '1';
                        } else {
                            this.tipoVinculo = '0';
                        }

                        if (atencion.datlab.id !== undefined) {
                            console.log('AB.');
                            // this.atencion.datlab = new Datlab();
                            this.atencion.datlab.modcontrato = null;
                            this.atencion.datlab.dFecvincul = null;
                            this.atencion.datlab.dFeccese = null;
                            this.atencion.datlab.dFecfincon = null;
                            this.atencion.datlab.id = undefined;
                            this.atencion.datlab.regimenlab = new Regimenlab();
                            this.atencion.datlab.motcese = new Motcese();
                            this.atencion.datlab.nFlgsitlab = true;
                            this.tipoVinculo = '1';
                        }
                    } else {
                        // console.log('No hay Datlab');
                        this.atencion.datlab = new Datlab();
                        // this.atencion.datlab.nFlgsitlab = '2';
                        // this.atencion.datlab.nFlgsitlab = 1;
                        // this.tipoVinculo = 1;
                    }
                }
            });
            });
        this.registerChangeInDocing();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventSubscriber.unsubscribe();
    }

    registerChangeInDocing() {
        this.eventSubscriber = this.eventManager.subscribe('saveDocing',
        (response) => {
            // console.log('Atencion' + JSON.stringify(this.atencion));
            this.registroAtencionWizard.cambiarDocumentosIng(this.documentoIngSelecs);
            this.registroAtencionWizard.cambiarDatlab(this.atencion.datlab);
        });
    }

    selectMotivCese(data) {
        if (data.value === '0') {
            this.viewAnotherMotiv = true;
        }
    }

    saveMotivCese() {
        if (this.nuevoMotivo !== '') {
            this.motCese = new Motcese();
            this.motCese.vDesmotces = this.nuevoMotivo
            this.subscribeToSaveResponse(
                this.atencionTrabajadorService.createMotivCese(this.motCese));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motcese>) {
        result.subscribe(
            // (res: Motcese) => { this.viewAnotherMotiv = false; this.loadMotivCese(res); console.log(res); },
            (res: Motcese) => { this.viewAnotherMotiv = false; this.loadMotivCese(res); },
            (res: Response) => this.onSaveError()
        );
    }

    private onSaveError() {
    }

    onRowSelect(event) {
    }

    saveDoc(event: any) {
        // console.log('Save1:' + JSON.stringify(event));
        this.documentoIngSelec = new Docingrper();
        this.documentoIngSelec.docingrper = event.data;
        if (this.documentoIngSelecs.length === 0) {
            this.documentoIngSelecs = [];
        }
        this.documentoIngSelecs.push(this.documentoIngSelec);
        this.checkedsel.push(event.data.id);
        // console.log('Array1:' + this.checkedsel);
    }

    deleteDoc(event: any) {
        let index = 0;
        for (const docing of this.documentoIngSelecs) {
            if ( docing.docingrper.id === event.data.id) {
                break;
            }
            index++;
        }
        this.documentoIngSelecs.splice(index, 1);
        this.checkedsel.splice(index, 1);
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }

}
