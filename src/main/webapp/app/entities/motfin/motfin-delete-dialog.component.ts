import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motfin } from './motfin.model';
import { MotfinPopupService } from './motfin-popup.service';
import { MotfinService } from './motfin.service';

@Component({
    selector: 'jhi-motfin-delete-dialog',
    templateUrl: './motfin-delete-dialog.component.html'
})
export class MotfinDeleteDialogComponent {

    motfin: Motfin;

    constructor(
        private motfinService: MotfinService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motfinService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motfinListModification',
                content: 'Deleted an motfin'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motfin-delete-popup',
    template: ''
})
export class MotfinDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motfinPopupService: MotfinPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motfinPopupService
                .open(MotfinDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
