import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pase } from './pase.model';
import { PasePopupService } from './pase-popup.service';
import { PaseService } from './pase.service';
import { Expediente, ExpedienteService } from '../expediente';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pase-dialog',
    templateUrl: './pase-dialog.component.html'
})
export class PaseDialogComponent implements OnInit {

    pase: Pase;
    isSaving: boolean;

    expedientes: Expediente[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paseService: PaseService,
        private expedienteService: ExpedienteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.expedienteService
            .query({filter: 'pase-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.pase.expediente || !this.pase.expediente.id) {
                    this.expedientes = res.json;
                } else {
                    this.expedienteService
                        .find(this.pase.expediente.id)
                        .subscribe((subRes: Expediente) => {
                            this.expedientes = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paseService.update(this.pase));
        } else {
            this.subscribeToSaveResponse(
                this.paseService.create(this.pase));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pase>) {
        result.subscribe((res: Pase) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pase) {
        this.eventManager.broadcast({ name: 'paseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackExpedienteById(index: number, item: Expediente) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pase-popup',
    template: ''
})
export class PasePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasePopupService: PasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pasePopupService
                    .open(PaseDialogComponent as Component, params['id']);
            } else {
                this.pasePopupService
                    .open(PaseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
