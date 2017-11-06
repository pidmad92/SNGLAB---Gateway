import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pernatudire } from './pernatudire.model';
import { PernatudirePopupService } from './pernatudire-popup.service';
import { PernatudireService } from './pernatudire.service';

@Component({
    selector: 'jhi-pernatudire-delete-dialog',
    templateUrl: './pernatudire-delete-dialog.component.html'
})
export class PernatudireDeleteDialogComponent {

    pernatudire: Pernatudire;

    constructor(
        private pernatudireService: PernatudireService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pernatudireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pernatudireListModification',
                content: 'Deleted an pernatudire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pernatudire-delete-popup',
    template: ''
})
export class PernatudireDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pernatudirePopupService: PernatudirePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pernatudirePopupService
                .open(PernatudireDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
