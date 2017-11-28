import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Modcontrato } from './modcontrato.model';
import { ModcontratoPopupService } from './modcontrato-popup.service';
import { ModcontratoService } from './modcontrato.service';

@Component({
    selector: 'jhi-modcontrato-delete-dialog',
    templateUrl: './modcontrato-delete-dialog.component.html'
})
export class ModcontratoDeleteDialogComponent {

    modcontrato: Modcontrato;

    constructor(
        private modcontratoService: ModcontratoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.modcontratoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'modcontratoListModification',
                content: 'Deleted an modcontrato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modcontrato-delete-popup',
    template: ''
})
export class ModcontratoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modcontratoPopupService: ModcontratoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modcontratoPopupService
                .open(ModcontratoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
