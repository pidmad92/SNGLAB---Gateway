import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dettipprov } from './dettipprov.model';
import { DettipprovPopupService } from './dettipprov-popup.service';
import { DettipprovService } from './dettipprov.service';

@Component({
    selector: 'jhi-dettipprov-delete-dialog',
    templateUrl: './dettipprov-delete-dialog.component.html'
})
export class DettipprovDeleteDialogComponent {

    dettipprov: Dettipprov;

    constructor(
        private dettipprovService: DettipprovService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dettipprovService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dettipprovListModification',
                content: 'Deleted an dettipprov'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dettipprov-delete-popup',
    template: ''
})
export class DettipprovDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dettipprovPopupService: DettipprovPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dettipprovPopupService
                .open(DettipprovDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
