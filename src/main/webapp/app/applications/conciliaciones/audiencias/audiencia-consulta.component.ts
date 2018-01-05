import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ES } from './../../applications.constant';

import { FormsModule } from '@angular/forms';

import { ResponseWrapper } from './../../../shared';
import { DatePipe } from '@angular/common';

import { ConciliaService } from './concilia.service';
import { AbogadoService } from './abogado.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { ComboModel } from './../../general/combobox.model';

import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Horacon } from './horacon.model';
import { Abogado } from './abogado.model';
import { Pasegl } from './pasegl.model';
import { Atencion } from './atencion.model';
import { Datlab } from './datlab.model';
import { Empleador } from './empleador.model';
import { Perjuridica } from './perjuridica.model';
import { Pernatural } from './pernatural.model';
import { Trabajador } from './trabajador.model';
import { Resulconci } from './resulconci.model';

@Component({
    selector: 'jhi-audiencia-consulta',
    templateUrl: './audiencia-consulta.component.html'
})
export class AudienciaConsultaComponent implements OnInit {

    expedientes: any;
    id = '14';
    currentUrl: String;
    rangeDates: Date[];
    es: any;

    tipoBusqueda = '1';
    vNumexp: string;

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
    concilias: Concilia[];

    concilia2: Concilia;
    expediente2: Expediente;
    horacon2: Horacon;
    pasegl2: Pasegl;
    atencion2: Atencion;
    datlab2: Datlab;
    empleador2: Empleador;
    perjuridica2: Perjuridica;
    pernaturalEMP2: Pernatural;
    pernaturalTRA2: Pernatural;
    trabajador2: Trabajador;
    resulconci2: Resulconci;
    concilias2: Concilia[];

    abogados: ComboModel[];
    selectedAbogado: ComboModel;
    abogado = new Abogado();

    constructor(
        private router: Router,
        private conciliaService: ConciliaService,
        private abogadoService: AbogadoService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.es = ES;
        this.currentUrl = this.router.url;
        this.tipoBusqueda = '1';
        this.loadAbogado();
    }

    buscarAudiencia() {
        let queryString = '';
        if (this.tipoBusqueda === '1') {
            queryString = '/concilias/param?nro_exp=' + this.vNumexp;
        } else {
            const fec_ini = this.datePipe.transform(this.rangeDates[0], 'dd-MM-yyyy');
            const fec_fin = this.datePipe.transform(this.rangeDates[1], 'dd-MM-yyyy');
            queryString = '/concilias/param?fec_ini=' + fec_ini + '&fec_fin=' + fec_fin;
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

    buscarAudienciaAbogado() {
        let queryString = '';
        queryString = '/concilias/param?id_abog=' +  this.selectedAbogado.value;
        this.conciliaService.consultaAudiencia(queryString).subscribe(
            (res: ResponseWrapper) => {
                this.concilias2 = res.json;
                console.log(this.concilias2);
                this.concilias2.forEach((item, index) => {
                    this.DatosFaltantesAbogado(item, index);
                });

            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
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
        this.concilias[index].fechahoraconci = this.datePipe.transform(concilia.dFecconci, 'dd/MM/yyyy') +
        ' ' + this.horacon.vDescrip + ':00';
    }

    onRowSelect(event) {
        this.id = String(event.data.id);
    }

    private DatosFaltantesAbogado(item, index) {
        const concilia = item;
        console.log(concilia);
        this.expediente2 = concilia.expediente;
        this.resulconci2 = concilia.resulconci;
        this.pasegl2 = this.expediente2.pasegl;
        this.atencion2 = this.pasegl2.atencion;
        this.datlab2 = this.atencion2.datlab;
        this.empleador2 = this.datlab2.empleador;
        this.perjuridica2 = this.empleador2.perjuridica;
        this.pernaturalEMP2 = this.empleador2.pernatural;
        this.trabajador2 = this.datlab2.trabajador;
        this.pernaturalTRA2 = this.trabajador2.pernatural;
        this.horacon2 = concilia.horacon;
        if (this.perjuridica2 != null) {
            this.concilias2[index].nrodocemp = this.perjuridica2.vNumdoc;
            this.concilias2[index].fullnameemp = this.perjuridica2.vRazsocial;
        }else {
            this.concilias2[index].nrodocemp = this.pernaturalEMP2.vNumdoc;
            this.concilias2[index].fullnameemp = this.pernaturalEMP2.vNombres + ' ' + this.pernaturalEMP2.vApepat + ' ' + this.pernaturalEMP2.vApemat ;
        }
        this.concilias2[index].nrodoctrab = this.pernaturalTRA2.vNumdoc;
        this.concilias2[index].fullnametrab = this.pernaturalTRA2.vNombres + ' ' + this.pernaturalTRA2.vApepat + ' ' + this.pernaturalTRA2.vApemat ;
        this.concilias2[index].fechahoraconci = this.datePipe.transform(concilia.dFecconci, 'dd/MM/yyyy') +
        ' ' + this.horacon2.vDescrip + ':00';
    }

    private onError(error) {
        // console.log('error' + error.message);
        // this.jhiAlertService.error(error.message, null, null);
    }

}
