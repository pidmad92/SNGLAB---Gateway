import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pernatural } from './pernatural.model';
import { PernaturalPopupService } from './pernatural-popup.service';
import { PernaturalService } from './pernatural.service';
import { Tipdocident, TipdocidentService } from '../tipdocident';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pernatural-dialog',
    templateUrl: './pernatural-dialog.component.html'
})
export class PernaturalDialogComponent implements OnInit {

    pernatural: Pernatural;
    isSaving: boolean;

    tipdocidents: Tipdocident[];
    dFecnacDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pernaturalService: PernaturalService,
        private tipdocidentService: TipdocidentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipdocidentService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocidents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pernatural.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pernaturalService.update(this.pernatural));
        } else {
            this.subscribeToSaveResponse(
                this.pernaturalService.create(this.pernatural));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pernatural>) {
        result.subscribe((res: Pernatural) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pernatural) {
        this.eventManager.broadcast({ name: 'pernaturalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipdocidentById(index: number, item: Tipdocident) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pernatural-popup',
    template: ''
})
export class PernaturalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pernaturalPopupService: PernaturalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pernaturalPopupService
                    .open(PernaturalDialogComponent as Component, params['id']);
            } else {
                this.pernaturalPopupService
                    .open(PernaturalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
