import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Documento } from './documento.model';
import { DocumentoPopupService } from './documento-popup.service';
import { DocumentoService } from './documento.service';

@Component({
    selector: 'jhi-documento-delete-dialog',
    templateUrl: './documento-delete-dialog.component.html'
})
export class DocumentoDeleteDialogComponent {

    documento: Documento;

    constructor(
        private documentoService: DocumentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'documentoListModification',
                content: 'Deleted an documento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documento-delete-popup',
    template: ''
})
export class DocumentoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private documentoPopupService: DocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.documentoPopupService
                .open(DocumentoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
