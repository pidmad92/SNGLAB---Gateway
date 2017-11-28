import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Actiecon } from './actiecon.model';
import { ActieconPopupService } from './actiecon-popup.service';
import { ActieconService } from './actiecon.service';

@Component({
    selector: 'jhi-actiecon-delete-dialog',
    templateUrl: './actiecon-delete-dialog.component.html'
})
export class ActieconDeleteDialogComponent {

    actiecon: Actiecon;

    constructor(
        private actieconService: ActieconService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.actieconService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'actieconListModification',
                content: 'Deleted an actiecon'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-actiecon-delete-popup',
    template: ''
})
export class ActieconDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private actieconPopupService: ActieconPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.actieconPopupService
                .open(ActieconDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
