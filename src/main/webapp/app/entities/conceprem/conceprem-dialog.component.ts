import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Conceprem } from './conceprem.model';
import { ConcepremPopupService } from './conceprem-popup.service';
import { ConcepremService } from './conceprem.service';
import { Calrcmperi, CalrcmperiService } from '../calrcmperi';
import { Tipcalconre, TipcalconreService } from '../tipcalconre';
import { Tipconrem, TipconremService } from '../tipconrem';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-conceprem-dialog',
    templateUrl: './conceprem-dialog.component.html'
})
export class ConcepremDialogComponent implements OnInit {

    conceprem: Conceprem;
    isSaving: boolean;

    calrcmperis: Calrcmperi[];

    conceprems: Conceprem[];

    tipcalconres: Tipcalconre[];

    tipconrems: Tipconrem[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private concepremService: ConcepremService,
        private calrcmperiService: CalrcmperiService,
        private tipcalconreService: TipcalconreService,
        private tipconremService: TipconremService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.calrcmperiService.query()
            .subscribe((res: ResponseWrapper) => { this.calrcmperis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.concepremService.query()
            .subscribe((res: ResponseWrapper) => { this.conceprems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipcalconreService.query()
            .subscribe((res: ResponseWrapper) => { this.tipcalconres = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipconremService.query()
            .subscribe((res: ResponseWrapper) => { this.tipconrems = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.conceprem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.concepremService.update(this.conceprem));
        } else {
            this.subscribeToSaveResponse(
                this.concepremService.create(this.conceprem));
        }
    }

    private subscribeToSaveResponse(result: Observable<Conceprem>) {
        result.subscribe((res: Conceprem) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Conceprem) {
        this.eventManager.broadcast({ name: 'concepremListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCalrcmperiById(index: number, item: Calrcmperi) {
        return item.id;
    }

    trackConcepremById(index: number, item: Conceprem) {
        return item.id;
    }

    trackTipcalconreById(index: number, item: Tipcalconre) {
        return item.id;
    }

    trackTipconremById(index: number, item: Tipconrem) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-conceprem-popup',
    template: ''
})
export class ConcepremPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private concepremPopupService: ConcepremPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.concepremPopupService
                    .open(ConcepremDialogComponent as Component, params['id']);
            } else {
                this.concepremPopupService
                    .open(ConcepremDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
