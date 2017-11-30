import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Liquidacion } from './liquidacion.model';
import { LiquidacionPopupService } from './liquidacion-popup.service';
import { LiquidacionService } from './liquidacion.service';

@Component({
    selector: 'jhi-liquidacion-dialog',
    templateUrl: './liquidacion-dialog.component.html'
})
export class LiquidacionDialogComponent implements OnInit {

    liquidacion: Liquidacion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private liquidacionService: LiquidacionService,
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
        if (this.liquidacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.liquidacionService.update(this.liquidacion));
        } else {
            this.subscribeToSaveResponse(
                this.liquidacionService.create(this.liquidacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Liquidacion>) {
        result.subscribe((res: Liquidacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Liquidacion) {
        this.eventManager.broadcast({ name: 'liquidacionListModification', content: 'OK'});
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
    selector: 'jhi-liquidacion-popup',
    template: ''
})
export class LiquidacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private liquidacionPopupService: LiquidacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.liquidacionPopupService
                    .open(LiquidacionDialogComponent as Component, params['id']);
            } else {
                this.liquidacionPopupService
                    .open(LiquidacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
