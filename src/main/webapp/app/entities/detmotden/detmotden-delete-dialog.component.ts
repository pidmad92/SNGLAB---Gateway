import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Detmotden } from './detmotden.model';
import { DetmotdenPopupService } from './detmotden-popup.service';
import { DetmotdenService } from './detmotden.service';

@Component({
    selector: 'jhi-detmotden-delete-dialog',
    templateUrl: './detmotden-delete-dialog.component.html'
})
export class DetmotdenDeleteDialogComponent {

    detmotden: Detmotden;

    constructor(
        private detmotdenService: DetmotdenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detmotdenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'detmotdenListModification',
                content: 'Deleted an detmotden'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detmotden-delete-popup',
    template: ''
})
export class DetmotdenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detmotdenPopupService: DetmotdenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.detmotdenPopupService
                .open(DetmotdenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
