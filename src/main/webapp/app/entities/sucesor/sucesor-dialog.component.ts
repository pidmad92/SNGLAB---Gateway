import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sucesor } from './sucesor.model';
import { SucesorPopupService } from './sucesor-popup.service';
import { SucesorService } from './sucesor.service';
import { Personanatur, PersonanaturService } from '../personanatur';
import { Trabajador, TrabajadorService } from '../trabajador';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sucesor-dialog',
    templateUrl: './sucesor-dialog.component.html'
})
export class SucesorDialogComponent implements OnInit {

    sucesor: Sucesor;
    isSaving: boolean;

    personanaturs: Personanatur[];

    trabajadors: Trabajador[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sucesorService: SucesorService,
        private personanaturService: PersonanaturService,
        private trabajadorService: TrabajadorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personanaturService.query()
            .subscribe((res: ResponseWrapper) => { this.personanaturs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.trabajadorService.query()
            .subscribe((res: ResponseWrapper) => { this.trabajadors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.sucesor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sucesorService.update(this.sucesor));
        } else {
            this.subscribeToSaveResponse(
                this.sucesorService.create(this.sucesor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sucesor>) {
        result.subscribe((res: Sucesor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Sucesor) {
        this.eventManager.broadcast({ name: 'sucesorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonanaturById(index: number, item: Personanatur) {
        return item.id;
    }

    trackTrabajadorById(index: number, item: Trabajador) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-sucesor-popup',
    template: ''
})
export class SucesorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sucesorPopupService: SucesorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sucesorPopupService
                    .open(SucesorDialogComponent as Component, params['id']);
            } else {
                this.sucesorPopupService
                    .open(SucesorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
