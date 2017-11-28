import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discap } from './discap.model';
import { DiscapPopupService } from './discap-popup.service';
import { DiscapService } from './discap.service';

@Component({
    selector: 'jhi-discap-delete-dialog',
    templateUrl: './discap-delete-dialog.component.html'
})
export class DiscapDeleteDialogComponent {

    discap: Discap;

    constructor(
        private discapService: DiscapService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discapService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discapListModification',
                content: 'Deleted an discap'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discap-delete-popup',
    template: ''
})
export class DiscapDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapPopupService: DiscapPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discapPopupService
                .open(DiscapDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
