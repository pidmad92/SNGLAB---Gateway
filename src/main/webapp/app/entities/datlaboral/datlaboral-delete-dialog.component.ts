import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Datlaboral } from './datlaboral.model';
import { DatlaboralPopupService } from './datlaboral-popup.service';
import { DatlaboralService } from './datlaboral.service';

@Component({
    selector: 'jhi-datlaboral-delete-dialog',
    templateUrl: './datlaboral-delete-dialog.component.html'
})
export class DatlaboralDeleteDialogComponent {

    datlaboral: Datlaboral;

    constructor(
        private datlaboralService: DatlaboralService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.datlaboralService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'datlaboralListModification',
                content: 'Deleted an datlaboral'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-datlaboral-delete-popup',
    template: ''
})
export class DatlaboralDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private datlaboralPopupService: DatlaboralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.datlaboralPopupService
                .open(DatlaboralDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
