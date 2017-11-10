import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocexp } from './tipdocexp.model';
import { TipdocexpPopupService } from './tipdocexp-popup.service';
import { TipdocexpService } from './tipdocexp.service';

@Component({
    selector: 'jhi-tipdocexp-delete-dialog',
    templateUrl: './tipdocexp-delete-dialog.component.html'
})
export class TipdocexpDeleteDialogComponent {

    tipdocexp: Tipdocexp;

    constructor(
        private tipdocexpService: TipdocexpService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdocexpService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdocexpListModification',
                content: 'Deleted an tipdocexp'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdocexp-delete-popup',
    template: ''
})
export class TipdocexpDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocexpPopupService: TipdocexpPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdocexpPopupService
                .open(TipdocexpDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
