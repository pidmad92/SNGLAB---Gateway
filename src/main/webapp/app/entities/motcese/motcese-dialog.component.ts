import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motcese } from './motcese.model';
import { MotcesePopupService } from './motcese-popup.service';
import { MotceseService } from './motcese.service';

@Component({
    selector: 'jhi-motcese-dialog',
    templateUrl: './motcese-dialog.component.html'
})
export class MotceseDialogComponent implements OnInit {

    motcese: Motcese;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motceseService: MotceseService,
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
        if (this.motcese.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motceseService.update(this.motcese));
        } else {
            this.subscribeToSaveResponse(
                this.motceseService.create(this.motcese));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motcese>) {
        result.subscribe((res: Motcese) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motcese) {
        this.eventManager.broadcast({ name: 'motceseListModification', content: 'OK'});
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
    selector: 'jhi-motcese-popup',
    template: ''
})
export class MotcesePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motcesePopupService: MotcesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motcesePopupService
                    .open(MotceseDialogComponent as Component, params['id']);
            } else {
                this.motcesePopupService
                    .open(MotceseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
