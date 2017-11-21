import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MenuPerfil } from './menu-perfil.model';
import { MenuPerfilPopupService } from './menu-perfil-popup.service';
import { MenuPerfilService } from './menu-perfil.service';

@Component({
    selector: 'jhi-menu-perfil-delete-dialog',
    templateUrl: './menu-perfil-delete-dialog.component.html'
})
export class MenuPerfilDeleteDialogComponent {

    menuPerfil: MenuPerfil;

    constructor(
        private menuPerfilService: MenuPerfilService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(menuPerfil) {
        menuPerfil.numEliminar = 0;
        this.menuPerfilService.update(menuPerfil).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'menuPerfilListModification',
                content: 'Deleted an menuPerfil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-menu-perfil-delete-popup',
    template: ''
})
export class MenuPerfilDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private menuPerfilPopupService: MenuPerfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.menuPerfilPopupService
                .open(MenuPerfilDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
