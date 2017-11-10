import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Atendisca } from './atendisca.model';
import { AtendiscaPopupService } from './atendisca-popup.service';
import { AtendiscaService } from './atendisca.service';

@Component({
    selector: 'jhi-atendisca-delete-dialog',
    templateUrl: './atendisca-delete-dialog.component.html'
})
export class AtendiscaDeleteDialogComponent {

    atendisca: Atendisca;

    constructor(
        private atendiscaService: AtendiscaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.atendiscaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'atendiscaListModification',
                content: 'Deleted an atendisca'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-atendisca-delete-popup',
    template: ''
})
export class AtendiscaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private atendiscaPopupService: AtendiscaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.atendiscaPopupService
                .open(AtendiscaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
