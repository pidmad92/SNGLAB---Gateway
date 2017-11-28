import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Undnegocio } from './undnegocio.model';
import { UndnegocioPopupService } from './undnegocio-popup.service';
import { UndnegocioService } from './undnegocio.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-undnegocio-dialog',
    templateUrl: './undnegocio-dialog.component.html'
})
export class UndnegocioDialogComponent implements OnInit {

    undnegocio: Undnegocio;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private undnegocioService: UndnegocioService,
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
        if (this.undnegocio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.undnegocioService.update(this.undnegocio));
        } else {
            this.subscribeToSaveResponse(
                this.undnegocioService.create(this.undnegocio));
        }
    }

    private subscribeToSaveResponse(result: Observable<Undnegocio>) {
        result.subscribe((res: Undnegocio) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Undnegocio) {
        this.eventManager.broadcast({ name: 'undnegocioListModification', content: 'OK'});
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
    selector: 'jhi-undnegocio-popup',
    template: ''
})
export class UndnegocioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private undnegocioPopupService: UndnegocioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.undnegocioPopupService
                    .open(UndnegocioDialogComponent as Component, params['id']);
            } else {
                this.undnegocioPopupService
                    .open(UndnegocioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
