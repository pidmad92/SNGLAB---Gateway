import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Horacon } from './horacon.model';
import { HoraconPopupService } from './horacon-popup.service';
import { HoraconService } from './horacon.service';

@Component({
    selector: 'jhi-horacon-delete-dialog',
    templateUrl: './horacon-delete-dialog.component.html'
})
export class HoraconDeleteDialogComponent {

    horacon: Horacon;

    constructor(
        private horaconService: HoraconService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horaconService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'horaconListModification',
                content: 'Deleted an horacon'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-horacon-delete-popup',
    template: ''
})
export class HoraconDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horaconPopupService: HoraconPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.horaconPopupService
                .open(HoraconDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
