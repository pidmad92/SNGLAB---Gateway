import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Empleador } from './empleador.model';
import { EmpleadorPopupService } from './empleador-popup.service';
import { EmpleadorService } from './empleador.service';

@Component({
    selector: 'jhi-empleador-delete-dialog',
    templateUrl: './empleador-delete-dialog.component.html'
})
export class EmpleadorDeleteDialogComponent {

    empleador: Empleador;

    constructor(
        private empleadorService: EmpleadorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.empleadorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'empleadorListModification',
                content: 'Deleted an empleador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-empleador-delete-popup',
    template: ''
})
export class EmpleadorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private empleadorPopupService: EmpleadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.empleadorPopupService
                .open(EmpleadorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
