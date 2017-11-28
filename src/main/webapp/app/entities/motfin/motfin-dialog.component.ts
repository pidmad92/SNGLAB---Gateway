import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motfin } from './motfin.model';
import { MotfinPopupService } from './motfin-popup.service';
import { MotfinService } from './motfin.service';

@Component({
    selector: 'jhi-motfin-dialog',
    templateUrl: './motfin-dialog.component.html'
})
export class MotfinDialogComponent implements OnInit {

    motfin: Motfin;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motfinService: MotfinService,
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
        if (this.motfin.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motfinService.update(this.motfin));
        } else {
            this.subscribeToSaveResponse(
                this.motfinService.create(this.motfin));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motfin>) {
        result.subscribe((res: Motfin) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motfin) {
        this.eventManager.broadcast({ name: 'motfinListModification', content: 'OK'});
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
    selector: 'jhi-motfin-popup',
    template: ''
})
export class MotfinPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motfinPopupService: MotfinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motfinPopupService
                    .open(MotfinDialogComponent as Component, params['id']);
            } else {
                this.motfinPopupService
                    .open(MotfinDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
