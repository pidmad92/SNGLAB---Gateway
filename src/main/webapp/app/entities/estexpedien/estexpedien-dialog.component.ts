import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Estexpedien } from './estexpedien.model';
import { EstexpedienPopupService } from './estexpedien-popup.service';
import { EstexpedienService } from './estexpedien.service';

@Component({
    selector: 'jhi-estexpedien-dialog',
    templateUrl: './estexpedien-dialog.component.html'
})
export class EstexpedienDialogComponent implements OnInit {

    estexpedien: Estexpedien;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estexpedienService: EstexpedienService,
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
        if (this.estexpedien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estexpedienService.update(this.estexpedien));
        } else {
            this.subscribeToSaveResponse(
                this.estexpedienService.create(this.estexpedien));
        }
    }

    private subscribeToSaveResponse(result: Observable<Estexpedien>) {
        result.subscribe((res: Estexpedien) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Estexpedien) {
        this.eventManager.broadcast({ name: 'estexpedienListModification', content: 'OK'});
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
    selector: 'jhi-estexpedien-popup',
    template: ''
})
export class EstexpedienPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estexpedienPopupService: EstexpedienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estexpedienPopupService
                    .open(EstexpedienDialogComponent as Component, params['id']);
            } else {
                this.estexpedienPopupService
                    .open(EstexpedienDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
