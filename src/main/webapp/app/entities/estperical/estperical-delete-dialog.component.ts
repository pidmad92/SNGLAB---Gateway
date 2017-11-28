import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estperical } from './estperical.model';
import { EstpericalPopupService } from './estperical-popup.service';
import { EstpericalService } from './estperical.service';

@Component({
    selector: 'jhi-estperical-delete-dialog',
    templateUrl: './estperical-delete-dialog.component.html'
})
export class EstpericalDeleteDialogComponent {

    estperical: Estperical;

    constructor(
        private estpericalService: EstpericalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estpericalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estpericalListModification',
                content: 'Deleted an estperical'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estperical-delete-popup',
    template: ''
})
export class EstpericalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estpericalPopupService: EstpericalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estpericalPopupService
                .open(EstpericalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
