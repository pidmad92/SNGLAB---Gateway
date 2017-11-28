import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Negocolect } from './negocolect.model';
import { NegocolectPopupService } from './negocolect-popup.service';
import { NegocolectService } from './negocolect.service';

@Component({
    selector: 'jhi-negocolect-delete-dialog',
    templateUrl: './negocolect-delete-dialog.component.html'
})
export class NegocolectDeleteDialogComponent {

    negocolect: Negocolect;

    constructor(
        private negocolectService: NegocolectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.negocolectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'negocolectListModification',
                content: 'Deleted an negocolect'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-negocolect-delete-popup',
    template: ''
})
export class NegocolectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private negocolectPopupService: NegocolectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.negocolectPopupService
                .open(NegocolectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
