import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Formperfil } from './formperfil.model';
import { FormperfilPopupService } from './formperfil-popup.service';
import { FormperfilService } from './formperfil.service';

@Component({
    selector: 'jhi-formperfil-dialog',
    templateUrl: './formperfil-dialog.component.html'
})
export class FormperfilDialogComponent implements OnInit {

    formperfil: Formperfil;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formperfilService: FormperfilService,
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
        if (this.formperfil.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formperfilService.update(this.formperfil));
        } else {
            this.subscribeToSaveResponse(
                this.formperfilService.create(this.formperfil));
        }
    }

    private subscribeToSaveResponse(result: Observable<Formperfil>) {
        result.subscribe((res: Formperfil) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Formperfil) {
        this.eventManager.broadcast({ name: 'formperfilListModification', content: 'OK'});
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
    selector: 'jhi-formperfil-popup',
    template: ''
})
export class FormperfilPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formperfilPopupService: FormperfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formperfilPopupService
                    .open(FormperfilDialogComponent as Component, params['id']);
            } else {
                this.formperfilPopupService
                    .open(FormperfilDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
