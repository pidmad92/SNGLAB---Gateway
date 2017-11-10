import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipatencion } from './tipatencion.model';
import { TipatencionPopupService } from './tipatencion-popup.service';
import { TipatencionService } from './tipatencion.service';

@Component({
    selector: 'jhi-tipatencion-delete-dialog',
    templateUrl: './tipatencion-delete-dialog.component.html'
})
export class TipatencionDeleteDialogComponent {

    tipatencion: Tipatencion;

    constructor(
        private tipatencionService: TipatencionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipatencionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipatencionListModification',
                content: 'Deleted an tipatencion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipatencion-delete-popup',
    template: ''
})
export class TipatencionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipatencionPopupService: TipatencionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipatencionPopupService
                .open(TipatencionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
