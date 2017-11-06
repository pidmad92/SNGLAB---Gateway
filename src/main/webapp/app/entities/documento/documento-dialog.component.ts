import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Documento } from './documento.model';
import { DocumentoPopupService } from './documento-popup.service';
import { DocumentoService } from './documento.service';
import { Tipdocumento, TipdocumentoService } from '../tipdocumento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-documento-dialog',
    templateUrl: './documento-dialog.component.html'
})
export class DocumentoDialogComponent implements OnInit {

    documento: Documento;
    isSaving: boolean;

    tipdocumentos: Tipdocumento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private documentoService: DocumentoService,
        private tipdocumentoService: TipdocumentoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipdocumentoService.query()
            .subscribe((res: ResponseWrapper) => { this.tipdocumentos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.documento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.documentoService.update(this.documento));
        } else {
            this.subscribeToSaveResponse(
                this.documentoService.create(this.documento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Documento>) {
        result.subscribe((res: Documento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Documento) {
        this.eventManager.broadcast({ name: 'documentoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipdocumentoById(index: number, item: Tipdocumento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-documento-popup',
    template: ''
})
export class DocumentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentoPopupService: DocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.documentoPopupService
                    .open(DocumentoDialogComponent as Component, params['id']);
            } else {
                this.documentoPopupService
                    .open(DocumentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
