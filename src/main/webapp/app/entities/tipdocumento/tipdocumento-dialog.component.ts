import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdocumento } from './tipdocumento.model';
import { TipdocumentoPopupService } from './tipdocumento-popup.service';
import { TipdocumentoService } from './tipdocumento.service';

@Component({
    selector: 'jhi-tipdocumento-dialog',
    templateUrl: './tipdocumento-dialog.component.html'
})
export class TipdocumentoDialogComponent implements OnInit {

    tipdocumento: Tipdocumento;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdocumentoService: TipdocumentoService,
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
        if (this.tipdocumento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdocumentoService.update(this.tipdocumento));
        } else {
            this.subscribeToSaveResponse(
                this.tipdocumentoService.create(this.tipdocumento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdocumento>) {
        result.subscribe((res: Tipdocumento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdocumento) {
        this.eventManager.broadcast({ name: 'tipdocumentoListModification', content: 'OK'});
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
    selector: 'jhi-tipdocumento-popup',
    template: ''
})
export class TipdocumentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocumentoPopupService: TipdocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdocumentoPopupService
                    .open(TipdocumentoDialogComponent as Component, params['id']);
            } else {
                this.tipdocumentoPopupService
                    .open(TipdocumentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
