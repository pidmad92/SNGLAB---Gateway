import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dirdenun } from './dirdenun.model';
import { DirdenunPopupService } from './dirdenun-popup.service';
import { DirdenunService } from './dirdenun.service';

@Component({
    selector: 'jhi-dirdenun-delete-dialog',
    templateUrl: './dirdenun-delete-dialog.component.html'
})
export class DirdenunDeleteDialogComponent {

    dirdenun: Dirdenun;

    constructor(
        private dirdenunService: DirdenunService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dirdenunService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dirdenunListModification',
                content: 'Deleted an dirdenun'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dirdenun-delete-popup',
    template: ''
})
export class DirdenunDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirdenunPopupService: DirdenunPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dirdenunPopupService
                .open(DirdenunDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
