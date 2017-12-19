import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AudienciaRegistroResultadoPopupService } from './audiencia-registro-resultado-popup.service';
import { ResponseWrapper } from './../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ComboModel } from './../../general/combobox.model';
import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Horacon } from './horacon.model';
import { Abogado } from './abogado.model';
import { Resulconci } from './resulconci.model';
import { ResulconciService } from './resulconci.service';
import { ConciliaService } from './concilia.service';
import { Pasegl } from './pasegl.model';
import { Atencion } from './atencion.model';
import { Datlab } from './datlab.model';
import { Empleador } from './empleador.model';
import { Perjuridica } from './perjuridica.model';
import { Pernatural } from './pernatural.model';
import { Trabajador } from './trabajador.model';

@Component({
    selector: 'jhi-audiencia-registro-resultado-dialog',
    templateUrl: './audiencia-registro-resultado-dialog.component.html'
})
export class AudienciaRegistroResultadoDialogComponent implements OnInit {

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
    numero_exp: String;
    anio: String;
    varfechahoraconci: String;
    selectedResultado: ComboModel;
    isSaving: boolean;
    fullnametrab: string;
    fullnameemp: string;

    resultados: ComboModel[];
    abogado = new Abogado();
    resulconci = new Resulconci();
    messagesResultado: Message[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private conciliaService: ConciliaService,
        private resulconciService: ResulconciService,
        public datepipe: DatePipe
    ) {

    }

    ngOnInit() {
        this.es = ES;
        this.loadResultado();
        this.expediente = this.concilia.expediente;
        this.horacon = this.concilia.horacon;
        this.abogado = this.concilia.abogado;
        this.resulconci = this.concilia.resulconci;
        this.pasegl = this.expediente.pasegl;
        this.atencion = this.pasegl.atencion;
        this.datlab = this.atencion.datlab;
        this.empleador = this.datlab.empleador;
        this.perjuridica = this.empleador.perjuridica;
        this.pernaturalEMP = this.empleador.pernatural;
        this.trabajador = this.datlab.trabajador;
        this.pernaturalTRA = this.trabajador.pernatural;

        if (this.perjuridica != null) {
            this.fullnameemp = this.perjuridica.vRazsocial;
        }else {
            this.fullnameemp = this.pernaturalEMP.vNombres + ' ' + this.pernaturalEMP.vApepat + ' ' + this.pernaturalEMP.vApemat ;
        }
        this.fullnametrab = this.pernaturalTRA.vNombres + ' ' + this.pernaturalTRA.vApepat + ' ' + this.pernaturalTRA.vApemat;

        this.numero_exp = this.expediente.vNumexp + '-' + this.expediente.nAnioexp;
        this.varfechahoraconci = this.concilia.dFecconci.day + '/' + this.concilia.dFecconci.month + '/' + this.concilia.dFecconci.year + '/' +
        ' ' + this.horacon.vDescrip + ':00';

        if (this.concilia.resulconci !== null) {
            this.selectedResultado =  new ComboModel( this.resulconci.vDescrip, this.concilia.resulconci.id, 0);
        }

        this.isSaving = false;
    }

    loadResultado() {
        this.resulconciService.consultaCbResultados().subscribe(
            (res: ResponseWrapper) => {
                this.resultados = [];
                this.resultados = res.json;
                // this.selectedAbogado = new ComboModel(this.abogado.vNomabogad, '' + this.abogado.id, 0);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.validarPersonaResultado() === true ) {
            this.concilia.resulconci =  {id: this.selectedResultado.value};
            this.isSaving = true;
            console.log(this.concilia);
                this.subscribeToSaveResponse(
                    this.conciliaService.update(this.concilia));
        }
    }

    validarPersonaResultado(): boolean {
        if (this.selectedResultado === undefined) {
            this.onErrorResultado('Debe seleccionar un resultado');
            return false;
        }   else {
            return true;
        }
    }

    private subscribeToSaveResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Concilia) {
        console.log('broadcast');
        this.eventManager.broadcast({ name: 'conciliaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
        console.log('saveerror');
    }

    private onError(error: any) {
        // this.jhiAlertService.error(error.message, null, null);
    }

    private onErrorResultado(error: any) {
        this.messagesResultado = [];
        this.messagesResultado.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}

@Component({
    selector: 'jhi-audiencia-registro-resultado-popup',
    template: ''
})
export class AudienciaRegistroResultadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audienciaRegistroResultadoPopupService: AudienciaRegistroResultadoPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.audienciaRegistroResultadoPopupService
                    .open(AudienciaRegistroResultadoDialogComponent as Component, params['id']);
            } else {
                this.audienciaRegistroResultadoPopupService
                    .open(AudienciaRegistroResultadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
