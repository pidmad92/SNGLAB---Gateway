import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipvinculo } from './tipvinculo.model';
import { TipvinculoPopupService } from './tipvinculo-popup.service';
import { TipvinculoService } from './tipvinculo.service';

@Component({
    selector: 'jhi-tipvinculo-delete-dialog',
    templateUrl: './tipvinculo-delete-dialog.component.html'
})
export class TipvinculoDeleteDialogComponent {

    tipvinculo: Tipvinculo;

    constructor(
        private tipvinculoService: TipvinculoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipvinculoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipvinculoListModification',
                content: 'Deleted an tipvinculo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipvinculo-delete-popup',
    template: ''
})
export class TipvinculoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipvinculoPopupService: TipvinculoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipvinculoPopupService
                .open(TipvinculoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
