import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calperiodo } from './calperiodo.model';
import { CalperiodoPopupService } from './calperiodo-popup.service';
import { CalperiodoService } from './calperiodo.service';

@Component({
    selector: 'jhi-calperiodo-delete-dialog',
    templateUrl: './calperiodo-delete-dialog.component.html'
})
export class CalperiodoDeleteDialogComponent {

    calperiodo: Calperiodo;

    constructor(
        private calperiodoService: CalperiodoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calperiodoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calperiodoListModification',
                content: 'Deleted an calperiodo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calperiodo-delete-popup',
    template: ''
})
export class CalperiodoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calperiodoPopupService: CalperiodoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calperiodoPopupService
                .open(CalperiodoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
