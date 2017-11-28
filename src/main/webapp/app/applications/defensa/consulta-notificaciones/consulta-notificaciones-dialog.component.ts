import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ConsultaNotificacionesPopupService } from './consulta-notificaciones-popup.service';
import { ResponseWrapper } from './../../../shared';

@Component({
    selector: 'jhi-consulta-notificaciones-dialog',
    templateUrl: './consulta-notificaciones-dialog.component.html'
})
export class ConsultaNotificacionesDialogComponent implements OnInit {

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
    selector: 'jhi-consulta-notificaciones-popup',
    template: ''
})
export class ConsultaNotificacionesPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultaNotificacionesPopupService: ConsultaNotificacionesPopupService
    ) { }

    ngOnInit() {
        console.log('OpenDialog');
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.consultaNotificacionesPopupService
                    .open(ConsultaNotificacionesDialogComponent as Component, params['id']);
            } else {
                this.consultaNotificacionesPopupService
                    .open(ConsultaNotificacionesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        console.log('CloseDialog');
        this.routeSub.unsubscribe();
    }
}
