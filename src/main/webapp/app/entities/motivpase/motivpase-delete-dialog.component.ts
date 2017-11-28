import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motivpase } from './motivpase.model';
import { MotivpasePopupService } from './motivpase-popup.service';
import { MotivpaseService } from './motivpase.service';

@Component({
    selector: 'jhi-motivpase-delete-dialog',
    templateUrl: './motivpase-delete-dialog.component.html'
})
export class MotivpaseDeleteDialogComponent {

    motivpase: Motivpase;

    constructor(
        private motivpaseService: MotivpaseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motivpaseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motivpaseListModification',
                content: 'Deleted an motivpase'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motivpase-delete-popup',
    template: ''
})
export class MotivpaseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motivpasePopupService: MotivpasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motivpasePopupService
                .open(MotivpaseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
