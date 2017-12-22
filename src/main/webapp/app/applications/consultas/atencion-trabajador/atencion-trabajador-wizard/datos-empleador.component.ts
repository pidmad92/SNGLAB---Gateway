import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from '../../models/trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { SelectItem } from 'primeng/primeng';

import { Atencion } from '../../models/atencion.model';
import { Empleador } from '../../models/empleador.model';
import { Dirpernat } from '../../models/dirpernat.model';
import { Dirperjuri } from '../../models/dirperjuri.model';
import { Perjuridica } from '../../models/perjuridica.model';
import { Pernatural } from '../../models/pernatural.model';
import { Tipdocident } from '../../models/tipdocident.model';
import { Cartrab } from '../../models/cartrab.model';
import { ResponseWrapper } from '../../../../shared';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';

@Component({
    selector: 'jhi-datos-empleador',
    templateUrl: './datos-empleador.component.html'
})
export class DatosEmpleadorComponent implements OnInit, OnDestroy {

    atencion: any;
    empleador: Empleador;
    trabajador: Trabajador;
    pernatural: Pernatural;
    listadocident: Tipdocident[];
    listacargo: Cartrab[];

    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    buscanum: String;
    buscatipo: number;
    vNumdocumento: String;
    cars: any[];
    cols: any[];

    direcciones: any;
    displayDialog: boolean;
    newDirec: boolean;
    departamentos: SelectItem[];
    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;
    dirperjuri: Dirperjuri[];
    dirper = new Dirperjuri();
    selecDirper: Dirperjuri;
    // fechoy: Date;
    actividadSelec: string;

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private route: ActivatedRoute,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {
    }

    loadTipoDoc() {
        this.atencionTrabajadorService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDirecPerJuri(id: any) {
        this.atencionTrabajadorService.buscarDireccionesPerJuri(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirperjuri = res.json;
                // console.log('DIRECCIONES: ' + JSON.stringify(this.dirperjuri));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipoDoc();
        this.subscription = this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
        });
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.empleador = new Empleador();
        this.empleador.perjuridica = new Perjuridica();

        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (this.actividadSelec === '1') { // Si el flujo es generado al presionar el boton nuevo registro se instanciaran los datos en blanco
                } else {
                    if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                        this.empleador =  this.atencion.datlab.empleador;
                        this.empleador.perjuridica = this.atencion.datlab.empleador.perjuridica;
                        this.selectedTipodoc = this.atencion.datlab.empleador.perjuridica.tipdocident;
                        this.vNumdocumento = this.atencion.datlab.empleador.perjuridica.vNumdoc;
                        this.dirper = new Dirperjuri();
                        this.dirper.perjuridica = this.empleador.perjuridica;
                        this.loadDirecPerJuri(this.empleador.id);
                    } else { // Si la atención no tiene datos laborales se carga la información de la propia atención.
                        this.empleador =  this.atencion.empleador;
                        this.empleador.perjuridica = this.atencion.empleador.perjuridica;
                    }
                }

            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    load(id) {
        this.atencionTrabajadorService.findTrabajadorById(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
        });
    }
    loadDepartamentos() {
        this.atencionTrabajadorService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
        });
    }
    loadProvincias(init: boolean, idDept) {
        this.atencionTrabajadorService.consProv(this.padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            if (init) {
                this.dirper.nCodprov = Number(this.provins[0].vCodpro);
                this.loadDistritos(true, this.provins[0].vCodpro);
            }
        });
    }
    loadDistritos(init: boolean, idProv) {
        // console.log('Loaddist' + this.padWithZero(idProv));
        this.atencionTrabajadorService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            if (init) {
                this.dirper.nCoddist = Number(this.distris[0].vCoddis);
            }
            // console.log('LOADDATAdist' + this.distris)
    });
    }
    showDialogToAdd() {
        this.newDirec = true;
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        // console.log('EventaDataRow' + JSON.stringify(event.data));
        // console.log('DirperRow' + JSON.stringify(this.dirper));
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
        this.displayDialog = true;
    }
    save() {
        // console.log('Grabar: ' + JSON.stringify(this.dirper));
        if (this.newDirec) {
            this.subscribeToSaveResponse(
                 this.atencionTrabajadorService.createDirPerJuri(this.dirper));
        } else {
            this.subscribeToSaveResponse(
                this.atencionTrabajadorService.updateDirPerjuri(this.dirper));
        }
    }
    private subscribeToSaveResponse(result: Observable<Dirperjuri>) {
        result.subscribe((res: Dirperjuri) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirperjuri) {
        this.loadDirecPerJuri(this.empleador.id);
        this.close()
    }
    private onSaveError() {
        console.log('saveerror');
    }

    close() {
        this.dirper = new Dirperjuri();
        this.dirper.perjuridica = this.empleador.perjuridica;
        this.displayDialog = false;
    }

    previousState() {
        window.history.back();
    }

    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datosTrabajadorListModification',
            (response) => this.load(this.trabajador.id)
        );
    }
    cloneDirec(dir: Dirperjuri): Dirperjuri {
        const direc = new Dirperjuri();
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
        // this.jhiAlertService.error(error.message, null, null);
    }
}
