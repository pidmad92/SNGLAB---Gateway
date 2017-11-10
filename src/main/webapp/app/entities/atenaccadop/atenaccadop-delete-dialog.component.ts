import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Atenaccadop } from './atenaccadop.model';
import { AtenaccadopPopupService } from './atenaccadop-popup.service';
import { AtenaccadopService } from './atenaccadop.service';

@Component({
    selector: 'jhi-atenaccadop-delete-dialog',
    templateUrl: './atenaccadop-delete-dialog.component.html'
})
export class AtenaccadopDeleteDialogComponent {

    atenaccadop: Atenaccadop;

    constructor(
        private atenaccadopService: AtenaccadopService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atenaccadopService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atenaccadopListModification',
                content: 'Deleted an atenaccadop'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atenaccadop-delete-popup',
    template: ''
})
export class AtenaccadopDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atenaccadopPopupService: AtenaccadopPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atenaccadopPopupService
                .open(AtenaccadopDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
