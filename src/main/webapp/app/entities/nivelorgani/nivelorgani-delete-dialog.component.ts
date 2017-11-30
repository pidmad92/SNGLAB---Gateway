import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Nivelorgani } from './nivelorgani.model';
import { NivelorganiPopupService } from './nivelorgani-popup.service';
import { NivelorganiService } from './nivelorgani.service';

@Component({
    selector: 'jhi-nivelorgani-delete-dialog',
    templateUrl: './nivelorgani-delete-dialog.component.html'
})
export class NivelorganiDeleteDialogComponent {

    nivelorgani: Nivelorgani;

    constructor(
        private nivelorganiService: NivelorganiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.nivelorganiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'nivelorganiListModification',
                content: 'Deleted an nivelorgani'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-nivelorgani-delete-popup',
    template: ''
})
export class NivelorganiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private nivelorganiPopupService: NivelorganiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.nivelorganiPopupService
                .open(NivelorganiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
