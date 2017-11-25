import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Multaconci } from './multaconci.model';
import { MultaconciPopupService } from './multaconci-popup.service';
import { MultaconciService } from './multaconci.service';
import { Resolucrd, ResolucrdService } from '../resolucrd';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-multaconci-dialog',
    templateUrl: './multaconci-dialog.component.html'
})
export class MultaconciDialogComponent implements OnInit {

    multaconci: Multaconci;
    isSaving: boolean;

    resolucrds: Resolucrd[];
    dFecresosdDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private multaconciService: MultaconciService,
        private resolucrdService: ResolucrdService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.resolucrdService.query()
            .subscribe((res: ResponseWrapper) => { this.resolucrds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.multaconci.id !== undefined) {
            this.subscribeToSaveResponse(
                this.multaconciService.update(this.multaconci));
        } else {
            this.subscribeToSaveResponse(
                this.multaconciService.create(this.multaconci));
        }
    }

    private subscribeToSaveResponse(result: Observable<Multaconci>) {
        result.subscribe((res: Multaconci) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Multaconci) {
        this.eventManager.broadcast({ name: 'multaconciListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackResolucrdById(index: number, item: Resolucrd) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-multaconci-popup',
    template: ''
})
export class MultaconciPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multaconciPopupService: MultaconciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.multaconciPopupService
                    .open(MultaconciDialogComponent as Component, params['id']);
            } else {
                this.multaconciPopupService
                    .open(MultaconciDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
