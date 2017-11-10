import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hora } from './hora.model';
import { HoraPopupService } from './hora-popup.service';
import { HoraService } from './hora.service';

@Component({
    selector: 'jhi-hora-delete-dialog',
    templateUrl: './hora-delete-dialog.component.html'
})
export class HoraDeleteDialogComponent {

    hora: Hora;

    constructor(
        private horaService: HoraService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.horaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'horaListModification',
                content: 'Deleted an hora'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hora-delete-popup',
    template: ''
})
export class HoraDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private horaPopupService: HoraPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.horaPopupService
                .open(HoraDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
