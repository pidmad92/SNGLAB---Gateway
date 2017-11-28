import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Formperfil } from './formperfil.model';
import { FormperfilPopupService } from './formperfil-popup.service';
import { FormperfilService } from './formperfil.service';

@Component({
    selector: 'jhi-formperfil-delete-dialog',
    templateUrl: './formperfil-delete-dialog.component.html'
})
export class FormperfilDeleteDialogComponent {

    formperfil: Formperfil;

    constructor(
        private formperfilService: FormperfilService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formperfilService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formperfilListModification',
                content: 'Deleted an formperfil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formperfil-delete-popup',
    template: ''
})
export class FormperfilDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formperfilPopupService: FormperfilPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formperfilPopupService
                .open(FormperfilDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
