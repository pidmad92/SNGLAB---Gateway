import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atenmotiaten } from './atenmotiaten.model';
import { AtenmotiatenPopupService } from './atenmotiaten-popup.service';
import { AtenmotiatenService } from './atenmotiaten.service';
import { Atencion, AtencionService } from '../atencion';
import { Direcalter, DirecalterService } from '../direcalter';
import { Motatenofic, MotatenoficService } from '../motatenofic';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atenmotiaten-dialog',
    templateUrl: './atenmotiaten-dialog.component.html'
})
export class AtenmotiatenDialogComponent implements OnInit {

    atenmotiaten: Atenmotiaten;
    isSaving: boolean;

    atencions: Atencion[];

    direcalters: Direcalter[];

    motatenofics: Motatenofic[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atenmotiatenService: AtenmotiatenService,
        private atencionService: AtencionService,
        private direcalterService: DirecalterService,
        private motatenoficService: MotatenoficService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atencionService.query()
            .subscribe((res: ResponseWrapper) => { this.atencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.direcalterService.query()
            .subscribe((res: ResponseWrapper) => { this.direcalters = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motatenoficService.query()
            .subscribe((res: ResponseWrapper) => { this.motatenofics = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.atenmotiaten.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atenmotiatenService.update(this.atenmotiaten));
        } else {
            this.subscribeToSaveResponse(
                this.atenmotiatenService.create(this.atenmotiaten));
        }
    }

    private subscribeToSaveResponse(result: Observable<Atenmotiaten>) {
        result.subscribe((res: Atenmotiaten) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Atenmotiaten) {
        this.eventManager.broadcast({ name: 'atenmotiatenListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAtencionById(index: number, item: Atencion) {
        return item.id;
    }

    trackDirecalterById(index: number, item: Direcalter) {
        return item.id;
    }

    trackMotatenoficById(index: number, item: Motatenofic) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-atenmotiaten-popup',
    template: ''
})
export class AtenmotiatenPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atenmotiatenPopupService: AtenmotiatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atenmotiatenPopupService
                    .open(AtenmotiatenDialogComponent as Component, params['id']);
            } else {
                this.atenmotiatenPopupService
                    .open(AtenmotiatenDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
