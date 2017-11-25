import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motcese } from './motcese.model';
import { MotcesePopupService } from './motcese-popup.service';
import { MotceseService } from './motcese.service';

@Component({
    selector: 'jhi-motcese-delete-dialog',
    templateUrl: './motcese-delete-dialog.component.html'
})
export class MotceseDeleteDialogComponent {

    motcese: Motcese;

    constructor(
        private motceseService: MotceseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motceseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motceseListModification',
                content: 'Deleted an motcese'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motcese-delete-popup',
    template: ''
})
export class MotceseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motcesePopupService: MotcesePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motcesePopupService
                .open(MotceseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
