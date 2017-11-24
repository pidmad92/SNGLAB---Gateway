import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ModuloEntidad } from './modulo-entidad.model';
import { ModuloEntidadPopupService } from './modulo-entidad-popup.service';
import { ModuloEntidadService } from './modulo-entidad.service';

@Component({
    selector: 'jhi-modulo-entidad-delete-dialog',
    templateUrl: './modulo-entidad-delete-dialog.component.html'
})
export class ModuloEntidadDeleteDialogComponent {

    moduloEntidad: ModuloEntidad;

    constructor(
        private moduloEntidadService: ModuloEntidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(moduloEntidad) {
        moduloEntidad.numEliminar = 0;
        this.moduloEntidadService.update(moduloEntidad).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'moduloEntidadListModification',
                content: 'Deleted an moduloEntidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modulo-entidad-delete-popup',
    template: ''
})
export class ModuloEntidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moduloEntidadPopupService: ModuloEntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.moduloEntidadPopupService
                .open(ModuloEntidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
