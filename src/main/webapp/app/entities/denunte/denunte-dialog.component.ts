import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Denunte } from './denunte.model';
import { DenuntePopupService } from './denunte-popup.service';
import { DenunteService } from './denunte.service';
import { Pernatural, PernaturalService } from '../pernatural';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-denunte-dialog',
    templateUrl: './denunte-dialog.component.html'
})
export class DenunteDialogComponent implements OnInit {

    denunte: Denunte;
    isSaving: boolean;

    pernaturals: Pernatural[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private denunteService: DenunteService,
        private pernaturalService: PernaturalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pernaturalService.query()
            .subscribe((res: ResponseWrapper) => { this.pernaturals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.denunte.id !== undefined) {
            this.subscribeToSaveResponse(
                this.denunteService.update(this.denunte));
        } else {
            this.subscribeToSaveResponse(
                this.denunteService.create(this.denunte));
        }
    }

    private subscribeToSaveResponse(result: Observable<Denunte>) {
        result.subscribe((res: Denunte) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Denunte) {
        this.eventManager.broadcast({ name: 'denunteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPernaturalById(index: number, item: Pernatural) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-denunte-popup',
    template: ''
})
export class DenuntePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denuntePopupService: DenuntePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.denuntePopupService
                    .open(DenunteDialogComponent as Component, params['id']);
            } else {
                this.denuntePopupService
                    .open(DenunteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
