import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resolucrd } from './resolucrd.model';
import { ResolucrdPopupService } from './resolucrd-popup.service';
import { ResolucrdService } from './resolucrd.service';

@Component({
    selector: 'jhi-resolucrd-delete-dialog',
    templateUrl: './resolucrd-delete-dialog.component.html'
})
export class ResolucrdDeleteDialogComponent {

    resolucrd: Resolucrd;

    constructor(
        private resolucrdService: ResolucrdService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resolucrdService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resolucrdListModification',
                content: 'Deleted an resolucrd'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resolucrd-delete-popup',
    template: ''
})
export class ResolucrdDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resolucrdPopupService: ResolucrdPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resolucrdPopupService
                .open(ResolucrdDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
