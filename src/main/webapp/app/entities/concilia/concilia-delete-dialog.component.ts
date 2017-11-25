import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Concilia } from './concilia.model';
import { ConciliaPopupService } from './concilia-popup.service';
import { ConciliaService } from './concilia.service';

@Component({
    selector: 'jhi-concilia-delete-dialog',
    templateUrl: './concilia-delete-dialog.component.html'
})
export class ConciliaDeleteDialogComponent {

    concilia: Concilia;

    constructor(
        private conciliaService: ConciliaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.conciliaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'conciliaListModification',
                content: 'Deleted an concilia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-concilia-delete-popup',
    template: ''
})
export class ConciliaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private conciliaPopupService: ConciliaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.conciliaPopupService
                .open(ConciliaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
