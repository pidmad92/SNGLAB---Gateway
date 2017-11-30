import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Afiliado } from './afiliado.model';
import { AfiliadoPopupService } from './afiliado-popup.service';
import { AfiliadoService } from './afiliado.service';

@Component({
    selector: 'jhi-afiliado-delete-dialog',
    templateUrl: './afiliado-delete-dialog.component.html'
})
export class AfiliadoDeleteDialogComponent {

    afiliado: Afiliado;

    constructor(
        private afiliadoService: AfiliadoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.afiliadoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'afiliadoListModification',
                content: 'Deleted an afiliado'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-afiliado-delete-popup',
    template: ''
})
export class AfiliadoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private afiliadoPopupService: AfiliadoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.afiliadoPopupService
                .open(AfiliadoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
