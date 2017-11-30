import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tiporecurso } from './tiporecurso.model';
import { TiporecursoPopupService } from './tiporecurso-popup.service';
import { TiporecursoService } from './tiporecurso.service';

@Component({
    selector: 'jhi-tiporecurso-dialog',
    templateUrl: './tiporecurso-dialog.component.html'
})
export class TiporecursoDialogComponent implements OnInit {

    tiporecurso: Tiporecurso;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tiporecursoService: TiporecursoService,
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
        if (this.tiporecurso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tiporecursoService.update(this.tiporecurso));
        } else {
            this.subscribeToSaveResponse(
                this.tiporecursoService.create(this.tiporecurso));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tiporecurso>) {
        result.subscribe((res: Tiporecurso) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tiporecurso) {
        this.eventManager.broadcast({ name: 'tiporecursoListModification', content: 'OK'});
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
    selector: 'jhi-tiporecurso-popup',
    template: ''
})
export class TiporecursoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tiporecursoPopupService: TiporecursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tiporecursoPopupService
                    .open(TiporecursoDialogComponent as Component, params['id']);
            } else {
                this.tiporecursoPopupService
                    .open(TiporecursoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
