import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Denuncia } from './denuncia.model';
import { DenunciaPopupService } from './denuncia-popup.service';
import { DenunciaService } from './denuncia.service';
import { Perjuridica, PerjuridicaService } from '../perjuridica';
import { Denunte, DenunteService } from '../denunte';
import { Tipzona, TipzonaService } from '../tipzona';
import { Tipvia, TipviaService } from '../tipvia';
import { Motfin, MotfinService } from '../motfin';
import { Infosoli, InfosoliService } from '../infosoli';
import { Calidenu, CalidenuService } from '../calidenu';
import { Oridenu, OridenuService } from '../oridenu';
import { Datdenu, DatdenuService } from '../datdenu';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-denuncia-dialog',
    templateUrl: './denuncia-dialog.component.html'
})
export class DenunciaDialogComponent implements OnInit {

    denuncia: Denuncia;
    isSaving: boolean;

    perjuridicas: Perjuridica[];

    denuntes: Denunte[];

    tipzonas: Tipzona[];

    tipvias: Tipvia[];

    motfins: Motfin[];

    infosolis: Infosoli[];

    calidenus: Calidenu[];

    oridenus: Oridenu[];

    datdenus: Datdenu[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private denunciaService: DenunciaService,
        private perjuridicaService: PerjuridicaService,
        private denunteService: DenunteService,
        private tipzonaService: TipzonaService,
        private tipviaService: TipviaService,
        private motfinService: MotfinService,
        private infosoliService: InfosoliService,
        private calidenuService: CalidenuService,
        private oridenuService: OridenuService,
        private datdenuService: DatdenuService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.perjuridicaService.query()
            .subscribe((res: ResponseWrapper) => { this.perjuridicas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.denunteService.query()
            .subscribe((res: ResponseWrapper) => { this.denuntes = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipzonaService.query()
            .subscribe((res: ResponseWrapper) => { this.tipzonas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipviaService.query()
            .subscribe((res: ResponseWrapper) => { this.tipvias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.motfinService.query()
            .subscribe((res: ResponseWrapper) => { this.motfins = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.infosoliService.query()
            .subscribe((res: ResponseWrapper) => { this.infosolis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.calidenuService.query()
            .subscribe((res: ResponseWrapper) => { this.calidenus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.oridenuService.query()
            .subscribe((res: ResponseWrapper) => { this.oridenus = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.datdenuService
            .query({filter: 'denuncia-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.denuncia.datdenu || !this.denuncia.datdenu.id) {
                    this.datdenus = res.json;
                } else {
                    this.datdenuService
                        .find(this.denuncia.datdenu.id)
                        .subscribe((subRes: Datdenu) => {
                            this.datdenus = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.denuncia.id !== undefined) {
            this.subscribeToSaveResponse(
                this.denunciaService.update(this.denuncia));
        } else {
            this.subscribeToSaveResponse(
                this.denunciaService.create(this.denuncia));
        }
    }

    private subscribeToSaveResponse(result: Observable<Denuncia>) {
        result.subscribe((res: Denuncia) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Denuncia) {
        this.eventManager.broadcast({ name: 'denunciaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPerjuridicaById(index: number, item: Perjuridica) {
        return item.id;
    }

    trackDenunteById(index: number, item: Denunte) {
        return item.id;
    }

    trackTipzonaById(index: number, item: Tipzona) {
        return item.id;
    }

    trackTipviaById(index: number, item: Tipvia) {
        return item.id;
    }

    trackMotfinById(index: number, item: Motfin) {
        return item.id;
    }

    trackInfosoliById(index: number, item: Infosoli) {
        return item.id;
    }

    trackCalidenuById(index: number, item: Calidenu) {
        return item.id;
    }

    trackOridenuById(index: number, item: Oridenu) {
        return item.id;
    }

    trackDatdenuById(index: number, item: Datdenu) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-denuncia-popup',
    template: ''
})
export class DenunciaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denunciaPopupService: DenunciaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.denunciaPopupService
                    .open(DenunciaDialogComponent as Component, params['id']);
            } else {
                this.denunciaPopupService
                    .open(DenunciaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
