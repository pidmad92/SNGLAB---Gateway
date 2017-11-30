import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tipolibro } from './tipolibro.model';
import { TipolibroPopupService } from './tipolibro-popup.service';
import { TipolibroService } from './tipolibro.service';

@Component({
    selector: 'jhi-tipolibro-dialog',
    templateUrl: './tipolibro-dialog.component.html'
})
export class TipolibroDialogComponent implements OnInit {

    tipolibro: Tipolibro;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipolibroService: TipolibroService,
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
        if (this.tipolibro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipolibroService.update(this.tipolibro));
        } else {
            this.subscribeToSaveResponse(
                this.tipolibroService.create(this.tipolibro));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tipolibro>) {
        result.subscribe((res: Tipolibro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tipolibro) {
        this.eventManager.broadcast({ name: 'tipolibroListModification', content: 'OK'});
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
    selector: 'jhi-tipolibro-popup',
    template: ''
})
export class TipolibroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipolibroPopupService: TipolibroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipolibroPopupService
                    .open(TipolibroDialogComponent as Component, params['id']);
            } else {
                this.tipolibroPopupService
                    .open(TipolibroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
