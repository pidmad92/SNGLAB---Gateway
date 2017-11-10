import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Oficina } from './oficina.model';
import { OficinaPopupService } from './oficina-popup.service';
import { OficinaService } from './oficina.service';

@Component({
    selector: 'jhi-oficina-delete-dialog',
    templateUrl: './oficina-delete-dialog.component.html'
})
export class OficinaDeleteDialogComponent {

    oficina: Oficina;

    constructor(
        private oficinaService: OficinaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.oficinaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'oficinaListModification',
                content: 'Deleted an oficina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-oficina-delete-popup',
    template: ''
})
export class OficinaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private oficinaPopupService: OficinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.oficinaPopupService
                .open(OficinaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
