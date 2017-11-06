import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdocident } from './tipdocident.model';
import { TipdocidentPopupService } from './tipdocident-popup.service';
import { TipdocidentService } from './tipdocident.service';

@Component({
    selector: 'jhi-tipdocident-dialog',
    templateUrl: './tipdocident-dialog.component.html'
})
export class TipdocidentDialogComponent implements OnInit {

    tipdocident: Tipdocident;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdocidentService: TipdocidentService,
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
        if (this.tipdocident.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdocidentService.update(this.tipdocident));
        } else {
            this.subscribeToSaveResponse(
                this.tipdocidentService.create(this.tipdocident));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdocident>) {
        result.subscribe((res: Tipdocident) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdocident) {
        this.eventManager.broadcast({ name: 'tipdocidentListModification', content: 'OK'});
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
    selector: 'jhi-tipdocident-popup',
    template: ''
})
export class TipdocidentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocidentPopupService: TipdocidentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdocidentPopupService
                    .open(TipdocidentDialogComponent as Component, params['id']);
            } else {
                this.tipdocidentPopupService
                    .open(TipdocidentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
