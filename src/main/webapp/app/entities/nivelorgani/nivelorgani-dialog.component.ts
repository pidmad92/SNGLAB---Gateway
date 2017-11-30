import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Nivelorgani } from './nivelorgani.model';
import { NivelorganiPopupService } from './nivelorgani-popup.service';
import { NivelorganiService } from './nivelorgani.service';

@Component({
    selector: 'jhi-nivelorgani-dialog',
    templateUrl: './nivelorgani-dialog.component.html'
})
export class NivelorganiDialogComponent implements OnInit {

    nivelorgani: Nivelorgani;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private nivelorganiService: NivelorganiService,
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
        if (this.nivelorgani.id !== undefined) {
            this.subscribeToSaveResponse(
                this.nivelorganiService.update(this.nivelorgani));
        } else {
            this.subscribeToSaveResponse(
                this.nivelorganiService.create(this.nivelorgani));
        }
    }

    private subscribeToSaveResponse(result: Observable<Nivelorgani>) {
        result.subscribe((res: Nivelorgani) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Nivelorgani) {
        this.eventManager.broadcast({ name: 'nivelorganiListModification', content: 'OK'});
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
    selector: 'jhi-nivelorgani-popup',
    template: ''
})
export class NivelorganiPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nivelorganiPopupService: NivelorganiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.nivelorganiPopupService
                    .open(NivelorganiDialogComponent as Component, params['id']);
            } else {
                this.nivelorganiPopupService
                    .open(NivelorganiDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
