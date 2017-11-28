import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Horacon } from './horacon.model';
import { HoraconPopupService } from './horacon-popup.service';
import { HoraconService } from './horacon.service';

@Component({
    selector: 'jhi-horacon-dialog',
    templateUrl: './horacon-dialog.component.html'
})
export class HoraconDialogComponent implements OnInit {

    horacon: Horacon;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private horaconService: HoraconService,
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
        if (this.horacon.id !== undefined) {
            this.subscribeToSaveResponse(
                this.horaconService.update(this.horacon));
        } else {
            this.subscribeToSaveResponse(
                this.horaconService.create(this.horacon));
        }
    }

    private subscribeToSaveResponse(result: Observable<Horacon>) {
        result.subscribe((res: Horacon) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Horacon) {
        this.eventManager.broadcast({ name: 'horaconListModification', content: 'OK'});
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
    selector: 'jhi-horacon-popup',
    template: ''
})
export class HoraconPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horaconPopupService: HoraconPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.horaconPopupService
                    .open(HoraconDialogComponent as Component, params['id']);
            } else {
                this.horaconPopupService
                    .open(HoraconDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
