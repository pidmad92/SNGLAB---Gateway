import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docinperdlb } from './docinperdlb.model';
import { DocinperdlbPopupService } from './docinperdlb-popup.service';
import { DocinperdlbService } from './docinperdlb.service';

@Component({
    selector: 'jhi-docinperdlb-delete-dialog',
    templateUrl: './docinperdlb-delete-dialog.component.html'
})
export class DocinperdlbDeleteDialogComponent {

    docinperdlb: Docinperdlb;

    constructor(
        private docinperdlbService: DocinperdlbService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docinperdlbService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docinperdlbListModification',
                content: 'Deleted an docinperdlb'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docinperdlb-delete-popup',
    template: ''
})
export class DocinperdlbDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docinperdlbPopupService: DocinperdlbPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docinperdlbPopupService
                .open(DocinperdlbDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
