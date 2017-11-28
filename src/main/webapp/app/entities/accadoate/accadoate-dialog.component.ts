import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Accadoate } from './accadoate.model';
import { AccadoatePopupService } from './accadoate-popup.service';
import { AccadoateService } from './accadoate.service';
import { Atencion, AtencionService } from '../atencion';
import { Accionadop, AccionadopService } from '../accionadop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-accadoate-dialog',
    templateUrl: './accadoate-dialog.component.html'
})
export class AccadoateDialogComponent implements OnInit {

    accadoate: Accadoate;
    isSaving: boolean;

    atencions: Atencion[];

    accionadops: Accionadop[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private accadoateService: AccadoateService,
        private atencionService: AtencionService,
        private accionadopService: AccionadopService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atencionService.query()
            .subscribe((res: ResponseWrapper) => { this.atencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.accionadopService.query()
            .subscribe((res: ResponseWrapper) => { this.accionadops = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.accadoate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.accadoateService.update(this.accadoate));
        } else {
            this.subscribeToSaveResponse(
                this.accadoateService.create(this.accadoate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Accadoate>) {
        result.subscribe((res: Accadoate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Accadoate) {
        this.eventManager.broadcast({ name: 'accadoateListModification', content: 'OK'});
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

    trackAccionadopById(index: number, item: Accionadop) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-accadoate-popup',
    template: ''
})
export class AccadoatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accadoatePopupService: AccadoatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.accadoatePopupService
                    .open(AccadoateDialogComponent as Component, params['id']);
            } else {
                this.accadoatePopupService
                    .open(AccadoateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
