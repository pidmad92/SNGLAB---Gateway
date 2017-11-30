import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Delegado } from './delegado.model';
import { DelegadoPopupService } from './delegado-popup.service';
import { DelegadoService } from './delegado.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-delegado-dialog',
    templateUrl: './delegado-dialog.component.html'
})
export class DelegadoDialogComponent implements OnInit {

    delegado: Delegado;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private delegadoService: DelegadoService,
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
        if (this.delegado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.delegadoService.update(this.delegado));
        } else {
            this.subscribeToSaveResponse(
                this.delegadoService.create(this.delegado));
        }
    }

    private subscribeToSaveResponse(result: Observable<Delegado>) {
        result.subscribe((res: Delegado) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Delegado) {
        this.eventManager.broadcast({ name: 'delegadoListModification', content: 'OK'});
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
    selector: 'jhi-delegado-popup',
    template: ''
})
export class DelegadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delegadoPopupService: DelegadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.delegadoPopupService
                    .open(DelegadoDialogComponent as Component, params['id']);
            } else {
                this.delegadoPopupService
                    .open(DelegadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
