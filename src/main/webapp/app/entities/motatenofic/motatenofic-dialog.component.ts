import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motatenofic } from './motatenofic.model';
import { MotatenoficPopupService } from './motatenofic-popup.service';
import { MotatenoficService } from './motatenofic.service';
import { Motate, MotateService } from '../motate';
import { Oficina, OficinaService } from '../oficina';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motatenofic-dialog',
    templateUrl: './motatenofic-dialog.component.html'
})
export class MotatenoficDialogComponent implements OnInit {

    motatenofic: Motatenofic;
    isSaving: boolean;

    motates: Motate[];

    oficinas: Oficina[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motatenoficService: MotatenoficService,
        private motateService: MotateService,
        private oficinaService: OficinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.motateService.query()
            .subscribe((res: ResponseWrapper) => { this.motates = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.oficinaService.query()
            .subscribe((res: ResponseWrapper) => { this.oficinas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.motatenofic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motatenoficService.update(this.motatenofic));
        } else {
            this.subscribeToSaveResponse(
                this.motatenoficService.create(this.motatenofic));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motatenofic>) {
        result.subscribe((res: Motatenofic) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motatenofic) {
        this.eventManager.broadcast({ name: 'motatenoficListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMotateById(index: number, item: Motate) {
        return item.id;
    }

    trackOficinaById(index: number, item: Oficina) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-motatenofic-popup',
    template: ''
})
export class MotatenoficPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motatenoficPopupService: MotatenoficPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motatenoficPopupService
                    .open(MotatenoficDialogComponent as Component, params['id']);
            } else {
                this.motatenoficPopupService
                    .open(MotatenoficDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
