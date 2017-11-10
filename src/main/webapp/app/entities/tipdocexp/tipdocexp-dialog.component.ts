import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdocexp } from './tipdocexp.model';
import { TipdocexpPopupService } from './tipdocexp-popup.service';
import { TipdocexpService } from './tipdocexp.service';

@Component({
    selector: 'jhi-tipdocexp-dialog',
    templateUrl: './tipdocexp-dialog.component.html'
})
export class TipdocexpDialogComponent implements OnInit {

    tipdocexp: Tipdocexp;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdocexpService: TipdocexpService,
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
        if (this.tipdocexp.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdocexpService.update(this.tipdocexp));
        } else {
            this.subscribeToSaveResponse(
                this.tipdocexpService.create(this.tipdocexp));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdocexp>) {
        result.subscribe((res: Tipdocexp) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdocexp) {
        this.eventManager.broadcast({ name: 'tipdocexpListModification', content: 'OK'});
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
    selector: 'jhi-tipdocexp-popup',
    template: ''
})
export class TipdocexpPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocexpPopupService: TipdocexpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdocexpPopupService
                    .open(TipdocexpDialogComponent as Component, params['id']);
            } else {
                this.tipdocexpPopupService
                    .open(TipdocexpDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
