import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Activecono } from './activecono.model';
import { ActiveconoPopupService } from './activecono-popup.service';
import { ActiveconoService } from './activecono.service';

@Component({
    selector: 'jhi-activecono-dialog',
    templateUrl: './activecono-dialog.component.html'
})
export class ActiveconoDialogComponent implements OnInit {

    activecono: Activecono;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private activeconoService: ActiveconoService,
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
        if (this.activecono.id !== undefined) {
            this.subscribeToSaveResponse(
                this.activeconoService.update(this.activecono));
        } else {
            this.subscribeToSaveResponse(
                this.activeconoService.create(this.activecono));
        }
    }

    private subscribeToSaveResponse(result: Observable<Activecono>) {
        result.subscribe((res: Activecono) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Activecono) {
        this.eventManager.broadcast({ name: 'activeconoListModification', content: 'OK'});
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
    selector: 'jhi-activecono-popup',
    template: ''
})
export class ActiveconoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activeconoPopupService: ActiveconoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.activeconoPopupService
                    .open(ActiveconoDialogComponent as Component, params['id']);
            } else {
                this.activeconoPopupService
                    .open(ActiveconoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
