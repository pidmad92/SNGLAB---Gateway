import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Direcalter } from './direcalter.model';
import { DirecalterPopupService } from './direcalter-popup.service';
import { DirecalterService } from './direcalter.service';

@Component({
    selector: 'jhi-direcalter-delete-dialog',
    templateUrl: './direcalter-delete-dialog.component.html'
})
export class DirecalterDeleteDialogComponent {

    direcalter: Direcalter;

    constructor(
        private direcalterService: DirecalterService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direcalterService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'direcalterListModification',
                content: 'Deleted an direcalter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-direcalter-delete-popup',
    template: ''
})
export class DirecalterDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direcalterPopupService: DirecalterPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.direcalterPopupService
                .open(DirecalterDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
