import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Recurso } from './recurso.model';
import { RecursoPopupService } from './recurso-popup.service';
import { RecursoService } from './recurso.service';

@Component({
    selector: 'jhi-recurso-delete-dialog',
    templateUrl: './recurso-delete-dialog.component.html'
})
export class RecursoDeleteDialogComponent {

    recurso: Recurso;

    constructor(
        private recursoService: RecursoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recursoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'recursoListModification',
                content: 'Deleted an recurso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recurso-delete-popup',
    template: ''
})
export class RecursoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private recursoPopupService: RecursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.recursoPopupService
                .open(RecursoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
