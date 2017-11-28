import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiPopupService } from './calrcmperi-popup.service';
import { CalrcmperiService } from './calrcmperi.service';
import { Calperiodo, CalperiodoService } from '../calperiodo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calrcmperi-dialog',
    templateUrl: './calrcmperi-dialog.component.html'
})
export class CalrcmperiDialogComponent implements OnInit {

    calrcmperi: Calrcmperi;
    isSaving: boolean;

    calperiodos: Calperiodo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calrcmperiService: CalrcmperiService,
        private calperiodoService: CalperiodoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.calperiodoService
            .query({filter: 'calrcmperi-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.calrcmperi.calperiodo || !this.calrcmperi.calperiodo.id) {
                    this.calperiodos = res.json;
                } else {
                    this.calperiodoService
                        .find(this.calrcmperi.calperiodo.id)
                        .subscribe((subRes: Calperiodo) => {
                            this.calperiodos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calrcmperi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calrcmperiService.update(this.calrcmperi));
        } else {
            this.subscribeToSaveResponse(
                this.calrcmperiService.create(this.calrcmperi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Calrcmperi>) {
        result.subscribe((res: Calrcmperi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Calrcmperi) {
        this.eventManager.broadcast({ name: 'calrcmperiListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-calrcmperi-popup',
    template: ''
})
export class CalrcmperiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calrcmperiPopupService: CalrcmperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calrcmperiPopupService
                    .open(CalrcmperiDialogComponent as Component, params['id']);
            } else {
                this.calrcmperiPopupService
                    .open(CalrcmperiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
