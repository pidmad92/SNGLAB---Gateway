import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs/Rx';
import { ES } from './../../../applications.constant';
import { SelectItem } from 'primeng/components/common/selectitem';
import { JhiEventManager } from 'ng-jhipster';

import { ResponseWrapper } from '../../../../shared';
import { Message } from 'primeng/components/common/api';
import { DatosWizardService } from './datos-wizard.service';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';
import { Motatenofic } from '../../models/motatenofic.model';
import { Motivpase } from '../../models/motivpase.model';
import { Pasegl } from '../../models/pasegl.model';
import { Expediente } from '../../models/expediente.model';
import { Estexpedien } from '../../models/estexpedien.model'
import { Concilia } from '../../models/concilia.model';
import { Empleador } from '../../models/empleador.model';
import { Pernatural } from '../../models/pernatural.model';
import { Perjuridica } from '../../models/perjuridica.model';
import { Trabajador } from '../../models/trabajador.model';
import { Horacon } from '../../models/horacon.model';
declare var $: any;

@Component({
    selector: 'jhi-datos-expediente',
    templateUrl: './datos-expediente.component.html'
})
export class DatosExpedienteComponent implements OnInit, OnDestroy {

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    motivpase: Motivpase[];
    motivp: Motivpase;
    motatenofic: any[];
    motateno: Motatenofic;
    selectmotatenofic: Motatenofic[];
    horacon: Horacon[] = [];
    pasegl: any;
    empleador: Empleador;
    personaEmpleador: any;
    trabajador: Trabajador;
    personaTrabajador: Pernatural

    estadoExpediente: Estexpedien;
    expediente: Expediente = new Expediente();
    concilia: Concilia = new Concilia();

    block: boolean;
    mensajes: Message[] = [];

    displayDialog: boolean;
    es: any;
    fechaRegistro: Date;
    fechaAudiencia: Date;
    hora: SelectItem[];
    selectedHora: String;
    fechaActual = new Date();

