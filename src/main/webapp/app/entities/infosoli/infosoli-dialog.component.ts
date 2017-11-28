import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Infosoli } from './infosoli.model';
import { InfosoliPopupService } from './infosoli-popup.service';
import { InfosoliService } from './infosoli.service';

@Component({
    selector: 'jhi-infosoli-dialog',
    templateUrl: './infosoli-dialog.component.html'
})
export class InfosoliDialogComponent implements OnInit {

    infosoli: Infosoli;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private infosoliService: InfosoliService,
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
        if (this.infosoli.id !== undefined) {
            this.subscribeToSaveResponse(
                this.infosoliService.update(this.infosoli));
        } else {
            this.subscribeToSaveResponse(
                this.infosoliService.create(this.infosoli));
        }
    }

    private subscribeToSaveResponse(result: Observable<Infosoli>) {
        result.subscribe((res: Infosoli) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Infosoli) {
        this.eventManager.broadcast({ name: 'infosoliListModification', content: 'OK'});
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
    selector: 'jhi-infosoli-popup',
    template: ''
})
export class InfosoliPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private infosoliPopupService: InfosoliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.infosoliPopupService
                    .open(InfosoliDialogComponent as Component, params['id']);
            } else {
                this.infosoliPopupService
                    .open(InfosoliDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
