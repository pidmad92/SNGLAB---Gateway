import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocident } from './tipdocident.model';
import { TipdocidentPopupService } from './tipdocident-popup.service';
import { TipdocidentService } from './tipdocident.service';

@Component({
    selector: 'jhi-tipdocident-delete-dialog',
    templateUrl: './tipdocident-delete-dialog.component.html'
})
export class TipdocidentDeleteDialogComponent {

    tipdocident: Tipdocident;

    constructor(
        private tipdocidentService: TipdocidentService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdocidentService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdocidentListModification',
                content: 'Deleted an tipdocident'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdocident-delete-popup',
    template: ''
})
export class TipdocidentDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocidentPopupService: TipdocidentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdocidentPopupService
                .open(TipdocidentDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
