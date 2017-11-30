import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tiporecurso } from './tiporecurso.model';
import { TiporecursoPopupService } from './tiporecurso-popup.service';
import { TiporecursoService } from './tiporecurso.service';

@Component({
    selector: 'jhi-tiporecurso-delete-dialog',
    templateUrl: './tiporecurso-delete-dialog.component.html'
})
export class TiporecursoDeleteDialogComponent {

    tiporecurso: Tiporecurso;

    constructor(
        private tiporecursoService: TiporecursoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tiporecursoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tiporecursoListModification',
                content: 'Deleted an tiporecurso'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tiporecurso-delete-popup',
    template: ''
})
export class TiporecursoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tiporecursoPopupService: TiporecursoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tiporecursoPopupService
                .open(TiporecursoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
