import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipoorganiz } from './tipoorganiz.model';
import { TipoorganizPopupService } from './tipoorganiz-popup.service';
import { TipoorganizService } from './tipoorganiz.service';

@Component({
    selector: 'jhi-tipoorganiz-delete-dialog',
    templateUrl: './tipoorganiz-delete-dialog.component.html'
})
export class TipoorganizDeleteDialogComponent {

    tipoorganiz: Tipoorganiz;

    constructor(
        private tipoorganizService: TipoorganizService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoorganizService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoorganizListModification',
                content: 'Deleted an tipoorganiz'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipoorganiz-delete-popup',
    template: ''
})
export class TipoorganizDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoorganizPopupService: TipoorganizPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoorganizPopupService
                .open(TipoorganizDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
