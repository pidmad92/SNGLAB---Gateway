import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Personanatur } from './personanatur.model';
import { PersonanaturPopupService } from './personanatur-popup.service';
import { PersonanaturService } from './personanatur.service';
import { Tipdocident, TipdocidentService } from '../tipdocident';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-personanatur-dialog',
    templateUrl: './personanatur-dialog.component.html'
})
export class PersonanaturDialogComponent implements OnInit {

    personanatur: Personanatur;
    isSaving: boolean;

    tipdocidents: Tipdocident[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private personanaturService: PersonanaturService,
        private tipdocidentService: TipdocidentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipdocidentService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocidents = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.personanatur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.personanaturService.update(this.personanatur));
        } else {
            this.subscribeToSaveResponse(
                this.personanaturService.create(this.personanatur));
        }
    }

    private subscribeToSaveResponse(result: Observable<Personanatur>) {
        result.subscribe((res: Personanatur) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Personanatur) {
        this.eventManager.broadcast({ name: 'personanaturListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipdocidentById(index: number, item: Tipdocident) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-personanatur-popup',
    template: ''
})
export class PersonanaturPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personanaturPopupService: PersonanaturPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.personanaturPopupService
                    .open(PersonanaturDialogComponent as Component, params['id']);
            } else {
                this.personanaturPopupService
                    .open(PersonanaturDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
