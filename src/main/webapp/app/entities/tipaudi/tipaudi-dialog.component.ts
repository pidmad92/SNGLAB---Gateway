import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipaudi } from './tipaudi.model';
import { TipaudiPopupService } from './tipaudi-popup.service';
import { TipaudiService } from './tipaudi.service';
import { Tipdiligenc, TipdiligencService } from '../tipdiligenc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipaudi-dialog',
    templateUrl: './tipaudi-dialog.component.html'
})
export class TipaudiDialogComponent implements OnInit {

    tipaudi: Tipaudi;
    isSaving: boolean;

    tipdiligencs: Tipdiligenc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipaudiService: TipaudiService,
        private tipdiligencService: TipdiligencService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipdiligencService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdiligencs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipaudi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipaudiService.update(this.tipaudi));
        } else {
            this.subscribeToSaveResponse(
                this.tipaudiService.create(this.tipaudi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipaudi>) {
        result.subscribe((res: Tipaudi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipaudi) {
        this.eventManager.broadcast({ name: 'tipaudiListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipdiligencById(index: number, item: Tipdiligenc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-tipaudi-popup',
    template: ''
})
export class TipaudiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipaudiPopupService: TipaudiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipaudiPopupService
                    .open(TipaudiDialogComponent as Component, params['id']);
            } else {
                this.tipaudiPopupService
                    .open(TipaudiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
