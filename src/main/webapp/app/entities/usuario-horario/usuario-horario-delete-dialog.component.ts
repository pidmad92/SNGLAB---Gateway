import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuarioHorario } from './usuario-horario.model';
import { UsuarioHorarioPopupService } from './usuario-horario-popup.service';
import { UsuarioHorarioService } from './usuario-horario.service';

@Component({
    selector: 'jhi-usuario-horario-delete-dialog',
    templateUrl: './usuario-horario-delete-dialog.component.html'
})
export class UsuarioHorarioDeleteDialogComponent {

    usuarioHorario: UsuarioHorario;

    constructor(
        private usuarioHorarioService: UsuarioHorarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(usuarioHorario) {
        usuarioHorario.numEliminar = 0;
        this.usuarioHorarioService.update(usuarioHorario).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuarioHorarioListModification',
                content: 'Deleted an usuarioHorario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usuario-horario-delete-popup',
    template: ''
})
export class UsuarioHorarioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioHorarioPopupService: UsuarioHorarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuarioHorarioPopupService
                .open(UsuarioHorarioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
