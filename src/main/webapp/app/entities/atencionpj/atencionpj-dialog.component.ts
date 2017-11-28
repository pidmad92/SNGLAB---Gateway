import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atencionpj } from './atencionpj.model';
import { AtencionpjPopupService } from './atencionpj-popup.service';
import { AtencionpjService } from './atencionpj.service';
import { Legajo, LegajoService } from '../legajo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atencionpj-dialog',
    templateUrl: './atencionpj-dialog.component.html'
})
export class AtencionpjDialogComponent implements OnInit {

    atencionpj: Atencionpj;
    isSaving: boolean;

    legajos: Legajo[];
    dFecatenDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atencionpjService: AtencionpjService,
        private legajoService: LegajoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.legajoService.query()
            .subscribe((res: ResponseWrapper) => { this.legajos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.atencionpj.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atencionpjService.update(this.atencionpj));
        } else {
            this.subscribeToSaveResponse(
                this.atencionpjService.create(this.atencionpj));
        }
    }

    private subscribeToSaveResponse(result: Observable<Atencionpj>) {
        result.subscribe((res: Atencionpj) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Atencionpj) {
        this.eventManager.broadcast({ name: 'atencionpjListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLegajoById(index: number, item: Legajo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-atencionpj-popup',
    template: ''
})
export class AtencionpjPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atencionpjPopupService: AtencionpjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atencionpjPopupService
                    .open(AtencionpjDialogComponent as Component, params['id']);
            } else {
                this.atencionpjPopupService
                    .open(AtencionpjDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
