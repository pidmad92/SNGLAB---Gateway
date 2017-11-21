import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Perfil } from './perfil.model';
import { PerfilPopupService } from './perfil-popup.service';
import { PerfilService } from './perfil.service';

@Component({
    selector: 'jhi-perfil-delete-dialog',
    templateUrl: './perfil-delete-dialog.component.html'
})
export class PerfilDeleteDialogComponent {

    perfil: Perfil;

    constructor(
        private perfilService: PerfilService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(perfil) {
        perfil.numEliminar = 0;
        this.perfilService.update(perfil).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'perfilListModification',
                content: 'Deleted an perfil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perfil-delete-popup',
    template: ''
})
export class PerfilDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perfilPopupService: PerfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.perfilPopupService
                .open(PerfilDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
