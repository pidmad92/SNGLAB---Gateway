import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Pasegl } from './pasegl.model';
import { PaseglPopupService } from './pasegl-popup.service';
import { PaseglService } from './pasegl.service';

@Component({
    selector: 'jhi-pasegl-delete-dialog',
    templateUrl: './pasegl-delete-dialog.component.html'
})
export class PaseglDeleteDialogComponent {

    pasegl: Pasegl;

    constructor(
        private paseglService: PaseglService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.paseglService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'paseglListModification',
                content: 'Deleted an pasegl'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pasegl-delete-popup',
    template: ''
})
export class PaseglDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private paseglPopupService: PaseglPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.paseglPopupService
                .open(PaseglDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
