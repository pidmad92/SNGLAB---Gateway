// import { Component } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresate } from '../../models/docpresate.model';
import { Documento } from '../../models/documento.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';

import { ResponseWrapper } from '../../../../shared';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';

@Component({
    selector: 'jhi-documentos-presentados',
    templateUrl: './documentos-presentados.component.html'
})
export class DocumentosPresentadosComponent implements OnInit, OnDestroy {

    atencion: any;
    listadocpresate: Docpresate[];
    cols: any[];
    idoficOrigen: number;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    documentoPreSelecs: Docpresate[];
    documentoPreSelec: Docpresate;

    listDocumentosPre: any = [];
    selectListDocumentoPre: Documento[];

    actividadSelec: string;
    checkedsel = [];

    fechoy: Date;
    maxlengthDocIdent: number;
    numOficina = 5;

    loadDocingpre() {
        this.atencionEmpleadorService.findListaDocumentosActivos().subscribe(
            (res: ResponseWrapper) => {
                console.log(JSON.stringify(res.json));
                this.listDocumentosPre = res.json;
                this.loadDocpreSelect();
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDocpreSelect() {
        this.registroAtencionWizard.docpresSeleccionado.subscribe((documentoPreSelec) => {
            // console.log('DOCS:' + JSON.stringify(documentoIngSelec))
            this.documentoPreSelecs = documentoPreSelec;
            this.selectListDocumentoPre = [];
            if (documentoPreSelec.length !== 0) {
                console.log('LISTA:' + JSON.stringify(documentoPreSelec));
                for (const docpre of documentoPreSelec) {
                    let index = 0;
                    for (const docpresel of this.listDocumentosPre) {
                        console.log('COMP: ' + docpresel.id + docpre.documento.id);
                        if (docpresel.id === docpre.documento.id) {
                            console.log('ASD');
                            this.listDocumentosPre[index].observacion = docpre.vObsdopate;
                        }
                        index++;
                    }
                    this.selectListDocumentoPre.push(docpre.documento)
                    this.checkedsel.push(docpre.documento.id);
                }
            }
        });
    }

    constructor(
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        private registroAtencionWizard: RegistroAtencionWizardService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.fechoy = new Date();
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-empleador']);
                } else if (this.actividadSelec === '3') {
                    // this.atencionEmpleadorService
                } else {
                    this.loadDocingpre();
                }
            });
            this.registerChangeInDocpre();
        });

    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    load(id) {
        // this.atencionTrabajadorService.find(id).subscribe((trabajador) => {
        //     this.trabajador = trabajador;
        // });
    }

    previousState() {
        window.history.back();
    }

    saveObservacion(event) {
        console.log('EDIT1' + JSON.stringify(event));
        console.log('EDIT2' + JSON.stringify(this.documentoPreSelecs));
        let motivocheck = false;
        for (const valid of this.checkedsel) {
            if (valid === event.data.id) {
                motivocheck = true;
            }
        }
        console.log('MotivoCheck: ' + motivocheck);
        if (motivocheck === true) {
            for (const docs of this.documentoPreSelecs) {
                if ( docs.documento.id === event.data.id) {
                    docs.vObsdopate = event.data.observacion;
                }
            }
        }else {
            event.data.observacion = '';
        }
        console.log('Mod' + JSON.stringify(this.documentoPreSelecs));
    }

    saveDoc(event: any) {
        // console.log('Save1:' + JSON.stringify(event));
        this.documentoPreSelec = new Docpresate();
        this.documentoPreSelec.documento = event.data;
        if (this.documentoPreSelecs.length === 0) {
            this.documentoPreSelecs = [];
        }
        this.documentoPreSelecs.push(this.documentoPreSelec);
        this.checkedsel.push(event.data.id);
        // console.log('Array1:' + this.checkedsel);
    }

    deleteDoc(event: any) {
        let index = 0;
        for (const docpre of this.documentoPreSelecs) {
            if ( docpre.documento.id === event.data.id) {
                break;
            }
            index++;
        }
        this.documentoPreSelecs.splice(index, 1);
        this.checkedsel.splice(index, 1);
    }

    registerChangeInDocpre() {
        this.eventSubscriber = this.eventManager.subscribe('saveDocpre',
        (response) => {
            // console.log('Atencion' + JSON.stringify(this.atencion));
            this.registroAtencionWizard.cambiarDocumentosPres(this.documentoPreSelecs);
        });
    }

    trackMotivoConsltaOfic(index: number, item: Docpresate) {
        // return item.vDesmotate;
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
