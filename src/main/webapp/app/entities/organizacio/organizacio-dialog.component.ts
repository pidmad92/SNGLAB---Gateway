import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Organizacio } from './organizacio.model';
import { OrganizacioPopupService } from './organizacio-popup.service';
import { OrganizacioService } from './organizacio.service';
import { Srubro, SrubroService } from '../srubro';
import { Tipoorganiz, TipoorganizService } from '../tipoorganiz';
import { Nivelorgani, NivelorganiService } from '../nivelorgani';
import { Ambitoorgan, AmbitoorganService } from '../ambitoorgan';
import { Categoria, CategoriaService } from '../categoria';
import { Categoriaor, CategoriaorService } from '../categoriaor';
import { Region, RegionService } from '../region';
import { Szonal, SzonalService } from '../szonal';
import { Calificacio, CalificacioService } from '../calificacio';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-organizacio-dialog',
    templateUrl: './organizacio-dialog.component.html'
})
export class OrganizacioDialogComponent implements OnInit {

    organizacio: Organizacio;
    isSaving: boolean;

    srubros: Srubro[];

    tipoorganizs: Tipoorganiz[];

    nivelorganis: Nivelorgani[];

    ambitoorgans: Ambitoorgan[];

    categorias: Categoria[];

    categoriaors: Categoriaor[];

    regions: Region[];

    szonals: Szonal[];

    calificacios: Calificacio[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private organizacioService: OrganizacioService,
        private srubroService: SrubroService,
        private tipoorganizService: TipoorganizService,
        private nivelorganiService: NivelorganiService,
        private ambitoorganService: AmbitoorganService,
        private categoriaService: CategoriaService,
        private categoriaorService: CategoriaorService,
        private regionService: RegionService,
        private szonalService: SzonalService,
        private calificacioService: CalificacioService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.srubroService.query()
            .subscribe((res: ResponseWrapper) => { this.srubros = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoorganizService.query()
            .subscribe((res: ResponseWrapper) => { this.tipoorganizs = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.nivelorganiService.query()
            .subscribe((res: ResponseWrapper) => { this.nivelorganis = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.ambitoorganService.query()
            .subscribe((res: ResponseWrapper) => { this.ambitoorgans = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoriaService.query()
            .subscribe((res: ResponseWrapper) => { this.categorias = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.categoriaorService.query()
            .subscribe((res: ResponseWrapper) => { this.categoriaors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.regionService.query()
            .subscribe((res: ResponseWrapper) => { this.regions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.szonalService.query()
            .subscribe((res: ResponseWrapper) => { this.szonals = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.calificacioService.query()
            .subscribe((res: ResponseWrapper) => { this.calificacios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.organizacio.id !== undefined) {
            this.subscribeToSaveResponse(
                this.organizacioService.update(this.organizacio));
        } else {
            this.subscribeToSaveResponse(
                this.organizacioService.create(this.organizacio));
        }
    }

    private subscribeToSaveResponse(result: Observable<Organizacio>) {
        result.subscribe((res: Organizacio) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Organizacio) {
        this.eventManager.broadcast({ name: 'organizacioListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSrubroById(index: number, item: Srubro) {
        return item.id;
    }

    trackTipoorganizById(index: number, item: Tipoorganiz) {
        return item.id;
    }

    trackNivelorganiById(index: number, item: Nivelorgani) {
        return item.id;
    }

    trackAmbitoorganById(index: number, item: Ambitoorgan) {
        return item.id;
    }

    trackCategoriaById(index: number, item: Categoria) {
        return item.id;
    }

    trackCategoriaorById(index: number, item: Categoriaor) {
        return item.id;
    }

    trackRegionById(index: number, item: Region) {
        return item.id;
    }

    trackSzonalById(index: number, item: Szonal) {
        return item.id;
    }

    trackCalificacioById(index: number, item: Calificacio) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-organizacio-popup',
    template: ''
})
export class OrganizacioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizacioPopupService: OrganizacioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.organizacioPopupService
                    .open(OrganizacioDialogComponent as Component, params['id']);
            } else {
                this.organizacioPopupService
                    .open(OrganizacioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
