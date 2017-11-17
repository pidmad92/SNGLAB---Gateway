import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docexpedien } from './docexpedien.model';
import { DocexpedienPopupService } from './docexpedien-popup.service';
import { DocexpedienService } from './docexpedien.service';

@Component({
    selector: 'jhi-docexpedien-delete-dialog',
    templateUrl: './docexpedien-delete-dialog.component.html'
})
export class DocexpedienDeleteDialogComponent {

    docexpedien: Docexpedien;

    constructor(
        private docexpedienService: DocexpedienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docexpedienService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docexpedienListModification',
                content: 'Deleted an docexpedien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docexpedien-delete-popup',
    template: ''
})
export class DocexpedienDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docexpedienPopupService: DocexpedienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docexpedienPopupService
                .open(DocexpedienDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
