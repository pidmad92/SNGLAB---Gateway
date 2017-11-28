import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estperical } from './estperical.model';
import { EstpericalPopupService } from './estperical-popup.service';
import { EstpericalService } from './estperical.service';

@Component({
    selector: 'jhi-estperical-dialog',
    templateUrl: './estperical-dialog.component.html'
})
export class EstpericalDialogComponent implements OnInit {

    estperical: Estperical;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estpericalService: EstpericalService,
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
        if (this.estperical.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estpericalService.update(this.estperical));
        } else {
            this.subscribeToSaveResponse(
                this.estpericalService.create(this.estperical));
        }
    }

    private subscribeToSaveResponse(result: Observable<Estperical>) {
        result.subscribe((res: Estperical) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Estperical) {
        this.eventManager.broadcast({ name: 'estpericalListModification', content: 'OK'});
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
    selector: 'jhi-estperical-popup',
    template: ''
})
export class EstpericalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estpericalPopupService: EstpericalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estpericalPopupService
                    .open(EstpericalDialogComponent as Component, params['id']);
            } else {
                this.estpericalPopupService
                    .open(EstpericalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
