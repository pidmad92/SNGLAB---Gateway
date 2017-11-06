import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UsuarioHorario } from './usuario-horario.model';
import { UsuarioHorarioPopupService } from './usuario-horario-popup.service';
import { UsuarioHorarioService } from './usuario-horario.service';
import { Usuario, UsuarioService } from '../usuario';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-usuario-horario-dialog',
    templateUrl: './usuario-horario-dialog.component.html'
})
export class UsuarioHorarioDialogComponent implements OnInit {

    usuarioHorario: UsuarioHorario;
    isSaving: boolean;

    usuarios: Usuario[];
    datHoraInicioDp: any;
    datHoraFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private usuarioHorarioService: UsuarioHorarioService,
        private usuarioService: UsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.usuarioService.query()
            .subscribe((res: ResponseWrapper) => { this.usuarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.usuarioHorario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.usuarioHorarioService.update(this.usuarioHorario));
        } else {
            this.subscribeToSaveResponse(
                this.usuarioHorarioService.create(this.usuarioHorario));
        }
    }

    private subscribeToSaveResponse(result: Observable<UsuarioHorario>) {
        result.subscribe((res: UsuarioHorario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: UsuarioHorario) {
        this.eventManager.broadcast({ name: 'usuarioHorarioListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-usuario-horario-popup',
    template: ''
})
export class UsuarioHorarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuarioHorarioPopupService: UsuarioHorarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.usuarioHorarioPopupService
                    .open(UsuarioHorarioDialogComponent as Component, params['id']);
            } else {
                this.usuarioHorarioPopupService
                    .open(UsuarioHorarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
