import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Scargo } from './scargo.model';
import { ScargoPopupService } from './scargo-popup.service';
import { ScargoService } from './scargo.service';

@Component({
    selector: 'jhi-scargo-delete-dialog',
    templateUrl: './scargo-delete-dialog.component.html'
})
export class ScargoDeleteDialogComponent {

    scargo: Scargo;

    constructor(
        private scargoService: ScargoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scargoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scargoListModification',
                content: 'Deleted an scargo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scargo-delete-popup',
    template: ''
})
export class ScargoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scargoPopupService: ScargoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scargoPopupService
                .open(ScargoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
