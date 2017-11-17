import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipenvnot } from './tipenvnot.model';
import { TipenvnotPopupService } from './tipenvnot-popup.service';
import { TipenvnotService } from './tipenvnot.service';

@Component({
    selector: 'jhi-tipenvnot-delete-dialog',
    templateUrl: './tipenvnot-delete-dialog.component.html'
})
export class TipenvnotDeleteDialogComponent {

    tipenvnot: Tipenvnot;

    constructor(
        private tipenvnotService: TipenvnotService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipenvnotService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipenvnotListModification',
                content: 'Deleted an tipenvnot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipenvnot-delete-popup',
    template: ''
})
export class TipenvnotDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipenvnotPopupService: TipenvnotPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipenvnotPopupService
                .open(TipenvnotDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
