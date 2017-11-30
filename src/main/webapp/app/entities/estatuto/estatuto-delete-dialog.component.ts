import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Estatuto } from './estatuto.model';
import { EstatutoPopupService } from './estatuto-popup.service';
import { EstatutoService } from './estatuto.service';

@Component({
    selector: 'jhi-estatuto-delete-dialog',
    templateUrl: './estatuto-delete-dialog.component.html'
})
export class EstatutoDeleteDialogComponent {

    estatuto: Estatuto;

    constructor(
        private estatutoService: EstatutoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estatutoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estatutoListModification',
                content: 'Deleted an estatuto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estatuto-delete-popup',
    template: ''
})
export class EstatutoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estatutoPopupService: EstatutoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estatutoPopupService
                .open(EstatutoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
