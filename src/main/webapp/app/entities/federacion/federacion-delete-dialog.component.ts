import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Federacion } from './federacion.model';
import { FederacionPopupService } from './federacion-popup.service';
import { FederacionService } from './federacion.service';

@Component({
    selector: 'jhi-federacion-delete-dialog',
    templateUrl: './federacion-delete-dialog.component.html'
})
export class FederacionDeleteDialogComponent {

    federacion: Federacion;

    constructor(
        private federacionService: FederacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.federacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'federacionListModification',
                content: 'Deleted an federacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-federacion-delete-popup',
    template: ''
})
export class FederacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private federacionPopupService: FederacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.federacionPopupService
                .open(FederacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
