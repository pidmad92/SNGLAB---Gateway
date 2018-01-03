import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

import { Observable } from 'rxjs/Rx';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

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

    messages: Message[] = [];
    messagesForm: Message[] = [];

    tipodocs: ComboModel[];
    selectedTipodoc: ComboModel;
    sexo: any;

    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;

    pasegl = new Pasegl();
    atencion: Atencion;
    datlab: Datlab;
    dirpernat: Dirpernat[];
    dirper = new Dirpernat();
    pernatural = new Pernatural();
    selecDirper: Dirpernat;
    trabajador: Trabajador;
    tipdocident = new Tipdocident();

    constructor(
        private datosWizardService: DatosWizardService,
        private registroExpedienteWizard: RegistroExpedienteWizardService,
        private router: Router
    ) {
        this.atencion = new Atencion();
        this.dirper.pernatural = new Pernatural();
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
                // console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            if (pasegl.id) {
                this.pasegl = pasegl;
                this.atencion = this.pasegl.atencion;
                this.datlab = this.atencion.datlab;
                this.trabajador = this.datlab.trabajador;
                this.pernatural = this.trabajador.pernatural;
                this.dirper = new Dirpernat();
                this.dirper.pernatural = this.pernatural;
                this.tipdocident = this.pernatural.tipdocident;
                this.loadDirecPerNatu(this.pernatural.id);
            } else {
                this.router.navigate(['/conciliaciones/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
            }
        });
        this.sexo = [
            {name: 'Masculino', value: 'M'},
            {name: 'Femenino', value: 'F'}
        ]
    }

    loadDepartamentos() {
        this.datosWizardService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
            console.log(this.departs);
        });
    }
    loadProvincias(init: boolean, idDept) {
        console.log('LoadProv' + this.padWithZero(idDept));
        this.datosWizardService.consProv(this.padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            console.log('LOADDATAPROV' + this.provins)
        });
        if (init) {
            this.loadDistritos(0);
        }
    }
    loadDistritos(idProv) {
        console.log('Loaddist' + this.padWithZero(idProv));
        this.datosWizardService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            console.log('LOADDATAdist' + this.distris)
    });
    }
    showDialogToAdd() {
        this.newDirec = true;
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        console.log(this.dirper);
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(this.dirper.nCodprov);
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

    padWithZero(number) {
        let num_form = '' + number;
        if (num_form.length < 2) {
            num_form = '0' + num_form;
        }
        return num_form;
    }

    save() {
        console.log('Grabar: ' + JSON.stringify(this.dirper));
        // const dirpernat = [...this.dirpernat];
        if (this.newDirec) {
            // dirpernat.push(this.dirper);
            this.subscribeToSaveResponse(
                 this.datosWizardService.createDir(this.dirper));
        } else {
            // dirpernat[this.findSelectedDirecIndex()] = this.dirper;
            this.subscribeToSaveResponse(
                this.datosWizardService.updateDir(this.dirper));
        }
        // this.dirpernat = dirpernat;
        this.dirper = new Dirpernat();
    }
    delete() {
        this.displayDialog = false;
    }

    findSelectedDirecIndex(): number {
        return this.dirpernat.indexOf(this.selecDirper);
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat) {
        this.loadDirecPerNatu(this.pernatural.id);
        this.displayDialog = false;
    }
    private onSaveError() {
        console.log('saveerror');
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }
}
