import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Dirperjuri } from './dirperjuri.model';
import { DirperjuriPopupService } from './dirperjuri-popup.service';
import { DirperjuriService } from './dirperjuri.service';

@Component({
    selector: 'jhi-dirperjuri-delete-dialog',
    templateUrl: './dirperjuri-delete-dialog.component.html'
})
export class DirperjuriDeleteDialogComponent {

    dirperjuri: Dirperjuri;

    constructor(
        private dirperjuriService: DirperjuriService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.dirperjuriService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'dirperjuriListModification',
                content: 'Deleted an dirperjuri'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-dirperjuri-delete-popup',
    template: ''
})
export class DirperjuriDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private dirperjuriPopupService: DirperjuriPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.dirperjuriPopupService
                .open(DirperjuriDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
