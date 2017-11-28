import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Multaconci } from './multaconci.model';
import { MultaconciPopupService } from './multaconci-popup.service';
import { MultaconciService } from './multaconci.service';

@Component({
    selector: 'jhi-multaconci-delete-dialog',
    templateUrl: './multaconci-delete-dialog.component.html'
})
export class MultaconciDeleteDialogComponent {

    multaconci: Multaconci;

    constructor(
        private multaconciService: MultaconciService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.multaconciService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'multaconciListModification',
                content: 'Deleted an multaconci'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-multaconci-delete-popup',
    template: ''
})
export class MultaconciDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multaconciPopupService: MultaconciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.multaconciPopupService
                .open(MultaconciDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
