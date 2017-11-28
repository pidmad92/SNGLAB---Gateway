import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Formarchivo } from './formarchivo.model';
import { FormarchivoPopupService } from './formarchivo-popup.service';
import { FormarchivoService } from './formarchivo.service';

@Component({
    selector: 'jhi-formarchivo-delete-dialog',
    templateUrl: './formarchivo-delete-dialog.component.html'
})
export class FormarchivoDeleteDialogComponent {

    formarchivo: Formarchivo;

    constructor(
        private formarchivoService: FormarchivoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formarchivoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formarchivoListModification',
                content: 'Deleted an formarchivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formarchivo-delete-popup',
    template: ''
})
export class FormarchivoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formarchivoPopupService: FormarchivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formarchivoPopupService
                .open(FormarchivoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
