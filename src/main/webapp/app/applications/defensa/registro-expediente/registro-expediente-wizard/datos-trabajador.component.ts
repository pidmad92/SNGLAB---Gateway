import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/primeng';

import { ResponseWrapper } from '../../../../shared';
import { ComboModel } from '../../../general/combobox.model';
import { DatosWizardService } from './datos-wizard.service';
import { Atencion, Datlab, Dirpernat, Pasegl, Pernatural, Trabajador, Tipdocident } from './../';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit {

    direcciones: any;
    displayDialog: boolean;
    newDirec: boolean;
    departamentos: SelectItem[];

    tipodocs: ComboModel[];
    selectedTipodoc: ComboModel;
    sexo: any;

    pasegl = new Pasegl();
    atencion: Atencion;
    datlab: Datlab;
    dirpernat: Dirpernat[];
    dirper: Dirpernat;
    selecDirper: Dirpernat;
    pernatural: Pernatural
    trabajador: Trabajador;
    tipdocident: Tipdocident;

    constructor(
        private datosWizardService: DatosWizardService,
        private registroExpedienteWizard: RegistroExpedienteWizardService
    ) {
        this.atencion = new Atencion();
        this.pernatural = new Pernatural();
        this.departamentos = [
            {label: 'Seleccione el Dpto.', value: null},
            {label: 'Lima', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}}
        ];
    }
    loadTipoDoc() {
        this.datosWizardService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                this.selectedTipodoc = new ComboModel(this.tipdocident.vDescorta, '' + this.tipdocident.id, this.tipdocident.nNumdigi);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDirecPerNatu(id: any) {
        this.datosWizardService.buscarDirecciones(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernat = res.json;
                console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipoDoc();
        this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            this.pasegl = pasegl;
            this.atencion = this.pasegl.atencion;
            this.datlab = this.atencion.datlab;
            this.trabajador = this.datlab.trabajador;
            this.pernatural = this.trabajador.pernatural;
            this.tipdocident = this.pernatural.tipdocident;
            this.loadDirecPerNatu(this.pernatural.id);
        });
        this.sexo = [
            {name: 'Masculino', value: 'M'},
            {name: 'Femenino', value: 'F'}
        ]
        // this.trabajador = this.atencion.trabajador;
        // this.pernatural = this.trabajador.pernatural;
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  vDircomple: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaral', vDircomple: 'Apple S.A.C.'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', vDircomple: 'Apple S.A.C.'},
        ]
    }
    showDialogToAdd() {
        this.newDirec = true;
        this.dirper = new Dirpernat();
        this.displayDialog = true;
    }
    onRowSelect(event) {
        console.log('row');
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data);
        this.displayDialog = true;
    }
    cloneDirec(dir: Dirpernat): Dirpernat {
        const direc = new Dirpernat();
        for (const prop in dir) {
            if ( prop) {
                direc[prop] = dir[prop];
            }
        }
        return direc;
    }

    save() {
        this.displayDialog = false;
    }
    delete() {
        this.displayDialog = false;
    }

    private onError(error: any) {
        console.log(error);
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }
}
