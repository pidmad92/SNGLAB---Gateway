import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipolibro } from './tipolibro.model';
import { TipolibroPopupService } from './tipolibro-popup.service';
import { TipolibroService } from './tipolibro.service';

@Component({
    selector: 'jhi-tipolibro-delete-dialog',
    templateUrl: './tipolibro-delete-dialog.component.html'
})
export class TipolibroDeleteDialogComponent {

    tipolibro: Tipolibro;

    constructor(
        private tipolibroService: TipolibroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipolibroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipolibroListModification',
                content: 'Deleted an tipolibro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipolibro-delete-popup',
    template: ''
})
export class TipolibroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipolibroPopupService: TipolibroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipolibroPopupService
                .open(TipolibroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
