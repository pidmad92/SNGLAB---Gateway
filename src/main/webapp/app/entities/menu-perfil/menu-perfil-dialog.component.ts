import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MenuPerfil } from './menu-perfil.model';
import { MenuPerfilPopupService } from './menu-perfil-popup.service';
import { MenuPerfilService } from './menu-perfil.service';
import { Perfil, PerfilService } from '../perfil';
import { Menu, MenuService } from '../menu';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-menu-perfil-dialog',
    templateUrl: './menu-perfil-dialog.component.html'
})
export class MenuPerfilDialogComponent implements OnInit {

    menuPerfil: MenuPerfil;
    isSaving: boolean;

    perfils: Perfil[];

    menus: Menu[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private menuPerfilService: MenuPerfilService,
        private perfilService: PerfilService,
        private menuService: MenuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perfilService.query()
            .subscribe((res: ResponseWrapper) => { this.perfils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.menuService.query()
            .subscribe((res: ResponseWrapper) => { this.menus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.menuPerfil.id !== undefined) {
            this.subscribeToSaveResponse(
                this.menuPerfilService.update(this.menuPerfil));
        } else {
            this.subscribeToSaveResponse(
                this.menuPerfilService.create(this.menuPerfil));
        }
    }

    private subscribeToSaveResponse(result: Observable<MenuPerfil>) {
        result.subscribe((res: MenuPerfil) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MenuPerfil) {
        this.eventManager.broadcast({ name: 'menuPerfilListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerfilById(index: number, item: Perfil) {
        return item.id;
    }

    trackMenuById(index: number, item: Menu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-menu-perfil-popup',
    template: ''
})
export class MenuPerfilPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPerfilPopupService: MenuPerfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.menuPerfilPopupService
                    .open(MenuPerfilDialogComponent as Component, params['id']);
            } else {
                this.menuPerfilPopupService
                    .open(MenuPerfilDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
