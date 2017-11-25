import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipcalconre } from './tipcalconre.model';
import { TipcalconrePopupService } from './tipcalconre-popup.service';
import { TipcalconreService } from './tipcalconre.service';

@Component({
    selector: 'jhi-tipcalconre-delete-dialog',
    templateUrl: './tipcalconre-delete-dialog.component.html'
})
export class TipcalconreDeleteDialogComponent {

    tipcalconre: Tipcalconre;

    constructor(
        private tipcalconreService: TipcalconreService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipcalconreService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipcalconreListModification',
                content: 'Deleted an tipcalconre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipcalconre-delete-popup',
    template: ''
})
export class TipcalconreDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipcalconrePopupService: TipcalconrePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipcalconrePopupService
                .open(TipcalconreDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
