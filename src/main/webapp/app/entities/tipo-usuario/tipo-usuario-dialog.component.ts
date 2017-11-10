import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoUsuario } from './tipo-usuario.model';
import { TipoUsuarioPopupService } from './tipo-usuario-popup.service';
import { TipoUsuarioService } from './tipo-usuario.service';

@Component({
    selector: 'jhi-tipo-usuario-dialog',
    templateUrl: './tipo-usuario-dialog.component.html'
})
export class TipoUsuarioDialogComponent implements OnInit {

    tipoUsuario: TipoUsuario;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoUsuarioService: TipoUsuarioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tipoUsuario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoUsuarioService.update(this.tipoUsuario));
        } else {
            this.subscribeToSaveResponse(
                this.tipoUsuarioService.create(this.tipoUsuario));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoUsuario>) {
        result.subscribe((res: TipoUsuario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoUsuario) {
        this.eventManager.broadcast({ name: 'tipoUsuarioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-tipo-usuario-popup',
    template: ''
})
export class TipoUsuarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoUsuarioPopupService: TipoUsuarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoUsuarioPopupService
                    .open(TipoUsuarioDialogComponent as Component, params['id']);
            } else {
                this.tipoUsuarioPopupService
                    .open(TipoUsuarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
