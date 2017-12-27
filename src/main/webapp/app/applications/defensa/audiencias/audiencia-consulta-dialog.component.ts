import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AudienciaConsultaPopupService } from './audiencia-consulta-popup.service';
import { ResponseWrapper } from './../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ComboModel } from './../../general/combobox.model';
import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Horacon } from './horacon.model';
import { Abogado } from './abogado.model';
import { AbogadoService } from './abogado.service';
import { ConciliaService } from './concilia.service';
import { Pasegl } from './pasegl.model';
import { Atencion } from './atencion.model';
import { Datlab } from './datlab.model';
import { Empleador } from './empleador.model';
import { Perjuridica } from './perjuridica.model';
import { Pernatural } from './pernatural.model';
import { Trabajador } from './trabajador.model';
import { Dirperjuri } from './dirperjuri.model';
import { DirperjuriService } from './dirperjuri.service';
import { Dirpernat } from './dirpernat.model';
import { DirpernatService } from './dirpernat.service';
import { Tipdocident} from './../../../entities/tipdocident/tipdocident.model';
import { Motatenofic } from './motatenofic.model';
import { Resulconci } from '../../../entities/resulconci/index';
import { Tipresconc } from './tipresconc.model';

@Component({
    selector: 'jhi-audiencia-consulta-dialog',
    templateUrl: './audiencia-consulta-dialog.component.html'
})

export class AudienciaConsultaDialogComponent implements OnInit {

    es: any;
    fechaAudiencia: Date;
    fechaMP: Date;
    registro: Date;
    selectedValues1: string[];
    selectedValues2: string[];
    selectedValues3: string[];
    direcciones: any;
    motivos: any;
    audiencia: any;

    // CLases
    concilia: Concilia;
    expediente: Expediente;
    horacon: Horacon;
    pasegl: Pasegl;
    atencion: Atencion;
    datlab: Datlab;
    empleador: Empleador;
    perjuridica: Perjuridica;
    pernaturalEMP: Pernatural;
    pernaturalTRA: Pernatural;
    trabajador: Trabajador;
    abogado: Abogado;
    tipdocidentEMP: Tipdocident;
    tipdocidentTRA: Tipdocident;

    // CLases Lista Concilia
    expedienteCon: Expediente;
    horaconCon: Horacon;
    abogadoCon: Abogado;
    resulconciCon: Resulconci;
    tipresconcCon: Tipresconc;

    // Listas
    dirperjuris: Dirperjuri[];
    dirpernatsEmp: Dirpernat[];
    dirpernatsTra: Dirpernat[];
    motatenofics: any[];
    selectmotatenofic: Motatenofic[];
    selectmotatenoficstring: String[];
    conciliasCon: Concilia[];

