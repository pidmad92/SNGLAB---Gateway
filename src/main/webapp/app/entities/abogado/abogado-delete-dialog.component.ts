import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Abogado } from './abogado.model';
import { AbogadoPopupService } from './abogado-popup.service';
import { AbogadoService } from './abogado.service';

@Component({
    selector: 'jhi-abogado-delete-dialog',
    templateUrl: './abogado-delete-dialog.component.html'
})
export class AbogadoDeleteDialogComponent {

    abogado: Abogado;

    constructor(
        private abogadoService: AbogadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.abogadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'abogadoListModification',
                content: 'Deleted an abogado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-abogado-delete-popup',
    template: ''
})
export class AbogadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private abogadoPopupService: AbogadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.abogadoPopupService
                .open(AbogadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
