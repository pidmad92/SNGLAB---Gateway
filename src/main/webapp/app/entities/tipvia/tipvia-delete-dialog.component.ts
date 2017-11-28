import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipvia } from './tipvia.model';
import { TipviaPopupService } from './tipvia-popup.service';
import { TipviaService } from './tipvia.service';

@Component({
    selector: 'jhi-tipvia-delete-dialog',
    templateUrl: './tipvia-delete-dialog.component.html'
})
export class TipviaDeleteDialogComponent {

    tipvia: Tipvia;

    constructor(
        private tipviaService: TipviaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipviaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipviaListModification',
                content: 'Deleted an tipvia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipvia-delete-popup',
    template: ''
})
export class TipviaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipviaPopupService: TipviaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipviaPopupService
                .open(TipviaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
