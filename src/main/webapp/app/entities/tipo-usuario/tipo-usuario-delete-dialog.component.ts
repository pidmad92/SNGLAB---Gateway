import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoUsuario } from './tipo-usuario.model';
import { TipoUsuarioPopupService } from './tipo-usuario-popup.service';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
    selector: 'jhi-tipo-usuario-delete-dialog',
    templateUrl: './tipo-usuario-delete-dialog.component.html'
})
export class TipoUsuarioDeleteDialogComponent {

    tipoUsuario: TipoUsuario;

    constructor(
        private tipoUsuarioService: TipoUsuarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoUsuarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoUsuarioListModification',
                content: 'Deleted an tipoUsuario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-usuario-delete-popup',
    template: ''
})
export class TipoUsuarioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoUsuarioPopupService: TipoUsuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoUsuarioPopupService
                .open(TipoUsuarioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
