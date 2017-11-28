import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Denunte } from './denunte.model';
import { DenuntePopupService } from './denunte-popup.service';
import { DenunteService } from './denunte.service';

@Component({
    selector: 'jhi-denunte-delete-dialog',
    templateUrl: './denunte-delete-dialog.component.html'
})
export class DenunteDeleteDialogComponent {

    denunte: Denunte;

    constructor(
        private denunteService: DenunteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.denunteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'denunteListModification',
                content: 'Deleted an denunte'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-denunte-delete-popup',
    template: ''
})
export class DenunteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denuntePopupService: DenuntePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.denuntePopupService
                .open(DenunteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
