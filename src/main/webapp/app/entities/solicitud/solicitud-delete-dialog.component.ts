import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Solicitud } from './solicitud.model';
import { SolicitudPopupService } from './solicitud-popup.service';
import { SolicitudService } from './solicitud.service';

@Component({
    selector: 'jhi-solicitud-delete-dialog',
    templateUrl: './solicitud-delete-dialog.component.html'
})
export class SolicitudDeleteDialogComponent {

    solicitud: Solicitud;

    constructor(
        private solicitudService: SolicitudService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solicitudService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'solicitudListModification',
                content: 'Deleted an solicitud'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solicitud-delete-popup',
    template: ''
})
export class SolicitudDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicitudPopupService: SolicitudPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.solicitudPopupService
                .open(SolicitudDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
