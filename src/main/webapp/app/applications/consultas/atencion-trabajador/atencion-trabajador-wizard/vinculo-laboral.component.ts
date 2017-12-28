
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
    regimenlab: Regimenlab[];

    documentoIngSelecs: Docinperdlb[];
    documentoIngSelec: Docinperdlb;

    listDocumentosIng: Docingrper[];
    selectListDocumentoIng: Docingrper[];

    documentosIngresos: any;
    selDocumentos: any;
    actividadSelec: string;

    checkedsel = [];

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
    loadMotivCese() {
        this.atencionTrabajadorService.findListaMotivcese().subscribe(
            (res: ResponseWrapper) => {
                this.motivcese = res.json;
                console.log('Motivcese:' + JSON.stringify(this.motivcese));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDocingper() {
        this.atencionTrabajadorService.findListaDocumentosPercibidosActivos().subscribe(
            (res: ResponseWrapper) => {
                this.listDocumentosIng = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadMotivCese();
        this.loadRegimenlab();
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (this.actividadSelec === '3') {
                    // this.atencionTrabajadorService
                } else {
                    // Cargar los documentos de ingresos percibidos
                    this.loadDocingper();
                    console.log('AtencionVinculo:' + JSON.stringify(this.atencion));
                    if (atencion.datlab !== undefined ) {
                        this.datosLab  = atencion.datlab;
                    }
                    // Consultar de forma interna por los motivos seleccionados
                    this.registroAtencionWizard.docingSeleccionado.subscribe((documentoIngSelec) => {
                        this.documentoIngSelecs = documentoIngSelec;
                        this.documentosIngresos = [];
                        if (documentoIngSelec.length !== 0) {
                            for (const docing of documentoIngSelec) {
                                this.documentosIngresos.push(docing.docingrper)
                            }
                        }
                    });
                }
            });
        });
        this.registerChangeInDocing();
    }

    saveMotSel(event: any) {
        console.log('Save1:' + JSON.stringify(event));
        this.documentoIngSelec = new Docingrper();
        this.documentoIngSelec.docingrper = event.data;
        if (this.documentoIngSelecs.length === 0) {
            this.documentoIngSelecs = [];
        }
        this.documentoIngSelecs.push(this.documentoIngSelec);
        this.checkedsel.push(event.data.id);
        // console.log('Array1:' + this.checkedsel);
    }

    deleteMotSel(event: any) {
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    registerChangeInDocing() {
        this.eventSubscriber = this.eventManager.subscribe('saveDocing',
        (response) => {
            console.log('PasarObjetoDocIng' + JSON.stringify(this.documentoIngSelecs));
            this.registroAtencionWizard.cambiarMotivos(this.documentoIngSelecs);
        });
    }

    onRowSelect(event) {
    }

    saveDoc(event) {

    }

    deleteDoc(event) {
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }

}
