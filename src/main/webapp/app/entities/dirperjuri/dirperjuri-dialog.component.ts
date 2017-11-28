import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dirperjuri } from './dirperjuri.model';
import { DirperjuriPopupService } from './dirperjuri-popup.service';
import { DirperjuriService } from './dirperjuri.service';
import { Perjuridica, PerjuridicaService } from '../perjuridica';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dirperjuri-dialog',
    templateUrl: './dirperjuri-dialog.component.html'
})
export class DirperjuriDialogComponent implements OnInit {

    dirperjuri: Dirperjuri;
    isSaving: boolean;

    perjuridicas: Perjuridica[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dirperjuriService: DirperjuriService,
        private perjuridicaService: PerjuridicaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perjuridicaService.query()
            .subscribe((res: ResponseWrapper) => { this.perjuridicas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dirperjuri.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dirperjuriService.update(this.dirperjuri));
        } else {
            this.subscribeToSaveResponse(
                this.dirperjuriService.create(this.dirperjuri));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dirperjuri>) {
        result.subscribe((res: Dirperjuri) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirperjuri) {
        this.eventManager.broadcast({ name: 'dirperjuriListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerjuridicaById(index: number, item: Perjuridica) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dirperjuri-popup',
    template: ''
})
export class DirperjuriPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirperjuriPopupService: DirperjuriPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dirperjuriPopupService
                    .open(DirperjuriDialogComponent as Component, params['id']);
            } else {
                this.dirperjuriPopupService
                    .open(DirperjuriDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
