import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Formarchivo } from './formarchivo.model';
import { FormarchivoPopupService } from './formarchivo-popup.service';
import { FormarchivoService } from './formarchivo.service';

@Component({
    selector: 'jhi-formarchivo-dialog',
    templateUrl: './formarchivo-dialog.component.html'
})
export class FormarchivoDialogComponent implements OnInit {

    formarchivo: Formarchivo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private formarchivoService: FormarchivoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.formarchivo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formarchivoService.update(this.formarchivo));
        } else {
            this.subscribeToSaveResponse(
                this.formarchivoService.create(this.formarchivo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Formarchivo>) {
        result.subscribe((res: Formarchivo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Formarchivo) {
        this.eventManager.broadcast({ name: 'formarchivoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-formarchivo-popup',
    template: ''
})
export class FormarchivoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formarchivoPopupService: FormarchivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formarchivoPopupService
                    .open(FormarchivoDialogComponent as Component, params['id']);
            } else {
                this.formarchivoPopupService
                    .open(FormarchivoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
