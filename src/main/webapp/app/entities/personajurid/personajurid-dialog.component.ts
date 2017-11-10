import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Personajurid } from './personajurid.model';
import { PersonajuridPopupService } from './personajurid-popup.service';
import { PersonajuridService } from './personajurid.service';
import { Activecono, ActiveconoService } from '../activecono';
import { Tipdocident, TipdocidentService } from '../tipdocident';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-personajurid-dialog',
    templateUrl: './personajurid-dialog.component.html'
})
export class PersonajuridDialogComponent implements OnInit {

    personajurid: Personajurid;
    isSaving: boolean;

    activeconos: Activecono[];

    tipdocidents: Tipdocident[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personajuridService: PersonajuridService,
        private activeconoService: ActiveconoService,
        private tipdocidentService: TipdocidentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activeconoService.query()
            .subscribe((res: ResponseWrapper) => { this.activeconos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipdocidentService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocidents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.personajurid.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personajuridService.update(this.personajurid));
        } else {
            this.subscribeToSaveResponse(
                this.personajuridService.create(this.personajurid));
        }
    }

    private subscribeToSaveResponse(result: Observable<Personajurid>) {
        result.subscribe((res: Personajurid) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Personajurid) {
        this.eventManager.broadcast({ name: 'personajuridListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackActiveconoById(index: number, item: Activecono) {
        return item.id;
    }

    trackTipdocidentById(index: number, item: Tipdocident) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-personajurid-popup',
    template: ''
})
export class PersonajuridPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personajuridPopupService: PersonajuridPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personajuridPopupService
                    .open(PersonajuridDialogComponent as Component, params['id']);
            } else {
                this.personajuridPopupService
                    .open(PersonajuridDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
