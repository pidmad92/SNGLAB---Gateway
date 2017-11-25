import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Notifica } from './notifica.model';
import { NotificaPopupService } from './notifica-popup.service';
import { NotificaService } from './notifica.service';

@Component({
    selector: 'jhi-notifica-delete-dialog',
    templateUrl: './notifica-delete-dialog.component.html'
})
export class NotificaDeleteDialogComponent {

    notifica: Notifica;

    constructor(
        private notificaService: NotificaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notificaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notificaListModification',
                content: 'Deleted an notifica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-notifica-delete-popup',
    template: ''
})
export class NotificaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificaPopupService: NotificaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notificaPopupService
                .open(NotificaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
