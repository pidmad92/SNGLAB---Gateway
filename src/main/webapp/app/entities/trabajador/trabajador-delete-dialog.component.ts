import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Trabajador } from './trabajador.model';
import { TrabajadorPopupService } from './trabajador-popup.service';
import { TrabajadorService } from './trabajador.service';

@Component({
    selector: 'jhi-trabajador-delete-dialog',
    templateUrl: './trabajador-delete-dialog.component.html'
})
export class TrabajadorDeleteDialogComponent {

    trabajador: Trabajador;

    constructor(
        private trabajadorService: TrabajadorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trabajadorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trabajadorListModification',
                content: 'Deleted an trabajador'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-trabajador-delete-popup',
    template: ''
})
export class TrabajadorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trabajadorPopupService: TrabajadorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.trabajadorPopupService
                .open(TrabajadorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
