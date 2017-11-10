import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dlabingperc } from './dlabingperc.model';
import { DlabingpercPopupService } from './dlabingperc-popup.service';
import { DlabingpercService } from './dlabingperc.service';
import { Datlaboral, DatlaboralService } from '../datlaboral';
import { Docingreperc, DocingrepercService } from '../docingreperc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dlabingperc-dialog',
    templateUrl: './dlabingperc-dialog.component.html'
})
export class DlabingpercDialogComponent implements OnInit {

    dlabingperc: Dlabingperc;
    isSaving: boolean;

    datlaborals: Datlaboral[];

    docingrepercs: Docingreperc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dlabingpercService: DlabingpercService,
        private datlaboralService: DatlaboralService,
        private docingrepercService: DocingrepercService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.datlaboralService.query()
            .subscribe((res: ResponseWrapper) => { this.datlaborals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.docingrepercService.query()
            .subscribe((res: ResponseWrapper) => { this.docingrepercs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.dlabingperc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dlabingpercService.update(this.dlabingperc));
        } else {
            this.subscribeToSaveResponse(
                this.dlabingpercService.create(this.dlabingperc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dlabingperc>) {
        result.subscribe((res: Dlabingperc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dlabingperc) {
        this.eventManager.broadcast({ name: 'dlabingpercListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDatlaboralById(index: number, item: Datlaboral) {
        return item.id;
    }

    trackDocingrepercById(index: number, item: Docingreperc) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-dlabingperc-popup',
    template: ''
})
export class DlabingpercPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dlabingpercPopupService: DlabingpercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dlabingpercPopupService
                    .open(DlabingpercDialogComponent as Component, params['id']);
            } else {
                this.dlabingpercPopupService
                    .open(DlabingpercDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
