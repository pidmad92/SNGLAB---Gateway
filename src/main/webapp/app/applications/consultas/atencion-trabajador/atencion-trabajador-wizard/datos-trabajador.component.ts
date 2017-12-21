
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './../trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { TipdocidentService } from '../tipdocident.service';
import { CartrabService } from '../cartrab.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { SelectItem } from 'primeng/primeng';

import { Atencion } from './../atencion.model';
import { Dirpernat } from './../dirpernat.model';
import { Pernatural } from './../pernatural.model';
import { Tipdocident } from './../tipdocident.model';
import { Cartrab } from './../cartrab.model';
import { ComboModel } from '../../../general/combobox.model';
import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit, OnDestroy {
    // export class DatosTrabajadorComponent {

    atencion: any;
    trabajador: Trabajador;
    pernatural: Pernatural;
    listadocident: Tipdocident[] = [];
    listacargo: Cartrab[] = [];
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    vNumdocumento: String;
    routeSub: any;
    direcciones: any;
    displayDialog: boolean;
    newDirec: boolean;
    departamentos: SelectItem[];
    departs: ResponseWrapper;
    provins: ResponseWrapper;
    distris: ResponseWrapper;
    dirpernat: Dirpernat[];
    dirper = new Dirpernat();
    selecDirper: Dirpernat;

    actividadSelec: string;

    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private router: Router,
        private registroAtencionWizard: RegistroAtencionWizardService,
        private tipdocidentService: TipdocidentService,
        private cartrabService: CartrabService,
        private route: ActivatedRoute
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
    loadDirecPerNatu(id: any) {
        this.atencionTrabajadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernat = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.trabajador = new Trabajador();
        this.trabajador.pernatural = new Pernatural();
        // Se carga el tipo de actividad a realizar y los datos de la atención
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (this.actividadSelec === '1') { // Si el flujo es generado al presionar el boton nuevo registro se instanciaran los datos en blanco
                    this.trabajador = new Trabajador();
                    this.trabajador.pernatural = new Pernatural();
                } else {
                    if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                        this.trabajador =  this.atencion.datlab.trabajador;
                        this.trabajador.pernatural = this.atencion.datlab.trabajador.pernatural;
                        this.selectedTipodoc = this.atencion.datlab.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.datlab.trabajador.pernatural.vNumdoc;
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                    } else { // Si la atención no tiene datos laborales se carga la información de la propia atención.
                        this.trabajador =  this.atencion.trabajador;
                        this.trabajador.pernatural = this.atencion.trabajador.pernatural;
                    }
                }
                console.log('Atencion');
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
        this.atencionTrabajadorService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
            this.distris = distritos.json;
            if (init) {
                this.dirper.nCoddist = Number(this.distris[0].vCoddis);
            }
        });
    }
    showDialogToAdd() {
        this.newDirec = true;
        this.displayDialog = true;
    }
    onRowSelect(event) {
        this.newDirec = false;
        this.dirper = this.cloneDirec(event.data.direc);
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
        this.displayDialog = true;
    }
    save() {
        console.log('Grabar: ' + JSON.stringify(this.dirper));
        if (this.newDirec) {
            this.subscribeToSaveResponse(
                 this.atencionTrabajadorService.createDirPerNat(this.dirper));
        } else {
            this.subscribeToSaveResponse(
                this.atencionTrabajadorService.updateDirPerNat(this.dirper));
        }
        this.dirper = new Dirpernat();
    }
    close() {
        this.dirper = new Dirpernat();
        this.dirper.pernatural = this.trabajador.pernatural;
        this.displayDialog = false;
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat) {
        this.loadDirecPerNatu(this.trabajador.id);
        this.close();
    }
    private onSaveError() {
        console.log('saveerror');
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
    trackTipoDocumentoIdentidad(index: number, item: Tipdocident) {
        return item.vDescorta;
    }

    trackCargos(index: number, item: Cartrab) {
        return item.vDesCartra;
    }
    buscaTrabajadorByDocIdent() {
         const tipodoc = 1;
         const numdoc =  this.vNumdocumento; //  '12345678';
         console.log(tipodoc);
         console.log(numdoc);
        this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
            console.log(trabajador);
            this.trabajador = trabajador;
        });
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
        // this.jhiAlertService.error(error.message, null, null);
    }
}
