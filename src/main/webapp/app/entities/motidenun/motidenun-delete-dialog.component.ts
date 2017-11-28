import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motidenun } from './motidenun.model';
import { MotidenunPopupService } from './motidenun-popup.service';
import { MotidenunService } from './motidenun.service';

@Component({
    selector: 'jhi-motidenun-delete-dialog',
    templateUrl: './motidenun-delete-dialog.component.html'
})
export class MotidenunDeleteDialogComponent {

    motidenun: Motidenun;

    constructor(
        private motidenunService: MotidenunService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motidenunService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motidenunListModification',
                content: 'Deleted an motidenun'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motidenun-delete-popup',
    template: ''
})
export class MotidenunDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motidenunPopupService: MotidenunPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motidenunPopupService
                .open(MotidenunDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
