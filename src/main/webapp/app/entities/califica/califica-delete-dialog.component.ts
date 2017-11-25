import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Califica } from './califica.model';
import { CalificaPopupService } from './califica-popup.service';
import { CalificaService } from './califica.service';

@Component({
    selector: 'jhi-califica-delete-dialog',
    templateUrl: './califica-delete-dialog.component.html'
})
export class CalificaDeleteDialogComponent {

    califica: Califica;

    constructor(
        private calificaService: CalificaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calificaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calificaListModification',
                content: 'Deleted an califica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-califica-delete-popup',
    template: ''
})
export class CalificaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calificaPopupService: CalificaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calificaPopupService
                .open(CalificaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
