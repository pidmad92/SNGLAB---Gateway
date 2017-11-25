import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Negocolect } from './negocolect.model';
import { NegocolectPopupService } from './negocolect-popup.service';
import { NegocolectService } from './negocolect.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-negocolect-dialog',
    templateUrl: './negocolect-dialog.component.html'
})
export class NegocolectDialogComponent implements OnInit {

    negocolect: Negocolect;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private negocolectService: NegocolectService,
        private formperfilService: FormperfilService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formperfilService.query()
            .subscribe((res: ResponseWrapper) => { this.formperfils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.negocolect.id !== undefined) {
            this.subscribeToSaveResponse(
                this.negocolectService.update(this.negocolect));
        } else {
            this.subscribeToSaveResponse(
                this.negocolectService.create(this.negocolect));
        }
    }

    private subscribeToSaveResponse(result: Observable<Negocolect>) {
        result.subscribe((res: Negocolect) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Negocolect) {
        this.eventManager.broadcast({ name: 'negocolectListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormperfilById(index: number, item: Formperfil) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-negocolect-popup',
    template: ''
})
export class NegocolectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private negocolectPopupService: NegocolectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.negocolectPopupService
                    .open(NegocolectDialogComponent as Component, params['id']);
            } else {
                this.negocolectPopupService
                    .open(NegocolectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
