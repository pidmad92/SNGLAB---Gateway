import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estexpedien } from './estexpedien.model';
import { EstexpedienPopupService } from './estexpedien-popup.service';
import { EstexpedienService } from './estexpedien.service';

@Component({
    selector: 'jhi-estexpedien-delete-dialog',
    templateUrl: './estexpedien-delete-dialog.component.html'
})
export class EstexpedienDeleteDialogComponent {

    estexpedien: Estexpedien;

    constructor(
        private estexpedienService: EstexpedienService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estexpedienService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estexpedienListModification',
                content: 'Deleted an estexpedien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estexpedien-delete-popup',
    template: ''
})
export class EstexpedienDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estexpedienPopupService: EstexpedienPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estexpedienPopupService
                .open(EstexpedienDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
