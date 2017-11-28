import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pernatural } from './pernatural.model';
import { PernaturalPopupService } from './pernatural-popup.service';
import { PernaturalService } from './pernatural.service';

@Component({
    selector: 'jhi-pernatural-delete-dialog',
    templateUrl: './pernatural-delete-dialog.component.html'
})
export class PernaturalDeleteDialogComponent {

    pernatural: Pernatural;

    constructor(
        private pernaturalService: PernaturalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pernaturalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pernaturalListModification',
                content: 'Deleted an pernatural'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pernatural-delete-popup',
    template: ''
})
export class PernaturalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pernaturalPopupService: PernaturalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pernaturalPopupService
                .open(PernaturalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
