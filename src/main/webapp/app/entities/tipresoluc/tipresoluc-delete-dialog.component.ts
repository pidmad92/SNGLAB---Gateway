import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipresoluc } from './tipresoluc.model';
import { TipresolucPopupService } from './tipresoluc-popup.service';
import { TipresolucService } from './tipresoluc.service';

@Component({
    selector: 'jhi-tipresoluc-delete-dialog',
    templateUrl: './tipresoluc-delete-dialog.component.html'
})
export class TipresolucDeleteDialogComponent {

    tipresoluc: Tipresoluc;

    constructor(
        private tipresolucService: TipresolucService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipresolucService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipresolucListModification',
                content: 'Deleted an tipresoluc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipresoluc-delete-popup',
    template: ''
})
export class TipresolucDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipresolucPopupService: TipresolucPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipresolucPopupService
                .open(TipresolucDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
