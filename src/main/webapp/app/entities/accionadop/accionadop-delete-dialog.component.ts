import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Accionadop } from './accionadop.model';
import { AccionadopPopupService } from './accionadop-popup.service';
import { AccionadopService } from './accionadop.service';

@Component({
    selector: 'jhi-accionadop-delete-dialog',
    templateUrl: './accionadop-delete-dialog.component.html'
})
export class AccionadopDeleteDialogComponent {

    accionadop: Accionadop;

    constructor(
        private accionadopService: AccionadopService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accionadopService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accionadopListModification',
                content: 'Deleted an accionadop'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accionadop-delete-popup',
    template: ''
})
export class AccionadopDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accionadopPopupService: AccionadopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accionadopPopupService
                .open(AccionadopDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
