import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pasepj } from './pasepj.model';
import { PasepjPopupService } from './pasepj-popup.service';
import { PasepjService } from './pasepj.service';

@Component({
    selector: 'jhi-pasepj-delete-dialog',
    templateUrl: './pasepj-delete-dialog.component.html'
})
export class PasepjDeleteDialogComponent {

    pasepj: Pasepj;

    constructor(
        private pasepjService: PasepjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pasepjService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pasepjListModification',
                content: 'Deleted an pasepj'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pasepj-delete-popup',
    template: ''
})
export class PasepjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pasepjPopupService: PasepjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pasepjPopupService
                .open(PasepjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
