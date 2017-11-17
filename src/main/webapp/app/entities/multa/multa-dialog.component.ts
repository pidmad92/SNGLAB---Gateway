import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Multa } from './multa.model';
import { MultaPopupService } from './multa-popup.service';
import { MultaService } from './multa.service';
import { Resolucrd, ResolucrdService } from '../resolucrd';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-multa-dialog',
    templateUrl: './multa-dialog.component.html'
})
export class MultaDialogComponent implements OnInit {

    multa: Multa;
    isSaving: boolean;

    resolucrds: Resolucrd[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private multaService: MultaService,
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
        if (this.multa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.multaService.update(this.multa));
        } else {
            this.subscribeToSaveResponse(
                this.multaService.create(this.multa));
        }
    }

    private subscribeToSaveResponse(result: Observable<Multa>) {
        result.subscribe((res: Multa) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Multa) {
        this.eventManager.broadcast({ name: 'multaListModification', content: 'OK'});
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
    selector: 'jhi-multa-popup',
    template: ''
})
export class MultaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multaPopupService: MultaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.multaPopupService
                    .open(MultaDialogComponent as Component, params['id']);
            } else {
                this.multaPopupService
                    .open(MultaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
