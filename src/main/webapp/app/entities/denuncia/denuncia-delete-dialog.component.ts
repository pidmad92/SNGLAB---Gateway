import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Denuncia } from './denuncia.model';
import { DenunciaPopupService } from './denuncia-popup.service';
import { DenunciaService } from './denuncia.service';

@Component({
    selector: 'jhi-denuncia-delete-dialog',
    templateUrl: './denuncia-delete-dialog.component.html'
})
export class DenunciaDeleteDialogComponent {

    denuncia: Denuncia;

    constructor(
        private denunciaService: DenunciaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.denunciaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'denunciaListModification',
                content: 'Deleted an denuncia'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-denuncia-delete-popup',
    template: ''
})
export class DenunciaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private denunciaPopupService: DenunciaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.denunciaPopupService
                .open(DenunciaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
