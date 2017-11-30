import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Juntadirect } from './juntadirect.model';
import { JuntadirectPopupService } from './juntadirect-popup.service';
import { JuntadirectService } from './juntadirect.service';

@Component({
    selector: 'jhi-juntadirect-delete-dialog',
    templateUrl: './juntadirect-delete-dialog.component.html'
})
export class JuntadirectDeleteDialogComponent {

    juntadirect: Juntadirect;

    constructor(
        private juntadirectService: JuntadirectService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.juntadirectService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'juntadirectListModification',
                content: 'Deleted an juntadirect'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-juntadirect-delete-popup',
    template: ''
})
export class JuntadirectDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private juntadirectPopupService: JuntadirectPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.juntadirectPopupService
                .open(JuntadirectDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
