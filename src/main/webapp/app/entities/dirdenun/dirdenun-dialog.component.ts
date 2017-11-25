import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dirdenun } from './dirdenun.model';
import { DirdenunPopupService } from './dirdenun-popup.service';
import { DirdenunService } from './dirdenun.service';
import { Denunte, DenunteService } from '../denunte';
import { Tipzona, TipzonaService } from '../tipzona';
import { Tipvia, TipviaService } from '../tipvia';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dirdenun-dialog',
    templateUrl: './dirdenun-dialog.component.html'
})
export class DirdenunDialogComponent implements OnInit {

    dirdenun: Dirdenun;
    isSaving: boolean;

    denuntes: Denunte[];

    tipzonas: Tipzona[];

    tipvias: Tipvia[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dirdenunService: DirdenunService,
        private denunteService: DenunteService,
        private tipzonaService: TipzonaService,
        private tipviaService: TipviaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.denunteService.query()
            .subscribe((res: ResponseWrapper) => { this.denuntes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipzonaService.query()
            .subscribe((res: ResponseWrapper) => { this.tipzonas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipviaService.query()
            .subscribe((res: ResponseWrapper) => { this.tipvias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dirdenun.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dirdenunService.update(this.dirdenun));
        } else {
            this.subscribeToSaveResponse(
                this.dirdenunService.create(this.dirdenun));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dirdenun>) {
        result.subscribe((res: Dirdenun) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirdenun) {
        this.eventManager.broadcast({ name: 'dirdenunListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDenunteById(index: number, item: Denunte) {
        return item.id;
    }

    trackTipzonaById(index: number, item: Tipzona) {
        return item.id;
    }

    trackTipviaById(index: number, item: Tipvia) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dirdenun-popup',
    template: ''
})
export class DirdenunPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirdenunPopupService: DirdenunPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dirdenunPopupService
                    .open(DirdenunDialogComponent as Component, params['id']);
            } else {
                this.dirdenunPopupService
                    .open(DirdenunDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
