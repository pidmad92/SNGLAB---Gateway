import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hechoinver } from './hechoinver.model';
import { HechoinverPopupService } from './hechoinver-popup.service';
import { HechoinverService } from './hechoinver.service';

@Component({
    selector: 'jhi-hechoinver-delete-dialog',
    templateUrl: './hechoinver-delete-dialog.component.html'
})
export class HechoinverDeleteDialogComponent {

    hechoinver: Hechoinver;

    constructor(
        private hechoinverService: HechoinverService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hechoinverService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hechoinverListModification',
                content: 'Deleted an hechoinver'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hechoinver-delete-popup',
    template: ''
})
export class HechoinverDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hechoinverPopupService: HechoinverPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hechoinverPopupService
                .open(HechoinverDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
