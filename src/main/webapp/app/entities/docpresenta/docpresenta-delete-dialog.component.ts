import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresenta } from './docpresenta.model';
import { DocpresentaPopupService } from './docpresenta-popup.service';
import { DocpresentaService } from './docpresenta.service';

@Component({
    selector: 'jhi-docpresenta-delete-dialog',
    templateUrl: './docpresenta-delete-dialog.component.html'
})
export class DocpresentaDeleteDialogComponent {

    docpresenta: Docpresenta;

    constructor(
        private docpresentaService: DocpresentaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docpresentaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docpresentaListModification',
                content: 'Deleted an docpresenta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docpresenta-delete-popup',
    template: ''
})
export class DocpresentaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docpresentaPopupService: DocpresentaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docpresentaPopupService
                .open(DocpresentaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
