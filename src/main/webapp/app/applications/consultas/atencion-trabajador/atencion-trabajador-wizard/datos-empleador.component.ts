import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

// import { Trabajador } from '../../models/trabajador.model';
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
    // empleador: Empleador;
    empleador: any;
    // trabajador: Trabajador;
    pernatural: Pernatural;
    listadocident: Tipdocident[];
    listacargo: Cartrab[];

    tipodocs: Tipdocident[];
    selectedTipodoc: Tipdocident;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    private bandPantSuscriber: Subscription;
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
    // dirper = new Dirperjuri();
    dirper: any;
    selecDirper: Dirperjuri;
    // fechoy: Date;
    actividadSelec: string;

    fechoy: Date;
    maxlengthDocIdent: number;
    tippersona: string;
    vRazsocial: string;
    vEmailper: string;
    vTelefono: string;
    vCeluFax: string;
    vNomalter: string;

    accion: number;
    isVisible: boolean;
    paganterior: string;

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private atencionTrabajadorService: AtencionTrabajadorService,
        private route: ActivatedRoute,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {
    }

    inicializaTablas() {
        this.dirper = new Dirpernat();
        this.dirper = [];
        this.isVisible = false;
    }

    inicializarFormulario() {
        this.inicializaTablas();
        // this.vNumdocumento = '';
        this.displayDialog = false;
        this.vNumdocumento = '';
        this.vEmailper = '';
        this.vTelefono = '';
        this.vCeluFax = '';
        this.vRazsocial = '';
        this.vNomalter = '';
        if (this.empleador !== null) {
            // this.empleador = new Empleador();
             this.empleador.id = undefined;
            this.empleador.pernatural = new Pernatural();
            this.empleador.perjuridica = new Perjuridica();
        }
    }

    changeTipdocident() {
        if (this.selectedTipodoc !== undefined) {
            this.maxlengthDocIdent = this.selectedTipodoc.nNumdigi;
        }
        if (this.selectedTipodoc.vDescorta === 'RUC') {
            this.tippersona = '1';
        } else {
            this.tippersona = '0';
        }
        this.inicializarFormulario();
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
                // this.dirperjuri = res.json;
                this.dirper = res.json;
                if (this.dirper !== undefined) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }
                // console.log('DIRECCIONES: ' + JSON.stringify(this.dirperjuri));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecPerNat(id: any) {
        this.atencionTrabajadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                // console.log('DIRECCIONES: ' + JSON.stringify(this.dirpernat));
                console.log(res.json);
                // this.dirpernat = res.json;
                this.dirper = res.json;
                if (this.dirper !== undefined) {
                    this.isVisible = true;
                } else {
                    this.isVisible = false;
                }
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    buscaEmpleadorByDocIdent() {
        // this.inicializaTablas();
            if (this.selectedTipodoc === undefined || this.selectedTipodoc.id === undefined || this.vNumdocumento === undefined || this.vNumdocumento === '') {
                return;
            }
            console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdocumento);
         const tipodoc = this.selectedTipodoc.id; // 2;
         const numdoc =  this.vNumdocumento; //  '11111111111';
        this.atencionTrabajadorService.findEmpleadorsByDocIdent(tipodoc, numdoc, Number(this.tippersona)).subscribe((empleador) => {
            console.log(empleador);
            this.empleador = empleador;
            if (this.empleador.id !== undefined) {
                if (this.tippersona === '1') {
                    this.vRazsocial = this.empleador.perjuridica.vRazsocial;
                    this.vEmailper = this.empleador.perjuridica.vEmailper;
                    this.vTelefono = this.empleador.perjuridica.vTelefono;
                    this.vCeluFax = this.empleador.perjuridica.vFaxperju;
                    this.vNomalter = this.empleador.perjuridica.vNomalter;
                    this.loadDirecPerJuri(this.empleador.id);
                } else {
                    this.vRazsocial = this.empleador.pernatural.vNombres + ' ' +  this.empleador.pernatural.vApepat + ' ' + this.empleador.pernatural.vApemat;
                    this.vEmailper = this.empleador.pernatural.vEmailper;
                    this.vTelefono = this.empleador.pernatural.vTelefono;
                    this.vCeluFax = this.empleador.pernatural.vCelular;
                    this.vNomalter = '';
                    this.loadDirecPerNat(this.empleador.id);
                }
            }
            this.registerChangeInEmpleador();
            this.registroAtencionWizard.empleadorSeleccionado.subscribe((loadempleador) => {
                this.empleador = loadempleador;
            });
        });
        // console.log('pasando desde busqueda de empleador');
    }

    ngOnInit() {
        this.isVisible = false;
        this.tippersona = '1';
        this.dirper = [];
        this.fechoy = new Date();
        this.loadTipoDoc();
        this.subscription = this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
        });
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.empleador = new Empleador();
        this.empleador.perjuridica = new Perjuridica();
        this.empleador.pernatural = new Pernatural();

        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
            this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
                this.atencion = atencion;
                this.registroAtencionWizard.empleadorSeleccionado.subscribe((loadempleador) => {
                    this.empleador = loadempleador;
                    if (atencion.vNumticket !== undefined) {
                        this.atencion.vNumticket = atencion.vNumticket.toUpperCase();
                    }
                    console.log('Actividad selecionada: ' + this.actividadSelec);
                    if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
                        this.router.navigate(['/consultas/atencion-trabajador']);
                    } else if (this.actividadSelec === '1') { // Si el flujo es generado al presionar el boton nuevo registro se instanciaran los datos en blanco
                        this.bandPantSuscriber = this.registroAtencionWizard.paganteriorSelec.subscribe((paginante) => {
                            this.paganterior = paginante;
                                // console.log('Empleador Recuperado: ' + JSON.stringify(loadempleador));
                                if (this.empleador.id !== undefined) {
                                    this.isVisible = true;
                                    if (this.empleador.perjuridica !== null) {
                                        this.tippersona = '1';
                                        this.dirper = new Dirperjuri();
                                        this.dirper = [];
                                        this.dirper.perjuridica = this.empleador.perjuridica;
                                        // console.log('Load empleador.Personajuridica: ' + JSON.stringify(this.empleador.perjuridica));
                                        this.selectedTipodoc = this.empleador.perjuridica.tipdocident;
                                        this.vNumdocumento = this.empleador.perjuridica.vNumdoc;

                                        this.vRazsocial = this.empleador.perjuridica.vRazsocial;
                                        this.vEmailper = this.empleador.perjuridica.vEmailper;
                                        this.vTelefono = this.empleador.perjuridica.vTelefono;
                                        this.vCeluFax = this.empleador.perjuridica.vFaxperju;
                                        this.vNomalter = this.empleador.perjuridica.vNomalter;
                                        this.loadDirecPerJuri(this.empleador.id);
                                    }else {
                                        this.tippersona = '0';
                                        this.dirper = new Dirpernat();
                                        this.dirper = [];
                                        this.dirper.pernatural = this.empleador.pernatural;
                                        // console.log('Load empleador.Personanatural: ' + JSON.stringify(this.empleador.pernatural));
                                        this.selectedTipodoc = this.empleador.pernatural.tipdocident;
                                        this.vNumdocumento = this.empleador.pernatural.vNumdoc;

                                        this.vRazsocial = this.empleador.pernatural.vNombres + ' ' +  this.empleador.pernatural.vApepat + ' ' + this.empleador.pernatural.vApemat;
                                        this.vEmailper = this.empleador.pernatural.vEmailper;
                                        this.vTelefono = this.empleador.pernatural.vTelefono;
                                        this.vCeluFax = this.empleador.pernatural.vCelular;
                                        this.vNomalter = '';
                                        this.loadDirecPerNat(this.empleador.id);
                                    }
                                    // this.loadDirecPerNat(this.empleador.id);
                                } else {
                                    this.tippersona = '1';
                                    this.isVisible = false;
                                    this.empleador = new Empleador();
                                    this.empleador.pernatural = new Pernatural();
                                    this.empleador.perjuridica = new Perjuridica();
                                    this.dirper = new Dirpernat();
                                    this.dirper = [];
                                    this.vRazsocial = '';
                                    this.vEmailper = '';
                                    this.vTelefono = '';
                                    this.vCeluFax = '';
                                    this.vNomalter = '';
                                }
                        });
                        this.paganterior = '3';
                        this.registerChangePaganterior();
                    } else {
                        // console.log('atencion.datlab: ' + JSON.stringify(atencion.datlab));
                        // console.log('atencion.empleador: ' + JSON.stringify(atencion.empleador));
                            if (atencion.datlab !== undefined ) { // Si la atencion datos laborales se obtienen los datos del trabajador de esta entidad
                                this.empleador =  this.atencion.datlab.empleador;
                                // console.log('this.atencion.datlab.empleador.perjuridica: ' + JSON.stringify(this.atencion.datlab.empleador.perjuridica));
                                // console.log('this.atencion.datlab.empleador.pernatural: ' + JSON.stringify(this.atencion.datlab.empleador.pernatural));
                                if (this.atencion.datlab.empleador.perjuridica !== null) {
                                    this.tippersona = '1';
                                    this.empleador.pernatural = new Pernatural();
                                    this.empleador.perjuridica = this.atencion.datlab.empleador.perjuridica;
                                    this.selectedTipodoc = this.atencion.datlab.empleador.perjuridica.tipdocident;
                                    this.vNumdocumento = this.atencion.datlab.empleador.perjuridica.vNumdoc;
                                    this.dirper = new Dirperjuri();
                                    this.dirper = [];
                                    this.dirper.perjuridica = this.atencion.datlab.empleador.perjuridica;
                                    this.loadDirecPerJuri(this.atencion.datlab.empleador.id);
                                    this.vRazsocial = this.atencion.datlab.empleador.perjuridica.vRazsocial;
                                    this.vEmailper = this.atencion.datlab.empleador.perjuridica.vEmailper;
                                    this.vTelefono = this.atencion.datlab.empleador.perjuridica.vTelefono;
                                    this.vCeluFax = this.atencion.datlab.empleador.perjuridica.vFaxperju;
                                    this.vNomalter = this.atencion.datlab.empleador.perjuridica.vNomalter;
                                } else if (this.atencion.datlab.empleador.pernatural !== null) {
                                    this.tippersona = '0';
                                    this.empleador.perjuridica = new Perjuridica();
                                    this.empleador.pernatural = this.atencion.datlab.empleador.pernatural;
                                    this.selectedTipodoc = this.atencion.datlab.empleador.pernatural.tipdocident;
                                    this.vNumdocumento = this.atencion.datlab.empleador.pernatural.vNumdoc;
                                    this.dirper = new Dirpernat();
                                    this.dirper = [];
                                    // this.dirper.pernatural = this.empleador.pernatural;
                                    this.loadDirecPerNat(this.atencion.datlab.empleador.id);
                                    this.vRazsocial = this.atencion.datlab.empleador.pernatural.vNombres +
                                                    ' ' +  this.atencion.datlab.empleador.pernatural.vApepat +
                                                    ' ' + this.atencion.datlab.empleador.pernatural.vApemat;
                                    this.vEmailper = this.atencion.datlab.empleador.pernatural.vEmailper;
                                    this.vTelefono = this.atencion.datlab.empleador.pernatural.vTelefono;
                                    this.vCeluFax = this.atencion.datlab.empleador.pernatural.vFaxperju;
                                    this.vNomalter = this.atencion.datlab.empleador.pernatural.vNomalter;
                                } else {
                                    this.atencion.datlab.empleador.pernatural = new Pernatural();
                                    this.atencion.datlab.empleador.perjuridica = new Perjuridica();
                                }
                            } else if (atencion.empleador !== undefined) {
                                console.log('NRO2');
                                this.empleador =  this.atencion.empleador;
                                // console.log('this.atencion.empleador.perjuridica: ' + JSON.stringify(this.atencion.empleador.perjuridica));
                                // console.log('this.atencion.empleador.pernatural: ' + JSON.stringify(this.atencion.empleador.pernatural));
                                if (this.atencion.empleador.perjuridica !== null) {
                                    this.tippersona = '1';
                                    this.empleador.pernatural = new Pernatural();
                                    this.empleador.perjuridica = this.atencion.empleador.perjuridica;
                                    this.selectedTipodoc = this.atencion.empleador.perjuridica.tipdocident;
                                    this.vNumdocumento = this.atencion.empleador.perjuridica.vNumdoc;
                                    this.dirper = new Dirperjuri();
                                    this.dirper = [];
                                    this.dirper.perjuridica = this.atencion.empleador.perjuridica;
                                    this.loadDirecPerJuri(this.atencion.empleador.id);
                                    this.vRazsocial = this.atencion.empleador.perjuridica.vRazsocial;
                                    this.vEmailper = this.atencion.empleador.perjuridica.vEmailper;
                                    this.vTelefono = this.atencion.empleador.perjuridica.vTelefono;
                                    this.vCeluFax = this.atencion.empleador.perjuridica.vFaxperju;
                                    this.vNomalter = this.atencion.empleador.perjuridica.vNomalter;
                                } else if (this.atencion.empleador.pernatural !== null) {
                                    this.tippersona = '0';
                                    this.empleador.perjuridica = new Perjuridica();
                                    this.empleador.pernatural = this.atencion.empleador.pernatural;
                                    this.selectedTipodoc = this.atencion.empleador.pernatural.tipdocident;
                                    this.vNumdocumento = this.atencion.empleador.pernatural.vNumdoc;
                                    this.dirper = new Dirpernat();
                                    this.dirper = [];
                                    this.dirper.pernatural = this.empleador.pernatural;
                                    this.loadDirecPerNat(this.atencion.empleador.id);
                                    this.vRazsocial = this.atencion.empleador.pernatural.vNombres +
                                                    ' ' +  this.atencion.empleador.pernatural.vApepat +
                                                    ' ' + this.atencion.empleador.pernatural.vApemat;
                                    this.vEmailper = this.atencion.empleador.pernatural.vEmailper;
                                    this.vTelefono = this.atencion.empleador.pernatural.vTelefono;
                                    this.vCeluFax = this.atencion.empleador.pernatural.vFaxperju;
                                    this.vNomalter = this.atencion.empleador.pernatural.vNomalter;
                                } else {
                                    this.empleador.pernatural = new Pernatural();
                                    this.empleador.perjuridica = new Perjuridica();
                                }
                            }
                        }
                });
            });
            // console.log('pasando desde OnInit');
            this.registerChangeInEmpleador();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    load(id) {
        this.atencionTrabajadorService.findEmpleadorById(id).subscribe((empleador) => {
            this.empleador = empleador;
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
        // console.log('EventaDataRow' + JSON.stringify(event.data));
        // console.log('DirperRow' + JSON.stringify(this.dirper));
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
        this.displayDialog = true;
    }
    save() {
        // console.log('Grabar: ' + JSON.stringify(this.dirper));
        // if (this.newDirec) {
        //     this.subscribeToSaveResponse(
        //          this.atencionTrabajadorService.createDirPerJuri(this.dirper));
        // } else {
        //     this.subscribeToSaveResponse(
        //         this.atencionTrabajadorService.updateDirPerjuri(this.dirper));
        // }
        console.log('Grabar: ' + JSON.stringify(this.dirper));
        if (this.newDirec) {
            console.log('Insertar');
            if (this.tippersona === '1') {
                this.subscribeToSaveResponseDirperjuri(
                     this.atencionTrabajadorService.createDirPerJuri(this.dirper));
            } else {
                this.subscribeToSaveResponseDirPerNat(
                    this.atencionTrabajadorService.createDirPerNat(this.dirper));
            }
        } else {
            console.log('Actualizar');
            if (this.tippersona === '1') {
                this.subscribeToSaveResponseDirperjuri(
                    this.atencionTrabajadorService.updateDirPerjuri(this.dirper));
            } else {
                this.subscribeToSaveResponseDirPerNat(
                    this.atencionTrabajadorService.updateDirPerNat(this.dirper));
            }
        }
    }

    delete() {
    }

    private subscribeToSaveResponseDirperjuri(result: Observable<Dirperjuri>) {
        result.subscribe((res: Dirperjuri) =>
            this.onSaveSuccessDirperjuri(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccessDirperjuri(result: Dirperjuri) {
        this.loadDirecPerJuri(this.empleador.id);
        this.close()
    }

    private subscribeToSaveResponseDirPerNat(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccessDirPerNat(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccessDirPerNat(result: Dirpernat) {
        this.loadDirecPerNat(this.empleador.id);
        this.close()
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
        // this.dirper = new Dirperjuri();
        // this.dirper.perjuridica = this.empleador.perjuridica;
        // this.displayDialog = false;
        console.log('TipPersona: ' + this.tippersona);
        if (this.tippersona === '1') {
            // this.dirper = new Dirperjuri();
            this.dirper.perjuridica = this.empleador.perjuridica;
        } else if (this.tippersona === '0') {
            // this.dirper = new Dirpernat();
            this.dirper.pernatural = this.empleador.pernatural;
        } else {
            this.dirper = [];
        }
        this.displayDialog = false;
    }

    previousState() {
        window.history.back();
    }

    registerChangePaganterior() {
        // this.bandPantSuscriber = this.eventManager.subscribe('savePageAnte',
        // (response) => {
            this.registroAtencionWizard.cambiarBandPagAnterior(this.paganterior);
        // });
    }

    registerChangeInEmpleador() {
        // this.eventSubscriber = this.eventManager.subscribe('saveEmpleador',
        // (response) => {
            // console.log('PasarEmpleador al Registro: ' + JSON.stringify(this.empleador));
            this.registroAtencionWizard.cambiarEmpleador(this.empleador);
        // });
    }

    // cloneDirec(dir: Dirperjuri): Dirperjuri {
    cloneDirec(dir: any): any {
        let direc;
        if (this.tippersona === '1') {
            direc = new Dirperjuri();
        } else {
            direc = new Dirpernat();
        }
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
