import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Docpresate } from './docpresate.model';
import { DocpresatePopupService } from './docpresate-popup.service';
import { DocpresateService } from './docpresate.service';
import { Atencion, AtencionService } from '../atencion';
import { Documento, DocumentoService } from '../documento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docpresate-dialog',
    templateUrl: './docpresate-dialog.component.html'
})
export class DocpresateDialogComponent implements OnInit {

    docpresate: Docpresate;
    isSaving: boolean;

    atencions: Atencion[];

    documentos: Documento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private docpresateService: DocpresateService,
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
        if (this.docpresate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.docpresateService.update(this.docpresate));
        } else {
            this.subscribeToSaveResponse(
                this.docpresateService.create(this.docpresate));
        }
    }

    private subscribeToSaveResponse(result: Observable<Docpresate>) {
        result.subscribe((res: Docpresate) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Docpresate) {
        this.eventManager.broadcast({ name: 'docpresateListModification', content: 'OK'});
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
    selector: 'jhi-docpresate-popup',
    template: ''
})
export class DocpresatePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docpresatePopupService: DocpresatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.docpresatePopupService
                    .open(DocpresateDialogComponent as Component, params['id']);
            } else {
                this.docpresatePopupService
                    .open(DocpresateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
