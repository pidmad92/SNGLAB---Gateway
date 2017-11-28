import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Datdenu } from './datdenu.model';
import { DatdenuPopupService } from './datdenu-popup.service';
import { DatdenuService } from './datdenu.service';

@Component({
    selector: 'jhi-datdenu-delete-dialog',
    templateUrl: './datdenu-delete-dialog.component.html'
})
export class DatdenuDeleteDialogComponent {

    datdenu: Datdenu;

    constructor(
        private datdenuService: DatdenuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datdenuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'datdenuListModification',
                content: 'Deleted an datdenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datdenu-delete-popup',
    template: ''
})
export class DatdenuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datdenuPopupService: DatdenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datdenuPopupService
                .open(DatdenuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
