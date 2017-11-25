import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Datlab } from './datlab.model';
import { DatlabPopupService } from './datlab-popup.service';
import { DatlabService } from './datlab.service';

@Component({
    selector: 'jhi-datlab-delete-dialog',
    templateUrl: './datlab-delete-dialog.component.html'
})
export class DatlabDeleteDialogComponent {

    datlab: Datlab;

    constructor(
        private datlabService: DatlabService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datlabService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'datlabListModification',
                content: 'Deleted an datlab'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datlab-delete-popup',
    template: ''
})
export class DatlabDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datlabPopupService: DatlabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datlabPopupService
                .open(DatlabDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
