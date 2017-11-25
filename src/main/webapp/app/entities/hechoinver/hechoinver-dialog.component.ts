import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hechoinver } from './hechoinver.model';
import { HechoinverPopupService } from './hechoinver-popup.service';
import { HechoinverService } from './hechoinver.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-hechoinver-dialog',
    templateUrl: './hechoinver-dialog.component.html'
})
export class HechoinverDialogComponent implements OnInit {

    hechoinver: Hechoinver;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hechoinverService: HechoinverService,
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
        if (this.hechoinver.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hechoinverService.update(this.hechoinver));
        } else {
            this.subscribeToSaveResponse(
                this.hechoinverService.create(this.hechoinver));
        }
    }

    private subscribeToSaveResponse(result: Observable<Hechoinver>) {
        result.subscribe((res: Hechoinver) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Hechoinver) {
        this.eventManager.broadcast({ name: 'hechoinverListModification', content: 'OK'});
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
    selector: 'jhi-hechoinver-popup',
    template: ''
})
export class HechoinverPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hechoinverPopupService: HechoinverPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hechoinverPopupService
                    .open(HechoinverDialogComponent as Component, params['id']);
            } else {
                this.hechoinverPopupService
                    .open(HechoinverDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
