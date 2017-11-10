import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tippersona } from './tippersona.model';
import { TippersonaPopupService } from './tippersona-popup.service';
import { TippersonaService } from './tippersona.service';

@Component({
    selector: 'jhi-tippersona-dialog',
    templateUrl: './tippersona-dialog.component.html'
})
export class TippersonaDialogComponent implements OnInit {

    tippersona: Tippersona;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tippersonaService: TippersonaService,
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
        if (this.tippersona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tippersonaService.update(this.tippersona));
        } else {
            this.subscribeToSaveResponse(
                this.tippersonaService.create(this.tippersona));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tippersona>) {
        result.subscribe((res: Tippersona) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tippersona) {
        this.eventManager.broadcast({ name: 'tippersonaListModification', content: 'OK'});
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
    selector: 'jhi-tippersona-popup',
    template: ''
})
export class TippersonaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tippersonaPopupService: TippersonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tippersonaPopupService
                    .open(TippersonaDialogComponent as Component, params['id']);
            } else {
                this.tippersonaPopupService
                    .open(TippersonaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
