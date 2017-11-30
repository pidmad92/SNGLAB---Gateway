import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Ambitoorgan } from './ambitoorgan.model';
import { AmbitoorganPopupService } from './ambitoorgan-popup.service';
import { AmbitoorganService } from './ambitoorgan.service';

@Component({
    selector: 'jhi-ambitoorgan-delete-dialog',
    templateUrl: './ambitoorgan-delete-dialog.component.html'
})
export class AmbitoorganDeleteDialogComponent {

    ambitoorgan: Ambitoorgan;

    constructor(
        private ambitoorganService: AmbitoorganService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ambitoorganService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ambitoorganListModification',
                content: 'Deleted an ambitoorgan'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ambitoorgan-delete-popup',
    template: ''
})
export class AmbitoorganDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ambitoorganPopupService: AmbitoorganPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ambitoorganPopupService
                .open(AmbitoorganDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
