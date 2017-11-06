import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Perfil } from './perfil.model';
import { PerfilPopupService } from './perfil-popup.service';
import { PerfilService } from './perfil.service';
import { Modulo, ModuloService } from '../modulo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-perfil-dialog',
    templateUrl: './perfil-dialog.component.html'
})
export class PerfilDialogComponent implements OnInit {

    perfil: Perfil;
    isSaving: boolean;

    modulos: Modulo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private perfilService: PerfilService,
        private moduloService: ModuloService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.moduloService.query()
            .subscribe((res: ResponseWrapper) => { this.modulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.perfil.id !== undefined) {
            this.subscribeToSaveResponse(
                this.perfilService.update(this.perfil));
        } else {
            this.subscribeToSaveResponse(
                this.perfilService.create(this.perfil));
        }
    }

    private subscribeToSaveResponse(result: Observable<Perfil>) {
        result.subscribe((res: Perfil) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Perfil) {
        this.eventManager.broadcast({ name: 'perfilListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackModuloById(index: number, item: Modulo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-perfil-popup',
    template: ''
})
export class PerfilPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perfilPopupService: PerfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.perfilPopupService
                    .open(PerfilDialogComponent as Component, params['id']);
            } else {
                this.perfilPopupService
                    .open(PerfilDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
