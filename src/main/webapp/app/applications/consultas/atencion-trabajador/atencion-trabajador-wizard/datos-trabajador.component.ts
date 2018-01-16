
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from '../../models/trabajador.model';
import { AtencionTrabajadorService } from './../atencion-trabajador.service';
import { RegistroAtencionWizardService } from './registro-atencion-wizard.service';
import { SelectItem } from 'primeng/primeng';

import { Atencion } from '../../models/atencion.model';
import { Dirpernat } from '../../models/dirpernat.model';
import { Pernatural } from '../../models/pernatural.model';
import { Tipdocident } from '../../models/tipdocident.model';
import { Cartrab } from '../../models/cartrab.model';
import { ComboModel } from '../../../general/combobox.model';
import { ResponseWrapper } from '../../../../shared';
import { ES } from './../../../applications.constant';

@Component({
    selector: 'jhi-datos-trabajador',
    templateUrl: './datos-trabajador.component.html'
})
export class DatosTrabajadorComponent implements OnInit, OnDestroy {
    // export class DatosTrabajadorComponent {

    atencion: any;
    // trabajador: Trabajador;
    trabajador: any;
    pernatural: Pernatural;
    listadocident: Tipdocident[] = [];
    listacargo: Cartrab[] = [];
    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    private subscription: Subscription;
    private atenSubscription: Subscription;
    private eventSubscriber: Subscription;
    private bandPantSuscriber: Subscription;
    private atenSuscriber: Subscription;
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
    paganterior: string;
    isVisible: boolean;

    es: any;
    dFecnac: Date;
    // dFecnac: String;
    accion: number;

    constructor(
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private router: Router,
        private registroAtencionWizard: RegistroAtencionWizardService,
        // private cartrabService: CartrabService,
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
                if (this.dirpernat !== undefined) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    inicializaTablas() {
        this.dirpernat = [];
        this.dirper = new Dirpernat();
        this.isVisible = false;
    }

    inicializarFormulario() {
        this.inicializaTablas();
        // this.vNumdocumento = '';
        this.displayDialog = false;
        if (this.trabajador !== null) {
            // this.trabajador = new Trabajador();
            this.trabajador.id = undefined;
            this.trabajador.pernatural = new Pernatural();
            this.trabajador.cartrab = new Cartrab();
        }
    }

    changeTipdocident() {
        this.vNumdocumento = '';
        if (this.selectedTipodoc !== undefined) {
            this.maxlengthDocIdent = this.selectedTipodoc.nNumdigi;
        }
        this.inicializarFormulario();
    }

    buscaTrabajadorByDocIdent() {
        // this.inicializarFormulario();
        //  const tipodoc = 1;
        //  const numdoc =  this.vNumdocumento; //  '12345678';
        // this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
        //     this.trabajador = trabajador;
        // });
        console.log('Busca Trabajador...');
        console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdocumento);
        if (this.selectedTipodoc.id === undefined || this.vNumdocumento === undefined) {
            return;
        }
         const tipodoc = this.selectedTipodoc.id; // 1;
         const numdoc =  this.vNumdocumento; //  '12345678';
         console.log(tipodoc);
         console.log(numdoc);
        this.atencionTrabajadorService.findTrabajadorByDocIdent(tipodoc, numdoc).subscribe((trabajador) => {
            console.log(trabajador);
            this.trabajador = trabajador;
            if (this.trabajador.id !== undefined) {
                this.loadDirecPerNatu(this.trabajador.id);
            }
            this.registerChangeInTrabajador();
            this.registroAtencionWizard.trabajadorSeleccionado.subscribe((loadtrabajador) => {
                this.trabajador = loadtrabajador;
            });
        });
    }

    formattedDate(d: Date): string {
        let month = String(d.getMonth() + 1);
        let day = String(d.getDate());
        const year = String(d.getFullYear());

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return `${day}/${month}/${year}`;
    }

