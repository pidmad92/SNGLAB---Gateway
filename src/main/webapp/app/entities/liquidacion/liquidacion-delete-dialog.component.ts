import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Liquidacion } from './liquidacion.model';
import { LiquidacionPopupService } from './liquidacion-popup.service';
import { LiquidacionService } from './liquidacion.service';

@Component({
    selector: 'jhi-liquidacion-delete-dialog',
    templateUrl: './liquidacion-delete-dialog.component.html'
})
export class LiquidacionDeleteDialogComponent {

    liquidacion: Liquidacion;

    constructor(
        private liquidacionService: LiquidacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.liquidacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'liquidacionListModification',
                content: 'Deleted an liquidacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-liquidacion-delete-popup',
    template: ''
})
export class LiquidacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private liquidacionPopupService: LiquidacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.liquidacionPopupService
                .open(LiquidacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
