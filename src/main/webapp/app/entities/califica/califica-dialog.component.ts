import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Califica } from './califica.model';
import { CalificaPopupService } from './califica-popup.service';
import { CalificaService } from './califica.service';

@Component({
    selector: 'jhi-califica-dialog',
    templateUrl: './califica-dialog.component.html'
})
export class CalificaDialogComponent implements OnInit {

    califica: Califica;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calificaService: CalificaService,
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
        if (this.califica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calificaService.update(this.califica));
        } else {
            this.subscribeToSaveResponse(
                this.calificaService.create(this.califica));
        }
    }

    private subscribeToSaveResponse(result: Observable<Califica>) {
        result.subscribe((res: Califica) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Califica) {
        this.eventManager.broadcast({ name: 'calificaListModification', content: 'OK'});
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
    selector: 'jhi-califica-popup',
    template: ''
})
export class CalificaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificaPopupService: CalificaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calificaPopupService
                    .open(CalificaDialogComponent as Component, params['id']);
            } else {
                this.calificaPopupService
                    .open(CalificaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
