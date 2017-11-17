import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipmotaten } from './tipmotaten.model';
import { TipmotatenPopupService } from './tipmotaten-popup.service';
import { TipmotatenService } from './tipmotaten.service';

@Component({
    selector: 'jhi-tipmotaten-dialog',
    templateUrl: './tipmotaten-dialog.component.html'
})
export class TipmotatenDialogComponent implements OnInit {

    tipmotaten: Tipmotaten;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipmotatenService: TipmotatenService,
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
        if (this.tipmotaten.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipmotatenService.update(this.tipmotaten));
        } else {
            this.subscribeToSaveResponse(
                this.tipmotatenService.create(this.tipmotaten));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipmotaten>) {
        result.subscribe((res: Tipmotaten) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipmotaten) {
        this.eventManager.broadcast({ name: 'tipmotatenListModification', content: 'OK'});
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
    selector: 'jhi-tipmotaten-popup',
    template: ''
})
export class TipmotatenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipmotatenPopupService: TipmotatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipmotatenPopupService
                    .open(TipmotatenDialogComponent as Component, params['id']);
            } else {
                this.tipmotatenPopupService
                    .open(TipmotatenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
