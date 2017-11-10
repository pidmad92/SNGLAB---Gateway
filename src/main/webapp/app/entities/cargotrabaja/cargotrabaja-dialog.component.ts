import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cargotrabaja } from './cargotrabaja.model';
import { CargotrabajaPopupService } from './cargotrabaja-popup.service';
import { CargotrabajaService } from './cargotrabaja.service';

@Component({
    selector: 'jhi-cargotrabaja-dialog',
    templateUrl: './cargotrabaja-dialog.component.html'
})
export class CargotrabajaDialogComponent implements OnInit {

    cargotrabaja: Cargotrabaja;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cargotrabajaService: CargotrabajaService,
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
        if (this.cargotrabaja.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cargotrabajaService.update(this.cargotrabaja));
        } else {
            this.subscribeToSaveResponse(
                this.cargotrabajaService.create(this.cargotrabaja));
        }
    }

    private subscribeToSaveResponse(result: Observable<Cargotrabaja>) {
        result.subscribe((res: Cargotrabaja) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Cargotrabaja) {
        this.eventManager.broadcast({ name: 'cargotrabajaListModification', content: 'OK'});
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
    selector: 'jhi-cargotrabaja-popup',
    template: ''
})
export class CargotrabajaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargotrabajaPopupService: CargotrabajaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cargotrabajaPopupService
                    .open(CargotrabajaDialogComponent as Component, params['id']);
            } else {
                this.cargotrabajaPopupService
                    .open(CargotrabajaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
