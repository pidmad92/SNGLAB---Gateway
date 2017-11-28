import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docinperdlb } from './docinperdlb.model';
import { DocinperdlbPopupService } from './docinperdlb-popup.service';
import { DocinperdlbService } from './docinperdlb.service';
import { Datlab, DatlabService } from '../datlab';
import { Docingrper, DocingrperService } from '../docingrper';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docinperdlb-dialog',
    templateUrl: './docinperdlb-dialog.component.html'
})
export class DocinperdlbDialogComponent implements OnInit {

    docinperdlb: Docinperdlb;
    isSaving: boolean;

    datlabs: Datlab[];

    docingrpers: Docingrper[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docinperdlbService: DocinperdlbService,
        private datlabService: DatlabService,
        private docingrperService: DocingrperService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.datlabService.query()
            .subscribe((res: ResponseWrapper) => { this.datlabs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.docingrperService.query()
            .subscribe((res: ResponseWrapper) => { this.docingrpers = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.docinperdlb.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docinperdlbService.update(this.docinperdlb));
        } else {
            this.subscribeToSaveResponse(
                this.docinperdlbService.create(this.docinperdlb));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docinperdlb>) {
        result.subscribe((res: Docinperdlb) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docinperdlb) {
        this.eventManager.broadcast({ name: 'docinperdlbListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDatlabById(index: number, item: Datlab) {
        return item.id;
    }

    trackDocingrperById(index: number, item: Docingrper) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-docinperdlb-popup',
    template: ''
})
export class DocinperdlbPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docinperdlbPopupService: DocinperdlbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docinperdlbPopupService
                    .open(DocinperdlbDialogComponent as Component, params['id']);
            } else {
                this.docinperdlbPopupService
                    .open(DocinperdlbDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
