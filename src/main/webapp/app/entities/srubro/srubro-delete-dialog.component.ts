import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Srubro } from './srubro.model';
import { SrubroPopupService } from './srubro-popup.service';
import { SrubroService } from './srubro.service';

@Component({
    selector: 'jhi-srubro-delete-dialog',
    templateUrl: './srubro-delete-dialog.component.html'
})
export class SrubroDeleteDialogComponent {

    srubro: Srubro;

    constructor(
        private srubroService: SrubroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.srubroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'srubroListModification',
                content: 'Deleted an srubro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-srubro-delete-popup',
    template: ''
})
export class SrubroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private srubroPopupService: SrubroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.srubroPopupService
                .open(SrubroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
