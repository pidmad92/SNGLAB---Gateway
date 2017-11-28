import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docingrper } from './docingrper.model';
import { DocingrperPopupService } from './docingrper-popup.service';
import { DocingrperService } from './docingrper.service';

@Component({
    selector: 'jhi-docingrper-dialog',
    templateUrl: './docingrper-dialog.component.html'
})
export class DocingrperDialogComponent implements OnInit {

    docingrper: Docingrper;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docingrperService: DocingrperService,
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
        if (this.docingrper.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docingrperService.update(this.docingrper));
        } else {
            this.subscribeToSaveResponse(
                this.docingrperService.create(this.docingrper));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docingrper>) {
        result.subscribe((res: Docingrper) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docingrper) {
        this.eventManager.broadcast({ name: 'docingrperListModification', content: 'OK'});
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
    selector: 'jhi-docingrper-popup',
    template: ''
})
export class DocingrperPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docingrperPopupService: DocingrperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docingrperPopupService
                    .open(DocingrperDialogComponent as Component, params['id']);
            } else {
                this.docingrperPopupService
                    .open(DocingrperDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
