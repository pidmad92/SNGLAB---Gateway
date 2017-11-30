import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Szonal } from './szonal.model';
import { SzonalPopupService } from './szonal-popup.service';
import { SzonalService } from './szonal.service';

@Component({
    selector: 'jhi-szonal-delete-dialog',
    templateUrl: './szonal-delete-dialog.component.html'
})
export class SzonalDeleteDialogComponent {

    szonal: Szonal;

    constructor(
        private szonalService: SzonalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.szonalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'szonalListModification',
                content: 'Deleted an szonal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-szonal-delete-popup',
    template: ''
})
export class SzonalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private szonalPopupService: SzonalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.szonalPopupService
                .open(SzonalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
