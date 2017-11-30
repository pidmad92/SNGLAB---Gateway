import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calificacio } from './calificacio.model';
import { CalificacioPopupService } from './calificacio-popup.service';
import { CalificacioService } from './calificacio.service';

@Component({
    selector: 'jhi-calificacio-dialog',
    templateUrl: './calificacio-dialog.component.html'
})
export class CalificacioDialogComponent implements OnInit {

    calificacio: Calificacio;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calificacioService: CalificacioService,
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
        if (this.calificacio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calificacioService.update(this.calificacio));
        } else {
            this.subscribeToSaveResponse(
                this.calificacioService.create(this.calificacio));
        }
    }

    private subscribeToSaveResponse(result: Observable<Calificacio>) {
        result.subscribe((res: Calificacio) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Calificacio) {
        this.eventManager.broadcast({ name: 'calificacioListModification', content: 'OK'});
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
    selector: 'jhi-calificacio-popup',
    template: ''
})
export class CalificacioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificacioPopupService: CalificacioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calificacioPopupService
                    .open(CalificacioDialogComponent as Component, params['id']);
            } else {
                this.calificacioPopupService
                    .open(CalificacioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
