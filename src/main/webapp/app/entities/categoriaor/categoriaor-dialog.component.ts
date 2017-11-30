import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Categoriaor } from './categoriaor.model';
import { CategoriaorPopupService } from './categoriaor-popup.service';
import { CategoriaorService } from './categoriaor.service';

@Component({
    selector: 'jhi-categoriaor-dialog',
    templateUrl: './categoriaor-dialog.component.html'
})
export class CategoriaorDialogComponent implements OnInit {

    categoriaor: Categoriaor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoriaorService: CategoriaorService,
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
        if (this.categoriaor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoriaorService.update(this.categoriaor));
        } else {
            this.subscribeToSaveResponse(
                this.categoriaorService.create(this.categoriaor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Categoriaor>) {
        result.subscribe((res: Categoriaor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Categoriaor) {
        this.eventManager.broadcast({ name: 'categoriaorListModification', content: 'OK'});
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
    selector: 'jhi-categoriaor-popup',
    template: ''
})
export class CategoriaorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaorPopupService: CategoriaorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriaorPopupService
                    .open(CategoriaorDialogComponent as Component, params['id']);
            } else {
                this.categoriaorPopupService
                    .open(CategoriaorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
