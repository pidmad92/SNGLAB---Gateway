import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Regimenlabo } from './regimenlabo.model';
import { RegimenlaboPopupService } from './regimenlabo-popup.service';
import { RegimenlaboService } from './regimenlabo.service';

@Component({
    selector: 'jhi-regimenlabo-delete-dialog',
    templateUrl: './regimenlabo-delete-dialog.component.html'
})
export class RegimenlaboDeleteDialogComponent {

    regimenlabo: Regimenlabo;

    constructor(
        private regimenlaboService: RegimenlaboService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regimenlaboService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regimenlaboListModification',
                content: 'Deleted an regimenlabo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-regimenlabo-delete-popup',
    template: ''
})
export class RegimenlaboDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regimenlaboPopupService: RegimenlaboPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regimenlaboPopupService
                .open(RegimenlaboDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
