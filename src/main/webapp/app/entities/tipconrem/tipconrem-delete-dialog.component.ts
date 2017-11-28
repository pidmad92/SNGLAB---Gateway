import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipconrem } from './tipconrem.model';
import { TipconremPopupService } from './tipconrem-popup.service';
import { TipconremService } from './tipconrem.service';

@Component({
    selector: 'jhi-tipconrem-delete-dialog',
    templateUrl: './tipconrem-delete-dialog.component.html'
})
export class TipconremDeleteDialogComponent {

    tipconrem: Tipconrem;

    constructor(
        private tipconremService: TipconremService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipconremService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipconremListModification',
                content: 'Deleted an tipconrem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipconrem-delete-popup',
    template: ''
})
export class TipconremDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipconremPopupService: TipconremPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipconremPopupService
                .open(TipconremDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
