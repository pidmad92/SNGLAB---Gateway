import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Calidenu } from './calidenu.model';
import { CalidenuPopupService } from './calidenu-popup.service';
import { CalidenuService } from './calidenu.service';

@Component({
    selector: 'jhi-calidenu-delete-dialog',
    templateUrl: './calidenu-delete-dialog.component.html'
})
export class CalidenuDeleteDialogComponent {

    calidenu: Calidenu;

    constructor(
        private calidenuService: CalidenuService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.calidenuService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'calidenuListModification',
                content: 'Deleted an calidenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-calidenu-delete-popup',
    template: ''
})
export class CalidenuDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private calidenuPopupService: CalidenuPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.calidenuPopupService
                .open(CalidenuDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
