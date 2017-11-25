import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Accadoate } from './accadoate.model';
import { AccadoatePopupService } from './accadoate-popup.service';
import { AccadoateService } from './accadoate.service';

@Component({
    selector: 'jhi-accadoate-delete-dialog',
    templateUrl: './accadoate-delete-dialog.component.html'
})
export class AccadoateDeleteDialogComponent {

    accadoate: Accadoate;

    constructor(
        private accadoateService: AccadoateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.accadoateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'accadoateListModification',
                content: 'Deleted an accadoate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-accadoate-delete-popup',
    template: ''
})
export class AccadoateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private accadoatePopupService: AccadoatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.accadoatePopupService
                .open(AccadoateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
