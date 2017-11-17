import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Direcnotif } from './direcnotif.model';
import { DirecnotifPopupService } from './direcnotif-popup.service';
import { DirecnotifService } from './direcnotif.service';

@Component({
    selector: 'jhi-direcnotif-delete-dialog',
    templateUrl: './direcnotif-delete-dialog.component.html'
})
export class DirecnotifDeleteDialogComponent {

    direcnotif: Direcnotif;

    constructor(
        private direcnotifService: DirecnotifService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direcnotifService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'direcnotifListModification',
                content: 'Deleted an direcnotif'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-direcnotif-delete-popup',
    template: ''
})
export class DirecnotifDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direcnotifPopupService: DirecnotifPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.direcnotifPopupService
                .open(DirecnotifDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
