import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dlabingrperc } from './dlabingrperc.model';
import { DlabingrpercPopupService } from './dlabingrperc-popup.service';
import { DlabingrpercService } from './dlabingrperc.service';

@Component({
    selector: 'jhi-dlabingrperc-delete-dialog',
    templateUrl: './dlabingrperc-delete-dialog.component.html'
})
export class DlabingrpercDeleteDialogComponent {

    dlabingrperc: Dlabingrperc;

    constructor(
        private dlabingrpercService: DlabingrpercService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dlabingrpercService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dlabingrpercListModification',
                content: 'Deleted an dlabingrperc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dlabingrperc-delete-popup',
    template: ''
})
export class DlabingrpercDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dlabingrpercPopupService: DlabingrpercPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dlabingrpercPopupService
                .open(DlabingrpercDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
