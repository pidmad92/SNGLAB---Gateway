import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Subregilabo } from './subregilabo.model';
import { SubregilaboPopupService } from './subregilabo-popup.service';
import { SubregilaboService } from './subregilabo.service';

@Component({
    selector: 'jhi-subregilabo-delete-dialog',
    templateUrl: './subregilabo-delete-dialog.component.html'
})
export class SubregilaboDeleteDialogComponent {

    subregilabo: Subregilabo;

    constructor(
        private subregilaboService: SubregilaboService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subregilaboService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'subregilaboListModification',
                content: 'Deleted an subregilabo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-subregilabo-delete-popup',
    template: ''
})
export class SubregilaboDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subregilaboPopupService: SubregilaboPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subregilaboPopupService
                .open(SubregilaboDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
