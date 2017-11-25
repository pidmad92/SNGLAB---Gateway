import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Oridenu } from './oridenu.model';
import { OridenuPopupService } from './oridenu-popup.service';
import { OridenuService } from './oridenu.service';

@Component({
    selector: 'jhi-oridenu-delete-dialog',
    templateUrl: './oridenu-delete-dialog.component.html'
})
export class OridenuDeleteDialogComponent {

    oridenu: Oridenu;

    constructor(
        private oridenuService: OridenuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.oridenuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'oridenuListModification',
                content: 'Deleted an oridenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-oridenu-delete-popup',
    template: ''
})
export class OridenuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oridenuPopupService: OridenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.oridenuPopupService
                .open(OridenuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