    constructor(
        private datosWizardService: DatosWizardService,
        private eventManager: JhiEventManager,
        private router: Router,
        private datePipe: DatePipe,
        private registroExpedienteWizard: RegistroExpedienteWizardService) {
    }
    loadMotivOfic(idpase) {
        this.block = true;
        this.datosWizardService.consultaMotivOfic(idpase).subscribe(
            (res: ResponseWrapper) => {
                this.motatenofic = res.json;
                this.block = false;
                // console.log('Motivofic: ' + JSON.stringify(this.motatenofic));
                for (const mot of this.motatenofic) {
                    // console.log('for' + mot.idmotpase);
                    if (mot.idmotpase !== null) {
                        if (this.selectmotatenofic === undefined) {
                            this.selectmotatenofic = new Array();
                        }
                        this.selectmotatenofic.push(mot);
                    }
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
        );
    }
    cargarEstadoExpe(id) {
        this.datosWizardService.buscarEstexpedien(id).subscribe((estadoExpediente) => {
            this.estadoExpediente = estadoExpediente;
        });
    }
    buscarHora() {
        console.log('BUSCARHORA' + this.concilia.dFecconci);
        const fecha = this.datePipe.transform(this.concilia.dFecconci, 'dd-MM-yyyy');
        // console.log(fecha);
        if (fecha === null) {
            return;
        }
        this.block = true;
        if (fecha.length === 10) {
            this.datosWizardService.buscarHoraPorFecha(fecha).subscribe(
                (res: ResponseWrapper) => {
                    this.block = false;
                    this.horacon = res.json;
                    this.mensajes = [];
                    this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: 'Horas de conciliación actualizadas correctamente'});
                    setTimeout(function() {
                        $('#field_horacon').focus();
                    });
                },
                (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
            );
        }
    }

    ngOnInit() {
        this.es = ES;
        this.subscription = this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            if (pasegl.id) {
                this.pasegl = pasegl;
                this.empleador = ( this.pasegl.atencion.empleador !== null ) ? this.pasegl.atencion.empleador : this.pasegl.atencion.datlab.empleador;
                this.personaEmpleador = ( this.empleador.pernatural !== null ) ? this.empleador.pernatural : this.empleador.perjuridica;
                this.trabajador = ( this.pasegl.atencion.trabajador !== null ) ? this.pasegl.atencion.trabajador : this.pasegl.atencion.datlab.trabajador;
                this.personaTrabajador = this.trabajador.pernatural;
                this.registroExpedienteWizard.expedienteSeleccionado.subscribe((expediente) => {
                    this.expediente = expediente;
                    if ( expediente.nAnioexp === undefined ) {
                        this.expediente.dFecregexp = this.fechaActual;
                    }
                });
                this.registroExpedienteWizard.conciliaSeleccionado.subscribe((concilia) => {
                    this.concilia = concilia;
                    console.log('CONCEXP' + JSON.stringify(this.concilia));
                    if (this.concilia.dFecconci !== null && this.concilia.dFecconci !== undefined) {
                        this.buscarHora();
                    }
                });
                setTimeout(function() {
                    $('#inpNumero').focus();
                });
                // this.atencion = this.pasegl.atencion;// this.datlab = this.atencion.datlab;// this.trabajador = this.datlab.trabajador;
                this.cargarEstadoExpe(1);
                this.loadMotivOfic(pasegl.id);
            } else {
                this.router.navigate(['/conciliaciones/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
            }
        });
        this.registerChangeInExpediente();
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpediente() {
        this.eventSubscriber = this.eventManager.subscribe('saveExpediente', (response) => this.cargarExpedienteConciliacion());
    }
    cargarExpedienteConciliacion() {
        console.log('LOADEXPED');
        const fechaActual = new Date();
        const anio = fechaActual.getFullYear();
        this.expediente.nAnioexp = anio;
        this.expediente.vNomemplea = this.conseguirNombre(this.personaEmpleador);
        this.expediente.vNomtrabaj = this.conseguirNombre(this.personaTrabajador);
        this.expediente.empleador = this.empleador;
        this.expediente.trabajador = this.trabajador;
        this.expediente.pasegl = this.pasegl;
        this.expediente.tippersona = this.empleador.tippersona;
        this.expediente.estexpedien = this.estadoExpediente;
        // this.concilia.expediente = this.expediente;

        // console.log('PasarExpediente' + JSON.stringify(this.expediente));
        console.log('Conciliacion');
        console.log(this.concilia);
        this.registroExpedienteWizard.cambiarExpediente(this.expediente);
        this.registroExpedienteWizard.cambiarConcilia(this.concilia);
    }

    conseguirNombre(persona: any) {
        let nombre;
        if (persona.vNombres !== undefined) {
            nombre = persona.vNombres + ' ' + persona.vApepat + ' ' + persona.vApemat;
        } else {
            nombre = persona.vRazsocial;
        }
        return nombre;
    }
    grabarObservacion(event) {
        // console.log('EDIT' + JSON.stringify(event.data));
        this.motivp = new Motivpase();
        this.motivp.id = event.data.idmotpase;
        this.motivp.vObsmotpas = event.data.observacion;
        this.motivp.tFecreg = event.data.tFecreg;
        this.motivp.nUsuareg = event.data.nUsuareg;
        this.motivp.nSedereg = event.data.nSedereg;
        this.motivp.motatenofic = event.data.Motateno;
        this.motivp.pasegl = this.pasegl;
        if (event.data.idmotpase !== null) {
            this.subscribeToSaveResponse(
                this.datosWizardService.updateMotivPase(this.motivp), 'Observación Agregada correctamente');
        } else {
            this.loadMotivOfic(this.pasegl.id);
        }
    }
    grabarMotivPase(event: any) {
        // console.log(event.data);
        // console.log(this.pasegl);
        this.motivp = new Motivpase();
        // this.motivp.vObsmotpas = 'test';
        this.motivp.motatenofic = event.data.Motateno;
        this.motivp.pasegl = this.pasegl;
        this.subscribeToSaveResponse(
             this.datosWizardService.createMotivPase(this.motivp) , 'Motivo del pase agregado correctamente'
        );
    }
    borrarMotivpase(event: any) {
        this.datosWizardService.deleteMotivPase(event.data.idmotpase).subscribe((response) => {
            this.mensajes = [];
            this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: 'Motivo del pase deseleccionado correctamente'});
        });
        console.log(event.data);
        // this.moduloEntidadService.delete(id).subscribe((response) => {});
    }
    private subscribeToSaveResponse(result: Observable<Motivpase>, mensaje: string) {
        result.subscribe((res: Motivpase) =>
            this.onSaveSuccess(res, mensaje), (res: Response) => this.onSaveError(res));
    }
    private onSaveSuccess(result: Motivpase, mensaje: string) {
        this.loadMotivOfic(this.pasegl.id);
        this.mensajes = [];
        this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: mensaje});
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

}
