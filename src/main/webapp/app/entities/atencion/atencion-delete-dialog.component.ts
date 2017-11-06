import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Atencion } from './atencion.model';
import { AtencionPopupService } from './atencion-popup.service';
import { AtencionService } from './atencion.service';

@Component({
    selector: 'jhi-atencion-delete-dialog',
    templateUrl: './atencion-delete-dialog.component.html'
})
export class AtencionDeleteDialogComponent {

    atencion: Atencion;

    constructor(
        private atencionService: AtencionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atencionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atencionListModification',
                content: 'Deleted an atencion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atencion-delete-popup',
    template: ''
})
export class AtencionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atencionPopupService: AtencionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atencionPopupService
                .open(AtencionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
