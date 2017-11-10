import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Grupo } from './grupo.model';
import { GrupoPopupService } from './grupo-popup.service';
import { GrupoService } from './grupo.service';

@Component({
    selector: 'jhi-grupo-delete-dialog',
    templateUrl: './grupo-delete-dialog.component.html'
})
export class GrupoDeleteDialogComponent {

    grupo: Grupo;

    constructor(
        private grupoService: GrupoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.grupoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'grupoListModification',
                content: 'Deleted an grupo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grupo-delete-popup',
    template: ''
})
export class GrupoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private grupoPopupService: GrupoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.grupoPopupService
                .open(GrupoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
