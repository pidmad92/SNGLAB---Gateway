import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calbensoc } from './calbensoc.model';
import { CalbensocPopupService } from './calbensoc-popup.service';
import { CalbensocService } from './calbensoc.service';

@Component({
    selector: 'jhi-calbensoc-delete-dialog',
    templateUrl: './calbensoc-delete-dialog.component.html'
})
export class CalbensocDeleteDialogComponent {

    calbensoc: Calbensoc;

    constructor(
        private calbensocService: CalbensocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calbensocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calbensocListModification',
                content: 'Deleted an calbensoc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calbensoc-delete-popup',
    template: ''
})
export class CalbensocDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calbensocPopupService: CalbensocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calbensocPopupService
                .open(CalbensocDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
