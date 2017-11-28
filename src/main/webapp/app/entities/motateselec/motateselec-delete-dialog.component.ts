import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motateselec } from './motateselec.model';
import { MotateselecPopupService } from './motateselec-popup.service';
import { MotateselecService } from './motateselec.service';

@Component({
    selector: 'jhi-motateselec-delete-dialog',
    templateUrl: './motateselec-delete-dialog.component.html'
})
export class MotateselecDeleteDialogComponent {

    motateselec: Motateselec;

    constructor(
        private motateselecService: MotateselecService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motateselecService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motateselecListModification',
                content: 'Deleted an motateselec'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motateselec-delete-popup',
    template: ''
})
export class MotateselecDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motateselecPopupService: MotateselecPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motateselecPopupService
                .open(MotateselecDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
