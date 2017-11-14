import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docpresenta } from './docpresenta.model';
import { DocpresentaPopupService } from './docpresenta-popup.service';
import { DocpresentaService } from './docpresenta.service';
import { Atencion, AtencionService } from '../atencion';
import { Documento, DocumentoService } from '../documento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docpresenta-dialog',
    templateUrl: './docpresenta-dialog.component.html'
})
export class DocpresentaDialogComponent implements OnInit {

    docpresenta: Docpresenta;
    isSaving: boolean;

    atencions: Atencion[];

    documentos: Documento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docpresentaService: DocpresentaService,
        private atencionService: AtencionService,
        private documentoService: DocumentoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.atencionService.query()
            .subscribe((res: ResponseWrapper) => { this.atencions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.documentoService.query()
            .subscribe((res: ResponseWrapper) => { this.documentos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.docpresenta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docpresentaService.update(this.docpresenta));
        } else {
            this.subscribeToSaveResponse(
                this.docpresentaService.create(this.docpresenta));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docpresenta>) {
        result.subscribe((res: Docpresenta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docpresenta) {
        this.eventManager.broadcast({ name: 'docpresentaListModification', content: 'OK'});
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

    trackDocumentoById(index: number, item: Documento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-docpresenta-popup',
    template: ''
})
export class DocpresentaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docpresentaPopupService: DocpresentaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docpresentaPopupService
                    .open(DocpresentaDialogComponent as Component, params['id']);
            } else {
                this.docpresentaPopupService
                    .open(DocpresentaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
