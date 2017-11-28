import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Respinforma } from './respinforma.model';
import { RespinformaPopupService } from './respinforma-popup.service';
import { RespinformaService } from './respinforma.service';

@Component({
    selector: 'jhi-respinforma-delete-dialog',
    templateUrl: './respinforma-delete-dialog.component.html'
})
export class RespinformaDeleteDialogComponent {

    respinforma: Respinforma;

    constructor(
        private respinformaService: RespinformaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.respinformaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'respinformaListModification',
                content: 'Deleted an respinforma'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-respinforma-delete-popup',
    template: ''
})
export class RespinformaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private respinformaPopupService: RespinformaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.respinformaPopupService
                .open(RespinformaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
