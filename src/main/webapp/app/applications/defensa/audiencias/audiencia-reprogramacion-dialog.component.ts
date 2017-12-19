import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { DatePipe } from '@angular/common'

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AudienciaReprogramacionPopupService } from './audiencia-reprogramacion-popup.service';
import { ResponseWrapper } from './../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ComboModel } from './../../general/combobox.model';
import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Horacon } from './horacon.model';
import { HoraconService } from './horacon.service';
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
    selector: 'jhi-audiencia-reprogramacion-dialog',
    templateUrl: './audiencia-reprogramacion-dialog.component.html'
})
export class AudienciaReprogramacionDialogComponent implements OnInit {

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
    fechaReprogramacion: Date;
    dayoriginal: string;
    monthoriginal: string;
    yearoriginal: string;
    abogadooriginal: number;
    resultadooriginal: number;
    idoriginal: number;
    idbandera: number;
    horadisabled: boolean;

    selectedHora: ComboModel;
    Horacbs: ComboModel[];
    abogado = new Abogado();
    messagesReprogramacion: Message[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private conciliaService: ConciliaService,
        private horaconService: HoraconService,
        public datepipe: DatePipe
    ) {

    }

    ngOnInit() {
        this.es = ES;
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

        this.horadisabled = true;
        this.isSaving = false;
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        console.log('antes de validar');
        if (this.validarReprogramacion() === true ) {
                this.isSaving = true;
                this.idbandera = 9;
                this.concilia.resulconci =  {id: this.idbandera};
                try {
                    console.log('actualiza audiencia')
                    console.log(this.concilia);
                    this.subscribePreliminarToSaveResponse(
                        this.conciliaService.update(this.concilia));
                }catch (e) {
                    this.onErrorReprogramacion(e);
                }

        }

        console.log(this.messagesReprogramacion);
    }

    EventoCalendar(fecha: Date) {
        let fechabusqueda = '';
        fechabusqueda = this.datepipe.transform(fecha, 'dd-MM-yyyy');
        this.horaconService.Consultacbhorafecha(fechabusqueda).subscribe(
            (res: ResponseWrapper) => {
                this.Horacbs = [];
                this.Horacbs = res.json;
                this.horadisabled = false;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    validarReprogramacion(): boolean {
        if (this.fechaReprogramacion === undefined) {
            this.onErrorReprogramacion('Debe ingresar una fecha válida');
            return false;
        } else if (this.selectedHora === undefined) {
            this.onErrorReprogramacion('Debe seleccionar una hora');
            return false;
        }   else {
            return true;
        }
    }

    private subscribeToSaveResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onError(error) {
        // console.log('error' + error.message);
        // this.jhiAlertService.error(error.message, null, null);
    }

    private subscribePreliminarToSaveResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) => {
            // this.onSaveSuccess(res)
            this.concilia.dFecconci.day  = this.datepipe.transform(this.fechaReprogramacion, 'dd');
            this.concilia.dFecconci.month  = this.datepipe.transform(this.fechaReprogramacion, 'MM');
            this.concilia.dFecconci.year  = this.datepipe.transform(this.fechaReprogramacion, 'yyyy');
            this.concilia.abogado = null;
            this.concilia.resulconci = null;
            this.concilia.horacon = null;
            this.concilia.horacon =  {id: this.selectedHora.value};
            this.concilia.id = null;
            console.log('registra audiencia')
            console.log(this.concilia);
            this.subscribeToSaveResponse(
                    this.conciliaService.create(this.concilia));
        }
            , (res: Response) => this.onSaveError());
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

    private onErrorReprogramacion(error: any) {
        this.messagesReprogramacion = [];
        this.messagesReprogramacion.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}

@Component({
    selector: 'jhi-audiencia-reprogramacion-popup',
    template: ''
})
export class AudienciaReprogramacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private audienciaReprogramacionPopupService: AudienciaReprogramacionPopupService
    ) { }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.audienciaReprogramacionPopupService
                    .open(AudienciaReprogramacionDialogComponent as Component, params['id']);
            } else {
                this.audienciaReprogramacionPopupService
                    .open(AudienciaReprogramacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
