import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Categoriaor } from './categoriaor.model';
import { CategoriaorPopupService } from './categoriaor-popup.service';
import { CategoriaorService } from './categoriaor.service';

@Component({
    selector: 'jhi-categoriaor-delete-dialog',
    templateUrl: './categoriaor-delete-dialog.component.html'
})
export class CategoriaorDeleteDialogComponent {

    categoriaor: Categoriaor;

    constructor(
        private categoriaorService: CategoriaorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoriaorListModification',
                content: 'Deleted an categoriaor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoriaor-delete-popup',
    template: ''
})
export class CategoriaorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaorPopupService: CategoriaorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoriaorPopupService
                .open(CategoriaorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
