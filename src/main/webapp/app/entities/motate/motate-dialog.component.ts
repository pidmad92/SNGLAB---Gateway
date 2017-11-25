import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motate } from './motate.model';
import { MotatePopupService } from './motate-popup.service';
import { MotateService } from './motate.service';
import { Tipmotaten, TipmotatenService } from '../tipmotaten';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motate-dialog',
    templateUrl: './motate-dialog.component.html'
})
export class MotateDialogComponent implements OnInit {

    motate: Motate;
    isSaving: boolean;

    tipmotatens: Tipmotaten[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motateService: MotateService,
        private tipmotatenService: TipmotatenService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipmotatenService.query()
            .subscribe((res: ResponseWrapper) => { this.tipmotatens = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.motate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motateService.update(this.motate));
        } else {
            this.subscribeToSaveResponse(
                this.motateService.create(this.motate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motate>) {
        result.subscribe((res: Motate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motate) {
        this.eventManager.broadcast({ name: 'motateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipmotatenById(index: number, item: Tipmotaten) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-motate-popup',
    template: ''
})
export class MotatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motatePopupService: MotatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motatePopupService
                    .open(MotateDialogComponent as Component, params['id']);
            } else {
                this.motatePopupService
                    .open(MotateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
