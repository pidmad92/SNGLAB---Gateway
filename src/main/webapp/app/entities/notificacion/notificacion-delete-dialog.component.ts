import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Notificacion } from './notificacion.model';
import { NotificacionPopupService } from './notificacion-popup.service';
import { NotificacionService } from './notificacion.service';

@Component({
    selector: 'jhi-notificacion-delete-dialog',
    templateUrl: './notificacion-delete-dialog.component.html'
})
export class NotificacionDeleteDialogComponent {

    notificacion: Notificacion;

    constructor(
        private notificacionService: NotificacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificacionListModification',
                content: 'Deleted an notificacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notificacion-delete-popup',
    template: ''
})
export class NotificacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificacionPopupService: NotificacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificacionPopupService
                .open(NotificacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
