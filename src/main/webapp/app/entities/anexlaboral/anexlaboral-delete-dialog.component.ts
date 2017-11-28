import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Anexlaboral } from './anexlaboral.model';
import { AnexlaboralPopupService } from './anexlaboral-popup.service';
import { AnexlaboralService } from './anexlaboral.service';

@Component({
    selector: 'jhi-anexlaboral-delete-dialog',
    templateUrl: './anexlaboral-delete-dialog.component.html'
})
export class AnexlaboralDeleteDialogComponent {

    anexlaboral: Anexlaboral;

    constructor(
        private anexlaboralService: AnexlaboralService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.anexlaboralService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'anexlaboralListModification',
                content: 'Deleted an anexlaboral'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-anexlaboral-delete-popup',
    template: ''
})
export class AnexlaboralDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private anexlaboralPopupService: AnexlaboralPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.anexlaboralPopupService
                .open(AnexlaboralDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
