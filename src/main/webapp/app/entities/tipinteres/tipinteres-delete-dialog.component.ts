import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipinteres } from './tipinteres.model';
import { TipinteresPopupService } from './tipinteres-popup.service';
import { TipinteresService } from './tipinteres.service';

@Component({
    selector: 'jhi-tipinteres-delete-dialog',
    templateUrl: './tipinteres-delete-dialog.component.html'
})
export class TipinteresDeleteDialogComponent {

    tipinteres: Tipinteres;

    constructor(
        private tipinteresService: TipinteresService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipinteresService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipinteresListModification',
                content: 'Deleted an tipinteres'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipinteres-delete-popup',
    template: ''
})
export class TipinteresDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipinteresPopupService: TipinteresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipinteresPopupService
                .open(TipinteresDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
