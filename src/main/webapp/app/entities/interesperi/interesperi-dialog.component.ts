import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Interesperi } from './interesperi.model';
import { InteresperiPopupService } from './interesperi-popup.service';
import { InteresperiService } from './interesperi.service';
import { Calperiodo, CalperiodoService } from '../calperiodo';
import { Tipinteres, TipinteresService } from '../tipinteres';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-interesperi-dialog',
    templateUrl: './interesperi-dialog.component.html'
})
export class InteresperiDialogComponent implements OnInit {

    interesperi: Interesperi;
    isSaving: boolean;

    calperiodos: Calperiodo[];

    tipinteres: Tipinteres[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private interesperiService: InteresperiService,
        private calperiodoService: CalperiodoService,
        private tipinteresService: TipinteresService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.calperiodoService
            .query({filter: 'interesperi-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.interesperi.calperiodo || !this.interesperi.calperiodo.id) {
                    this.calperiodos = res.json;
                } else {
                    this.calperiodoService
                        .find(this.interesperi.calperiodo.id)
                        .subscribe((subRes: Calperiodo) => {
                            this.calperiodos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipinteresService.query()
            .subscribe((res: ResponseWrapper) => { this.tipinteres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.interesperi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.interesperiService.update(this.interesperi));
        } else {
            this.subscribeToSaveResponse(
                this.interesperiService.create(this.interesperi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Interesperi>) {
        result.subscribe((res: Interesperi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Interesperi) {
        this.eventManager.broadcast({ name: 'interesperiListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCalperiodoById(index: number, item: Calperiodo) {
        return item.id;
    }

    trackTipinteresById(index: number, item: Tipinteres) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-interesperi-popup',
    template: ''
})
export class InteresperiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interesperiPopupService: InteresperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.interesperiPopupService
                    .open(InteresperiDialogComponent as Component, params['id']);
            } else {
                this.interesperiPopupService
                    .open(InteresperiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
