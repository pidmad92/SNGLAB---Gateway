import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Delegado } from './delegado.model';
import { DelegadoPopupService } from './delegado-popup.service';
import { DelegadoService } from './delegado.service';

@Component({
    selector: 'jhi-delegado-delete-dialog',
    templateUrl: './delegado-delete-dialog.component.html'
})
export class DelegadoDeleteDialogComponent {

    delegado: Delegado;

    constructor(
        private delegadoService: DelegadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.delegadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'delegadoListModification',
                content: 'Deleted an delegado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-delegado-delete-popup',
    template: ''
})
export class DelegadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private delegadoPopupService: DelegadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.delegadoPopupService
                .open(DelegadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
