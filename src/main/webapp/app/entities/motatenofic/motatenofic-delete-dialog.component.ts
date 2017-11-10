import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motatenofic } from './motatenofic.model';
import { MotatenoficPopupService } from './motatenofic-popup.service';
import { MotatenoficService } from './motatenofic.service';

@Component({
    selector: 'jhi-motatenofic-delete-dialog',
    templateUrl: './motatenofic-delete-dialog.component.html'
})
export class MotatenoficDeleteDialogComponent {

    motatenofic: Motatenofic;

    constructor(
        private motatenoficService: MotatenoficService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motatenoficService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motatenoficListModification',
                content: 'Deleted an motatenofic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motatenofic-delete-popup',
    template: ''
})
export class MotatenoficDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motatenoficPopupService: MotatenoficPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motatenoficPopupService
                .open(MotatenoficDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
