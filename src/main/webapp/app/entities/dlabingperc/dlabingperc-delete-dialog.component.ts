import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dlabingperc } from './dlabingperc.model';
import { DlabingpercPopupService } from './dlabingperc-popup.service';
import { DlabingpercService } from './dlabingperc.service';

@Component({
    selector: 'jhi-dlabingperc-delete-dialog',
    templateUrl: './dlabingperc-delete-dialog.component.html'
})
export class DlabingpercDeleteDialogComponent {

    dlabingperc: Dlabingperc;

    constructor(
        private dlabingpercService: DlabingpercService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dlabingpercService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dlabingpercListModification',
                content: 'Deleted an dlabingperc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dlabingperc-delete-popup',
    template: ''
})
export class DlabingpercDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dlabingpercPopupService: DlabingpercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dlabingpercPopupService
                .open(DlabingpercDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
