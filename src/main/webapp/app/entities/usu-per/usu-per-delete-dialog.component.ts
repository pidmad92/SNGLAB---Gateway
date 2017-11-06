import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UsuPer } from './usu-per.model';
import { UsuPerPopupService } from './usu-per-popup.service';
import { UsuPerService } from './usu-per.service';

@Component({
    selector: 'jhi-usu-per-delete-dialog',
    templateUrl: './usu-per-delete-dialog.component.html'
})
export class UsuPerDeleteDialogComponent {

    usuPer: UsuPer;

    constructor(
        private usuPerService: UsuPerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.usuPerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'usuPerListModification',
                content: 'Deleted an usuPer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-usu-per-delete-popup',
    template: ''
})
export class UsuPerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private usuPerPopupService: UsuPerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.usuPerPopupService
                .open(UsuPerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
