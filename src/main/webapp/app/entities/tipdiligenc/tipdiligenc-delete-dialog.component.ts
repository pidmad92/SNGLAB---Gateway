import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdiligenc } from './tipdiligenc.model';
import { TipdiligencPopupService } from './tipdiligenc-popup.service';
import { TipdiligencService } from './tipdiligenc.service';

@Component({
    selector: 'jhi-tipdiligenc-delete-dialog',
    templateUrl: './tipdiligenc-delete-dialog.component.html'
})
export class TipdiligencDeleteDialogComponent {

    tipdiligenc: Tipdiligenc;

    constructor(
        private tipdiligencService: TipdiligencService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdiligencService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdiligencListModification',
                content: 'Deleted an tipdiligenc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdiligenc-delete-popup',
    template: ''
})
export class TipdiligencDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdiligencPopupService: TipdiligencPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdiligencPopupService
                .open(TipdiligencDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
