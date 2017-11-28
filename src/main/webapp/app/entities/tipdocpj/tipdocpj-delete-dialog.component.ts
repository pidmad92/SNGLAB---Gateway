import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipdocpj } from './tipdocpj.model';
import { TipdocpjPopupService } from './tipdocpj-popup.service';
import { TipdocpjService } from './tipdocpj.service';

@Component({
    selector: 'jhi-tipdocpj-delete-dialog',
    templateUrl: './tipdocpj-delete-dialog.component.html'
})
export class TipdocpjDeleteDialogComponent {

    tipdocpj: Tipdocpj;

    constructor(
        private tipdocpjService: TipdocpjService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipdocpjService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipdocpjListModification',
                content: 'Deleted an tipdocpj'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipdocpj-delete-popup',
    template: ''
})
export class TipdocpjDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipdocpjPopupService: TipdocpjPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipdocpjPopupService
                .open(TipdocpjDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
