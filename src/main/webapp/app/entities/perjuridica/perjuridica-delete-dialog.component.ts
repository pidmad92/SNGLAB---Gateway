import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Perjuridica } from './perjuridica.model';
import { PerjuridicaPopupService } from './perjuridica-popup.service';
import { PerjuridicaService } from './perjuridica.service';

@Component({
    selector: 'jhi-perjuridica-delete-dialog',
    templateUrl: './perjuridica-delete-dialog.component.html'
})
export class PerjuridicaDeleteDialogComponent {

    perjuridica: Perjuridica;

    constructor(
        private perjuridicaService: PerjuridicaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.perjuridicaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'perjuridicaListModification',
                content: 'Deleted an perjuridica'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-perjuridica-delete-popup',
    template: ''
})
export class PerjuridicaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private perjuridicaPopupService: PerjuridicaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.perjuridicaPopupService
                .open(PerjuridicaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
