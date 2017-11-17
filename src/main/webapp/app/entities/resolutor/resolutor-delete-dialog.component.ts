import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Resolutor } from './resolutor.model';
import { ResolutorPopupService } from './resolutor-popup.service';
import { ResolutorService } from './resolutor.service';

@Component({
    selector: 'jhi-resolutor-delete-dialog',
    templateUrl: './resolutor-delete-dialog.component.html'
})
export class ResolutorDeleteDialogComponent {

    resolutor: Resolutor;

    constructor(
        private resolutorService: ResolutorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.resolutorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'resolutorListModification',
                content: 'Deleted an resolutor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-resolutor-delete-popup',
    template: ''
})
export class ResolutorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private resolutorPopupService: ResolutorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.resolutorPopupService
                .open(ResolutorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
