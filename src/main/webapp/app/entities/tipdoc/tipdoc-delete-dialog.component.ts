import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdoc } from './tipdoc.model';
import { TipdocPopupService } from './tipdoc-popup.service';
import { TipdocService } from './tipdoc.service';

@Component({
    selector: 'jhi-tipdoc-delete-dialog',
    templateUrl: './tipdoc-delete-dialog.component.html'
})
export class TipdocDeleteDialogComponent {

    tipdoc: Tipdoc;

    constructor(
        private tipdocService: TipdocService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdocService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdocListModification',
                content: 'Deleted an tipdoc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdoc-delete-popup',
    template: ''
})
export class TipdocDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocPopupService: TipdocPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdocPopupService
                .open(TipdocDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
