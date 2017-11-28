import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Perjuridica } from './perjuridica.model';
import { PerjuridicaPopupService } from './perjuridica-popup.service';
import { PerjuridicaService } from './perjuridica.service';
import { Actiecon, ActieconService } from '../actiecon';
import { Tipdocident, TipdocidentService } from '../tipdocident';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-perjuridica-dialog',
    templateUrl: './perjuridica-dialog.component.html'
})
export class PerjuridicaDialogComponent implements OnInit {

    perjuridica: Perjuridica;
    isSaving: boolean;

    actiecons: Actiecon[];

    tipdocidents: Tipdocident[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private perjuridicaService: PerjuridicaService,
        private actieconService: ActieconService,
        private tipdocidentService: TipdocidentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.actieconService.query()
            .subscribe((res: ResponseWrapper) => { this.actiecons = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipdocidentService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocidents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.perjuridica.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perjuridicaService.update(this.perjuridica));
        } else {
            this.subscribeToSaveResponse(
                this.perjuridicaService.create(this.perjuridica));
        }
    }

    private subscribeToSaveResponse(result: Observable<Perjuridica>) {
        result.subscribe((res: Perjuridica) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Perjuridica) {
        this.eventManager.broadcast({ name: 'perjuridicaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackActieconById(index: number, item: Actiecon) {
        return item.id;
    }

    trackTipdocidentById(index: number, item: Tipdocident) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-perjuridica-popup',
    template: ''
})
export class PerjuridicaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perjuridicaPopupService: PerjuridicaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.perjuridicaPopupService
                    .open(PerjuridicaDialogComponent as Component, params['id']);
            } else {
                this.perjuridicaPopupService
                    .open(PerjuridicaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
