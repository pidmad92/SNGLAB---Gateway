import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Discap } from './discap.model';
import { DiscapPopupService } from './discap-popup.service';
import { DiscapService } from './discap.service';

@Component({
    selector: 'jhi-discap-dialog',
    templateUrl: './discap-dialog.component.html'
})
export class DiscapDialogComponent implements OnInit {

    discap: Discap;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private discapService: DiscapService,
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
        if (this.discap.id !== undefined) {
            this.subscribeToSaveResponse(
                this.discapService.update(this.discap));
        } else {
            this.subscribeToSaveResponse(
                this.discapService.create(this.discap));
        }
    }

    private subscribeToSaveResponse(result: Observable<Discap>) {
        result.subscribe((res: Discap) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Discap) {
        this.eventManager.broadcast({ name: 'discapListModification', content: 'OK'});
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
    selector: 'jhi-discap-popup',
    template: ''
})
export class DiscapPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapPopupService: DiscapPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.discapPopupService
                    .open(DiscapDialogComponent as Component, params['id']);
            } else {
                this.discapPopupService
                    .open(DiscapDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
