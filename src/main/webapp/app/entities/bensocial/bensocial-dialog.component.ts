import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bensocial } from './bensocial.model';
import { BensocialPopupService } from './bensocial-popup.service';
import { BensocialService } from './bensocial.service';

@Component({
    selector: 'jhi-bensocial-dialog',
    templateUrl: './bensocial-dialog.component.html'
})
export class BensocialDialogComponent implements OnInit {

    bensocial: Bensocial;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private bensocialService: BensocialService,
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
        if (this.bensocial.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bensocialService.update(this.bensocial));
        } else {
            this.subscribeToSaveResponse(
                this.bensocialService.create(this.bensocial));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bensocial>) {
        result.subscribe((res: Bensocial) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Bensocial) {
        this.eventManager.broadcast({ name: 'bensocialListModification', content: 'OK'});
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
    selector: 'jhi-bensocial-popup',
    template: ''
})
export class BensocialPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bensocialPopupService: BensocialPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bensocialPopupService
                    .open(BensocialDialogComponent as Component, params['id']);
            } else {
                this.bensocialPopupService
                    .open(BensocialDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
