import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Palabraclav } from './palabraclav.model';
import { PalabraclavPopupService } from './palabraclav-popup.service';
import { PalabraclavService } from './palabraclav.service';

@Component({
    selector: 'jhi-palabraclav-delete-dialog',
    templateUrl: './palabraclav-delete-dialog.component.html'
})
export class PalabraclavDeleteDialogComponent {

    palabraclav: Palabraclav;

    constructor(
        private palabraclavService: PalabraclavService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.palabraclavService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'palabraclavListModification',
                content: 'Deleted an palabraclav'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-palabraclav-delete-popup',
    template: ''
})
export class PalabraclavDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private palabraclavPopupService: PalabraclavPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.palabraclavPopupService
                .open(PalabraclavDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
