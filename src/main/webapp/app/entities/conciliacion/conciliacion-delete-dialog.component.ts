import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Conciliacion } from './conciliacion.model';
import { ConciliacionPopupService } from './conciliacion-popup.service';
import { ConciliacionService } from './conciliacion.service';

@Component({
    selector: 'jhi-conciliacion-delete-dialog',
    templateUrl: './conciliacion-delete-dialog.component.html'
})
export class ConciliacionDeleteDialogComponent {

    conciliacion: Conciliacion;

    constructor(
        private conciliacionService: ConciliacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conciliacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'conciliacionListModification',
                content: 'Deleted an conciliacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conciliacion-delete-popup',
    template: ''
})
export class ConciliacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conciliacionPopupService: ConciliacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.conciliacionPopupService
                .open(ConciliacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
