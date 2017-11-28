import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docpresate } from './docpresate.model';
import { DocpresatePopupService } from './docpresate-popup.service';
import { DocpresateService } from './docpresate.service';

@Component({
    selector: 'jhi-docpresate-delete-dialog',
    templateUrl: './docpresate-delete-dialog.component.html'
})
export class DocpresateDeleteDialogComponent {

    docpresate: Docpresate;

    constructor(
        private docpresateService: DocpresateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docpresateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docpresateListModification',
                content: 'Deleted an docpresate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docpresate-delete-popup',
    template: ''
})
export class DocpresateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docpresatePopupService: DocpresatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docpresatePopupService
                .open(DocpresateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
