import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioGruposPopupService } from './usuario-grupos-popup.service';
import { UsuarioGrupo } from './../usuario-grupo/usuario-grupo.model';
import { UsuarioGrupoService } from './../usuario-grupo/usuario-grupo.service';
import { TipoUsuario, TipoUsuarioService } from '../tipo-usuario';
import { Principal, ResponseWrapper } from '../../shared';
import { Grupo } from '../grupo/grupo.model';
import { GrupoService } from './../grupo/grupo.service';
declare var $: any;

@Component({
    selector: 'jhi-usuario-grupos-dialog',
    templateUrl: './usuario-grupos-dialog.component.html'
})
export class UsuarioGruposDialogComponent implements OnInit {

    usuarioGrupos: UsuarioGrupo[];
    usuarioGrupo: UsuarioGrupo = new UsuarioGrupo();
    isSaving: boolean;

    usuario: Usuario;
    grupo: Grupo;

    usuarios: Usuario[];
    grupos: Grupo[];
    idUsuario: number;
    routeSub: any;
    private subscription: Subscription;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private grupoService: GrupoService,
        private usuarioGrupoService: UsuarioGrupoService,
        private tipoUsuarioService: TipoUsuarioService,
        private eventManager: JhiEventManager,
    ) {
    }
    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.find(this.idUsuario).subscribe((usuario) => {
                this.usuario = usuario;
        });
    }
    saveModuloEntidad(id: number) {
        this.isSaving = true;
        this.grupo = new Grupo();
        this.grupo.id = id;
        this.usuarioGrupo.usuario = this.usuario;
        this.usuarioGrupo.grupo = this.grupo;
        this.subscribeToSaveResponse(
            this.usuarioGrupoService.create(this.usuarioGrupo));
    }
    deleteModuloEntidad(id: number) {
        this.usuarioGrupoService.delete(id).subscribe((response) => {});
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }
    private subscribeToSaveResponse(result: Observable<UsuarioGrupo>) {
        result.subscribe((res: UsuarioGrupo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }
    private onSaveSuccess(result: Usuario) {
        this.eventManager.broadcast({ name: 'usuarioListModification', content: 'OK'});
        this.isSaving = false;
        // this.activeModal.dismiss(result);
    }
    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioGruposPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioGruposPopupService: UsuarioGruposPopupService,
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioGruposPopupService
                    .open(UsuarioGruposDialogComponent as Component, params['id']);
            } else {
                this.usuarioGruposPopupService
                    .open(UsuarioGruposDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
