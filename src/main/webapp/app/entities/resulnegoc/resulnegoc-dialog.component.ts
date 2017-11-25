import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Resulnegoc } from './resulnegoc.model';
import { ResulnegocPopupService } from './resulnegoc-popup.service';
import { ResulnegocService } from './resulnegoc.service';
import { Formperfil, FormperfilService } from '../formperfil';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resulnegoc-dialog',
    templateUrl: './resulnegoc-dialog.component.html'
})
export class ResulnegocDialogComponent implements OnInit {

    resulnegoc: Resulnegoc;
    isSaving: boolean;

    formperfils: Formperfil[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private resulnegocService: ResulnegocService,
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
        if (this.resulnegoc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.resulnegocService.update(this.resulnegoc));
        } else {
            this.subscribeToSaveResponse(
                this.resulnegocService.create(this.resulnegoc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Resulnegoc>) {
        result.subscribe((res: Resulnegoc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Resulnegoc) {
        this.eventManager.broadcast({ name: 'resulnegocListModification', content: 'OK'});
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
    selector: 'jhi-resulnegoc-popup',
    template: ''
})
export class ResulnegocPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resulnegocPopupService: ResulnegocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.resulnegocPopupService
                    .open(ResulnegocDialogComponent as Component, params['id']);
            } else {
                this.resulnegocPopupService
                    .open(ResulnegocDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
