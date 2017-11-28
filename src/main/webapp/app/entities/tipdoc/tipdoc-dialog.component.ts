import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdoc } from './tipdoc.model';
import { TipdocPopupService } from './tipdoc-popup.service';
import { TipdocService } from './tipdoc.service';

@Component({
    selector: 'jhi-tipdoc-dialog',
    templateUrl: './tipdoc-dialog.component.html'
})
export class TipdocDialogComponent implements OnInit {

    tipdoc: Tipdoc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdocService: TipdocService,
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
        if (this.tipdoc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdocService.update(this.tipdoc));
        } else {
            this.subscribeToSaveResponse(
                this.tipdocService.create(this.tipdoc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdoc>) {
        result.subscribe((res: Tipdoc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdoc) {
        this.eventManager.broadcast({ name: 'tipdocListModification', content: 'OK'});
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
    selector: 'jhi-tipdoc-popup',
    template: ''
})
export class TipdocPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocPopupService: TipdocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdocPopupService
                    .open(TipdocDialogComponent as Component, params['id']);
            } else {
                this.tipdocPopupService
                    .open(TipdocDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
