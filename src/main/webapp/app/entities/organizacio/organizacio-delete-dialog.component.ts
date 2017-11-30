import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Organizacio } from './organizacio.model';
import { OrganizacioPopupService } from './organizacio-popup.service';
import { OrganizacioService } from './organizacio.service';

@Component({
    selector: 'jhi-organizacio-delete-dialog',
    templateUrl: './organizacio-delete-dialog.component.html'
})
export class OrganizacioDeleteDialogComponent {

    organizacio: Organizacio;

    constructor(
        private organizacioService: OrganizacioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.organizacioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'organizacioListModification',
                content: 'Deleted an organizacio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-organizacio-delete-popup',
    template: ''
})
export class OrganizacioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private organizacioPopupService: OrganizacioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.organizacioPopupService
                .open(OrganizacioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
