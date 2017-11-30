import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Federacion } from './federacion.model';
import { FederacionPopupService } from './federacion-popup.service';
import { FederacionService } from './federacion.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-federacion-dialog',
    templateUrl: './federacion-dialog.component.html'
})
export class FederacionDialogComponent implements OnInit {

    federacion: Federacion;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private federacionService: FederacionService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.federacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.federacionService.update(this.federacion));
        } else {
            this.subscribeToSaveResponse(
                this.federacionService.create(this.federacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Federacion>) {
        result.subscribe((res: Federacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Federacion) {
        this.eventManager.broadcast({ name: 'federacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-federacion-popup',
    template: ''
})
export class FederacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private federacionPopupService: FederacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.federacionPopupService
                    .open(FederacionDialogComponent as Component, params['id']);
            } else {
                this.federacionPopupService
                    .open(FederacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
