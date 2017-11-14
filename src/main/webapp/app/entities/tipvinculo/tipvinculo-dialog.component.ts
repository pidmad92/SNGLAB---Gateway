import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipvinculo } from './tipvinculo.model';
import { TipvinculoPopupService } from './tipvinculo-popup.service';
import { TipvinculoService } from './tipvinculo.service';

@Component({
    selector: 'jhi-tipvinculo-dialog',
    templateUrl: './tipvinculo-dialog.component.html'
})
export class TipvinculoDialogComponent implements OnInit {

    tipvinculo: Tipvinculo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipvinculoService: TipvinculoService,
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
        if (this.tipvinculo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipvinculoService.update(this.tipvinculo));
        } else {
            this.subscribeToSaveResponse(
                this.tipvinculoService.create(this.tipvinculo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipvinculo>) {
        result.subscribe((res: Tipvinculo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipvinculo) {
        this.eventManager.broadcast({ name: 'tipvinculoListModification', content: 'OK'});
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
    selector: 'jhi-tipvinculo-popup',
    template: ''
})
export class TipvinculoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipvinculoPopupService: TipvinculoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipvinculoPopupService
                    .open(TipvinculoDialogComponent as Component, params['id']);
            } else {
                this.tipvinculoPopupService
                    .open(TipvinculoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
