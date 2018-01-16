import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SelectItem} from 'primeng/primeng';

import { Observable } from 'rxjs/Rx';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { padWithZero  } from './../../../applications.constant';

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

    block: boolean;
    mensajes: Message[] = [];

    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;
    notificar = [];

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
        this.block = true;
        this.datosWizardService.buscarDirecciones(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernat = res.json;
                this.block = false;
                console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); this.block = false; }
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

    abrirModalDireccion() {
        this.newDirec = true;
        this.displayDialog = true;
    }
    seleccionarDireccion(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
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
    grabarDireccion() {
        this.block = true;
        if (this.newDirec) {
            this.subscribeToSaveResponse(
                 this.datosWizardService.createDir(this.dirper), 'La direccion se ha agregado correctamente');
        } else {
            this.subscribeToSaveResponse(
                this.datosWizardService.updateDir(this.dirper), 'La direccion se ha actualizado correctamente');
        }
    }
    eliminarDireccion() {
        console.log(this.dirper)
        this.block = true;
        this.datosWizardService.deleteDirPerNatural(this.dirper.id).subscribe((response) => {
            this.loadDirecPerNatu(this.pernatural.id);
            this.mensajes = [];
            this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: 'Dirección eliminada correctamente'});
            this.cerrarModalDireccion();
            this.block = false;
        });
    }
    cerrarModalDireccion() {
        this.dirper.id = null;
        this.dirper.nCoddepto = null;
        this.dirper.nCodprov = null;
        this.dirper.nCoddist = null;
        this.dirper.vDircomple = null;
        this.dirper.nFlgnotifi = false;
        this.displayDialog = false;
    }

    findSelectedDirecIndex(): number {
        return this.dirpernat.indexOf(this.selecDirper);
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>, mensaje: string) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res, mensaje), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat, mensaje: string) {
        this.loadDirecPerNatu(this.pernatural.id);
        this.mensajes = [];
        this.mensajes.push({severity: 'success', summary: 'Mensaje de Confirmación', detail: mensaje});
        this.cerrarModalDireccion();
        this.block = false;
    }
    private onSaveError() {
        this.mensajes = [];
        this.mensajes.push({severity: 'error', summary: 'Mensaje de Error', detail: 'Hubo un problema al intentar agregar la dirección'});
        this.cerrarModalDireccion();
        this.block = false;
    }

    private onError(error: any) {
        this.mensajes = [];
        this.mensajes.push({severity: 'error', summary: 'Mensaje de Error', detail: 'Hubo un problema en cargar la información'});
    }

    loadDepartamentos() {
        this.datosWizardService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
        });
    }
    loadProvincias(init: boolean, idDept) {
        this.datosWizardService.consProv(padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            if (init) {
                this.dirper.nCodprov = Number(this.provins[0].vCodpro);
                this.loadDistritos(true, this.provins[0].vCodpro);
            }
        });
    }
    loadDistritos(init: boolean, idProv) {
        this.datosWizardService.consDis(padWithZero(this.dirper.nCoddepto), padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            if (init) {
                this.dirper.nCoddist = Number(this.distris[0].vCoddis);
            }
        });
    }
}
