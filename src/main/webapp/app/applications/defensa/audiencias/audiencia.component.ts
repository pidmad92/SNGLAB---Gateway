import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ES } from './../../applications.constant';

import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Pasegl } from './pasegl.model';
import { Atencion } from './atencion.model';
import { Datlab } from './datlab.model';
import { Empleador } from './empleador.model';
import { Perjuridica } from './perjuridica.model';
import { Pernatural } from './pernatural.model';
import { ConciliaService } from './concilia.service';
import { ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-audiencia',
    templateUrl: './audiencia.component.html'
})
export class AudienciaComponent implements OnInit {

    expedientes: any;
    concilias: Concilia[];
    concilia: Concilia;
    expediente: Expediente;
    pasegl: Pasegl;
    atencion: Atencion;
    datlab: Datlab;
    empleador: Empleador;
    perjuridica: Perjuridica;
    pernatural: Pernatural;

    id = '14';
    currentUrl: String;
    es: any;
    fechaAudiencia: Date;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private conciliaService: ConciliaService
    ) {
        this.fechaAudiencia = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    ngOnInit() {

        console.log(this.currentUrl);
        this.expedientes = [
            {item: '1', codexpediente : '0000002169-10', fecha: '10/03/2010', conciliador: 'SLIZARRAGA',
                ruc: '20505158343', empleador: 'CONFECCIONES INCA COTTON S.A.C', nrodoc: '56897245', nomdoc: '' },
            {item: '2', codexpediente : '0000001699-06', fecha: '11/05/2006', conciliador: 'ACASSANA',
                ruc: '20251850993', empleador: 'GRUPO INTERNACIONAL SERVICE S.A.C.', nrodoc: '56897458', nomdoc: '' },
            {item: '3', codexpediente : '0000001698-07', fecha: '15/06/2007', conciliador: 'SLIZARRAGA',
                ruc: '20504257381', empleador: 'SYSTEM DATABASE S.A.', nrodoc: '56897845', nomdoc: '' }
        ]

        console.log(this.router.url);
        this.es = ES;
        this.currentUrl = this.router.url;

        switch (this.currentUrl) {
            case '/defensa/audiencia/asignacion-abogado' : {this.AsignarAbogado();
                                                           }
        }
    }

    AsignarAbogado() {
        if (this.fechaAudiencia) {
            this.conciliaService.SearfechaVar({
                query: this.fechaAudiencia,
                }).subscribe(
                    (res: ResponseWrapper) => this.concilias = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.conciliaService.Searfecha().subscribe(
            (res: ResponseWrapper) => {
                this.concilias = res.json;
                console.log(this.concilias);
                for (const concilia of this.concilias) {
                    this.expediente = concilia.expediente;
                    this.pasegl = this.expediente.pasegl;
                    this.atencion = this.pasegl.atencion;
                    this.datlab = this.atencion.datlab;
                    this.empleador = this.datlab.empleador;
                    this.perjuridica = this.empleador.perjuridica;
                    this.pernatural = this.empleador.pernatural;
                    if (this.perjuridica != null) {
                        concilia.numerodocumento = this.perjuridica.vNumdoc;
                        console.log(this.perjuridica.vNumdoc);
                    }else {
                        concilia.numerodocumento = this.pernatural.vNumdoc;
                        console.log(this.pernatural.vNumdoc);
                    }
                }

                this.concilias.forEach((item, index) => {
                    const concilia = item;
                    this.expediente = concilia.expediente;
                    this.pasegl = this.expediente.pasegl;
                    this.atencion = this.pasegl.atencion;
                    this.datlab = this.atencion.datlab;
                    this.empleador = this.datlab.empleador;
                    this.perjuridica = this.empleador.perjuridica;
                    this.pernatural = this.empleador.pernatural;
                    if (this.perjuridica != null) {
                        this.concilias[index].numerodocumento = this.perjuridica.vNumdoc;
                        this.concilias[index].fullname = this.perjuridica.vRazsocial;
                        console.log(this.perjuridica.vNumdoc);
                    }else {
                        this.concilias[index].numerodocumento = this.pernatural.vNumdoc;
                        this.concilias[index].fullname = this.pernatural.vNombres + ' ' + this.pernatural.vApepat + ' ' + this.pernatural.vApemat ;
                        console.log(this.pernatural.vNumdoc);
                    }
                });

                this.fechaAudiencia = null;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    private onError(error) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
