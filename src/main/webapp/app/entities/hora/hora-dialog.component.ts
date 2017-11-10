import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hora } from './hora.model';
import { HoraPopupService } from './hora-popup.service';
import { HoraService } from './hora.service';

@Component({
    selector: 'jhi-hora-dialog',
    templateUrl: './hora-dialog.component.html'
})
export class HoraDialogComponent implements OnInit {

    hora: Hora;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private horaService: HoraService,
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
        if (this.hora.id !== undefined) {
            this.subscribeToSaveResponse(
                this.horaService.update(this.hora));
        } else {
            this.subscribeToSaveResponse(
                this.horaService.create(this.hora));
        }
    }

    private subscribeToSaveResponse(result: Observable<Hora>) {
        result.subscribe((res: Hora) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Hora) {
        this.eventManager.broadcast({ name: 'horaListModification', content: 'OK'});
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
    selector: 'jhi-hora-popup',
    template: ''
})
export class HoraPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horaPopupService: HoraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.horaPopupService
                    .open(HoraDialogComponent as Component, params['id']);
            } else {
                this.horaPopupService
                    .open(HoraDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
