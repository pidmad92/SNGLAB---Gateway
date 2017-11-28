import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipcalperi } from './tipcalperi.model';
import { TipcalperiPopupService } from './tipcalperi-popup.service';
import { TipcalperiService } from './tipcalperi.service';

@Component({
    selector: 'jhi-tipcalperi-dialog',
    templateUrl: './tipcalperi-dialog.component.html'
})
export class TipcalperiDialogComponent implements OnInit {

    tipcalperi: Tipcalperi;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipcalperiService: TipcalperiService,
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
        if (this.tipcalperi.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipcalperiService.update(this.tipcalperi));
        } else {
            this.subscribeToSaveResponse(
                this.tipcalperiService.create(this.tipcalperi));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipcalperi>) {
        result.subscribe((res: Tipcalperi) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipcalperi) {
        this.eventManager.broadcast({ name: 'tipcalperiListModification', content: 'OK'});
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
    selector: 'jhi-tipcalperi-popup',
    template: ''
})
export class TipcalperiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipcalperiPopupService: TipcalperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipcalperiPopupService
                    .open(TipcalperiDialogComponent as Component, params['id']);
            } else {
                this.tipcalperiPopupService
                    .open(TipcalperiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
