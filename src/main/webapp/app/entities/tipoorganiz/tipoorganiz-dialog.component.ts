import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipoorganiz } from './tipoorganiz.model';
import { TipoorganizPopupService } from './tipoorganiz-popup.service';
import { TipoorganizService } from './tipoorganiz.service';

@Component({
    selector: 'jhi-tipoorganiz-dialog',
    templateUrl: './tipoorganiz-dialog.component.html'
})
export class TipoorganizDialogComponent implements OnInit {

    tipoorganiz: Tipoorganiz;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoorganizService: TipoorganizService,
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
        if (this.tipoorganiz.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoorganizService.update(this.tipoorganiz));
        } else {
            this.subscribeToSaveResponse(
                this.tipoorganizService.create(this.tipoorganiz));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipoorganiz>) {
        result.subscribe((res: Tipoorganiz) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipoorganiz) {
        this.eventManager.broadcast({ name: 'tipoorganizListModification', content: 'OK'});
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
    selector: 'jhi-tipoorganiz-popup',
    template: ''
})
export class TipoorganizPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoorganizPopupService: TipoorganizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoorganizPopupService
                    .open(TipoorganizDialogComponent as Component, params['id']);
            } else {
                this.tipoorganizPopupService
                    .open(TipoorganizDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
