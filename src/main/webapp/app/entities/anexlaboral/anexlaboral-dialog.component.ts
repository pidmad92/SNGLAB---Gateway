import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Anexlaboral } from './anexlaboral.model';
import { AnexlaboralPopupService } from './anexlaboral-popup.service';
import { AnexlaboralService } from './anexlaboral.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-anexlaboral-dialog',
    templateUrl: './anexlaboral-dialog.component.html'
})
export class AnexlaboralDialogComponent implements OnInit {

    anexlaboral: Anexlaboral;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private anexlaboralService: AnexlaboralService,
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
        if (this.anexlaboral.id !== undefined) {
            this.subscribeToSaveResponse(
                this.anexlaboralService.update(this.anexlaboral));
        } else {
            this.subscribeToSaveResponse(
                this.anexlaboralService.create(this.anexlaboral));
        }
    }

    private subscribeToSaveResponse(result: Observable<Anexlaboral>) {
        result.subscribe((res: Anexlaboral) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Anexlaboral) {
        this.eventManager.broadcast({ name: 'anexlaboralListModification', content: 'OK'});
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
    selector: 'jhi-anexlaboral-popup',
    template: ''
})
export class AnexlaboralPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anexlaboralPopupService: AnexlaboralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.anexlaboralPopupService
                    .open(AnexlaboralDialogComponent as Component, params['id']);
            } else {
                this.anexlaboralPopupService
                    .open(AnexlaboralDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
