import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Pasegl } from './pasegl.model';
import { PaseglPopupService } from './pasegl-popup.service';
import { PaseglService } from './pasegl.service';
import { Oficina, OficinaService } from '../oficina';
import { Atencion, AtencionService } from '../atencion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pasegl-dialog',
    templateUrl: './pasegl-dialog.component.html'
})
export class PaseglDialogComponent implements OnInit {

    pasegl: Pasegl;
    isSaving: boolean;

    oficinas: Oficina[];

    atencions: Atencion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private paseglService: PaseglService,
        private oficinaService: OficinaService,
        private atencionService: AtencionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.oficinaService.query()
            .subscribe((res: ResponseWrapper) => { this.oficinas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.atencionService
            .query({filter: 'pasegl-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.pasegl.atencion || !this.pasegl.atencion.id) {
                    this.atencions = res.json;
                } else {
                    this.atencionService
                        .find(this.pasegl.atencion.id)
                        .subscribe((subRes: Atencion) => {
                            this.atencions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pasegl.id !== undefined) {
            this.subscribeToSaveResponse(
                this.paseglService.update(this.pasegl));
        } else {
            this.subscribeToSaveResponse(
                this.paseglService.create(this.pasegl));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pasegl>) {
        result.subscribe((res: Pasegl) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Pasegl) {
        this.eventManager.broadcast({ name: 'paseglListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOficinaById(index: number, item: Oficina) {
        return item.id;
    }

    trackAtencionById(index: number, item: Atencion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pasegl-popup',
    template: ''
})
export class PaseglPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paseglPopupService: PaseglPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.paseglPopupService
                    .open(PaseglDialogComponent as Component, params['id']);
            } else {
                this.paseglPopupService
                    .open(PaseglDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
