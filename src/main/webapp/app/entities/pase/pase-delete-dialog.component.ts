import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pase } from './pase.model';
import { PasePopupService } from './pase-popup.service';
import { PaseService } from './pase.service';

@Component({
    selector: 'jhi-pase-delete-dialog',
    templateUrl: './pase-delete-dialog.component.html'
})
export class PaseDeleteDialogComponent {

    pase: Pase;

    constructor(
        private paseService: PaseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paseListModification',
                content: 'Deleted an pase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pase-delete-popup',
    template: ''
})
export class PaseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasePopupService: PasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pasePopupService
                .open(PaseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
