import { ES } from './../../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';
import { DatePipe } from '@angular/common'

import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DocumentoAsignacionPopupService } from './documento-asignacion-popup.service';
import { ResponseWrapper } from './../../../../shared';

import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ComboModel } from './../../../general/combobox.model';
import { Concilia } from './../../audiencias/concilia.model';
import { Expediente } from './../../audiencias/expediente.model';
import { Horacon } from './../../audiencias/horacon.model';
import { Abogado } from './../../audiencias/abogado.model';
import { AbogadoService } from './../../audiencias/abogado.service';
import { ConciliaService } from './../../audiencias/concilia.service';
import { DocexpedienService } from './../../consulta-expedientes/docexpedien.service';
import { TipdocexpService } from './../tipdocexp.service';
import { Pasegl } from './../../audiencias/pasegl.model';
import { Atencion } from './../../audiencias/atencion.model';
import { Datlab } from './../../audiencias/datlab.model';
import { Empleador } from './../../audiencias/empleador.model';
import { Perjuridica } from './../../audiencias/perjuridica.model';
import { Pernatural } from './../../audiencias/pernatural.model';
import { Trabajador } from './../../audiencias/trabajador.model';
import { Docexpedien } from './../../../../entities/docexpedien/docexpedien.model';

@Component({
    selector: 'jhi-documento-asignacion-dialog',
    templateUrl: './documento-asignacion-dialog.component.html'
})
export class DocumentoAsignacionDialogComponent implements OnInit {

    es: any;
    fechaRegDoc: Date;
    registro: Date;
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
    docexpedien = new Docexpedien();

    numero_exp: String;
    anio: String;
    varfechahoraconci: String;
    isSaving: boolean;
    fullnametrab: string;
    fullnameemp: string;
    tipprovdisabled: boolean;
    detprovdisabled: boolean;
    oficiodisabled: boolean;
    nro_oficio: string;
    nro_folios: number;
    tipdocexps: ComboModel[];
    tipproveids: ComboModel[];
    dettipprovs: ComboModel[];
    selectedTipDocExp: ComboModel;
    SelectedTipProveid: ComboModel;
    SelectedDetTipProv: ComboModel;
    abogado = new Abogado();
    messagesDocumento: Message[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private messageService: MessageService,
        private eventManager: JhiEventManager,
        private conciliaService: ConciliaService,
        private docexpedienService: DocexpedienService,
        private abogadoService: AbogadoService,
        private tipdocexpService: TipdocexpService,
        public datepipe: DatePipe
    ) {

    }

    ngOnInit() {
        this.es = ES;
        this.loadTipDocExp();
        this.fechaRegDoc = new Date();
        this.numero_exp = this.expediente.vNumexp + '-' + this.expediente.nAnioexp;
        this.varfechahoraconci = this.expediente.dFecregexp.day + '/' + this.expediente.dFecregexp.month + '/' + this.expediente.dFecregexp.year;

        this.isSaving = false;
        this.tipprovdisabled = true;
        this.detprovdisabled = true;
        this.oficiodisabled = true;

    }

    loadTipDocExp() {
        this.tipdocexpService.consultaCbTipDocExp().subscribe(
            (res: ResponseWrapper) => {
                this.tipdocexps = [];
                this.tipdocexps = res.json;
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    ObtenerTipProv() {
        if (Number(this.selectedTipDocExp.value) === 1) {
            this.tipprovdisabled = true;
            this.detprovdisabled = true;
            this.oficiodisabled = false;
        } else {
            this.oficiodisabled = true;
            this.tipdocexpService.ConsultacbTipProveid(Number(this.selectedTipDocExp.value)).subscribe(
                (res: ResponseWrapper) => {
                    this.tipproveids = [];
                    this.tipproveids = res.json;
                    this.tipprovdisabled = false;
                    this.detprovdisabled = true;
                },
                (res: ResponseWrapper) => { this.onError(res.json); }
            );
        }
    }

    ObtenerDetProv() {
        this.tipdocexpService.ConsultacbDetTipProv(Number(this.SelectedTipProveid.value)).subscribe(
            (res: ResponseWrapper) => {
                this.dettipprovs = [];
                this.dettipprovs = res.json;
                this.detprovdisabled = false;
                console.log(this.dettipprovs);
            },
            (res: ResponseWrapper) => { this.onError(res.json); }
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        if (this.validarDocumento() === true ) {

            this.docexpedien.tipdocexp = null;
            this.docexpedien.tipproveid = null;
            this.docexpedien.dettipprov = null;
            this.docexpedien.expediente = null;

            this.docexpedien.tipdocexp =  {id: this.selectedTipDocExp.value};
            console.log(this.fechaRegDoc);
            this.docexpedien.dFechadoc = {
                day:  this.datepipe.transform(this.fechaRegDoc, 'dd'),
                month:  this.datepipe.transform(this.fechaRegDoc, 'MM'),
                year:  this.datepipe.transform(this.fechaRegDoc, 'yyyy')
            };
            this.docexpedien.nFolios = this.nro_folios;

            this.docexpedien.expediente = {id: this.expediente.id};
            this.docexpedien.nFlgactivo = true;
            this.docexpedien.nUsuareg = 1;
            this.docexpedien.nSedereg = 1;

            if (Number(this.selectedTipDocExp.value) === 1) {
                this.docexpedien.vNumoficio = this.nro_oficio;
            }else {
                this.docexpedien.tipproveid =  {id: this.SelectedTipProveid.value};
                this.docexpedien.dettipprov =  {id: this.SelectedDetTipProv.value};
            }

            this.isSaving = true;
            console.log(this.docexpedien);
                this.subscribeToSaveResponse(
                    this.docexpedienService.create(this.docexpedien));
        }

        console.log(this.messagesDocumento);
    }

    validarDocumento(): boolean {
        if (this.selectedTipDocExp === undefined) {
            this.onErrorDocumento('Debe seleccionar un tipo documento');
            return false;
        }   else {

            if (Number(this.selectedTipDocExp.value) === 1) {
                if (this.nro_oficio === '' ) {
                    this.onErrorDocumento('Debe ingresar un número de oficio');
                    return false;
                }
            } else {

                if (this.SelectedTipProveid === undefined) {
                    this.onErrorDocumento('Debe seleccionar un tipo proveido');
                    return false;
                }else if (this.SelectedDetTipProv === undefined) {
                    this.onErrorDocumento('Debe seleccionar un tipo proveido');
                    return false;
                }
            }

            return true;
        }
    }

    private subscribeToSaveResponse(result: Observable<Concilia>) {
        result.subscribe((res: Concilia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Concilia) {
        console.log('broadcast');
        this.eventManager.broadcast({ name: 'docexpedienListModification', content: 'OK'});
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

    private onErrorDocumento(error: any) {
        this.messagesDocumento = [];
        this.messagesDocumento.push({ severity: 'error', summary: 'Mensaje de Error', detail: error });
    }
}

@Component({
    selector: 'jhi-audiencia-asignacion-popup',
    template: ''
})
export class DocumentoAsignacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentoAsignacionPopupService: DocumentoAsignacionPopupService
    ) { }

    ngOnInit() {
        console.log('Hola');
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentoAsignacionPopupService
                    .open(DocumentoAsignacionDialogComponent as Component, params['id']);
            } else {
                this.documentoAsignacionPopupService
                    .open(DocumentoAsignacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
