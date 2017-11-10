import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resolutor } from './resolutor.model';
import { ResolutorPopupService } from './resolutor-popup.service';
import { ResolutorService } from './resolutor.service';

@Component({
    selector: 'jhi-resolutor-dialog',
    templateUrl: './resolutor-dialog.component.html'
})
export class ResolutorDialogComponent implements OnInit {

    resolutor: Resolutor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resolutorService: ResolutorService,
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
        if (this.resolutor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resolutorService.update(this.resolutor));
        } else {
            this.subscribeToSaveResponse(
                this.resolutorService.create(this.resolutor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Resolutor>) {
        result.subscribe((res: Resolutor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Resolutor) {
        this.eventManager.broadcast({ name: 'resolutorListModification', content: 'OK'});
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
    selector: 'jhi-resolutor-popup',
    template: ''
})
export class ResolutorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resolutorPopupService: ResolutorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resolutorPopupService
                    .open(ResolutorDialogComponent as Component, params['id']);
            } else {
                this.resolutorPopupService
                    .open(ResolutorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
