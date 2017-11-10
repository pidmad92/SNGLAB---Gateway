import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Modulo } from './modulo.model';
import { ModuloPopupService } from './modulo-popup.service';
import { ModuloService } from './modulo.service';
import { Aplicacion, AplicacionService } from '../aplicacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-modulo-dialog',
    templateUrl: './modulo-dialog.component.html'
})
export class ModuloDialogComponent implements OnInit {

    modulo: Modulo;
    isSaving: boolean;

    aplicacions: Aplicacion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private moduloService: ModuloService,
        private aplicacionService: AplicacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.aplicacionService.query()
            .subscribe((res: ResponseWrapper) => { this.aplicacions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.modulo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moduloService.update(this.modulo));
        } else {
            this.subscribeToSaveResponse(
                this.moduloService.create(this.modulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Modulo>) {
        result.subscribe((res: Modulo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Modulo) {
        this.eventManager.broadcast({ name: 'moduloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAplicacionById(index: number, item: Aplicacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-modulo-popup',
    template: ''
})
export class ModuloPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moduloPopupService: ModuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.moduloPopupService
                    .open(ModuloDialogComponent as Component, params['id']);
            } else {
                this.moduloPopupService
                    .open(ModuloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
