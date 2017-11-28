import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discapate } from './discapate.model';
import { DiscapatePopupService } from './discapate-popup.service';
import { DiscapateService } from './discapate.service';
import { Atencion, AtencionService } from '../atencion';
import { Discap, DiscapService } from '../discap';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discapate-dialog',
    templateUrl: './discapate-dialog.component.html'
})
export class DiscapateDialogComponent implements OnInit {

    discapate: Discapate;
    isSaving: boolean;

    atencions: Atencion[];

    discaps: Discap[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discapateService: DiscapateService,
        private atencionService: AtencionService,
        private discapService: DiscapService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atencionService.query()
            .subscribe((res: ResponseWrapper) => { this.atencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.discapService.query()
            .subscribe((res: ResponseWrapper) => { this.discaps = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.discapate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discapateService.update(this.discapate));
        } else {
            this.subscribeToSaveResponse(
                this.discapateService.create(this.discapate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Discapate>) {
        result.subscribe((res: Discapate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Discapate) {
        this.eventManager.broadcast({ name: 'discapateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAtencionById(index: number, item: Atencion) {
        return item.id;
    }

    trackDiscapById(index: number, item: Discap) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-discapate-popup',
    template: ''
})
export class DiscapatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapatePopupService: DiscapatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discapatePopupService
                    .open(DiscapateDialogComponent as Component, params['id']);
            } else {
                this.discapatePopupService
                    .open(DiscapateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
