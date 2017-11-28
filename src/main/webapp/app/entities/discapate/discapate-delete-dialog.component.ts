import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discapate } from './discapate.model';
import { DiscapatePopupService } from './discapate-popup.service';
import { DiscapateService } from './discapate.service';

@Component({
    selector: 'jhi-discapate-delete-dialog',
    templateUrl: './discapate-delete-dialog.component.html'
})
export class DiscapateDeleteDialogComponent {

    discapate: Discapate;

    constructor(
        private discapateService: DiscapateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discapateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discapateListModification',
                content: 'Deleted an discapate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discapate-delete-popup',
    template: ''
})
export class DiscapateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapatePopupService: DiscapatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discapatePopupService
                .open(DiscapateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
