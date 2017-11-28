import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Atencionpj } from './atencionpj.model';
import { AtencionpjPopupService } from './atencionpj-popup.service';
import { AtencionpjService } from './atencionpj.service';

@Component({
    selector: 'jhi-atencionpj-delete-dialog',
    templateUrl: './atencionpj-delete-dialog.component.html'
})
export class AtencionpjDeleteDialogComponent {

    atencionpj: Atencionpj;

    constructor(
        private atencionpjService: AtencionpjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atencionpjService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atencionpjListModification',
                content: 'Deleted an atencionpj'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atencionpj-delete-popup',
    template: ''
})
export class AtencionpjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atencionpjPopupService: AtencionpjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atencionpjPopupService
                .open(AtencionpjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
