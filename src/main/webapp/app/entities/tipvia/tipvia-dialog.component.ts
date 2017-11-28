import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipvia } from './tipvia.model';
import { TipviaPopupService } from './tipvia-popup.service';
import { TipviaService } from './tipvia.service';

@Component({
    selector: 'jhi-tipvia-dialog',
    templateUrl: './tipvia-dialog.component.html'
})
export class TipviaDialogComponent implements OnInit {

    tipvia: Tipvia;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipviaService: TipviaService,
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
        if (this.tipvia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipviaService.update(this.tipvia));
        } else {
            this.subscribeToSaveResponse(
                this.tipviaService.create(this.tipvia));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipvia>) {
        result.subscribe((res: Tipvia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipvia) {
        this.eventManager.broadcast({ name: 'tipviaListModification', content: 'OK'});
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
    selector: 'jhi-tipvia-popup',
    template: ''
})
export class TipviaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipviaPopupService: TipviaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipviaPopupService
                    .open(TipviaDialogComponent as Component, params['id']);
            } else {
                this.tipviaPopupService
                    .open(TipviaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
