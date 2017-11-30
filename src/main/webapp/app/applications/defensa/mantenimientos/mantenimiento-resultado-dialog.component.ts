import { ES } from './../../applications.constant';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { Tipresconc,  } from './tipresconc.model';
import { MantenimientoResultadoPopupService } from './mantenimiento-resultado-popup.service';
import { ResulconciService } from './resulconci.service';
import { TipresconcService } from './tipresconc.service';
import { ResponseWrapper } from './../../../shared';

@Component({
    selector: 'jhi-mantenimiento-resultado-dialog',
    templateUrl: './mantenimiento-resultado-dialog.component.html'
})
export class MantenimientoResultadoDialogComponent implements OnInit {

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
    resulconci: Resulconci;
    isSaving: boolean;

    tipresconcs: Tipresconc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resulconciService: ResulconciService,
        private tipresconcService: TipresconcService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.es = ES;
        this.direcciones = [
            {departamento : 'Lima', provincia: 'Lima', distrito: 'Rimac',  direccion: 'Ministerio de Trabajo'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaral', direccion: 'Apple S.A.C.'},
            {departamento : 'Lima', provincia: 'Huaura', distrito: 'Huaura', direccion: 'Apple S.A.C.'},
        ];
        this.motivos = [
            {codigoMotivos : '01', descripcion: 'Vacaciones Perdidas', observacion: '' },
            {codigoMotivos : '02', descripcion: 'Remuneraciones Insolutas', observacion: '' },
            {codigoMotivos : '03', descripcion: 'Gratificaciones Legales', observacion: 'De proceder via Judicial' },
        ];
        this.audiencia = [
            {item : '1', fecha: '18/11/2017', hora: '11:20:00', conciliador: 'JAvelador', resultado: 'Audiencia', tresultado: '' }
        ];
        this.isSaving = false;
        this.tipresconcService.query()
            .subscribe((res: ResponseWrapper) => { this.tipresconcs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    save() {
        this.isSaving = true;
        if (this.resulconci.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resulconciService.update(this.resulconci));
        } else {
            this.subscribeToSaveResponse(
                this.resulconciService.create(this.resulconci));
            console.log(this.resulconci);
        }
    }

    private subscribeToSaveResponse(result: Observable<Resulconci>) {
        result.subscribe((res: Resulconci) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Resulconci) {
        console.log('broadcast');
        this.eventManager.broadcast({ name: 'resulconciListModification', content: 'OK'});
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

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-mantenimiento-resultado-popup',
    template: ''
})
export class MantenimientoResultadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private mantenimientoResultadoPopupService: MantenimientoResultadoPopupService
    ) { }

    ngOnInit() {
        console.log('OpenDialog');
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                console.log('123')
                this.mantenimientoResultadoPopupService
                    .open(MantenimientoResultadoDialogComponent as Component, params['id']);
            } else {
                console.log('456')
                this.mantenimientoResultadoPopupService
                    .open(MantenimientoResultadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        console.log('CloseDialog');
        this.routeSub.unsubscribe();
    }
}
