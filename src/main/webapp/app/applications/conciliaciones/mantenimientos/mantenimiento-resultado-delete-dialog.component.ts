import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resulconci } from './resulconci.model';
import { MantenimientoResultadoPopupService } from './mantenimiento-resultado-popup.service';
import { ResulconciService } from './resulconci.service';

@Component({
    selector: 'jhi-mantenimiento-resultado-delete-dialog',
    templateUrl: './mantenimiento-resultado-delete-dialog.component.html'
})
export class MantenimientoResultadoDeleteDialogComponent {

    resulconci: Resulconci;

    constructor(
        private resulconciService: ResulconciService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(aplicacion) {
        aplicacion.numEliminar = 0;
        this.resulconciService.updateLogic(aplicacion).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resulconciListModification',
                content: 'Deleted an aplicacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-mantenimiento-resultado-delete-popup',
    template: ''
})
export class MantenimientoResultadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matenimientoResultadoPopupService: MantenimientoResultadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.matenimientoResultadoPopupService
                .open(MantenimientoResultadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
