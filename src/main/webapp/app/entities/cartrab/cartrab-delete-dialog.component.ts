import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cartrab } from './cartrab.model';
import { CartrabPopupService } from './cartrab-popup.service';
import { CartrabService } from './cartrab.service';

@Component({
    selector: 'jhi-cartrab-delete-dialog',
    templateUrl: './cartrab-delete-dialog.component.html'
})
export class CartrabDeleteDialogComponent {

    cartrab: Cartrab;

    constructor(
        private cartrabService: CartrabService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cartrabService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cartrabListModification',
                content: 'Deleted an cartrab'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cartrab-delete-popup',
    template: ''
})
export class CartrabDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cartrabPopupService: CartrabPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cartrabPopupService
                .open(CartrabDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