    ngOnInit() {
        this.accion = 1;
        this.es = ES;
        this.inicializaTablas();
        this.fechoy = new Date();
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.trabajador = new Trabajador();
        this.trabajador.pernatural = new Pernatural();
        // Se carga el tipo de actividad a realizar y los datos de la atención
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadsel) => {
            this.actividadSelec = actividadsel;
            this.atenSubscription = this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                this.registroAtencionWizard.trabajadorSeleccionado.subscribe((loadtrabajador) => {
                    this.trabajador = loadtrabajador;
                this.bandPantSuscriber = this.registroAtencionWizard.paganteriorSelec.subscribe((paginante) => {
                    this.paganterior = paginante;
                    // console.log('Pagina Anterior: ' + paginante);
                    console.log('actividadseleccionada: ' + actividadsel);
                if (actividadsel === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                    this.router.navigate(['/consultas/atencion-trabajador']);
                } else if (actividadsel === '1') { // Si el flujo es generado al clickear el boton nuevo registro se instanciaran los datos en blanco
                        if (this.paganterior === '0') {
                            // this.paganterior = '1';
                            this.ngOnDestroy();
                        } else {
                            if (this.paganterior >= '1') {
                                    console.log('Recupera trabajador grabado: ' + JSON.stringify(this.trabajador));
                                    if (this.trabajador.id !== undefined) {
                                        this.isVisible = true;
                                        this.dirper = new Dirpernat();
                                        this.dirpernat = [];
                                        this.dirper.pernatural = this.trabajador.pernatural;
                                        // console.log('Load Trabajador.Personanatural: ' + JSON.stringify(this.trabajador.pernatural));
                                        this.selectedTipodoc = this.trabajador.pernatural.tipdocident;
                                        this.vNumdocumento = this.trabajador.pernatural.vNumdoc;
                                        // this.dFecnac = new Date(this.trabajador.pernatural.dFecnac);
                                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.trabajador.pernatural.dFecnac);
                                        this.loadDirecPerNatu(this.trabajador.id);
                                    } else {
                                        this.isVisible = false;
                                        this.trabajador = new Trabajador();
                                        this.trabajador.pernatural = new Pernatural();
                                        this.dirpernat = [];
                                        this.dirper = new Dirpernat();
                                    }
                            }
                        }
                        this.paganterior = '1';
                } else {
                    if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                        this.trabajador =  this.atencion.datlab.trabajador;
                        this.trabajador.pernatural = this.atencion.datlab.trabajador.pernatural;
                        this.selectedTipodoc = this.atencion.datlab.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.datlab.trabajador.pernatural.vNumdoc;
                        this.dFecnac = new Date(this.atencion.datlab.trabajador.pernatural.dFecnac);
                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.atencion.datlab.trabajador.pernatural.dFecnac);
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                    } else { // Si la atención no tiene datos laborales se carga la información de la propia atención.
                        this.trabajador =  this.atencion.trabajador;
                        this.trabajador.pernatural = this.atencion.trabajador.pernatural;
                        this.selectedTipodoc = this.atencion.trabajador.pernatural.tipdocident;
                        this.vNumdocumento = this.atencion.trabajador.pernatural.vNumdoc;
                        // this.dFecnac = new Date(this.atencion.trabajador.pernatural.dFecnac);
                        this.dFecnac = this.atencionTrabajadorService.convertFechas(this.atencion.trabajador.pernatural.dFecnac);
                        this.dirper = new Dirpernat();
                        this.dirper.pernatural = this.trabajador.pernatural;
                        this.loadDirecPerNatu(this.trabajador.id);
                    }
                }
            });
            this.registerChangePaganterior();
            });
            });
            this.registerChangeInTrabajador();
        });
    }
    ngOnDestroy() {
        if (this.subscription !== undefined) {
            this.subscription.unsubscribe();
        }
        if (this.atenSubscription !== undefined) {
            this.atenSubscription.unsubscribe();
        }
        if (this.eventSubscriber !== undefined) {
            this.eventSubscriber.unsubscribe();
        }
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
        this.accion = 1;
    }

    showDialogToAction(accion: number) {
        this.accion = accion;
        if (this.accion === 2) {
            console.log('Editar: ' + this.dirper);
        } else if (this.accion === 3) {
            console.log('Eliminar: ' + this.dirper);
        }
        this.newDirec = false;
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
    delete() {}

    registerChangeInTrabajador() {
        // this.eventSubscriber = this.eventManager.subscribe('saveTrabajador',
        // (response) => {
            // console.log('PasarTrabajador' + JSON.stringify(this.trabajador));
            // this.registroAtencionWizard.cambiarEstadoStep();
            this.registroAtencionWizard.cambiarTrabajador(this.trabajador);
        // });
    }

    registerChangeAtencion(atencion: Atencion) {
        // this.atenSuscriber = this.eventManager.subscribe('saveAten',
        // (response) => {
            this.registroAtencionWizard.cambiarAtencion(atencion);
        // });
    }

    registerChangePaganterior() {
        // this.bandPantSuscriber = this.eventManager.subscribe('savePageAnte',
        // (response) => {
            this.registroAtencionWizard.cambiarBandPagAnterior(this.paganterior);
        // });
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
    trackTipoDocumentoIdentidad(index: number, item: Tipdocident) {
        return item.vDescorta;
    }

    trackCargos(index: number, item: Cartrab) {
        return item.vDescartra;
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
