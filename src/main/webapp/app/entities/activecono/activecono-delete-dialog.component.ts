import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Activecono } from './activecono.model';
import { ActiveconoPopupService } from './activecono-popup.service';
import { ActiveconoService } from './activecono.service';

@Component({
    selector: 'jhi-activecono-delete-dialog',
    templateUrl: './activecono-delete-dialog.component.html'
})
export class ActiveconoDeleteDialogComponent {

    activecono: Activecono;

    constructor(
        private activeconoService: ActiveconoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.activeconoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'activeconoListModification',
                content: 'Deleted an activecono'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-activecono-delete-popup',
    template: ''
})
export class ActiveconoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private activeconoPopupService: ActiveconoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.activeconoPopupService
                .open(ActiveconoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
