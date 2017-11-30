import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Legajoasig } from './legajoasig.model';
import { LegajoasigPopupService } from './legajoasig-popup.service';
import { LegajoasigService } from './legajoasig.service';

@Component({
    selector: 'jhi-legajoasig-delete-dialog',
    templateUrl: './legajoasig-delete-dialog.component.html'
})
export class LegajoasigDeleteDialogComponent {

    legajoasig: Legajoasig;

    constructor(
        private legajoasigService: LegajoasigService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.legajoasigService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'legajoasigListModification',
                content: 'Deleted an legajoasig'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-legajoasig-delete-popup',
    template: ''
})
export class LegajoasigDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legajoasigPopupService: LegajoasigPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.legajoasigPopupService
                .open(LegajoasigDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
