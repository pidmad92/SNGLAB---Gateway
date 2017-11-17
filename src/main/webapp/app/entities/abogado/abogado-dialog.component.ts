import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Abogado } from './abogado.model';
import { AbogadoPopupService } from './abogado-popup.service';
import { AbogadoService } from './abogado.service';
import { Oficina, OficinaService } from '../oficina';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-abogado-dialog',
    templateUrl: './abogado-dialog.component.html'
})
export class AbogadoDialogComponent implements OnInit {

    abogado: Abogado;
    isSaving: boolean;

    oficinas: Oficina[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private abogadoService: AbogadoService,
        private oficinaService: OficinaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.oficinaService.query()
            .subscribe((res: ResponseWrapper) => { this.oficinas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.abogado.id !== undefined) {
            this.subscribeToSaveResponse(
                this.abogadoService.update(this.abogado));
        } else {
            this.subscribeToSaveResponse(
                this.abogadoService.create(this.abogado));
        }
    }

    private subscribeToSaveResponse(result: Observable<Abogado>) {
        result.subscribe((res: Abogado) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Abogado) {
        this.eventManager.broadcast({ name: 'abogadoListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-abogado-popup',
    template: ''
})
export class AbogadoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private abogadoPopupService: AbogadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.abogadoPopupService
                    .open(AbogadoDialogComponent as Component, params['id']);
            } else {
                this.abogadoPopupService
                    .open(AbogadoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
