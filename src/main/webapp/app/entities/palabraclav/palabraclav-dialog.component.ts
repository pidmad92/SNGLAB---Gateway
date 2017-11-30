import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Palabraclav } from './palabraclav.model';
import { PalabraclavPopupService } from './palabraclav-popup.service';
import { PalabraclavService } from './palabraclav.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-palabraclav-dialog',
    templateUrl: './palabraclav-dialog.component.html'
})
export class PalabraclavDialogComponent implements OnInit {

    palabraclav: Palabraclav;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private palabraclavService: PalabraclavService,
        private organizacioService: OrganizacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.organizacioService.query()
            .subscribe((res: ResponseWrapper) => { this.organizacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.palabraclav.id !== undefined) {
            this.subscribeToSaveResponse(
                this.palabraclavService.update(this.palabraclav));
        } else {
            this.subscribeToSaveResponse(
                this.palabraclavService.create(this.palabraclav));
        }
    }

    private subscribeToSaveResponse(result: Observable<Palabraclav>) {
        result.subscribe((res: Palabraclav) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Palabraclav) {
        this.eventManager.broadcast({ name: 'palabraclavListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOrganizacioById(index: number, item: Organizacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-palabraclav-popup',
    template: ''
})
export class PalabraclavPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private palabraclavPopupService: PalabraclavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.palabraclavPopupService
                    .open(PalabraclavDialogComponent as Component, params['id']);
            } else {
                this.palabraclavPopupService
                    .open(PalabraclavDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
