import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AudienciaConsultaPopupService } from './audiencia-consulta-popup.service';
import { ResponseWrapper } from './../../../shared';

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

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {

    }

    ngOnInit() {
        this.es = ES;
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaral', direccion: 'Apple S.A.C.'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ]
        this.motivos = [
            {codigoMotivos : '01', descripcion: 'Vacaciones Perdidas', observacion: '' },
            {codigoMotivos : '02', descripcion: 'Remuneraciones Insolutas', observacion: '' },
            {codigoMotivos : '03', descripcion: 'Gratificaciones Legales', observacion: 'De proceder via Judicial' },
        ]
        this.audiencia = [
            {item : '1', fecha: '18/11/2017', hora: '11:20:00', conciliador: 'JAvelador', resultado: 'Audiencia', tresultado: '' }
        ]
    }
    clear() {
        this.activeModal.dismiss('cancel');
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
        console.log('OpenDialog');
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
        console.log('CloseDialog');
        this.routeSub.unsubscribe();
    }
}