    // Variables
    numero_exp: String;
    varfechaexp: String;
    fullnameemp: String;
    tipdocemp: String;
    numdocemp: String;
    varfecconci: String;
    varhorconci: String;
    varfecmp: String;
    banPersona: String; // Empleador 1: PersonaJuridica 2:PersonaNatural

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private datePipe: DatePipe,
        private dirperjuriService: DirperjuriService,
        private dirpernatService: DirpernatService,
        private conciliaService: ConciliaService,
        private eventManager: JhiEventManager
    ) {

    }

    loadAudiencias(id: any) {
        this.conciliaService.consultaAudienciaExpediente(id).subscribe(
            (res: ResponseWrapper) => {
                this.conciliasCon = res.json;
                this.conciliasCon.forEach((item, index) => {
                    this.DatosFaltantesConciliacion(item, index);
                });
                // console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecEmpleadorPerJur(id: any) {
        this.dirperjuriService.buscarDireccionesPerJur(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirperjuris = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecTrabajadorPerNatu(id: any) {
        this.dirpernatService.buscarDireccionesTrabajador(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernatsTra = res.json;
                // console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadDirecEmpleadorPerNatu(id: any) {
        this.dirpernatService.buscarDireccionesEmpleador(id).subscribe(
            (res: ResponseWrapper) => {
                this.dirpernatsEmp = res.json;
                // console.log(JSON.stringify(this.dirpernat));
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    loadMotivOfic(idpase) {
        this.conciliaService.consultaMotivOfic(idpase).subscribe(
            (res: ResponseWrapper) => {
                this.motatenofics = res.json;
                console.log(this.motatenofics);
                for (const mot of this.motatenofics) {
                    if (mot.idmotpase !== null) {
                        if (this.selectmotatenofic === undefined) {
                            this.selectmotatenofic = new Array();
                            this.selectmotatenoficstring = new Array();
                        }
                        this.selectmotatenofic.push(mot);
                        this.selectmotatenoficstring.push(mot.idmotpase);
                        console.log(this.selectmotatenoficstring);
                    }
                }

                this.ValidadCeroidmotate();
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ValidadCeroidmotate() {
        this.motatenofics.forEach((item, index) => {
            const concilia = item;
            console.log('foreac');
            console.log(concilia);
            console.log(concilia.idmotpase);
            if (concilia.idmotpase == null ) {
                this.motatenofics[index].idmotpase = 0;
                this.motatenofics[index].motivselec = false;
            }else {
                this.motatenofics[index].motivselec = true;
            }
        });
    }

    ngOnInit() {
        this.es = ES;
        this.banPersona = '';
        this.expediente = this.concilia.expediente;
        this.pasegl = this.expediente.pasegl;
        this.horacon = this.concilia.horacon;
        this.abogado = this.concilia.abogado;
        this.pasegl = this.expediente.pasegl;
        this.atencion = this.pasegl.atencion;
        this.datlab = this.atencion.datlab;
        this.empleador = this.datlab.empleador;
        this.perjuridica = this.empleador.perjuridica;
        this.pernaturalEMP = this.empleador.pernatural;
        this.trabajador = this.datlab.trabajador;
        this.pernaturalTRA = this.trabajador.pernatural;
        this.tipdocidentTRA = this.pernaturalTRA.tipdocident;
        this.loadDirecTrabajadorPerNatu(this.pernaturalTRA.id);
        this.loadMotivOfic(this.pasegl.id);
        this.loadAudiencias(this.expediente.id);

        this.numero_exp = this.expediente.vNumexp + '-' + this.expediente.nAnioexp;
        this.varfechaexp = this.datePipe.transform(this.expediente.dFecregexp, 'dd-MM-yyyy');
        if (this.perjuridica != null) {
            this.tipdocemp = 'RUC:';
            this.numdocemp = this.perjuridica.vNumdoc;
            this.loadDirecEmpleadorPerJur(this.perjuridica.id);
            this.banPersona = '1';
        }else {
            this.tipdocidentEMP = this.pernaturalEMP.tipdocident;
            this.tipdocemp = this.tipdocidentEMP.vDescorta;
            this.numdocemp = this.pernaturalEMP.vNumdoc;
            this.loadDirecEmpleadorPerNatu(this.pernaturalEMP.id);
            this.banPersona = '2';
        }

        this.varfecconci = this.concilia.dFecconci.day + '/' + this.concilia.dFecconci.month + '/' + this.concilia.dFecconci.year;
        this.varhorconci = this.horacon.vDescrip + ':00';
        this.varfecmp = this.expediente.dFecmespar == null ? '' : this.datePipe.transform(this.expediente.dFecmespar, 'dd-MM-yyyy');

        console.log('Selector');
        console.log(this.motatenofics);

    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    private onError(error: any) {
        // this.messages = [];
        // this.messages.push({ severity: 'error', summary: 'Mensaje de Error', detail: error.message });
    }

    private DatosFaltantesConciliacion(item, index) {
        const concilia = item;
        this.expedienteCon = concilia.expediente;
        if (concilia.resulconci != null) {
            this.resulconciCon = concilia.resulconci;
            this.tipresconcCon = this.resulconciCon.tipresconc;
        }
        this.horaconCon = concilia.horacon;
        this.abogadoCon = concilia.abogado;
        this.conciliasCon[index].fechaconci = this.datePipe.transform(concilia.dFecconci, 'dd/MM/yyyy');
        this.conciliasCon[index].horaconci =  this.horaconCon.vDescrip + ':00';
    }
}

@Component({
    selector: 'jhi-audiencia-popup',
    template: ''
})
export class AudienciaConsultaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audienciaConsultaPopupService: AudienciaConsultaPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.audienciaConsultaPopupService
                    .open(AudienciaConsultaDialogComponent as Component, params['id']);
            } else {
                this.audienciaConsultaPopupService
                    .open(AudienciaConsultaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
