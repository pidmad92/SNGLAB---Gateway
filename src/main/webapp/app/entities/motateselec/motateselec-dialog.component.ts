import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motateselec } from './motateselec.model';
import { MotateselecPopupService } from './motateselec-popup.service';
import { MotateselecService } from './motateselec.service';
import { Atencion, AtencionService } from '../atencion';
import { Direcalter, DirecalterService } from '../direcalter';
import { Motatenofic, MotatenoficService } from '../motatenofic';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motateselec-dialog',
    templateUrl: './motateselec-dialog.component.html'
})
export class MotateselecDialogComponent implements OnInit {

    motateselec: Motateselec;
    isSaving: boolean;

    atencions: Atencion[];

    direcalters: Direcalter[];

    motatenofics: Motatenofic[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motateselecService: MotateselecService,
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
        if (this.motateselec.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motateselecService.update(this.motateselec));
        } else {
            this.subscribeToSaveResponse(
                this.motateselecService.create(this.motateselec));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motateselec>) {
        result.subscribe((res: Motateselec) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motateselec) {
        this.eventManager.broadcast({ name: 'motateselecListModification', content: 'OK'});
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
    selector: 'jhi-motateselec-popup',
    template: ''
})
export class MotateselecPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motateselecPopupService: MotateselecPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motateselecPopupService
                    .open(MotateselecDialogComponent as Component, params['id']);
            } else {
                this.motateselecPopupService
                    .open(MotateselecDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
