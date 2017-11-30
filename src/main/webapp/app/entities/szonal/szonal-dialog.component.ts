import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Szonal } from './szonal.model';
import { SzonalPopupService } from './szonal-popup.service';
import { SzonalService } from './szonal.service';

@Component({
    selector: 'jhi-szonal-dialog',
    templateUrl: './szonal-dialog.component.html'
})
export class SzonalDialogComponent implements OnInit {

    szonal: Szonal;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private szonalService: SzonalService,
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
        if (this.szonal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.szonalService.update(this.szonal));
        } else {
            this.subscribeToSaveResponse(
                this.szonalService.create(this.szonal));
        }
    }

    private subscribeToSaveResponse(result: Observable<Szonal>) {
        result.subscribe((res: Szonal) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Szonal) {
        this.eventManager.broadcast({ name: 'szonalListModification', content: 'OK'});
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
    selector: 'jhi-szonal-popup',
    template: ''
})
export class SzonalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private szonalPopupService: SzonalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.szonalPopupService
                    .open(SzonalDialogComponent as Component, params['id']);
            } else {
                this.szonalPopupService
                    .open(SzonalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
