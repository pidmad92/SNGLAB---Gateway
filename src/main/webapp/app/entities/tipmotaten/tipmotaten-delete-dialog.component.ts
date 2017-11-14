import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipmotaten } from './tipmotaten.model';
import { TipmotatenPopupService } from './tipmotaten-popup.service';
import { TipmotatenService } from './tipmotaten.service';

@Component({
    selector: 'jhi-tipmotaten-delete-dialog',
    templateUrl: './tipmotaten-delete-dialog.component.html'
})
export class TipmotatenDeleteDialogComponent {

    tipmotaten: Tipmotaten;

    constructor(
        private tipmotatenService: TipmotatenService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipmotatenService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipmotatenListModification',
                content: 'Deleted an tipmotaten'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipmotaten-delete-popup',
    template: ''
})
export class TipmotatenDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipmotatenPopupService: TipmotatenPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipmotatenPopupService
                .open(TipmotatenDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
