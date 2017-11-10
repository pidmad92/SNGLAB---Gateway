import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuarioGrupo } from './usuario-grupo.model';
import { UsuarioGrupoPopupService } from './usuario-grupo-popup.service';
import { UsuarioGrupoService } from './usuario-grupo.service';
import { Usuario, UsuarioService } from '../usuario';
import { Grupo, GrupoService } from '../grupo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuario-grupo-dialog',
    templateUrl: './usuario-grupo-dialog.component.html'
})
export class UsuarioGrupoDialogComponent implements OnInit {

    usuarioGrupo: UsuarioGrupo;
    isSaving: boolean;

    usuarios: Usuario[];

    grupos: Grupo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarioGrupoService: UsuarioGrupoService,
        private usuarioService: UsuarioService,
        private grupoService: GrupoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.grupoService.query()
            .subscribe((res: ResponseWrapper) => { this.grupos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuarioGrupo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioGrupoService.update(this.usuarioGrupo));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioGrupoService.create(this.usuarioGrupo));
        }
    }

    private subscribeToSaveResponse(result: Observable<UsuarioGrupo>) {
        result.subscribe((res: UsuarioGrupo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuarioGrupo) {
        this.eventManager.broadcast({ name: 'usuarioGrupoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUsuarioById(index: number, item: Usuario) {
        return item.id;
    }

    trackGrupoById(index: number, item: Grupo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-usuario-grupo-popup',
    template: ''
})
export class UsuarioGrupoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioGrupoPopupService: UsuarioGrupoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioGrupoPopupService
                    .open(UsuarioGrupoDialogComponent as Component, params['id']);
            } else {
                this.usuarioGrupoPopupService
                    .open(UsuarioGrupoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
