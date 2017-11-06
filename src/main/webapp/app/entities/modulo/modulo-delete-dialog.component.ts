import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Modulo } from './modulo.model';
import { ModuloPopupService } from './modulo-popup.service';
import { ModuloService } from './modulo.service';

@Component({
    selector: 'jhi-modulo-delete-dialog',
    templateUrl: './modulo-delete-dialog.component.html'
})
export class ModuloDeleteDialogComponent {

    modulo: Modulo;

    constructor(
        private moduloService: ModuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.moduloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'moduloListModification',
                content: 'Deleted an modulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-modulo-delete-popup',
    template: ''
})
export class ModuloDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private moduloPopupService: ModuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.moduloPopupService
                .open(ModuloDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
