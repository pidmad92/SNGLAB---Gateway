import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Datdenu } from './datdenu.model';
import { DatdenuPopupService } from './datdenu-popup.service';
import { DatdenuService } from './datdenu.service';
import { Detmotden, DetmotdenService } from '../detmotden';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datdenu-dialog',
    templateUrl: './datdenu-dialog.component.html'
})
export class DatdenuDialogComponent implements OnInit {

    datdenu: Datdenu;
    isSaving: boolean;

    detmotdens: Detmotden[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private datdenuService: DatdenuService,
        private detmotdenService: DetmotdenService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.detmotdenService.query()
            .subscribe((res: ResponseWrapper) => { this.detmotdens = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.datdenu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.datdenuService.update(this.datdenu));
        } else {
            this.subscribeToSaveResponse(
                this.datdenuService.create(this.datdenu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Datdenu>) {
        result.subscribe((res: Datdenu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Datdenu) {
        this.eventManager.broadcast({ name: 'datdenuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDetmotdenById(index: number, item: Detmotden) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-datdenu-popup',
    template: ''
})
export class DatdenuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datdenuPopupService: DatdenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.datdenuPopupService
                    .open(DatdenuDialogComponent as Component, params['id']);
            } else {
                this.datdenuPopupService
                    .open(DatdenuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
