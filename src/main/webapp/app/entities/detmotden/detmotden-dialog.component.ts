import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Detmotden } from './detmotden.model';
import { DetmotdenPopupService } from './detmotden-popup.service';
import { DetmotdenService } from './detmotden.service';
import { Motidenun, MotidenunService } from '../motidenun';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-detmotden-dialog',
    templateUrl: './detmotden-dialog.component.html'
})
export class DetmotdenDialogComponent implements OnInit {

    detmotden: Detmotden;
    isSaving: boolean;

    motidenuns: Motidenun[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private detmotdenService: DetmotdenService,
        private motidenunService: MotidenunService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.motidenunService.query()
            .subscribe((res: ResponseWrapper) => { this.motidenuns = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.detmotden.id !== undefined) {
            this.subscribeToSaveResponse(
                this.detmotdenService.update(this.detmotden));
        } else {
            this.subscribeToSaveResponse(
                this.detmotdenService.create(this.detmotden));
        }
    }

    private subscribeToSaveResponse(result: Observable<Detmotden>) {
        result.subscribe((res: Detmotden) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Detmotden) {
        this.eventManager.broadcast({ name: 'detmotdenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMotidenunById(index: number, item: Motidenun) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-detmotden-popup',
    template: ''
})
export class DetmotdenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detmotdenPopupService: DetmotdenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.detmotdenPopupService
                    .open(DetmotdenDialogComponent as Component, params['id']);
            } else {
                this.detmotdenPopupService
                    .open(DetmotdenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
