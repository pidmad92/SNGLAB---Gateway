import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipresconc } from './tipresconc.model';
import { TipresconcPopupService } from './tipresconc-popup.service';
import { TipresconcService } from './tipresconc.service';

@Component({
    selector: 'jhi-tipresconc-delete-dialog',
    templateUrl: './tipresconc-delete-dialog.component.html'
})
export class TipresconcDeleteDialogComponent {

    tipresconc: Tipresconc;

    constructor(
        private tipresconcService: TipresconcService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipresconcService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipresconcListModification',
                content: 'Deleted an tipresconc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipresconc-delete-popup',
    template: ''
})
export class TipresconcDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipresconcPopupService: TipresconcPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipresconcPopupService
                .open(TipresconcDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
