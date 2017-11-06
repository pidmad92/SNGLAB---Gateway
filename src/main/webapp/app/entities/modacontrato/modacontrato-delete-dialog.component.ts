import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Modacontrato } from './modacontrato.model';
import { ModacontratoPopupService } from './modacontrato-popup.service';
import { ModacontratoService } from './modacontrato.service';

@Component({
    selector: 'jhi-modacontrato-delete-dialog',
    templateUrl: './modacontrato-delete-dialog.component.html'
})
export class ModacontratoDeleteDialogComponent {

    modacontrato: Modacontrato;

    constructor(
        private modacontratoService: ModacontratoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modacontratoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modacontratoListModification',
                content: 'Deleted an modacontrato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modacontrato-delete-popup',
    template: ''
})
export class ModacontratoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modacontratoPopupService: ModacontratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modacontratoPopupService
                .open(ModacontratoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
