import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dirpernat } from './dirpernat.model';
import { DirpernatPopupService } from './dirpernat-popup.service';
import { DirpernatService } from './dirpernat.service';
import { Pernatural, PernaturalService } from '../pernatural';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dirpernat-dialog',
    templateUrl: './dirpernat-dialog.component.html'
})
export class DirpernatDialogComponent implements OnInit {

    dirpernat: Dirpernat;
    isSaving: boolean;

    pernaturals: Pernatural[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dirpernatService: DirpernatService,
        private pernaturalService: PernaturalService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pernaturalService.query()
            .subscribe((res: ResponseWrapper) => { this.pernaturals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dirpernat.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dirpernatService.update(this.dirpernat));
        } else {
            this.subscribeToSaveResponse(
                this.dirpernatService.create(this.dirpernat));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dirpernat>) {
        result.subscribe((res: Dirpernat) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dirpernat) {
        this.eventManager.broadcast({ name: 'dirpernatListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPernaturalById(index: number, item: Pernatural) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dirpernat-popup',
    template: ''
})
export class DirpernatPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirpernatPopupService: DirpernatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dirpernatPopupService
                    .open(DirpernatDialogComponent as Component, params['id']);
            } else {
                this.dirpernatPopupService
                    .open(DirpernatDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
