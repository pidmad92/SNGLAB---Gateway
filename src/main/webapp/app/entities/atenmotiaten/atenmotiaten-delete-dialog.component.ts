import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Atenmotiaten } from './atenmotiaten.model';
import { AtenmotiatenPopupService } from './atenmotiaten-popup.service';
import { AtenmotiatenService } from './atenmotiaten.service';

@Component({
    selector: 'jhi-atenmotiaten-delete-dialog',
    templateUrl: './atenmotiaten-delete-dialog.component.html'
})
export class AtenmotiatenDeleteDialogComponent {

    atenmotiaten: Atenmotiaten;

    constructor(
        private atenmotiatenService: AtenmotiatenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atenmotiatenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atenmotiatenListModification',
                content: 'Deleted an atenmotiaten'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atenmotiaten-delete-popup',
    template: ''
})
export class AtenmotiatenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atenmotiatenPopupService: AtenmotiatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atenmotiatenPopupService
                .open(AtenmotiatenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
