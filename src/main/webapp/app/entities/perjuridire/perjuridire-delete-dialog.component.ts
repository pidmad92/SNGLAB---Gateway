import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Perjuridire } from './perjuridire.model';
import { PerjuridirePopupService } from './perjuridire-popup.service';
import { PerjuridireService } from './perjuridire.service';

@Component({
    selector: 'jhi-perjuridire-delete-dialog',
    templateUrl: './perjuridire-delete-dialog.component.html'
})
export class PerjuridireDeleteDialogComponent {

    perjuridire: Perjuridire;

    constructor(
        private perjuridireService: PerjuridireService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perjuridireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'perjuridireListModification',
                content: 'Deleted an perjuridire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perjuridire-delete-popup',
    template: ''
})
export class PerjuridireDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perjuridirePopupService: PerjuridirePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.perjuridirePopupService
                .open(PerjuridireDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
