import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Legajo } from './legajo.model';
import { LegajoPopupService } from './legajo-popup.service';
import { LegajoService } from './legajo.service';

@Component({
    selector: 'jhi-legajo-delete-dialog',
    templateUrl: './legajo-delete-dialog.component.html'
})
export class LegajoDeleteDialogComponent {

    legajo: Legajo;

    constructor(
        private legajoService: LegajoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.legajoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'legajoListModification',
                content: 'Deleted an legajo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-legajo-delete-popup',
    template: ''
})
export class LegajoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legajoPopupService: LegajoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.legajoPopupService
                .open(LegajoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
