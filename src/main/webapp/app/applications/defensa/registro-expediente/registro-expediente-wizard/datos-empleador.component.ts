import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';

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

    pasegl = new Pasegl();
    atencion: Atencion;
    datlab: Datlab;

    dirperjuri: Dirperjuri[];
    dirperj = new Dirperjuri();
    selecDirperj: Dirperjuri;

    dirpernat: Dirpernat[];
    dirper = new Dirpernat();
    selecDirper: Dirpernat;

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

    func(event) {
        console.log(event);
        console.log(this.selectedTipodoc.value);
    }

    loadTipoDoc() {
        this.datosWizardService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
                console.log(this.tipodocs);
                this.selectedTipodoc = new ComboModel(this.tipdocident.vDescorta, '' + this.tipdocident.id, this.tipdocident.nNumdigi);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipoDoc();
        this.registroExpedienteWizard.paseSeleccionado.subscribe((pasegl) => {
            if (pasegl.id) {
                this.pasegl = pasegl;
                this.atencion = this.pasegl.atencion;
                this.datlab = this.atencion.datlab;
                this.empleador = this.datlab.empleador;
                if (this.empleador.pernatural !== null) {
                    console.log('pernat')
                    this.pernatural = this.empleador.pernatural;
                    this.tipoPerNat = true;
                    this.dirper = new Dirpernat();
                    this.dirper.pernatural = this.pernatural;
                    this.tipdocident = this.pernatural.tipdocident;
                } else {
                    console.log('perjur')
                    this.perjuridica = this.empleador.perjuridica;
                    this.tipoPerNat = false;
                    this.dirperj = new Dirperjuri();
                    this.dirperj.perjuridica = this.perjuridica;
                    this.tipdocident = this.perjuridica.tipdocident;
                }
            } else {
                this.router.navigate(['/defensa/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }]);
            }
            // this.loadDirecPerNatu(this.pernatural.id);
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
    }
    showDialogToAdd() {
        this.newDirec = true;
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newDirec = false;
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

    private onErrorMultiple(errorList: any) {
        for (let i = 0; i < errorList.length; i++) {
            this.messagesForm.push(errorList[i]);
        }
    }
}
