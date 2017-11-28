import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipconrem } from './tipconrem.model';
import { TipconremPopupService } from './tipconrem-popup.service';
import { TipconremService } from './tipconrem.service';

@Component({
    selector: 'jhi-tipconrem-dialog',
    templateUrl: './tipconrem-dialog.component.html'
})
export class TipconremDialogComponent implements OnInit {

    tipconrem: Tipconrem;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipconremService: TipconremService,
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
        if (this.tipconrem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipconremService.update(this.tipconrem));
        } else {
            this.subscribeToSaveResponse(
                this.tipconremService.create(this.tipconrem));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipconrem>) {
        result.subscribe((res: Tipconrem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipconrem) {
        this.eventManager.broadcast({ name: 'tipconremListModification', content: 'OK'});
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
    selector: 'jhi-tipconrem-popup',
    template: ''
})
export class TipconremPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipconremPopupService: TipconremPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipconremPopupService
                    .open(TipconremDialogComponent as Component, params['id']);
            } else {
                this.tipconremPopupService
                    .open(TipconremDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
