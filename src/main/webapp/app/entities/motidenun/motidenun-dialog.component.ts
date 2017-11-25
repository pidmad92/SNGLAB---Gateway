import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motidenun } from './motidenun.model';
import { MotidenunPopupService } from './motidenun-popup.service';
import { MotidenunService } from './motidenun.service';

@Component({
    selector: 'jhi-motidenun-dialog',
    templateUrl: './motidenun-dialog.component.html'
})
export class MotidenunDialogComponent implements OnInit {

    motidenun: Motidenun;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motidenunService: MotidenunService,
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
        if (this.motidenun.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motidenunService.update(this.motidenun));
        } else {
            this.subscribeToSaveResponse(
                this.motidenunService.create(this.motidenun));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motidenun>) {
        result.subscribe((res: Motidenun) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motidenun) {
        this.eventManager.broadcast({ name: 'motidenunListModification', content: 'OK'});
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
    selector: 'jhi-motidenun-popup',
    template: ''
})
export class MotidenunPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motidenunPopupService: MotidenunPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motidenunPopupService
                    .open(MotidenunDialogComponent as Component, params['id']);
            } else {
                this.motidenunPopupService
                    .open(MotidenunDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
