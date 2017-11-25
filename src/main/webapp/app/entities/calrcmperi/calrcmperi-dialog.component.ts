import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiPopupService } from './calrcmperi-popup.service';
import { CalrcmperiService } from './calrcmperi.service';

@Component({
    selector: 'jhi-calrcmperi-dialog',
    templateUrl: './calrcmperi-dialog.component.html'
})
export class CalrcmperiDialogComponent implements OnInit {

    calrcmperi: Calrcmperi;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calrcmperiService: CalrcmperiService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
