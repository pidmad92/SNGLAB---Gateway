import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipproveid } from './tipproveid.model';
import { TipproveidPopupService } from './tipproveid-popup.service';
import { TipproveidService } from './tipproveid.service';

@Component({
    selector: 'jhi-tipproveid-delete-dialog',
    templateUrl: './tipproveid-delete-dialog.component.html'
})
export class TipproveidDeleteDialogComponent {

    tipproveid: Tipproveid;

    constructor(
        private tipproveidService: TipproveidService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipproveidService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipproveidListModification',
                content: 'Deleted an tipproveid'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipproveid-delete-popup',
    template: ''
})
export class TipproveidDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipproveidPopupService: TipproveidPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipproveidPopupService
                .open(TipproveidDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
