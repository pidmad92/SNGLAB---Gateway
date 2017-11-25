import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Solicform } from './solicform.model';
import { SolicformPopupService } from './solicform-popup.service';
import { SolicformService } from './solicform.service';
import { Formarchivo, FormarchivoService } from '../formarchivo';
import { Formfinanc, FormfinancService } from '../formfinanc';
import { Formperfil, FormperfilService } from '../formperfil';
import { Solicitud, SolicitudService } from '../solicitud';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-solicform-dialog',
    templateUrl: './solicform-dialog.component.html'
})
export class SolicformDialogComponent implements OnInit {

    solicform: Solicform;
    isSaving: boolean;

    formarchivos: Formarchivo[];

    formfinancs: Formfinanc[];

    formperfils: Formperfil[];

    solicituds: Solicitud[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private solicformService: SolicformService,
        private formarchivoService: FormarchivoService,
        private formfinancService: FormfinancService,
        private formperfilService: FormperfilService,
        private solicitudService: SolicitudService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formarchivoService.query()
            .subscribe((res: ResponseWrapper) => { this.formarchivos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.formfinancService.query()
            .subscribe((res: ResponseWrapper) => { this.formfinancs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.formperfilService
            .query({filter: 'solicform-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.solicform.formPerfil || !this.solicform.formPerfil.id) {
                    this.formperfils = res.json;
                } else {
                    this.formperfilService
                        .find(this.solicform.formPerfil.id)
                        .subscribe((subRes: Formperfil) => {
                            this.formperfils = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.solicitudService.query()
            .subscribe((res: ResponseWrapper) => { this.solicituds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.solicform.id !== undefined) {
            this.subscribeToSaveResponse(
                this.solicformService.update(this.solicform));
        } else {
            this.subscribeToSaveResponse(
                this.solicformService.create(this.solicform));
        }
    }

    private subscribeToSaveResponse(result: Observable<Solicform>) {
        result.subscribe((res: Solicform) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Solicform) {
        this.eventManager.broadcast({ name: 'solicformListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormarchivoById(index: number, item: Formarchivo) {
        return item.id;
    }

    trackFormfinancById(index: number, item: Formfinanc) {
        return item.id;
    }

    trackFormperfilById(index: number, item: Formperfil) {
        return item.id;
    }

    trackSolicitudById(index: number, item: Solicitud) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-solicform-popup',
    template: ''
})
export class SolicformPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicformPopupService: SolicformPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.solicformPopupService
                    .open(SolicformDialogComponent as Component, params['id']);
            } else {
                this.solicformPopupService
                    .open(SolicformDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
