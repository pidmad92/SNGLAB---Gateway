import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motivpase } from './motivpase.model';
import { MotivpasePopupService } from './motivpase-popup.service';
import { MotivpaseService } from './motivpase.service';
import { Pasegl, PaseglService } from '../pasegl';
import { Motatenofic, MotatenoficService } from '../motatenofic';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motivpase-dialog',
    templateUrl: './motivpase-dialog.component.html'
})
export class MotivpaseDialogComponent implements OnInit {

    motivpase: Motivpase;
    isSaving: boolean;

    pasegls: Pasegl[];

    motatenofics: Motatenofic[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motivpaseService: MotivpaseService,
        private paseglService: PaseglService,
        private motatenoficService: MotatenoficService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.paseglService.query()
            .subscribe((res: ResponseWrapper) => { this.pasegls = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motatenoficService.query()
            .subscribe((res: ResponseWrapper) => { this.motatenofics = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.motivpase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motivpaseService.update(this.motivpase));
        } else {
            this.subscribeToSaveResponse(
                this.motivpaseService.create(this.motivpase));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motivpase>) {
        result.subscribe((res: Motivpase) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motivpase) {
        this.eventManager.broadcast({ name: 'motivpaseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPaseglById(index: number, item: Pasegl) {
        return item.id;
    }

    trackMotatenoficById(index: number, item: Motatenofic) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-motivpase-popup',
    template: ''
})
export class MotivpasePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motivpasePopupService: MotivpasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motivpasePopupService
                    .open(MotivpaseDialogComponent as Component, params['id']);
            } else {
                this.motivpasePopupService
                    .open(MotivpaseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
