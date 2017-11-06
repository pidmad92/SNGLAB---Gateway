import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pasemotiaten } from './pasemotiaten.model';
import { PasemotiatenPopupService } from './pasemotiaten-popup.service';
import { PasemotiatenService } from './pasemotiaten.service';

@Component({
    selector: 'jhi-pasemotiaten-delete-dialog',
    templateUrl: './pasemotiaten-delete-dialog.component.html'
})
export class PasemotiatenDeleteDialogComponent {

    pasemotiaten: Pasemotiaten;

    constructor(
        private pasemotiatenService: PasemotiatenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pasemotiatenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pasemotiatenListModification',
                content: 'Deleted an pasemotiaten'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pasemotiaten-delete-popup',
    template: ''
})
export class PasemotiatenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasemotiatenPopupService: PasemotiatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pasemotiatenPopupService
                .open(PasemotiatenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
