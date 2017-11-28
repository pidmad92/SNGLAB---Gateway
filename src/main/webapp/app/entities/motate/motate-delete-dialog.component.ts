import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motate } from './motate.model';
import { MotatePopupService } from './motate-popup.service';
import { MotateService } from './motate.service';

@Component({
    selector: 'jhi-motate-delete-dialog',
    templateUrl: './motate-delete-dialog.component.html'
})
export class MotateDeleteDialogComponent {

    motate: Motate;

    constructor(
        private motateService: MotateService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motateListModification',
                content: 'Deleted an motate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motate-delete-popup',
    template: ''
})
export class MotateDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motatePopupService: MotatePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motatePopupService
                .open(MotateDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
