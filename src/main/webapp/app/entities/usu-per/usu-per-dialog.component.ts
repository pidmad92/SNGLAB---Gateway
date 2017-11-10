import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuPer } from './usu-per.model';
import { UsuPerPopupService } from './usu-per-popup.service';
import { UsuPerService } from './usu-per.service';
import { Usuario, UsuarioService } from '../usuario';
import { UsuarioGrupo, UsuarioGrupoService } from '../usuario-grupo';
import { Permiso, PermisoService } from '../permiso';
import { Perfil, PerfilService } from '../perfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usu-per-dialog',
    templateUrl: './usu-per-dialog.component.html'
})
export class UsuPerDialogComponent implements OnInit {

    usuPer: UsuPer;
    isSaving: boolean;

    usuarios: Usuario[];

    usuariogrupos: UsuarioGrupo[];

    permisos: Permiso[];

    perfils: Perfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuPerService: UsuPerService,
        private usuarioService: UsuarioService,
        private usuarioGrupoService: UsuarioGrupoService,
        private permisoService: PermisoService,
        private perfilService: PerfilService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.usuarioGrupoService.query()
            .subscribe((res: ResponseWrapper) => { this.usuariogrupos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.permisoService.query()
            .subscribe((res: ResponseWrapper) => { this.permisos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.perfilService.query()
            .subscribe((res: ResponseWrapper) => { this.perfils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuPer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuPerService.update(this.usuPer));
        } else {
            this.subscribeToSaveResponse(
                this.usuPerService.create(this.usuPer));
        }
    }

    private subscribeToSaveResponse(result: Observable<UsuPer>) {
        result.subscribe((res: UsuPer) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuPer) {
        this.eventManager.broadcast({ name: 'usuPerListModification', content: 'OK'});
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

    trackUsuarioGrupoById(index: number, item: UsuarioGrupo) {
        return item.id;
    }

    trackPermisoById(index: number, item: Permiso) {
        return item.id;
    }

    trackPerfilById(index: number, item: Perfil) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-usu-per-popup',
    template: ''
})
export class UsuPerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuPerPopupService: UsuPerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuPerPopupService
                    .open(UsuPerDialogComponent as Component, params['id']);
            } else {
                this.usuPerPopupService
                    .open(UsuPerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
