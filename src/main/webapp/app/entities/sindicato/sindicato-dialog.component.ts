import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Sindicato } from './sindicato.model';
import { SindicatoPopupService } from './sindicato-popup.service';
import { SindicatoService } from './sindicato.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sindicato-dialog',
    templateUrl: './sindicato-dialog.component.html'
})
export class SindicatoDialogComponent implements OnInit {

    sindicato: Sindicato;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private sindicatoService: SindicatoService,
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
        if (this.sindicato.id !== undefined) {
            this.subscribeToSaveResponse(
                this.sindicatoService.update(this.sindicato));
        } else {
            this.subscribeToSaveResponse(
                this.sindicatoService.create(this.sindicato));
        }
    }

    private subscribeToSaveResponse(result: Observable<Sindicato>) {
        result.subscribe((res: Sindicato) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Sindicato) {
        this.eventManager.broadcast({ name: 'sindicatoListModification', content: 'OK'});
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
    selector: 'jhi-sindicato-popup',
    template: ''
})
export class SindicatoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sindicatoPopupService: SindicatoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sindicatoPopupService
                    .open(SindicatoDialogComponent as Component, params['id']);
            } else {
                this.sindicatoPopupService
                    .open(SindicatoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
