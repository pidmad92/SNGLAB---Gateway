import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Respinforma } from './respinforma.model';
import { RespinformaPopupService } from './respinforma-popup.service';
import { RespinformaService } from './respinforma.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-respinforma-dialog',
    templateUrl: './respinforma-dialog.component.html'
})
export class RespinformaDialogComponent implements OnInit {

    respinforma: Respinforma;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private respinformaService: RespinformaService,
        private formperfilService: FormperfilService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formperfilService.query()
            .subscribe((res: ResponseWrapper) => { this.formperfils = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.respinforma.id !== undefined) {
            this.subscribeToSaveResponse(
                this.respinformaService.update(this.respinforma));
        } else {
            this.subscribeToSaveResponse(
                this.respinformaService.create(this.respinforma));
        }
    }

    private subscribeToSaveResponse(result: Observable<Respinforma>) {
        result.subscribe((res: Respinforma) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Respinforma) {
        this.eventManager.broadcast({ name: 'respinformaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormperfilById(index: number, item: Formperfil) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-respinforma-popup',
    template: ''
})
export class RespinformaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private respinformaPopupService: RespinformaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.respinformaPopupService
                    .open(RespinformaDialogComponent as Component, params['id']);
            } else {
                this.respinformaPopupService
                    .open(RespinformaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
