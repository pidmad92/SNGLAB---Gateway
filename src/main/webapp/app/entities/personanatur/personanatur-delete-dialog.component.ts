import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Personanatur } from './personanatur.model';
import { PersonanaturPopupService } from './personanatur-popup.service';
import { PersonanaturService } from './personanatur.service';

@Component({
    selector: 'jhi-personanatur-delete-dialog',
    templateUrl: './personanatur-delete-dialog.component.html'
})
export class PersonanaturDeleteDialogComponent {

    personanatur: Personanatur;

    constructor(
        private personanaturService: PersonanaturService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.personanaturService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'personanaturListModification',
                content: 'Deleted an personanatur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-personanatur-delete-popup',
    template: ''
})
export class PersonanaturDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private personanaturPopupService: PersonanaturPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.personanaturPopupService
                .open(PersonanaturDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
