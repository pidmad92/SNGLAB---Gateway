import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ES } from './../../../applications.constant';
import { SelectItem } from 'primeng/components/common/selectitem';

import { ResponseWrapper } from '../../../../shared';
import { DatosWizardService } from './datos-wizard.service';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';
import { Motatenofic } from './../motatenofic.model';
import { Motivpase } from './../motivpase.model';
import { Pasegl } from './../pasegl.model';

@Component({
    selector: 'jhi-datos-expediente',
    templateUrl: './datos-expediente.component.html'
})
export class DatosExpedienteComponent implements OnInit {

    motivos: any;
    motivpase: Motivpase[];
    motivp: Motivpase;
    motatenofic: any[];
    motateno: Motatenofic;
    selectmotatenofic: Motatenofic[];
    pasegl: Pasegl;

    documentos: any;
    displayDialog: boolean;
    es: any;
    date1: Date;
    fechaAudiencia: Date;
    hora: SelectItem[];
    selectedHora: String;

    constructor(private datosWizardService: DatosWizardService,
        private registroExpedienteWizard: RegistroExpedienteWizardService) {
    }
    loadMotivPase(idpase, idofic) {
        const queryString = '/param?id_pase=' + idpase + '&id_ofic=' + idofic;
        this.datosWizardService.consultaMotivPases(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.motivpase = res.json;
                console.log('Motivpase: ' + JSON.stringify(this.motivpase));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadMotivOfic(idpase) {
        this.datosWizardService.consultaMotivOfic(idpase).subscribe(
            (res: ResponseWrapper) => {
                this.motatenofic = res.json;
                console.log('Motivofic: ' + JSON.stringify(this.motatenofic));
                for (const mot of this.motatenofic) {
                    console.log('for' + mot.idmotpase);
                    if (mot.idmotpase !== null) {
                        if (this.selectmotatenofic === undefined) {
                            this.selectmotatenofic = new Array();
                        }
                        this.selectmotatenofic.push(mot);
                    }
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    saveObservacion(event) {
        console.log('EDIT' + JSON.stringify(event.data));
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
                this.datosWizardService.updateMotivPase(this.motivp));
        } else {
            this.loadMotivOfic(this.pasegl.id);
        }
    }

    saveMotivPase(event: any) {
        console.log(event.data);
        console.log(this.pasegl);
        this.motivp = new Motivpase();
        // this.motivp.vObsmotpas = 'test';
        this.motivp.motatenofic = event.data.Motateno;
        this.motivp.pasegl = this.pasegl;
        this.subscribeToSaveResponse(
             this.datosWizardService.createMotivPase(this.motivp)
        );
    }
    deleteMotivpase(event: any) {
        console.log(event.data);
        // this.moduloEntidadService.delete(id).subscribe((response) => {});
    }
    private subscribeToSaveResponse(result: Observable<Motivpase>) {
        result.subscribe((res: Motivpase) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }
    private onSaveSuccess(result: Motivpase) {
        this.loadMotivOfic(this.pasegl.id);
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
    ngOnInit() {
        this.es = ES;
        this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            // this.loadMotivPase(pasegl.id, pasegl.oficina.id);
            this.pasegl = pasegl;
            this.loadMotivOfic(pasegl.id);
        });
        this.motivos = [
            {codigoMotivos : '01', descripcion: 'Vacaciones Perdidas', observacion: '' },
            {codigoMotivos : '02', descripcion: 'Remuneraciones Insolutas', observacion: '' },
            {codigoMotivos : '03', descripcion: 'Gratificaciones Legales', observacion: 'De proceder via Judicial' },
        ]
        this.documentos = [
            {codigoDocumentos : '01', descripcion: 'Acta de Inspección', observacion: '' },
            {codigoDocumentos : '02', descripcion: 'Documentos Relacionados con el Conflicto', observacion: '' },
            {codigoDocumentos : '03', descripcion: 'Copia de L.E.L./DNI/Partida de Nacimiento', observacion: '' },
            {codigoDocumentos : '04', descripcion: 'Copia del Consolidado de Beneficios Sociales del MT', observacion: '' },
            {codigoDocumentos : '05', descripcion: 'Copia de Audiencia de Conciliación', observacion: '' },
        ]
        this.hora = [
            {label: '14:50:00', value: '1'},
            {label: '15:40:00', value: '2'},
            {label: '16:30:00', value: '3'},
            {label: '17:20:00', value: '4'},
        ];
    }
    showDialogToAdd() {
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.displayDialog = true;
    }
    save() {
        this.displayDialog = false;
    }
    delete() {
        this.displayDialog = false;
    }
    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

}
