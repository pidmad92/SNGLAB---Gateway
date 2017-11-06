import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pasemotiaten } from './pasemotiaten.model';
import { PasemotiatenPopupService } from './pasemotiaten-popup.service';
import { PasemotiatenService } from './pasemotiaten.service';
import { Pase, PaseService } from '../pase';
import { Motatenofic, MotatenoficService } from '../motatenofic';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pasemotiaten-dialog',
    templateUrl: './pasemotiaten-dialog.component.html'
})
export class PasemotiatenDialogComponent implements OnInit {

    pasemotiaten: Pasemotiaten;
    isSaving: boolean;

    pases: Pase[];

    motatenofics: Motatenofic[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pasemotiatenService: PasemotiatenService,
        private paseService: PaseService,
        private motatenoficService: MotatenoficService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paseService.query()
            .subscribe((res: ResponseWrapper) => { this.pases = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motatenoficService.query()
            .subscribe((res: ResponseWrapper) => { this.motatenofics = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pasemotiaten.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pasemotiatenService.update(this.pasemotiaten));
        } else {
            this.subscribeToSaveResponse(
                this.pasemotiatenService.create(this.pasemotiaten));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pasemotiaten>) {
        result.subscribe((res: Pasemotiaten) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pasemotiaten) {
        this.eventManager.broadcast({ name: 'pasemotiatenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaseById(index: number, item: Pase) {
        return item.id;
    }

    trackMotatenoficById(index: number, item: Motatenofic) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pasemotiaten-popup',
    template: ''
})
export class PasemotiatenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasemotiatenPopupService: PasemotiatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pasemotiatenPopupService
                    .open(PasemotiatenDialogComponent as Component, params['id']);
            } else {
                this.pasemotiatenPopupService
                    .open(PasemotiatenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
