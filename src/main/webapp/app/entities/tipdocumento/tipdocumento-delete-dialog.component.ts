import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocumento } from './tipdocumento.model';
import { TipdocumentoPopupService } from './tipdocumento-popup.service';
import { TipdocumentoService } from './tipdocumento.service';

@Component({
    selector: 'jhi-tipdocumento-delete-dialog',
    templateUrl: './tipdocumento-delete-dialog.component.html'
})
export class TipdocumentoDeleteDialogComponent {

    tipdocumento: Tipdocumento;

    constructor(
        private tipdocumentoService: TipdocumentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdocumentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdocumentoListModification',
                content: 'Deleted an tipdocumento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdocumento-delete-popup',
    template: ''
})
export class TipdocumentoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocumentoPopupService: TipdocumentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdocumentoPopupService
                .open(TipdocumentoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
