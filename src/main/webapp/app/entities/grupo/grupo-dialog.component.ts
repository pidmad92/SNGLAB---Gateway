import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Grupo } from './grupo.model';
import { GrupoPopupService } from './grupo-popup.service';
import { GrupoService } from './grupo.service';
import { Entidad, EntidadService } from '../entidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-grupo-dialog',
    templateUrl: './grupo-dialog.component.html'
})
export class GrupoDialogComponent implements OnInit {

    grupo: Grupo;
    isSaving: boolean;

    entidads: Entidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private grupoService: GrupoService,
        private entidadService: EntidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.entidadService.query()
            .subscribe((res: ResponseWrapper) => { this.entidads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.grupo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.grupoService.update(this.grupo));
        } else {
            this.subscribeToSaveResponse(
                this.grupoService.create(this.grupo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Grupo>) {
        result.subscribe((res: Grupo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Grupo) {
        this.eventManager.broadcast({ name: 'grupoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEntidadById(index: number, item: Entidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-grupo-popup',
    template: ''
})
export class GrupoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private grupoPopupService: GrupoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.grupoPopupService
                    .open(GrupoDialogComponent as Component, params['id']);
            } else {
                this.grupoPopupService
                    .open(GrupoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
