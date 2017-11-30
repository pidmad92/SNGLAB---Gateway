import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Falsoexp } from './falsoexp.model';
import { FalsoexpPopupService } from './falsoexp-popup.service';
import { FalsoexpService } from './falsoexp.service';

@Component({
    selector: 'jhi-falsoexp-delete-dialog',
    templateUrl: './falsoexp-delete-dialog.component.html'
})
export class FalsoexpDeleteDialogComponent {

    falsoexp: Falsoexp;

    constructor(
        private falsoexpService: FalsoexpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.falsoexpService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'falsoexpListModification',
                content: 'Deleted an falsoexp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-falsoexp-delete-popup',
    template: ''
})
export class FalsoexpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private falsoexpPopupService: FalsoexpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.falsoexpPopupService
                .open(FalsoexpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
