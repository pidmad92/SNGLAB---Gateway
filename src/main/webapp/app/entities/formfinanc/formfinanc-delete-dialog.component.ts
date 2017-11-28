import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Formfinanc } from './formfinanc.model';
import { FormfinancPopupService } from './formfinanc-popup.service';
import { FormfinancService } from './formfinanc.service';

@Component({
    selector: 'jhi-formfinanc-delete-dialog',
    templateUrl: './formfinanc-delete-dialog.component.html'
})
export class FormfinancDeleteDialogComponent {

    formfinanc: Formfinanc;

    constructor(
        private formfinancService: FormfinancService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formfinancService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formfinancListModification',
                content: 'Deleted an formfinanc'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formfinanc-delete-popup',
    template: ''
})
export class FormfinancDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formfinancPopupService: FormfinancPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formfinancPopupService
                .open(FormfinancDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
