import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Multa } from './multa.model';
import { MultaPopupService } from './multa-popup.service';
import { MultaService } from './multa.service';

@Component({
    selector: 'jhi-multa-delete-dialog',
    templateUrl: './multa-delete-dialog.component.html'
})
export class MultaDeleteDialogComponent {

    multa: Multa;

    constructor(
        private multaService: MultaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.multaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'multaListModification',
                content: 'Deleted an multa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-multa-delete-popup',
    template: ''
})
export class MultaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private multaPopupService: MultaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.multaPopupService
                .open(MultaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
