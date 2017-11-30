import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Srubro } from './srubro.model';
import { SrubroPopupService } from './srubro-popup.service';
import { SrubroService } from './srubro.service';

@Component({
    selector: 'jhi-srubro-dialog',
    templateUrl: './srubro-dialog.component.html'
})
export class SrubroDialogComponent implements OnInit {

    srubro: Srubro;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private srubroService: SrubroService,
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
        if (this.srubro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.srubroService.update(this.srubro));
        } else {
            this.subscribeToSaveResponse(
                this.srubroService.create(this.srubro));
        }
    }

    private subscribeToSaveResponse(result: Observable<Srubro>) {
        result.subscribe((res: Srubro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Srubro) {
        this.eventManager.broadcast({ name: 'srubroListModification', content: 'OK'});
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
    selector: 'jhi-srubro-popup',
    template: ''
})
export class SrubroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private srubroPopupService: SrubroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.srubroPopupService
                    .open(SrubroDialogComponent as Component, params['id']);
            } else {
                this.srubroPopupService
                    .open(SrubroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
