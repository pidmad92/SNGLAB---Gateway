import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Afiliado } from './afiliado.model';
import { AfiliadoPopupService } from './afiliado-popup.service';
import { AfiliadoService } from './afiliado.service';
import { Scargo, ScargoService } from '../scargo';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-afiliado-dialog',
    templateUrl: './afiliado-dialog.component.html'
})
export class AfiliadoDialogComponent implements OnInit {

    afiliado: Afiliado;
    isSaving: boolean;

    scargos: Scargo[];

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private afiliadoService: AfiliadoService,
        private scargoService: ScargoService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scargoService.query()
            .subscribe((res: ResponseWrapper) => { this.scargos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.afiliado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.afiliadoService.update(this.afiliado));
        } else {
            this.subscribeToSaveResponse(
                this.afiliadoService.create(this.afiliado));
        }
    }

    private subscribeToSaveResponse(result: Observable<Afiliado>) {
        result.subscribe((res: Afiliado) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Afiliado) {
        this.eventManager.broadcast({ name: 'afiliadoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackScargoById(index: number, item: Scargo) {
        return item.id;
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-afiliado-popup',
    template: ''
})
export class AfiliadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private afiliadoPopupService: AfiliadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.afiliadoPopupService
                    .open(AfiliadoDialogComponent as Component, params['id']);
            } else {
                this.afiliadoPopupService
                    .open(AfiliadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
