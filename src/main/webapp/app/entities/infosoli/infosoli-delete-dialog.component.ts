import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Infosoli } from './infosoli.model';
import { InfosoliPopupService } from './infosoli-popup.service';
import { InfosoliService } from './infosoli.service';

@Component({
    selector: 'jhi-infosoli-delete-dialog',
    templateUrl: './infosoli-delete-dialog.component.html'
})
export class InfosoliDeleteDialogComponent {

    infosoli: Infosoli;

    constructor(
        private infosoliService: InfosoliService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.infosoliService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'infosoliListModification',
                content: 'Deleted an infosoli'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-infosoli-delete-popup',
    template: ''
})
export class InfosoliDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private infosoliPopupService: InfosoliPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.infosoliPopupService
                .open(InfosoliDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
