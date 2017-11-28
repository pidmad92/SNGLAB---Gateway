import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Solicform } from './solicform.model';
import { SolicformPopupService } from './solicform-popup.service';
import { SolicformService } from './solicform.service';

@Component({
    selector: 'jhi-solicform-delete-dialog',
    templateUrl: './solicform-delete-dialog.component.html'
})
export class SolicformDeleteDialogComponent {

    solicform: Solicform;

    constructor(
        private solicformService: SolicformService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.solicformService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'solicformListModification',
                content: 'Deleted an solicform'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-solicform-delete-popup',
    template: ''
})
export class SolicformDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private solicformPopupService: SolicformPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.solicformPopupService
                .open(SolicformDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
