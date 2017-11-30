import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Estatuto } from './estatuto.model';
import { EstatutoPopupService } from './estatuto-popup.service';
import { EstatutoService } from './estatuto.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-estatuto-dialog',
    templateUrl: './estatuto-dialog.component.html'
})
export class EstatutoDialogComponent implements OnInit {

    estatuto: Estatuto;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private estatutoService: EstatutoService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
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
        if (this.estatuto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estatutoService.update(this.estatuto));
        } else {
            this.subscribeToSaveResponse(
                this.estatutoService.create(this.estatuto));
        }
    }

    private subscribeToSaveResponse(result: Observable<Estatuto>) {
        result.subscribe((res: Estatuto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Estatuto) {
        this.eventManager.broadcast({ name: 'estatutoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-estatuto-popup',
    template: ''
})
export class EstatutoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatutoPopupService: EstatutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estatutoPopupService
                    .open(EstatutoDialogComponent as Component, params['id']);
            } else {
                this.estatutoPopupService
                    .open(EstatutoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
