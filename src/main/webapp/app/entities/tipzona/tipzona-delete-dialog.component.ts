import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipzona } from './tipzona.model';
import { TipzonaPopupService } from './tipzona-popup.service';
import { TipzonaService } from './tipzona.service';

@Component({
    selector: 'jhi-tipzona-delete-dialog',
    templateUrl: './tipzona-delete-dialog.component.html'
})
export class TipzonaDeleteDialogComponent {

    tipzona: Tipzona;

    constructor(
        private tipzonaService: TipzonaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipzonaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipzonaListModification',
                content: 'Deleted an tipzona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipzona-delete-popup',
    template: ''
})
export class TipzonaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipzonaPopupService: TipzonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipzonaPopupService
                .open(TipzonaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
