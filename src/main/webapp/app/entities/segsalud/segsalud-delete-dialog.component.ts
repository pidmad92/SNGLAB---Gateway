import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Segsalud } from './segsalud.model';
import { SegsaludPopupService } from './segsalud-popup.service';
import { SegsaludService } from './segsalud.service';

@Component({
    selector: 'jhi-segsalud-delete-dialog',
    templateUrl: './segsalud-delete-dialog.component.html'
})
export class SegsaludDeleteDialogComponent {

    segsalud: Segsalud;

    constructor(
        private segsaludService: SegsaludService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.segsaludService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'segsaludListModification',
                content: 'Deleted an segsalud'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-segsalud-delete-popup',
    template: ''
})
export class SegsaludDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private segsaludPopupService: SegsaludPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.segsaludPopupService
                .open(SegsaludDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
