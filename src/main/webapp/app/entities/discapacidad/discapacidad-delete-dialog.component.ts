import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Discapacidad } from './discapacidad.model';
import { DiscapacidadPopupService } from './discapacidad-popup.service';
import { DiscapacidadService } from './discapacidad.service';

@Component({
    selector: 'jhi-discapacidad-delete-dialog',
    templateUrl: './discapacidad-delete-dialog.component.html'
})
export class DiscapacidadDeleteDialogComponent {

    discapacidad: Discapacidad;

    constructor(
        private discapacidadService: DiscapacidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discapacidadService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'discapacidadListModification',
                content: 'Deleted an discapacidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discapacidad-delete-popup',
    template: ''
})
export class DiscapacidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private discapacidadPopupService: DiscapacidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.discapacidadPopupService
                .open(DiscapacidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
