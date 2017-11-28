import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Calidenu } from './calidenu.model';
import { CalidenuPopupService } from './calidenu-popup.service';
import { CalidenuService } from './calidenu.service';
import { Califica, CalificaService } from '../califica';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calidenu-dialog',
    templateUrl: './calidenu-dialog.component.html'
})
export class CalidenuDialogComponent implements OnInit {

    calidenu: Calidenu;
    isSaving: boolean;

    calificas: Califica[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private calidenuService: CalidenuService,
        private calificaService: CalificaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.calificaService.query()
            .subscribe((res: ResponseWrapper) => { this.calificas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.calidenu.id !== undefined) {
            this.subscribeToSaveResponse(
                this.calidenuService.update(this.calidenu));
        } else {
            this.subscribeToSaveResponse(
                this.calidenuService.create(this.calidenu));
        }
    }

    private subscribeToSaveResponse(result: Observable<Calidenu>) {
        result.subscribe((res: Calidenu) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Calidenu) {
        this.eventManager.broadcast({ name: 'calidenuListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCalificaById(index: number, item: Califica) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-calidenu-popup',
    template: ''
})
export class CalidenuPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calidenuPopupService: CalidenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.calidenuPopupService
                    .open(CalidenuDialogComponent as Component, params['id']);
            } else {
                this.calidenuPopupService
                    .open(CalidenuDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
