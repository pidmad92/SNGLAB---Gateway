import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cartrab } from './cartrab.model';
import { CartrabPopupService } from './cartrab-popup.service';
import { CartrabService } from './cartrab.service';

@Component({
    selector: 'jhi-cartrab-dialog',
    templateUrl: './cartrab-dialog.component.html'
})
export class CartrabDialogComponent implements OnInit {

    cartrab: Cartrab;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cartrabService: CartrabService,
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
        if (this.cartrab.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cartrabService.update(this.cartrab));
        } else {
            this.subscribeToSaveResponse(
                this.cartrabService.create(this.cartrab));
        }
    }

    private subscribeToSaveResponse(result: Observable<Cartrab>) {
        result.subscribe((res: Cartrab) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cartrab) {
        this.eventManager.broadcast({ name: 'cartrabListModification', content: 'OK'});
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
    selector: 'jhi-cartrab-popup',
    template: ''
})
export class CartrabPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartrabPopupService: CartrabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cartrabPopupService
                    .open(CartrabDialogComponent as Component, params['id']);
            } else {
                this.cartrabPopupService
                    .open(CartrabDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
