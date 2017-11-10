import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modacontrato } from './modacontrato.model';
import { ModacontratoPopupService } from './modacontrato-popup.service';
import { ModacontratoService } from './modacontrato.service';

@Component({
    selector: 'jhi-modacontrato-dialog',
    templateUrl: './modacontrato-dialog.component.html'
})
export class ModacontratoDialogComponent implements OnInit {

    modacontrato: Modacontrato;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private modacontratoService: ModacontratoService,
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
        if (this.modacontrato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.modacontratoService.update(this.modacontrato));
        } else {
            this.subscribeToSaveResponse(
                this.modacontratoService.create(this.modacontrato));
        }
    }

    private subscribeToSaveResponse(result: Observable<Modacontrato>) {
        result.subscribe((res: Modacontrato) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Modacontrato) {
        this.eventManager.broadcast({ name: 'modacontratoListModification', content: 'OK'});
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
    selector: 'jhi-modacontrato-popup',
    template: ''
})
export class ModacontratoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modacontratoPopupService: ModacontratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modacontratoPopupService
                    .open(ModacontratoDialogComponent as Component, params['id']);
            } else {
                this.modacontratoPopupService
                    .open(ModacontratoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
