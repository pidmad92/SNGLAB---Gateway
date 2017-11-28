import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Undnegocio } from './undnegocio.model';
import { UndnegocioPopupService } from './undnegocio-popup.service';
import { UndnegocioService } from './undnegocio.service';

@Component({
    selector: 'jhi-undnegocio-delete-dialog',
    templateUrl: './undnegocio-delete-dialog.component.html'
})
export class UndnegocioDeleteDialogComponent {

    undnegocio: Undnegocio;

    constructor(
        private undnegocioService: UndnegocioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.undnegocioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'undnegocioListModification',
                content: 'Deleted an undnegocio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-undnegocio-delete-popup',
    template: ''
})
export class UndnegocioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private undnegocioPopupService: UndnegocioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.undnegocioPopupService
                .open(UndnegocioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
