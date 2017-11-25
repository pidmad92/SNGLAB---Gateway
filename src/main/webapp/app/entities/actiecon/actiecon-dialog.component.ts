import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Actiecon } from './actiecon.model';
import { ActieconPopupService } from './actiecon-popup.service';
import { ActieconService } from './actiecon.service';

@Component({
    selector: 'jhi-actiecon-dialog',
    templateUrl: './actiecon-dialog.component.html'
})
export class ActieconDialogComponent implements OnInit {

    actiecon: Actiecon;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private actieconService: ActieconService,
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
        if (this.actiecon.id !== undefined) {
            this.subscribeToSaveResponse(
                this.actieconService.update(this.actiecon));
        } else {
            this.subscribeToSaveResponse(
                this.actieconService.create(this.actiecon));
        }
    }

    private subscribeToSaveResponse(result: Observable<Actiecon>) {
        result.subscribe((res: Actiecon) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Actiecon) {
        this.eventManager.broadcast({ name: 'actieconListModification', content: 'OK'});
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
    selector: 'jhi-actiecon-popup',
    template: ''
})
export class ActieconPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actieconPopupService: ActieconPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.actieconPopupService
                    .open(ActieconDialogComponent as Component, params['id']);
            } else {
                this.actieconPopupService
                    .open(ActieconDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
