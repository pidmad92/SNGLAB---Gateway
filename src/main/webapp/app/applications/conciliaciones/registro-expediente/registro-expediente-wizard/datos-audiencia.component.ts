import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JhiEventManager } from 'ng-jhipster';
import { Observable, Subscription } from 'rxjs/Rx';

import { ResponseWrapper } from '../../../../shared';
import { DatosWizardService } from './datos-wizard.service';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';
import { ConfirmationService } from 'primeng/components/common/api';
import { Message } from 'primeng/components/common/api';

import { Expediente } from '../../models/expediente.model';
import { Concilia } from '../../models/concilia.model';
import { Horacon } from '../../models/horacon.model';

@Component({
    selector: 'jhi-datos-audiencia',
    templateUrl: './datos-audiencia.component.html',
    providers: [ConfirmationService]
})
export class DatosAudienciaComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    displayDialog: boolean;
    pasegl: any;
    expediente: Expediente;
    expedienteGrabado: Expediente;
    conciliaciones: Concilia[] = [];
    concilia: Concilia;
    conciliaTemp: any;
    horacon: Horacon;
    fecha: any;

    block: boolean;
    mensajes: Message[] = [];

    constructor(
        private datosWizardService: DatosWizardService,
        private eventManager: JhiEventManager,
        private router: Router,
        private datePipe: DatePipe,
        private registroExpedienteWizard: RegistroExpedienteWizardService,
        private confirmationService: ConfirmationService,
    ) {
    }

    ngOnInit() {
        this.expedienteGrabado = new Expediente();
        this.subscription = this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            if (pasegl.id) {
                this.pasegl = pasegl;
                this.registroExpedienteWizard.expedienteSeleccionado.subscribe((expediente) => {
                    this.expediente = expediente;
                    console.log('Expediente cargado del Pase');
                    console.log(expediente);
                });
                this.registroExpedienteWizard.conciliaSeleccionado.subscribe((concilia) => {
                    this.concilia = concilia;
                    this.conciliaTemp = concilia;
                    this.fecha = new Date(concilia.dFecconci);
                    // this.conciliaTemp.dFecconci = (this.fecha.getDate() + 1) + '-' + this.fecha.getMonth() + '-' + this.fecha.getFullYear();
                    this.conciliaciones.push(this.conciliaTemp);
                    // console.log('CONCILIA' + JSON.stringify(this.conciliaciones));
                });
            } else {
                this.router.navigate(['/conciliaciones/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
            }
        });
        this.registerChangeInAudiencia();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    confirmar() {
        this.confirmationService.confirm({
            message: '¿Esta seguro de registrar esta atención?',
            icon: 'fa fa-question-circle',
            accept: () => {
                this.grabarDatos();
            }
        });
    }
    grabarDatos() {
        console.log('GrabarExpe' + JSON.stringify(this.expediente));
        this.block = true;
        this.subscribeToSaveResponse(
            this.datosWizardService.createExpediente(this.expediente));
    }
    grabarConciliacion(expediente) {
        this.concilia.expediente = expediente;
        console.log('GrabarConci' + JSON.stringify(this.concilia));
        this.subscribeToSaveConciliaResponse(
            this.datosWizardService.createConcilia(this.concilia));
    }
    private subscribeToSaveResponse(result: Observable<Expediente>) {
        result.subscribe((res: Expediente) => {
            this.expedienteGrabado = res;
            console.log('OKEXPEDIENTE');
            console.log(res);
            this.grabarConciliacion(res);
        }, (res: Response) => this.onError('Error Datlab'));
    }
    private subscribeToSaveConciliaResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) => {
            console.log('OK-Concilia');
            console.log(res);
            this.block = false;
            this.displayDialog = true;
        }, (res: Response) => this.onError('Error Atencion'));
    }
    private onSaveSuccess(result: any) {
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
    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    registerChangeInAudiencia() {
        this.eventSubscriber = this.eventManager.subscribe('saveExpedienteFinal',
        (response) => {
            this.confirmar();
        });
    }

    cerrarModal() {
        this.displayDialog = false;
        this.router.navigate(['/conciliaciones/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
    }

}
