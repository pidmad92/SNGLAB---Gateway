import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Participa } from './participa.model';
import { ParticipaPopupService } from './participa-popup.service';
import { ParticipaService } from './participa.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-participa-dialog',
    templateUrl: './participa-dialog.component.html'
})
export class ParticipaDialogComponent implements OnInit {

    participa: Participa;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private participaService: ParticipaService,
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
        if (this.participa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.participaService.update(this.participa));
        } else {
            this.subscribeToSaveResponse(
                this.participaService.create(this.participa));
        }
    }

    private subscribeToSaveResponse(result: Observable<Participa>) {
        result.subscribe((res: Participa) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Participa) {
        this.eventManager.broadcast({ name: 'participaListModification', content: 'OK'});
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
    selector: 'jhi-participa-popup',
    template: ''
})
export class ParticipaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private participaPopupService: ParticipaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.participaPopupService
                    .open(ParticipaDialogComponent as Component, params['id']);
            } else {
                this.participaPopupService
                    .open(ParticipaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
