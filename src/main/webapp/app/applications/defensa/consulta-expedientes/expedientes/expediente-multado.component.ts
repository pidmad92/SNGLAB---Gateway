import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ES } from './../../../applications.constant';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Rx';
import { ResponseWrapper } from './../../../../shared';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ConciliaService } from './../../audiencias/concilia.service';
import { DocexpedienService } from './../../consulta-expedientes/docexpedien.service';

import { Concilia } from './../../audiencias/concilia.model';
import { Expediente } from './../../audiencias/expediente.model';
import { Horacon } from './../../audiencias/horacon.model';
import { Abogado } from './../../audiencias/abogado.model';
import { Pasegl } from './../../audiencias/pasegl.model';
import { Atencion } from './../../audiencias/atencion.model';
import { Datlab } from './../../audiencias/datlab.model';
import { Empleador } from './../../audiencias/empleador.model';
import { Perjuridica } from './../../audiencias/perjuridica.model';
import { Pernatural } from './../../audiencias/pernatural.model';
import { Trabajador } from './../../audiencias/trabajador.model';
import { Resulconci } from './../../audiencias/resulconci.model';
import { Docexpedien } from './../../../../entities/docexpedien/docexpedien.model';
import { Tipdocexp } from './../../../../entities/tipdocexp/tipdocexp.model';
import { Tipproveid } from './../../../../entities/tipproveid/tipproveid.model';
import { Dettipprov } from './../../../../entities/dettipprov/dettipprov.model';

@Component({
    selector: 'jhi-consulta-expediente',
    templateUrl: './expediente-multado.component.html'
})
export class ExpedienteMultadoComponent implements OnInit {

    currentUrl: String;
    es: any;
    tipoBusqueda = '1';
    rangeDates: Date[];
    vNumexp: string;
    id_expediente: any;
    id = '';
    idexpediente = '';
    idconciliacion = '';

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
    resulconci: Resulconci;
    docexpedien: Docexpedien;
    docexpediens: Docexpedien[];
    concilias: Concilia[];
    tipdocexp: Tipdocexp;
    tipproveid: Tipproveid;
    dettipprov: Dettipprov;
    eventSubscriber: Subscription;

    constructor(
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private datePipe: DatePipe,
        private conciliaService: ConciliaService,
        private docexpedienService: DocexpedienService
    ) {}

    ngOnInit() {
        this.es = ES;
        this.tipoBusqueda = '1';
        this.registerChangeInConcilia();
    }

    buscarAudiencia() {
        let queryString = '';
        if (this.tipoBusqueda === '1') {
            queryString = '/concilias/expediente/param?nro_exp=' + this.vNumexp;
        } else {
            const fec_ini = this.datePipe.transform(this.rangeDates[0], 'dd-MM-yyyy');
            const fec_fin = this.datePipe.transform(this.rangeDates[1], 'dd-MM-yyyy');
            queryString = '/concilias/expediente/param?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
        }
        this.conciliaService.consultaAudiencia(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.concilias = res.json;
                console.log(this.concilias);
                this.concilias.forEach((item, index) => {
                    this.DatosFaltantes(item, index);
                });

            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    onRowSelect(event) {
        this.idexpediente = String(event.data.expediente.id); // Id expediente
        this.idconciliacion = String(event.data.id); // Id Conciliacion
        this.loadListaDocumentoExp();
    }

    AsignarDocumento() {
        this.id = this.idexpediente;
        this.router.navigate(['/defensa/expediente/consulta', 'exp-multados', { outlets: { popupdoc: 'documento/' + this.id } }]);
        console.log('iddoc: ' + this.id);
    }

    ConsultaExpediente() {
        this.id = this.idconciliacion;
        this.router.navigate(['/defensa/expediente/consulta', 'exp-multados', { outlets: { popupexpm: this.id } }]);
        console.log('idconsulta: ' + this.id);
    }

    loadListaDocumentoExp() {
        this.id = this.idexpediente;
        this.docexpedienService.consultalistdocexp(Number(this.id)).subscribe(
            (res: ResponseWrapper) => {
                this.docexpediens = res.json;
                console.log(this.docexpediens);
                this.docexpediens.forEach((item, index) => {
                    this.DatosDocumento(item, index);
                });

            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    registerChangeInConcilia() {
        this.eventSubscriber = this.eventManager.subscribe('docexpedienListModification', (response) => this.loadListaDocumentoExp());
    }

    private DatosDocumento(item, index) {
        const docexpedien = item;
        console.log(docexpedien);

        this.tipdocexp = docexpedien.tipdocexp;
        this.tipproveid = docexpedien.tipproveid;
        this.dettipprov = docexpedien.dettipprov;
        console.log(this.datePipe.transform(docexpedien.dFechadoc, 'dd/MM/yyyy'));
        this.docexpediens[index].fecregistro = this.datePipe.transform(docexpedien.dFechadoc, 'dd/MM/yyyy');
        this.docexpediens[index].usuarioreg = '';
        if (this.tipproveid != null && this.dettipprov != null) {
            this.docexpediens[index].observacion = this.tipproveid.vDescrip + ' ' + this.dettipprov.vDescrip;
        }
    }

    private DatosFaltantes(item, index) {
        const concilia = item;
        console.log(concilia);
        this.expediente = concilia.expediente;
        this.resulconci = concilia.resulconci;
        this.pasegl = this.expediente.pasegl;
        this.atencion = this.pasegl.atencion;
        this.datlab = this.atencion.datlab;
        this.empleador = this.datlab.empleador;
        this.perjuridica = this.empleador.perjuridica;
        this.pernaturalEMP = this.empleador.pernatural;
        this.trabajador = this.datlab.trabajador;
        this.pernaturalTRA = this.trabajador.pernatural;
        this.horacon = concilia.horacon;
        if (this.perjuridica != null) {
            this.concilias[index].nrodocemp = this.perjuridica.vNumdoc;
            this.concilias[index].fullnameemp = this.perjuridica.vRazsocial;
            console.log(this.perjuridica.vNumdoc);
        }else {
            this.concilias[index].nrodocemp = this.pernaturalEMP.vNumdoc;
            this.concilias[index].fullnameemp = this.pernaturalEMP.vNombres + ' ' + this.pernaturalEMP.vApepat + ' ' + this.pernaturalEMP.vApemat ;
            console.log(this.pernaturalEMP.vNumdoc);
        }
        this.concilias[index].nrodoctrab = this.pernaturalTRA.vNumdoc;
        this.concilias[index].fullnametrab = this.pernaturalTRA.vNombres + ' ' + this.pernaturalTRA.vApepat + ' ' + this.pernaturalTRA.vApemat ;
        this.concilias[index].fecregistro = this.datePipe.transform(this.expediente.dFecregexp, 'dd/MM/yyyy');
    }

    private onError(error) {
        // console.log('error' + error.message);
        // this.jhiAlertService.error(error.message, null, null);
    }
}
