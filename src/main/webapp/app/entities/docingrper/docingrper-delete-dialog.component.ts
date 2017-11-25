import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Docingrper } from './docingrper.model';
import { DocingrperPopupService } from './docingrper-popup.service';
import { DocingrperService } from './docingrper.service';

@Component({
    selector: 'jhi-docingrper-delete-dialog',
    templateUrl: './docingrper-delete-dialog.component.html'
})
export class DocingrperDeleteDialogComponent {

    docingrper: Docingrper;

    constructor(
        private docingrperService: DocingrperService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.docingrperService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'docingrperListModification',
                content: 'Deleted an docingrper'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-docingrper-delete-popup',
    template: ''
})
export class DocingrperDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private docingrperPopupService: DocingrperPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.docingrperPopupService
                .open(DocingrperDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
