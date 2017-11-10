import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atenaccadop } from './atenaccadop.model';
import { AtenaccadopPopupService } from './atenaccadop-popup.service';
import { AtenaccadopService } from './atenaccadop.service';
import { Atencion, AtencionService } from '../atencion';
import { Accionadop, AccionadopService } from '../accionadop';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atenaccadop-dialog',
    templateUrl: './atenaccadop-dialog.component.html'
})
export class AtenaccadopDialogComponent implements OnInit {

    atenaccadop: Atenaccadop;
    isSaving: boolean;

    atencions: Atencion[];

    accionadops: Accionadop[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atenaccadopService: AtenaccadopService,
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
        if (this.atenaccadop.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atenaccadopService.update(this.atenaccadop));
        } else {
            this.subscribeToSaveResponse(
                this.atenaccadopService.create(this.atenaccadop));
        }
    }

    private subscribeToSaveResponse(result: Observable<Atenaccadop>) {
        result.subscribe((res: Atenaccadop) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Atenaccadop) {
        this.eventManager.broadcast({ name: 'atenaccadopListModification', content: 'OK'});
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
    selector: 'jhi-atenaccadop-popup',
    template: ''
})
export class AtenaccadopPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atenaccadopPopupService: AtenaccadopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atenaccadopPopupService
                    .open(AtenaccadopDialogComponent as Component, params['id']);
            } else {
                this.atenaccadopPopupService
                    .open(AtenaccadopDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
