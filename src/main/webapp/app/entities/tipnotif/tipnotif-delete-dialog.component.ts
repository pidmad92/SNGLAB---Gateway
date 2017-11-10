import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipnotif } from './tipnotif.model';
import { TipnotifPopupService } from './tipnotif-popup.service';
import { TipnotifService } from './tipnotif.service';

@Component({
    selector: 'jhi-tipnotif-delete-dialog',
    templateUrl: './tipnotif-delete-dialog.component.html'
})
export class TipnotifDeleteDialogComponent {

    tipnotif: Tipnotif;

    constructor(
        private tipnotifService: TipnotifService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipnotifService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipnotifListModification',
                content: 'Deleted an tipnotif'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipnotif-delete-popup',
    template: ''
})
export class TipnotifDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipnotifPopupService: TipnotifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipnotifPopupService
                .open(TipnotifDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
