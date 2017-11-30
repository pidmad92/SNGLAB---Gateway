import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Juntadirect } from './juntadirect.model';
import { JuntadirectPopupService } from './juntadirect-popup.service';
import { JuntadirectService } from './juntadirect.service';
import { Organizacio, OrganizacioService } from '../organizacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-juntadirect-dialog',
    templateUrl: './juntadirect-dialog.component.html'
})
export class JuntadirectDialogComponent implements OnInit {

    juntadirect: Juntadirect;
    isSaving: boolean;

    organizacios: Organizacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private juntadirectService: JuntadirectService,
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
        if (this.juntadirect.id !== undefined) {
            this.subscribeToSaveResponse(
                this.juntadirectService.update(this.juntadirect));
        } else {
            this.subscribeToSaveResponse(
                this.juntadirectService.create(this.juntadirect));
        }
    }

    private subscribeToSaveResponse(result: Observable<Juntadirect>) {
        result.subscribe((res: Juntadirect) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Juntadirect) {
        this.eventManager.broadcast({ name: 'juntadirectListModification', content: 'OK'});
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
    selector: 'jhi-juntadirect-popup',
    template: ''
})
export class JuntadirectPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private juntadirectPopupService: JuntadirectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.juntadirectPopupService
                    .open(JuntadirectDialogComponent as Component, params['id']);
            } else {
                this.juntadirectPopupService
                    .open(JuntadirectDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
