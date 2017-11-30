import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sindicato } from './sindicato.model';
import { SindicatoPopupService } from './sindicato-popup.service';
import { SindicatoService } from './sindicato.service';

@Component({
    selector: 'jhi-sindicato-delete-dialog',
    templateUrl: './sindicato-delete-dialog.component.html'
})
export class SindicatoDeleteDialogComponent {

    sindicato: Sindicato;

    constructor(
        private sindicatoService: SindicatoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sindicatoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sindicatoListModification',
                content: 'Deleted an sindicato'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sindicato-delete-popup',
    template: ''
})
export class SindicatoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sindicatoPopupService: SindicatoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sindicatoPopupService
                .open(SindicatoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
