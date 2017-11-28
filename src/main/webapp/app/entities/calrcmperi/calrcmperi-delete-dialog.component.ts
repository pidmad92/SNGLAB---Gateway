import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiPopupService } from './calrcmperi-popup.service';
import { CalrcmperiService } from './calrcmperi.service';

@Component({
    selector: 'jhi-calrcmperi-delete-dialog',
    templateUrl: './calrcmperi-delete-dialog.component.html'
})
export class CalrcmperiDeleteDialogComponent {

    calrcmperi: Calrcmperi;

    constructor(
        private calrcmperiService: CalrcmperiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calrcmperiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calrcmperiListModification',
                content: 'Deleted an calrcmperi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calrcmperi-delete-popup',
    template: ''
})
export class CalrcmperiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calrcmperiPopupService: CalrcmperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calrcmperiPopupService
                .open(CalrcmperiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
