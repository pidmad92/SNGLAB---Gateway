import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dirpernat } from './dirpernat.model';
import { DirpernatPopupService } from './dirpernat-popup.service';
import { DirpernatService } from './dirpernat.service';

@Component({
    selector: 'jhi-dirpernat-delete-dialog',
    templateUrl: './dirpernat-delete-dialog.component.html'
})
export class DirpernatDeleteDialogComponent {

    dirpernat: Dirpernat;

    constructor(
        private dirpernatService: DirpernatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dirpernatService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dirpernatListModification',
                content: 'Deleted an dirpernat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dirpernat-delete-popup',
    template: ''
})
export class DirpernatDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirpernatPopupService: DirpernatPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dirpernatPopupService
                .open(DirpernatDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
