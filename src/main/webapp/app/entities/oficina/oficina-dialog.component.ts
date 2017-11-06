import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Oficina } from './oficina.model';
import { OficinaPopupService } from './oficina-popup.service';
import { OficinaService } from './oficina.service';

@Component({
    selector: 'jhi-oficina-dialog',
    templateUrl: './oficina-dialog.component.html'
})
export class OficinaDialogComponent implements OnInit {

    oficina: Oficina;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private oficinaService: OficinaService,
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
        if (this.oficina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.oficinaService.update(this.oficina));
        } else {
            this.subscribeToSaveResponse(
                this.oficinaService.create(this.oficina));
        }
    }

    private subscribeToSaveResponse(result: Observable<Oficina>) {
        result.subscribe((res: Oficina) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Oficina) {
        this.eventManager.broadcast({ name: 'oficinaListModification', content: 'OK'});
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
    selector: 'jhi-oficina-popup',
    template: ''
})
export class OficinaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oficinaPopupService: OficinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.oficinaPopupService
                    .open(OficinaDialogComponent as Component, params['id']);
            } else {
                this.oficinaPopupService
                    .open(OficinaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
