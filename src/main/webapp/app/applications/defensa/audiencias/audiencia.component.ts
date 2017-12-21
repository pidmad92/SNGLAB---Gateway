import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ES } from './../../applications.constant';
import { DatePipe } from '@angular/common'
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Concilia } from './concilia.model';
import { Expediente } from './expediente.model';
import { Pasegl } from './pasegl.model';
import { Atencion } from './atencion.model';
import { Datlab } from './datlab.model';
import { Empleador } from './empleador.model';
import { Perjuridica } from './perjuridica.model';
import { Pernatural } from './pernatural.model';
import { Trabajador } from './trabajador.model';
import { Horacon } from './horacon.model';
import { Resulconci} from './resulconci.model';
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
    pernaturalEMP: Pernatural;
    pernaturalTRA: Pernatural;
    trabajador: Trabajador;
    horacon: Horacon;
    resulconci: Resulconci;
    eventSubscriber: Subscription;

    id = '14';
    currentUrl: String;
    es: any;
    fechaAudiencia: Date;
    date: Date;

    constructor(
        private router: Router,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private conciliaService: ConciliaService,
        public datepipe: DatePipe
    ) {
        this.fechaAudiencia = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    ngOnInit() {
        this.es = ES;
        this.currentUrl = this.router.url;
        this.loadAll();
        this.registerChangeInConcilia();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.fechaAudiencia = query;
        this.date = new Date();
        // const latest_date = this.datepipe.transform(this.date, 'dd/MM/yyyy');
        // console.log('FechaHoy');
        // console.log(latest_date);

        console.log('fecha');
        console.log(this.fechaAudiencia);
        this.loadAll();
    }

    clear() {
        this.fechaAudiencia = null;
        this.loadAll();
    }

    loadAll() {
        this.SelecUrl();
    }

    SelecUrl() {
        switch (this.currentUrl) {
            case '/defensa/audiencia/asignacion-abogado' : {
                this.AsignarAbogado();
                break;
            }
            case '/defensa/audiencia/registrar-resultado' : {
                this.AsignarResultado();
                break;
            }
            case '/defensa/audiencia/reprogramacion' : {
                console.log('asignar reprogramacion');
                this.AsignarReprogramacion();
                break;
            }
        }
    }

    AsignarAbogado() {
        //  console.log(this.datepipe.transform(this.fechaAudiencia, 'dd/MM/yyyy'));
        if (this.fechaAudiencia) {
            let fechabusqueda = '';
            fechabusqueda = this.datepipe.transform(this.fechaAudiencia, 'dd-MM-yyyy');
            this.conciliaService.SearfechaVar(fechabusqueda
                ).subscribe(
                    (res: ResponseWrapper) => {
                        this.concilias = res.json;
                        console.log(this.concilias);
                        this.concilias.forEach((item, index) => {
                            this.DatosFaltantes(item, index);
                        });

                        this.fechaAudiencia = null;
                    },
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.conciliaService.searfecha().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.concilias = res.json;
                console.log(this.concilias);
                this.concilias.forEach((item, index) => {
                    this.DatosFaltantes(item, index);
                });

                this.fechaAudiencia = null;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    AsignarResultado() {
        //  console.log(this.datepipe.transform(this.fechaAudiencia, 'dd/MM/yyyy'));
        if (this.fechaAudiencia) {
            let fechabusqueda = '';
            fechabusqueda = this.datepipe.transform(this.fechaAudiencia, 'dd-MM-yyyy');
            this.conciliaService.searchresultadofecha(fechabusqueda
                ).subscribe(
                    (res: ResponseWrapper) => {
                        this.concilias = res.json;
                        console.log(this.concilias);
                        this.concilias.forEach((item, index) => {
                            this.DatosFaltantes(item, index);
                        });

                        this.fechaAudiencia = null;
                    },
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.conciliaService.searchresultado().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.concilias = res.json;
                console.log(this.concilias);
                this.concilias.forEach((item, index) => {
                    this.DatosFaltantes(item, index);
                });

                this.fechaAudiencia = null;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    AsignarReprogramacion() {
        //  console.log(this.datepipe.transform(this.fechaAudiencia, 'dd/MM/yyyy'));
        if (this.fechaAudiencia) {
            let fechabusqueda = '';
            fechabusqueda = this.datepipe.transform(this.fechaAudiencia, 'dd-MM-yyyy');
            this.conciliaService.searchreprogramacionfecha(fechabusqueda
                ).subscribe(
                    (res: ResponseWrapper) => {
                        this.concilias = res.json;
                        console.log(this.concilias);
                        this.concilias.forEach((item, index) => {
                            this.DatosFaltantes(item, index);
                        });

                        this.fechaAudiencia = null;
                    },
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.conciliaService.searchreprogramacion().subscribe(
            (res: ResponseWrapper) => {
                console.log(res.json);
                this.concilias = res.json;
                console.log(this.concilias);
                this.concilias.forEach((item, index) => {
                    this.DatosFaltantes(item, index);
                });

                this.fechaAudiencia = null;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );

    }

    onRowSelect(event) {
        this.id = String(event.data.id);
    }

    registerChangeInConcilia() {
        this.eventSubscriber = this.eventManager.subscribe('conciliaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        // console.log('error' + error.message);
        // this.jhiAlertService.error(error.message, null, null);
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
        this.concilias[index].fechahoraconci = this.datepipe.transform(concilia.dFecconci, 'dd/MM/yyyy') +
        ' ' + this.horacon.vDescrip + ':00';
    }

}
