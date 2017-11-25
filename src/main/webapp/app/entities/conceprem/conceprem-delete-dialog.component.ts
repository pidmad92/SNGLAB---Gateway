import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Conceprem } from './conceprem.model';
import { ConcepremPopupService } from './conceprem-popup.service';
import { ConcepremService } from './conceprem.service';

@Component({
    selector: 'jhi-conceprem-delete-dialog',
    templateUrl: './conceprem-delete-dialog.component.html'
})
export class ConcepremDeleteDialogComponent {

    conceprem: Conceprem;

    constructor(
        private concepremService: ConcepremService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.concepremService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'concepremListModification',
                content: 'Deleted an conceprem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-conceprem-delete-popup',
    template: ''
})
export class ConcepremDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private concepremPopupService: ConcepremPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.concepremPopupService
                .open(ConcepremDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
