import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipresoluc } from './tipresoluc.model';
import { TipresolucPopupService } from './tipresoluc-popup.service';
import { TipresolucService } from './tipresoluc.service';

@Component({
    selector: 'jhi-tipresoluc-dialog',
    templateUrl: './tipresoluc-dialog.component.html'
})
export class TipresolucDialogComponent implements OnInit {

    tipresoluc: Tipresoluc;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipresolucService: TipresolucService,
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
        if (this.tipresoluc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipresolucService.update(this.tipresoluc));
        } else {
            this.subscribeToSaveResponse(
                this.tipresolucService.create(this.tipresoluc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipresoluc>) {
        result.subscribe((res: Tipresoluc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipresoluc) {
        this.eventManager.broadcast({ name: 'tipresolucListModification', content: 'OK'});
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
    selector: 'jhi-tipresoluc-popup',
    template: ''
})
export class TipresolucPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipresolucPopupService: TipresolucPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipresolucPopupService
                    .open(TipresolucDialogComponent as Component, params['id']);
            } else {
                this.tipresolucPopupService
                    .open(TipresolucDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
