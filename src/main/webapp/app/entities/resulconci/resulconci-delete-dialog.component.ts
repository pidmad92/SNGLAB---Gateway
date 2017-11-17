import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { ResulconciPopupService } from './resulconci-popup.service';
import { ResulconciService } from './resulconci.service';

@Component({
    selector: 'jhi-resulconci-delete-dialog',
    templateUrl: './resulconci-delete-dialog.component.html'
})
export class ResulconciDeleteDialogComponent {

    resulconci: Resulconci;

    constructor(
        private resulconciService: ResulconciService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resulconciService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resulconciListModification',
                content: 'Deleted an resulconci'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resulconci-delete-popup',
    template: ''
})
export class ResulconciDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resulconciPopupService: ResulconciPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resulconciPopupService
                .open(ResulconciDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
