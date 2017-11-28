import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Participa } from './participa.model';
import { ParticipaPopupService } from './participa-popup.service';
import { ParticipaService } from './participa.service';

@Component({
    selector: 'jhi-participa-delete-dialog',
    templateUrl: './participa-delete-dialog.component.html'
})
export class ParticipaDeleteDialogComponent {

    participa: Participa;

    constructor(
        private participaService: ParticipaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.participaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'participaListModification',
                content: 'Deleted an participa'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-participa-delete-popup',
    template: ''
})
export class ParticipaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private participaPopupService: ParticipaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.participaPopupService
                .open(ParticipaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
