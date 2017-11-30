import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Legajoasig } from './legajoasig.model';
import { LegajoasigPopupService } from './legajoasig-popup.service';
import { LegajoasigService } from './legajoasig.service';
import { Abogado, AbogadoService } from '../abogado';
import { Legajo, LegajoService } from '../legajo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-legajoasig-dialog',
    templateUrl: './legajoasig-dialog.component.html'
})
export class LegajoasigDialogComponent implements OnInit {

    legajoasig: Legajoasig;
    isSaving: boolean;

    abogados: Abogado[];

    legajos: Legajo[];
    dFecasigDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private legajoasigService: LegajoasigService,
        private abogadoService: AbogadoService,
        private legajoService: LegajoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.abogadoService.query()
            .subscribe((res: ResponseWrapper) => { this.abogados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.legajoService.query()
            .subscribe((res: ResponseWrapper) => { this.legajos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.legajoasig.id !== undefined) {
            this.subscribeToSaveResponse(
                this.legajoasigService.update(this.legajoasig));
        } else {
            this.subscribeToSaveResponse(
                this.legajoasigService.create(this.legajoasig));
        }
    }

    private subscribeToSaveResponse(result: Observable<Legajoasig>) {
        result.subscribe((res: Legajoasig) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Legajoasig) {
        this.eventManager.broadcast({ name: 'legajoasigListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAbogadoById(index: number, item: Abogado) {
        return item.id;
    }

    trackLegajoById(index: number, item: Legajo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-legajoasig-popup',
    template: ''
})
export class LegajoasigPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legajoasigPopupService: LegajoasigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.legajoasigPopupService
                    .open(LegajoasigDialogComponent as Component, params['id']);
            } else {
                this.legajoasigPopupService
                    .open(LegajoasigDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
