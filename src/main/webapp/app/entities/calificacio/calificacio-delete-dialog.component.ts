import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calificacio } from './calificacio.model';
import { CalificacioPopupService } from './calificacio-popup.service';
import { CalificacioService } from './calificacio.service';

@Component({
    selector: 'jhi-calificacio-delete-dialog',
    templateUrl: './calificacio-delete-dialog.component.html'
})
export class CalificacioDeleteDialogComponent {

    calificacio: Calificacio;

    constructor(
        private calificacioService: CalificacioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calificacioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calificacioListModification',
                content: 'Deleted an calificacio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calificacio-delete-popup',
    template: ''
})
export class CalificacioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificacioPopupService: CalificacioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calificacioPopupService
                .open(CalificacioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
