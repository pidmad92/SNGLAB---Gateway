import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tippersona } from './tippersona.model';
import { TippersonaPopupService } from './tippersona-popup.service';
import { TippersonaService } from './tippersona.service';

@Component({
    selector: 'jhi-tippersona-delete-dialog',
    templateUrl: './tippersona-delete-dialog.component.html'
})
export class TippersonaDeleteDialogComponent {

    tippersona: Tippersona;

    constructor(
        private tippersonaService: TippersonaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tippersonaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tippersonaListModification',
                content: 'Deleted an tippersona'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tippersona-delete-popup',
    template: ''
})
export class TippersonaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tippersonaPopupService: TippersonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tippersonaPopupService
                .open(TippersonaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
