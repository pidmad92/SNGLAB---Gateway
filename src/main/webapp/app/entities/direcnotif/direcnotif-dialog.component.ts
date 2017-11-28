import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Direcnotif } from './direcnotif.model';
import { DirecnotifPopupService } from './direcnotif-popup.service';
import { DirecnotifService } from './direcnotif.service';
import { Notifica, NotificaService } from '../notifica';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-direcnotif-dialog',
    templateUrl: './direcnotif-dialog.component.html'
})
export class DirecnotifDialogComponent implements OnInit {

    direcnotif: Direcnotif;
    isSaving: boolean;

    notificas: Notifica[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private direcnotifService: DirecnotifService,
        private notificaService: NotificaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.notificaService.query()
            .subscribe((res: ResponseWrapper) => { this.notificas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.direcnotif.id !== undefined) {
            this.subscribeToSaveResponse(
                this.direcnotifService.update(this.direcnotif));
        } else {
            this.subscribeToSaveResponse(
                this.direcnotifService.create(this.direcnotif));
        }
    }

    private subscribeToSaveResponse(result: Observable<Direcnotif>) {
        result.subscribe((res: Direcnotif) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Direcnotif) {
        this.eventManager.broadcast({ name: 'direcnotifListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackNotificaById(index: number, item: Notifica) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-direcnotif-popup',
    template: ''
})
export class DirecnotifPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direcnotifPopupService: DirecnotifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.direcnotifPopupService
                    .open(DirecnotifDialogComponent as Component, params['id']);
            } else {
                this.direcnotifPopupService
                    .open(DirecnotifDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
