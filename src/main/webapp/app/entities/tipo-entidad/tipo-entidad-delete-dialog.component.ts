import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoEntidad } from './tipo-entidad.model';
import { TipoEntidadPopupService } from './tipo-entidad-popup.service';
import { TipoEntidadService } from './tipo-entidad.service';

@Component({
    selector: 'jhi-tipo-entidad-delete-dialog',
    templateUrl: './tipo-entidad-delete-dialog.component.html'
})
export class TipoEntidadDeleteDialogComponent {

    tipoEntidad: TipoEntidad;

    constructor(
        private tipoEntidadService: TipoEntidadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(tipoEntidad) {
        tipoEntidad.numEliminar = 0;
        this.tipoEntidadService.update(tipoEntidad).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoEntidadListModification',
                content: 'Deleted an tipoEntidad'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-entidad-delete-popup',
    template: ''
})
export class TipoEntidadDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoEntidadPopupService: TipoEntidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoEntidadPopupService
                .open(TipoEntidadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
