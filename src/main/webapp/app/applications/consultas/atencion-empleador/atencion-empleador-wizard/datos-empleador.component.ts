import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription, Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

// import { Trabajador } from './../trabajador.model';
import { AtencionEmpleadorService } from './../atencion-empleador.service';
// import { TipdocidentService } from '../tipdocident.service';
// import { CartrabService } from '../cartrab.service';
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
    dirpernat: Dirpernat[];
    // dirper = new Dirperjuri();
    dirper: any;
    selecDirper: Dirperjuri;
    tippersona: string;
    vRazsocial: string;
    vEmailper: string;
    vTelefono: string;
    vCeluFax: string;
    vNomalter: string;

    actividadSelec: string;

    fechoy: Date;
    maxlengthDocIdent: number;
    numOficina = 5;

    constructor(
        private router: Router,
        private eventManager: JhiEventManager,
        private atencionEmpleadorService: AtencionEmpleadorService,
        // private tipdocidentService: TipdocidentService,
        // private cartrabService: CartrabService,
        private route: ActivatedRoute,
        private registroAtencionWizard: RegistroAtencionWizardService
    ) {
    }

    inicializaTablas() {
        this.dirpernat = [];
        this.dirperjuri = [];
        this.dirper = [];
    }

    inicializarFormulario() {
        this.inicializaTablas();
        this.vNumdocumento = '';
        this.displayDialog = false;
        this.vEmailper = '';
        this.vTelefono = '';
        this.vCeluFax = '';
        this.vRazsocial = '';
        this.vNomalter = '';
        if (this.selectedTipodoc !== undefined) {
            this.maxlengthDocIdent = this.selectedTipodoc.nNumdigi;
            if (this.selectedTipodoc.vDescorta === 'RUC') {
                this.tippersona = '1';
            } else {
                this.tippersona = '0';
            }
        }

        if (this.empleador !== null) {
            // if (this.empleador.pernatural !== null) {
            //     this.empleador.pernatural = new Pernatural();
            // }
            // if (this.empleador.perjuridica !== null) {
            //     this.empleador.perjuridica = new Perjuridica();
            // }
            // if (this.empleador.cartrab !== null) {
            //     this.empleador.cartrab = new Cartrab();
            // }
            this.empleador = new Empleador();
            // if (this.empleador.perjuridica.vEmail !== undefined) {
            //     this.empleador.perjuridica.vEmail = '';
            // }
            // if (this.empleador.pernatural.vEmail !== undefined) {
            //     this.empleador.pernatural.vEmail = '';
            // }
        }
    }

    loadTipoDoc() {
        this.atencionEmpleadorService.consultaTipoDocIdentidad().subscribe(
            (res: ResponseWrapper) => {
                this.tipodocs = res.json;
            },
        (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }
    loadDirecPerJuri(id: any) {
        this.atencionEmpleadorService.buscarDireccionesPerJuri(id).subscribe(
            (res: ResponseWrapper) => {
                // console.log('DIRECCIONES: ' + JSON.stringify(this.dirperjuri));
                console.log(JSON.stringify(res.json));
                // this.dirperjuri = res.json;
                this.dirper = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecPerNat(id: any) {
        this.atencionEmpleadorService.buscarDireccionesPerNat(id).subscribe(
            (res: ResponseWrapper) => {
                // console.log('DIRECCIONES: ' + JSON.stringify(this.dirpernat));
                console.log(res.json);
                // this.dirpernat = res.json;
                this.dirper = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ngOnInit() {
        // this.dirper = new Perjuridica();
        // this.dirper = new Object();
        this.tippersona = '1';
        this.dirper = [];
        this.fechoy = new Date();
        this.loadTipoDoc();
        this.loadDepartamentos();
        this.atencion = new Atencion();
        this.empleador = new Empleador();
        this.empleador.perjuridica = new Perjuridica();
        this.empleador.pernatural = new Pernatural();
        this.empleador.perjuridica.vEmail = '';
        this.empleador.pernatural.vEmail = '';
        this.subscription = this.registroAtencionWizard.actividadSelec.subscribe((actividadSelect) => {
            this.actividadSelec = actividadSelect;
        this.subscription = this.registroAtencionWizard.atenSeleccionado.subscribe((atencion) => {
            this.atencion = atencion;
            console.log('Atencion Recuperada: ' + JSON.stringify(atencion));
            // if (this.actividadSelec === null) { // Si la página se refresca se pierde la actividad y se redirige al inicio
            //     this.router.navigate(['/consultas/atencion-trabajador']);
            // } else if (this.actividadSelec === '1') { // Si el flujo es generado al presionar el boton nuevo registro se instanciaran los datos en blanco
            // } else {
                if (atencion.empleador !== undefined) {
                    console.log('NRO2');
                    this.empleador =  this.atencion.empleador;
                    if (this.atencion.empleador.perjuridica !== null) {
                        this.empleador.perjuridica = this.atencion.empleador.perjuridica;
                        // this.selectedTipodoc = this.atencion.empleador.perjuridica.tipdocident;
                        // this.vNumdocumento = this.atencion.empleador.perjuridica.vNumdoc;
                        this.vRazsocial = this.empleador.perjuridica.vRazsocial;
                        this.vEmailper = this.empleador.perjuridica.vEmailper;
                        this.vTelefono = this.empleador.perjuridica.vTelefono;
                        this.vCeluFax = this.empleador.perjuridica.vFaxperju;
                        this.vNomalter = this.empleador.perjuridica.vNomalter;
                        this.loadDirecPerJuri(this.empleador.id);
                    } else if (this.atencion.empleador.pernatural !== null) {
                        this.empleador.pernatural = this.atencion.empleador.pernatural;
                        this.empleador.perjuridica = new Perjuridica();
                        this.vRazsocial = this.empleador.pernatural.vNombres + ' ' +  this.empleador.pernatural.vApepat + ' ' + this.empleador.pernatural.vApemat;
                        this.vEmailper = this.empleador.pernatural.vEmailper;
                        this.vTelefono = this.empleador.pernatural.vTelefono;
                        this.vCeluFax = this.empleador.pernatural.vCelular;
                        this.vNomalter = '';
                        this.loadDirecPerNat(this.empleador.id);
                    } else {
                        this.empleador.pernatural = new Pernatural();
                        this.empleador.perjuridica = new Perjuridica ();
                    }

                } else if (atencion.datlab !== undefined ) {
                        console.log('NRO1');
                        this.empleador =  this.atencion.datlab.empleador;
                        console.log('EMP: ' + JSON.stringify(this.empleador));
                        if (this.atencion.datlab.empleador.perjuridica !== null) {
                            this.empleador.perjuridica = this.atencion.datlab.empleador.perjuridica;
                            this.selectedTipodoc = this.atencion.datlab.empleador.perjuridica.tipdocident;
                            this.vNumdocumento = this.atencion.datlab.empleador.perjuridica.vNumdoc;
                            this.vRazsocial = this.empleador.perjuridica.vRazsocial;
                            this.vEmailper = this.empleador.perjuridica.vEmailper;
                            this.vTelefono = this.empleador.perjuridica.vTelefono;
                            this.vCeluFax = this.empleador.perjuridica.vFaxperju;
                            this.vNomalter = this.empleador.perjuridica.vNomalter;
                            this.dirper = new Dirperjuri();
                            this.dirper.perjuridica = this.empleador.perjuridica;
                            this.loadDirecPerJuri(this.empleador.id);
                        } else if (this.atencion.datlab.empleador.pernatural !== null) {
                            this.atencion.datlab.empleador.perjuridica = new Perjuridica();
                            this.empleador.pernatural = this.atencion.datlab.empleador.pernatural;
                            this.selectedTipodoc = this.atencion.datlab.empleador.pernatural.tipdocident;
                            this.vNumdocumento = this.atencion.datlab.empleador.pernatural.vNumdoc;
                            this.dirper = new Dirpernat();
                            this.dirper.pernatural = this.empleador.pernatural;
                            this.loadDirecPerNat(this.empleador.id);
                            this.vRazsocial = this.empleador.pernatural.vNombres + ' ' +  this.empleador.pernatural.vApepat + ' ' + this.empleador.pernatural.vApemat;
                            this.vEmailper = this.empleador.pernatural.vEmailper;
                            this.vTelefono = this.empleador.pernatural.vTelefono;
                            this.vCeluFax = this.empleador.pernatural.vCelular;
                            this.vNomalter = '';
                        } else {
                            this.atencion.datlab.empleador.pernatural = new Pernatural();
                            this.atencion.datlab.empleador.perjuridica = new Perjuridica();
                        }
                } else if (atencion.vObsatenci === 'newAten') {
                    console.log('NRO3');
                    this.atencion.vObsatenci = '';
                    this.empleador = new Empleador();
                    this.empleador.perjuridica = new Perjuridica();
                    this.empleador.pernatural = new Pernatural();
                } else {
                    console.log('NRO4');
                    // this.router.navigate(['/consultas/atencion-Empleador']);
                }
            // }
        });
        this.registerChangeInEmpleador();
    });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    load(id) {
        this.atencionEmpleadorService.findEmpleadorById(id).subscribe((empleador) => {
            this.empleador = empleador;
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
        // console.log('Loaddist' + this.padWithZero(idProv));
        this.atencionEmpleadorService.consDis(this.padWithZero(this.dirper.nCoddepto), this.padWithZero(idProv)).subscribe((distritos) => {
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
        console.log('EventaDataRow' + JSON.stringify(event.data));
        console.log('DirperRow' + JSON.stringify(this.dirper));
        this.loadProvincias(false, this.dirper.nCoddepto);
        this.loadDistritos(false, this.dirper.nCodprov);
        this.displayDialog = true;
    }
    save() {
        console.log('Grabar: ' + JSON.stringify(this.dirper));
        if (this.newDirec) {
            console.log('Insertar');
            if (this.tippersona === '0') {
                this.subscribeToSaveResponseDirperjuri(
                     this.atencionEmpleadorService.createDirPerJuri(this.dirper));
            } else {
                this.subscribeToSaveResponseDirPerNat(
                    this.atencionEmpleadorService.createDirPerNat(this.dirper));
            }
        } else {
            console.log('Actualizar');
            if (this.tippersona === '0') {
                this.subscribeToSaveResponseDirperjuri(
                    this.atencionEmpleadorService.updateDirPerjuri(this.dirper));
            } else {
                this.subscribeToSaveResponseDirPerNat(
                    this.atencionEmpleadorService.updateDirPerNat(this.dirper));
            }
        }
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

    private onSaveError() {
        console.log('saveerror');
    }

    close() {
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

    buscaEmpleadorByDocIdent() {

        this.inicializaTablas();
            if (this.selectedTipodoc === undefined || this.selectedTipodoc.id === undefined || this.vNumdocumento === undefined || this.vNumdocumento === '') {
                return;
            }
            console.log(JSON.stringify(this.selectedTipodoc.id) + '|' + this.vNumdocumento);

         const tipodoc = this.selectedTipodoc.id; // 2;
         const numdoc =  this.vNumdocumento; //  '11111111111';
        this.atencionEmpleadorService.findEmpleadorsByDocIdent(tipodoc, numdoc, Number(this.tippersona)).subscribe((empleador) => {
            console.log('Empleador Buscado; ' + JSON.stringify(empleador));
            this.empleador = empleador;
            this.atencion.empleador = empleador;
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
        });
        this.registerChangeInEmpleador();
    }

    previousState() {
        window.history.back();
    }

    registerChangeInEmpleador() {
        // this.eventSubscriber = this.eventManager.subscribe('saveEmpleador',
        // (response) => {
            console.log('Para Registrar Empleador: '  + JSON.stringify(this.empleador));
            this.registroAtencionWizard.cambiarEmpleador(this.empleador);
        // });
    }

    // registerChangeInAccionadops() {
    //     this.eventSubscriber = this.eventManager.subscribe(
    //         'datosEmpleadorListModification',
    //         (response) => this.load(this.empleador.id)
    //     );
    // }
    // cloneDirec(dir: Dirperjuri): Dirperjuri {
    cloneDirec(dir: any): any {
        let direc;
        if (this.tippersona === '0') {
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
