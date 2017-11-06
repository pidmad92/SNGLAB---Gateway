import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Perjuridire } from './perjuridire.model';
import { PerjuridirePopupService } from './perjuridire-popup.service';
import { PerjuridireService } from './perjuridire.service';
import { Personajurid, PersonajuridService } from '../personajurid';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-perjuridire-dialog',
    templateUrl: './perjuridire-dialog.component.html'
})
export class PerjuridireDialogComponent implements OnInit {

    perjuridire: Perjuridire;
    isSaving: boolean;

    personajurids: Personajurid[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private perjuridireService: PerjuridireService,
        private personajuridService: PersonajuridService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.personajuridService.query()
            .subscribe((res: ResponseWrapper) => { this.personajurids = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.perjuridire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perjuridireService.update(this.perjuridire));
        } else {
            this.subscribeToSaveResponse(
                this.perjuridireService.create(this.perjuridire));
        }
    }

    private subscribeToSaveResponse(result: Observable<Perjuridire>) {
        result.subscribe((res: Perjuridire) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Perjuridire) {
        this.eventManager.broadcast({ name: 'perjuridireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPersonajuridById(index: number, item: Personajurid) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-perjuridire-popup',
    template: ''
})
export class PerjuridirePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perjuridirePopupService: PerjuridirePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.perjuridirePopupService
                    .open(PerjuridireDialogComponent as Component, params['id']);
            } else {
                this.perjuridirePopupService
                    .open(PerjuridireDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
