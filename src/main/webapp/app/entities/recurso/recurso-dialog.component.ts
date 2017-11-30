import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Recurso } from './recurso.model';
import { RecursoPopupService } from './recurso-popup.service';
import { RecursoService } from './recurso.service';
import { Tiporecurso, TiporecursoService } from '../tiporecurso';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-recurso-dialog',
    templateUrl: './recurso-dialog.component.html'
})
export class RecursoDialogComponent implements OnInit {

    recurso: Recurso;
    isSaving: boolean;

    tiporecursos: Tiporecurso[];

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private recursoService: RecursoService,
        private tiporecursoService: TiporecursoService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tiporecursoService.query()
            .subscribe((res: ResponseWrapper) => { this.tiporecursos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.recurso.id !== undefined) {
            this.subscribeToSaveResponse(
                this.recursoService.update(this.recurso));
        } else {
            this.subscribeToSaveResponse(
                this.recursoService.create(this.recurso));
        }
    }

    private subscribeToSaveResponse(result: Observable<Recurso>) {
        result.subscribe((res: Recurso) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Recurso) {
        this.eventManager.broadcast({ name: 'recursoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTiporecursoById(index: number, item: Tiporecurso) {
        return item.id;
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-recurso-popup',
    template: ''
})
export class RecursoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recursoPopupService: RecursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.recursoPopupService
                    .open(RecursoDialogComponent as Component, params['id']);
            } else {
                this.recursoPopupService
                    .open(RecursoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
