import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Atendisca } from './atendisca.model';
import { AtendiscaPopupService } from './atendisca-popup.service';
import { AtendiscaService } from './atendisca.service';
import { Atencion, AtencionService } from '../atencion';
import { Discapacidad, DiscapacidadService } from '../discapacidad';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-atendisca-dialog',
    templateUrl: './atendisca-dialog.component.html'
})
export class AtendiscaDialogComponent implements OnInit {

    atendisca: Atendisca;
    isSaving: boolean;

    atencions: Atencion[];

    discapacidads: Discapacidad[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private atendiscaService: AtendiscaService,
        private atencionService: AtencionService,
        private discapacidadService: DiscapacidadService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atencionService.query()
            .subscribe((res: ResponseWrapper) => { this.atencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.discapacidadService.query()
            .subscribe((res: ResponseWrapper) => { this.discapacidads = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.atendisca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.atendiscaService.update(this.atendisca));
        } else {
            this.subscribeToSaveResponse(
                this.atendiscaService.create(this.atendisca));
        }
    }

    private subscribeToSaveResponse(result: Observable<Atendisca>) {
        result.subscribe((res: Atendisca) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Atendisca) {
        this.eventManager.broadcast({ name: 'atendiscaListModification', content: 'OK'});
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

    trackDiscapacidadById(index: number, item: Discapacidad) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-atendisca-popup',
    template: ''
})
export class AtendiscaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atendiscaPopupService: AtendiscaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.atendiscaPopupService
                    .open(AtendiscaDialogComponent as Component, params['id']);
            } else {
                this.atendiscaPopupService
                    .open(AtendiscaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
