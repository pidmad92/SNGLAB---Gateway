import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bensocial } from './bensocial.model';
import { BensocialPopupService } from './bensocial-popup.service';
import { BensocialService } from './bensocial.service';

@Component({
    selector: 'jhi-bensocial-delete-dialog',
    templateUrl: './bensocial-delete-dialog.component.html'
})
export class BensocialDeleteDialogComponent {

    bensocial: Bensocial;

    constructor(
        private bensocialService: BensocialService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bensocialService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bensocialListModification',
                content: 'Deleted an bensocial'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bensocial-delete-popup',
    template: ''
})
export class BensocialDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bensocialPopupService: BensocialPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bensocialPopupService
                .open(BensocialDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
