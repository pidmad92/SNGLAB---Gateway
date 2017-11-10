import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cargotrabaja } from './cargotrabaja.model';
import { CargotrabajaPopupService } from './cargotrabaja-popup.service';
import { CargotrabajaService } from './cargotrabaja.service';

@Component({
    selector: 'jhi-cargotrabaja-delete-dialog',
    templateUrl: './cargotrabaja-delete-dialog.component.html'
})
export class CargotrabajaDeleteDialogComponent {

    cargotrabaja: Cargotrabaja;

    constructor(
        private cargotrabajaService: CargotrabajaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cargotrabajaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cargotrabajaListModification',
                content: 'Deleted an cargotrabaja'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cargotrabaja-delete-popup',
    template: ''
})
export class CargotrabajaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cargotrabajaPopupService: CargotrabajaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cargotrabajaPopupService
                .open(CargotrabajaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
