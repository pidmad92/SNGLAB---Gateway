import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { TrabajadorPopupService } from './trabajador-popup.service';
import { TrabajadorService } from './trabajador.service';
import { Cartrab, CartrabService } from '../cartrab';
import { Pernatural, PernaturalService } from '../pernatural';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-trabajador-dialog',
    templateUrl: './trabajador-dialog.component.html'
})
export class TrabajadorDialogComponent implements OnInit {

    trabajador: Trabajador;
    isSaving: boolean;

    cartrabs: Cartrab[];

    pernaturals: Pernatural[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private trabajadorService: TrabajadorService,
        private cartrabService: CartrabService,
        private pernaturalService: PernaturalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cartrabService.query()
            .subscribe((res: ResponseWrapper) => { this.cartrabs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.pernaturalService.query()
            .subscribe((res: ResponseWrapper) => { this.pernaturals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.trabajador.id !== undefined) {
            this.subscribeToSaveResponse(
                this.trabajadorService.update(this.trabajador));
        } else {
            this.subscribeToSaveResponse(
                this.trabajadorService.create(this.trabajador));
        }
    }

    private subscribeToSaveResponse(result: Observable<Trabajador>) {
        result.subscribe((res: Trabajador) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Trabajador) {
        this.eventManager.broadcast({ name: 'trabajadorListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCartrabById(index: number, item: Cartrab) {
        return item.id;
    }

    trackPernaturalById(index: number, item: Pernatural) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-trabajador-popup',
    template: ''
})
export class TrabajadorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trabajadorPopupService: TrabajadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.trabajadorPopupService
                    .open(TrabajadorDialogComponent as Component, params['id']);
            } else {
                this.trabajadorPopupService
                    .open(TrabajadorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
