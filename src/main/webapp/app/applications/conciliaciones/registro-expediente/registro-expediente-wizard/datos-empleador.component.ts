import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';

import { Observable } from 'rxjs/Rx';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { ResponseWrapper } from '../../../../shared';
import { ComboModel } from '../../../general/combobox.model';
import { DatosWizardService } from './datos-wizard.service';
import { Atencion, Empleador, Datlab, Dirperjuri, Dirpernat, Pasegl, Perjuridica, Pernatural, Tipdocident } from './../';
import { RegistroExpedienteWizardService } from './registro-expediente-wizard.service';

@Component({
    selector: 'jhi-datos-empleador',
    templateUrl: './datos-empleador.component.html'
})
export class DatosEmpleadorComponent implements OnInit {

    departamentos: SelectItem[];
    displayDialog: boolean;
    newDirec: boolean;
    tipoPerNat = false;
    direcciones: any;

    messages: Message[] = [];
    messagesForm: Message[] = [];

    tipodocs: ComboModel[];
    selectedTipodoc = new ComboModel('', '2', 0);
    sexo: any;

    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;

    pasegl = new Pasegl();
    atencion: Atencion;
    datlab: Datlab;

    dirperjuri: Dirperjuri[];
    dirpernat: Dirpernat[];

    dirper: any;
    selecDirper: Dirpernat;
    selecDirperj: Dirperjuri;

    perjuridica = new Perjuridica();
    pernatural = new Pernatural();

    empleador: Empleador;
    tipdocident = new Tipdocident();

    constructor(
        private datosWizardService: DatosWizardService,
        private registroExpedienteWizard: RegistroExpedienteWizardService,
        private router: Router
    ) {
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
                this.dirperjuri = res.json;
                // console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDirecPerJur(id: any) {
        this.datosWizardService.buscarDireccionesPerJur(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirperjuri = res.json;
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
                this.empleador = this.datlab.empleador;
                if (this.empleador.pernatural !== null) {
                    this.pernatural = this.empleador.pernatural;
                    this.tipoPerNat = true;
                    this.dirper = new Dirpernat();
                    this.dirper.pernatural = this.pernatural;
                    this.tipdocident = this.pernatural.tipdocident;
                    this.loadDirecPerNatu(this.pernatural.id);
                } else {
                    this.perjuridica = this.empleador.perjuridica;
                    this.tipoPerNat = false;
                    this.dirper = new Dirperjuri();
                    this.dirper.perjuridica = this.perjuridica;
                    this.tipdocident = this.perjuridica.tipdocident;
                    this.loadDirecPerJur(this.perjuridica.id);
                }
            } else {
                this.router.navigate(['/conciliaciones/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
            }
        });
        this.departamentos = [
            {label: 'Seleccione el Dpto.', value: null},
            {label: 'Lima', value: {id: 1, name: 'New York', code: 'NY'}},
            {label: 'Rome', value: {id: 2, name: 'Rome', code: 'RM'}},
            {label: 'London', value: {id: 3, name: 'London', code: 'LDN'}},
            {label: 'Istanbul', value: {id: 4, name: 'Istanbul', code: 'IST'}}
        ];
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaral', direccion: 'Apple S.A.C.'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
        this.sexo = [
            {name: 'Masculino', value: 'M'},
            {name: 'Femenino', value: 'F'}
        ]
    }
    loadDepartamentos() {
        this.datosWizardService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
            // console.log('Dpto' + JSON.stringify(this.departs));
        });
    }
    loadProvincias(init: boolean, idDept) {
        this.datosWizardService.consProv(this.padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            console.log('LOADDATAPROV' + this.provins)
        });
        if (init) {
            this.loadDistritos(0);
        }
    }
    loadDistritos(idProv) {
        console.log()
        this.datosWizardService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            console.log('LOADDATAdist' + this.distris)
    });
    }

    showDialogToAdd() {
        this.newDirec = true;
        if (this.tipoPerNat) {
            this.dirper = new Dirpernat();
            this.dirper.pernatural = this.pernatural;
        } else {
            this.dirper = new Dirperjuri();
            this.dirper.perjuridica = this.perjuridica;
        }
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(this.dirper.nCodprov);
        this.displayDialog = true;
    }
    save() {
        console.log('Grabar: ' + JSON.stringify(this.dirper));
        // const dirpernat = [...this.dirpernat];
        if (this.newDirec) {
            // dirpernat.push(this.dirper);
            if (this.tipoPerNat) {
                this.subscribeToSaveResponse(
                    this.datosWizardService.createDir(this.dirper));
            } else {
                this.subscribeToSaveResponsePerJu(
                    this.datosWizardService.createDirPerJu(this.dirper));
            }
        } else {
            // dirpernat[this.findSelectedDirecIndex()] = this.dirper;
            if (this.tipoPerNat) {
                this.subscribeToSaveResponse(
                    this.datosWizardService.updateDir(this.dirper));
            } else {
                this.subscribeToSaveResponsePerJu(
                    this.datosWizardService.updateDirPerJu(this.dirper));
            }
        }
        // this.dirpernat = dirpernat;
        if (this.tipoPerNat) {
            this.dirper = new Dirpernat();
        } else {
            this.dirper = new Dirperjuri();
        }
    }
    delete() {
        this.displayDialog = false;
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private subscribeToSaveResponsePerJu(result: Observable<Dirperjuri>) {
        result.subscribe((res: Dirperjuri) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat) {
        if (this.tipoPerNat) {
            this.loadDirecPerNatu(this.pernatural.id);
        } else {
            this.loadDirecPerJur(this.perjuridica.id);
        }
        this.displayDialog = false;
    }
    private onSaveError() {
        console.log('saveerror');
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
