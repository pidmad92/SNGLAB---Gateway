import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipdocpj } from './tipdocpj.model';
import { TipdocpjPopupService } from './tipdocpj-popup.service';
import { TipdocpjService } from './tipdocpj.service';

@Component({
    selector: 'jhi-tipdocpj-dialog',
    templateUrl: './tipdocpj-dialog.component.html'
})
export class TipdocpjDialogComponent implements OnInit {

    tipdocpj: Tipdocpj;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipdocpjService: TipdocpjService,
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
        if (this.tipdocpj.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipdocpjService.update(this.tipdocpj));
        } else {
            this.subscribeToSaveResponse(
                this.tipdocpjService.create(this.tipdocpj));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipdocpj>) {
        result.subscribe((res: Tipdocpj) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipdocpj) {
        this.eventManager.broadcast({ name: 'tipdocpjListModification', content: 'OK'});
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
    selector: 'jhi-tipdocpj-popup',
    template: ''
})
export class TipdocpjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocpjPopupService: TipdocpjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipdocpjPopupService
                    .open(TipdocpjDialogComponent as Component, params['id']);
            } else {
                this.tipdocpjPopupService
                    .open(TipdocpjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
