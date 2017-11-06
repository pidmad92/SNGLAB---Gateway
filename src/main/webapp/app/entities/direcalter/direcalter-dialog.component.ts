import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Direcalter } from './direcalter.model';
import { DirecalterPopupService } from './direcalter-popup.service';
import { DirecalterService } from './direcalter.service';

@Component({
    selector: 'jhi-direcalter-dialog',
    templateUrl: './direcalter-dialog.component.html'
})
export class DirecalterDialogComponent implements OnInit {

    direcalter: Direcalter;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private direcalterService: DirecalterService,
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
        if (this.direcalter.id !== undefined) {
            this.subscribeToSaveResponse(
                this.direcalterService.update(this.direcalter));
        } else {
            this.subscribeToSaveResponse(
                this.direcalterService.create(this.direcalter));
        }
    }

    private subscribeToSaveResponse(result: Observable<Direcalter>) {
        result.subscribe((res: Direcalter) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Direcalter) {
        this.eventManager.broadcast({ name: 'direcalterListModification', content: 'OK'});
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
    selector: 'jhi-direcalter-popup',
    template: ''
})
export class DirecalterPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direcalterPopupService: DirecalterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.direcalterPopupService
                    .open(DirecalterDialogComponent as Component, params['id']);
            } else {
                this.direcalterPopupService
                    .open(DirecalterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
