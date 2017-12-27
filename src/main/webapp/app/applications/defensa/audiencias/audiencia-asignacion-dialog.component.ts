import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { DatePipe } from '@angular/common'

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AudienciaAsignacionPopupService } from './audiencia-asignacion-popup.service';
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

@Component({
    selector: 'jhi-audiencia-asignacion-dialog',
    templateUrl: './audiencia-asignacion-dialog.component.html'
})
export class AudienciaAsignacionDialogComponent implements OnInit {

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
    selectedAbogado: ComboModel;
    isSaving: boolean;
    fullnametrab: string;
    fullnameemp: string;

    abogados: ComboModel[];
    abogado = new Abogado();
    messagesAbogado: Message[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private messageService: MessageService,
        private eventManager: JhiEventManager,
        private conciliaService: ConciliaService,
        private abogadoService: AbogadoService,
        public datepipe: DatePipe
    ) {

    }

    ngOnInit() {
        this.es = ES;
        this.loadAbogado();
        this.expediente = this.concilia.expediente;
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

        if (this.perjuridica != null) {
            this.fullnameemp = this.perjuridica.vRazsocial;
        }else {
            this.fullnameemp = this.pernaturalEMP.vNombres + ' ' + this.pernaturalEMP.vApepat + ' ' + this.pernaturalEMP.vApemat ;
        }
        this.fullnametrab = this.pernaturalTRA.vNombres + ' ' + this.pernaturalTRA.vApepat + ' ' + this.pernaturalTRA.vApemat;

        this.numero_exp = this.expediente.vNumexp + '-' + this.expediente.nAnioexp;
        this.varfechahoraconci = this.concilia.dFecconci.day + '/' + this.concilia.dFecconci.month + '/' + this.concilia.dFecconci.year + '/' +
        ' ' + this.horacon.vDescrip + ':00';

        if (this.concilia.abogado !== null) {
            this.selectedAbogado =  new ComboModel( this.abogado.vNomabogad, this.concilia.abogado.id, 0);
            console.log('selecte');
            console.log(this.selectedAbogado);
        }

        this.isSaving = false;

        /*this.abogadoService.query()
        .subscribe((res: ResponseWrapper) => { this.abogados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));*/

    }

    loadAbogado() {
        this.abogadoService.consultaCbAbogados().subscribe(
            (res: ResponseWrapper) => {
                this.abogados = [];
                this.abogados = res.json;
                // this.selectedAbogado = new ComboModel(this.abogado.vNomabogad, '' + this.abogado.id, 0);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log('antes de validar');
        console.log(this.selectedAbogado);
        if (this.validarPersonaAbogado() === true ) {
            console.log('select');
            console.log(this.selectedAbogado.value);
            this.concilia.abogado =  {id: this.selectedAbogado.value};
            // console.log('ABogado ID: ' + this.concilia.abogado.id);
            this.isSaving = true;
            console.log(this.concilia);
                this.subscribeToSaveResponse(
                    this.conciliaService.update(this.concilia));
                console.log('valor de combo');
                console.log(this.selectedAbogado);
        }

        console.log(this.messagesAbogado);
    }

    validarPersonaAbogado(): boolean {
        if (this.selectedAbogado === undefined) {
            this.onErrorAbogado('Debe seleccionar un abogado');
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

    private onErrorAbogado(error: any) {
        this.messagesAbogado = [];
        this.messagesAbogado.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}

@Component({
    selector: 'jhi-audiencia-asignacion-popup',
    template: ''
})
export class AudienciaAsignacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audienciaAsignacionPopupService: AudienciaAsignacionPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                console.log('ID: ');
                console.log(params['id']);
                this.audienciaAsignacionPopupService
                    .open(AudienciaAsignacionDialogComponent as Component, params['id']);
            } else {
                this.audienciaAsignacionPopupService
                    .open(AudienciaAsignacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
