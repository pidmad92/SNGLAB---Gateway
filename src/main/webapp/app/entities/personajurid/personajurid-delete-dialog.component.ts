import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Personajurid } from './personajurid.model';
import { PersonajuridPopupService } from './personajurid-popup.service';
import { PersonajuridService } from './personajurid.service';

@Component({
    selector: 'jhi-personajurid-delete-dialog',
    templateUrl: './personajurid-delete-dialog.component.html'
})
export class PersonajuridDeleteDialogComponent {

    personajurid: Personajurid;

    constructor(
        private personajuridService: PersonajuridService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personajuridService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personajuridListModification',
                content: 'Deleted an personajurid'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-personajurid-delete-popup',
    template: ''
})
export class PersonajuridDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personajuridPopupService: PersonajuridPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personajuridPopupService
                .open(PersonajuridDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
