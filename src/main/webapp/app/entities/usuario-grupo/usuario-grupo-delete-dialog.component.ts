import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioGrupo } from './usuario-grupo.model';
import { UsuarioGrupoPopupService } from './usuario-grupo-popup.service';
import { UsuarioGrupoService } from './usuario-grupo.service';

@Component({
    selector: 'jhi-usuario-grupo-delete-dialog',
    templateUrl: './usuario-grupo-delete-dialog.component.html'
})
export class UsuarioGrupoDeleteDialogComponent {

    usuarioGrupo: UsuarioGrupo;

    constructor(
        private usuarioGrupoService: UsuarioGrupoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(usuarioGrupo) {
        usuarioGrupo.numEliminar = 0;
        this.usuarioGrupoService.update(usuarioGrupo).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarioGrupoListModification',
                content: 'Deleted an usuarioGrupo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-grupo-delete-popup',
    template: ''
})
export class UsuarioGrupoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioGrupoPopupService: UsuarioGrupoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarioGrupoPopupService
                .open(UsuarioGrupoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
