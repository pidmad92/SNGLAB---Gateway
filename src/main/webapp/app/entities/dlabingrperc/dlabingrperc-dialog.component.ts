import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Dlabingrperc } from './dlabingrperc.model';
import { DlabingrpercPopupService } from './dlabingrperc-popup.service';
import { DlabingrpercService } from './dlabingrperc.service';
import { Datlaboral, DatlaboralService } from '../datlaboral';
import { Docingreperc, DocingrepercService } from '../docingreperc';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dlabingrperc-dialog',
    templateUrl: './dlabingrperc-dialog.component.html'
})
export class DlabingrpercDialogComponent implements OnInit {

    dlabingrperc: Dlabingrperc;
    isSaving: boolean;

    datlaborals: Datlaboral[];

    docingrepercs: Docingreperc[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private dlabingrpercService: DlabingrpercService,
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
        if (this.dlabingrperc.id !== undefined) {
            this.subscribeToSaveResponse(
                this.dlabingrpercService.update(this.dlabingrperc));
        } else {
            this.subscribeToSaveResponse(
                this.dlabingrpercService.create(this.dlabingrperc));
        }
    }

    private subscribeToSaveResponse(result: Observable<Dlabingrperc>) {
        result.subscribe((res: Dlabingrperc) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Dlabingrperc) {
        this.eventManager.broadcast({ name: 'dlabingrpercListModification', content: 'OK'});
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
    selector: 'jhi-dlabingrperc-popup',
    template: ''
})
export class DlabingrpercPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dlabingrpercPopupService: DlabingrpercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.dlabingrpercPopupService
                    .open(DlabingrpercDialogComponent as Component, params['id']);
            } else {
                this.dlabingrpercPopupService
                    .open(DlabingrpercDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
