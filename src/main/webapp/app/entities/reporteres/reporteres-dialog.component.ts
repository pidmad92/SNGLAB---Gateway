import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Reporteres } from './reporteres.model';
import { ReporteresPopupService } from './reporteres-popup.service';
import { ReporteresService } from './reporteres.service';

@Component({
    selector: 'jhi-reporteres-dialog',
    templateUrl: './reporteres-dialog.component.html'
})
export class ReporteresDialogComponent implements OnInit {

    reporteres: Reporteres;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private reporteresService: ReporteresService,
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
        if (this.reporteres.id !== undefined) {
            this.subscribeToSaveResponse(
                this.reporteresService.update(this.reporteres));
        } else {
            this.subscribeToSaveResponse(
                this.reporteresService.create(this.reporteres));
        }
    }

    private subscribeToSaveResponse(result: Observable<Reporteres>) {
        result.subscribe((res: Reporteres) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Reporteres) {
        this.eventManager.broadcast({ name: 'reporteresListModification', content: 'OK'});
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
    selector: 'jhi-reporteres-popup',
    template: ''
})
export class ReporteresPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reporteresPopupService: ReporteresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.reporteresPopupService
                    .open(ReporteresDialogComponent as Component, params['id']);
            } else {
                this.reporteresPopupService
                    .open(ReporteresDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
