
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from '../../models/trabajador.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';
// import { TipdocidentService } from '../tipdocident.service';
// import { CartrabService } from '../cartrab.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { SelectItem } from 'primeng/primeng';

import { Atencion } from '../../models/atencion.model';
import { Dirpernat } from '../../models/dirpernat.model';
import { Pernatural } from '../../models/pernatural.model';
import { Tipdocident } from '../../models/tipdocident.model';
import { Cartrab } from '../../models/cartrab.model';
import { ComboModel } from '../../../general/combobox.model';
import { ResponseWrapper } from '../../../../shared';

@Component({
    selector: 'jhi-datos-representante',
    templateUrl: './datos-representante.component.html'
})
export class DatosRepresentanteComponent implements OnInit, OnDestroy {
    // export class DatosTrabajadorComponent {

    atencion: any;
    trabajador: Trabajador;
    pernatural: Pernatural;
    listadocident: Tipdocident[] = [];
    listacargo: Cartrab[] = [];
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    cargos: Cartrab[];
    selectedCargo: Cartrab;
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
    fechoy: Date;
    maxlengthDocIdent: number;
    numOficina = 5;

    vApepaterno: String;
    vApematerno: String;
    vNombres: String;
    selectedSexo: String;

    constructor(
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        private router: Router,
        private registroAtencionWizard: RegistroAtencionWizardService,
        // private tipdocidentService: TipdocidentService,
        // private cartrabService: CartrabService,
        private route: ActivatedRoute
    ) {
    }

    inicializaTablas() {
        this.dirpernat = [];
    }

    inicializarFormulario() {
        this.inicializaTablas();
        this.vNumdocumento = '';
        this.displayDialog = false;
        if (this.selectedTipodoc !== undefined) {
            this.maxlengthDocIdent = this.selectedTipodoc.nNumdigi;
        }
        this.vApepaterno = '';
        this.vApematerno = '';
        this.vNombres = '';

        if (this.trabajador !== null) {
            this.trabajador.pernatural = new Pernatural();
            this.trabajador.cartrab = new Cartrab();
        }
    }

    loadCartrab() {
        this.atencionEmpleadorService.findListaCartrab().subscribe(
            (res: ResponseWrapper) => {
                this.cargos = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadTipoDoc() {
        this.atencionEmpleadorService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDirecPerNatu(id: any) {
        this.atencionEmpleadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernat = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        this.fechoy = new Date();
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.loadCartrab();
        this.atencion = new Atencion();
        this.trabajador = new Trabajador();
        this.trabajador.pernatural = new Pernatural();
        this.trabajador.cartrab = new Cartrab();
        // Se carga el tipo de actividad a realizar y los datos de la atención
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-empleador']);
                } else if (this.actividadSelec === '1') { // Si el flujo es generado al presionar el boton nuevo registro se instanciaran los datos en blanco
                    this.trabajador = new Trabajador();
                    this.trabajador.pernatural = new Pernatural();
                    this.trabajador.cartrab = new Cartrab();
                } else {
                    if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                        this.trabajador =  this.atencion.datlab.trabajador;
                        this.trabajador.pernatural = this.atencion.datlab.trabajador.pernatural;
                        this.trabajador.cartrab = this.atencion.datlab.trabajador.cartrab;
                        this.selectedTipodoc = this.atencion.datlab.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.datlab.trabajador.pernatural.vNumdoc;
                        // this.selectedSexo = this.atencion.datlab.trabajador.pernatural.vSexoper;
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                    } else { // Si la atención no tiene datos laborales se carga la información de la propia atención.
                        this.trabajador =  this.atencion.trabajador;
                        this.trabajador.pernatural = this.atencion.trabajador.pernatural;
                        this.trabajador.cartrab = this.atencion.trabajador.cartrab;
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
        this.atencionEmpleadorService.findTrabajadorById(id).subscribe((trabajador) => {
            this.trabajador = trabajador;
        });
    }
    loadDepartamentos() {
        this.atencionEmpleadorService.consDep().subscribe((departamentos) => {
            this.departs = departamentos.json;
        });
    }
    loadProvincias(init: boolean, idDept) {
        this.atencionEmpleadorService.consProv(this.padWithZero(idDept)).subscribe((provincias) => {
            this.provins = provincias.json;
            if (init) {
                this.dirper.nCodprov = Number(this.provins[0].vCodpro);
                this.loadDistritos(true, this.provins[0].vCodpro);
            }
        });
    }
    loadDistritos(init: boolean, idProv) {
        this.atencionEmpleadorService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
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
                 this.atencionEmpleadorService.createDirPerNat(this.dirper));
        } else {
            this.subscribeToSaveResponse(
                this.atencionEmpleadorService.updateDirPerNat(this.dirper));
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
        return item.vDescartra;
    }
    buscaTrabajadorByDocIdent() {
        console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdocumento);
        if (this.selectedTipodoc.id === undefined || this.vNumdocumento === undefined) {
            return;
        }
         const tipodoc = this.selectedTipodoc.id; // 1;
         const numdoc =  this.vNumdocumento; //  '12345678';
         console.log(tipodoc);
         console.log(numdoc);
        this.atencionEmpleadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
            console.log(trabajador);
            this.trabajador = trabajador;
            console.log('ID Trabajador: ' + this.trabajador.id);
            if (this.trabajador.id !== undefined) {
                this.loadDirecPerNatu(this.trabajador.id);
            }
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
