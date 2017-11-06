import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Sucesor } from './sucesor.model';
import { SucesorPopupService } from './sucesor-popup.service';
import { SucesorService } from './sucesor.service';

@Component({
    selector: 'jhi-sucesor-delete-dialog',
    templateUrl: './sucesor-delete-dialog.component.html'
})
export class SucesorDeleteDialogComponent {

    sucesor: Sucesor;

    constructor(
        private sucesorService: SucesorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sucesorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'sucesorListModification',
                content: 'Deleted an sucesor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sucesor-delete-popup',
    template: ''
})
export class SucesorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sucesorPopupService: SucesorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sucesorPopupService
                .open(SucesorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
