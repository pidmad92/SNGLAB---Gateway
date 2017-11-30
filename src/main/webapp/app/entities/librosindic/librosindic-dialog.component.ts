import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Librosindic } from './librosindic.model';
import { LibrosindicPopupService } from './librosindic-popup.service';
import { LibrosindicService } from './librosindic.service';
import { Tipolibro, TipolibroService } from '../tipolibro';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-librosindic-dialog',
    templateUrl: './librosindic-dialog.component.html'
})
export class LibrosindicDialogComponent implements OnInit {

    librosindic: Librosindic;
    isSaving: boolean;

    tipolibros: Tipolibro[];

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private librosindicService: LibrosindicService,
        private tipolibroService: TipolibroService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipolibroService.query()
            .subscribe((res: ResponseWrapper) => { this.tipolibros = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.librosindic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.librosindicService.update(this.librosindic));
        } else {
            this.subscribeToSaveResponse(
                this.librosindicService.create(this.librosindic));
        }
    }

    private subscribeToSaveResponse(result: Observable<Librosindic>) {
        result.subscribe((res: Librosindic) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Librosindic) {
        this.eventManager.broadcast({ name: 'librosindicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipolibroById(index: number, item: Tipolibro) {
        return item.id;
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-librosindic-popup',
    template: ''
})
export class LibrosindicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private librosindicPopupService: LibrosindicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.librosindicPopupService
                    .open(LibrosindicDialogComponent as Component, params['id']);
            } else {
                this.librosindicPopupService
                    .open(LibrosindicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
