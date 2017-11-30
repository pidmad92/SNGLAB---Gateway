import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Legtipdoc } from './legtipdoc.model';
import { LegtipdocPopupService } from './legtipdoc-popup.service';
import { LegtipdocService } from './legtipdoc.service';

@Component({
    selector: 'jhi-legtipdoc-delete-dialog',
    templateUrl: './legtipdoc-delete-dialog.component.html'
})
export class LegtipdocDeleteDialogComponent {

    legtipdoc: Legtipdoc;

    constructor(
        private legtipdocService: LegtipdocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.legtipdocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'legtipdocListModification',
                content: 'Deleted an legtipdoc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-legtipdoc-delete-popup',
    template: ''
})
export class LegtipdocDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private legtipdocPopupService: LegtipdocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.legtipdocPopupService
                .open(LegtipdocDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
