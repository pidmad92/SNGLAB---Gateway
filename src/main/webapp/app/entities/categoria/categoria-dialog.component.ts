import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Categoria } from './categoria.model';
import { CategoriaPopupService } from './categoria-popup.service';
import { CategoriaService } from './categoria.service';

@Component({
    selector: 'jhi-categoria-dialog',
    templateUrl: './categoria-dialog.component.html'
})
export class CategoriaDialogComponent implements OnInit {

    categoria: Categoria;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoriaService: CategoriaService,
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
        if (this.categoria.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoriaService.update(this.categoria));
        } else {
            this.subscribeToSaveResponse(
                this.categoriaService.create(this.categoria));
        }
    }

    private subscribeToSaveResponse(result: Observable<Categoria>) {
        result.subscribe((res: Categoria) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Categoria) {
        this.eventManager.broadcast({ name: 'categoriaListModification', content: 'OK'});
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
    selector: 'jhi-categoria-popup',
    template: ''
})
export class CategoriaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaPopupService: CategoriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriaPopupService
                    .open(CategoriaDialogComponent as Component, params['id']);
            } else {
                this.categoriaPopupService
                    .open(CategoriaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
