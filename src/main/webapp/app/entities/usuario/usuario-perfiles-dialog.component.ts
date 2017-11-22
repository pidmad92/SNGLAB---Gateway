import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiParseLinks, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioPerfilesPopupService } from './usuario-perfiles-popup.service';
import { UsuPer } from './../usu-per/usu-per.model';
import { UsuPerService } from './../usu-per/usu-per.service';
import { TipoUsuario, TipoUsuarioService } from '../tipo-usuario';
import { Principal, ResponseWrapper } from '../../shared';
import { Perfil } from '../perfil/perfil.model';
import { PerfilService } from './../perfil/perfil.service';
declare var $: any;

@Component({
    selector: 'jhi-usuario-perfiles-dialog',
    templateUrl: './usuario-perfiles-dialog.component.html'
})
export class UsuarioPerfilesDialogComponent implements OnInit {
    usuPer: UsuPer[];
    usuarioPerfil: UsuPer = new UsuPer();
    isSaving: boolean;

    usuario: Usuario;
    perfil: Perfil;

    usuarios: Usuario[];
    perfiles: Perfil[];

    tipousuarios: TipoUsuario[];
    idUsuario: number;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private usuarioService: UsuarioService,
        private perfilService: PerfilService,
        private usuarioPerfilService: UsuPerService,
        private tipoUsuarioService: TipoUsuarioService,
        private eventManager: JhiEventManager
    ) {
    }
    ngOnInit() {
        this.isSaving = false;
    }
    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    saveModuloEntidad(id: number) {
        this.isSaving = true;
        this.usuario = new Usuario();
        this.usuario.id = id;
        this.usuarioPerfil.usuario = this.usuario;
        this.usuarioPerfil.perfil = this.perfil;
        this.subscribeToSaveResponse(
            this.usuarioPerfilService.create(this.usuarioPerfil));
    }

    deleteModuloEntidad(id: number) {
    }
    private subscribeToSaveResponse(result: Observable<UsuPer>) {
        result.subscribe((res: UsuPer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Usuario) {
        this.eventManager.broadcast({ name: 'moduloUsuarioListModification', content: 'OK'});
        this.isSaving = false;
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

}

@Component({
    selector: 'jhi-usuario-popup',
    template: ''
})
export class UsuarioPerfilesPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioPerfilesPopupService: UsuarioPerfilesPopupService,
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioPerfilesPopupService
                    .open(UsuarioPerfilesDialogComponent as Component, params['id']);
            } else {
                this.usuarioPerfilesPopupService
                    .open(UsuarioPerfilesDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
