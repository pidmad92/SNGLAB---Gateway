import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipnotif } from './tipnotif.model';
import { TipnotifPopupService } from './tipnotif-popup.service';
import { TipnotifService } from './tipnotif.service';

@Component({
    selector: 'jhi-tipnotif-dialog',
    templateUrl: './tipnotif-dialog.component.html'
})
export class TipnotifDialogComponent implements OnInit {

    tipnotif: Tipnotif;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipnotifService: TipnotifService,
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
        if (this.tipnotif.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipnotifService.update(this.tipnotif));
        } else {
            this.subscribeToSaveResponse(
                this.tipnotifService.create(this.tipnotif));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipnotif>) {
        result.subscribe((res: Tipnotif) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipnotif) {
        this.eventManager.broadcast({ name: 'tipnotifListModification', content: 'OK'});
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
    selector: 'jhi-tipnotif-popup',
    template: ''
})
export class TipnotifPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipnotifPopupService: TipnotifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipnotifPopupService
                    .open(TipnotifDialogComponent as Component, params['id']);
            } else {
                this.tipnotifPopupService
                    .open(TipnotifDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
