import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Regimenlab } from './regimenlab.model';
import { RegimenlabPopupService } from './regimenlab-popup.service';
import { RegimenlabService } from './regimenlab.service';

@Component({
    selector: 'jhi-regimenlab-delete-dialog',
    templateUrl: './regimenlab-delete-dialog.component.html'
})
export class RegimenlabDeleteDialogComponent {

    regimenlab: Regimenlab;

    constructor(
        private regimenlabService: RegimenlabService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.regimenlabService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'regimenlabListModification',
                content: 'Deleted an regimenlab'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-regimenlab-delete-popup',
    template: ''
})
export class RegimenlabDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private regimenlabPopupService: RegimenlabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.regimenlabPopupService
                .open(RegimenlabDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
