import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Librosindic } from './librosindic.model';
import { LibrosindicPopupService } from './librosindic-popup.service';
import { LibrosindicService } from './librosindic.service';

@Component({
    selector: 'jhi-librosindic-delete-dialog',
    templateUrl: './librosindic-delete-dialog.component.html'
})
export class LibrosindicDeleteDialogComponent {

    librosindic: Librosindic;

    constructor(
        private librosindicService: LibrosindicService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.librosindicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'librosindicListModification',
                content: 'Deleted an librosindic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-librosindic-delete-popup',
    template: ''
})
export class LibrosindicDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private librosindicPopupService: LibrosindicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.librosindicPopupService
                .open(LibrosindicDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
