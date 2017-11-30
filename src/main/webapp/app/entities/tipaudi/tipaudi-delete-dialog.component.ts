import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipaudi } from './tipaudi.model';
import { TipaudiPopupService } from './tipaudi-popup.service';
import { TipaudiService } from './tipaudi.service';

@Component({
    selector: 'jhi-tipaudi-delete-dialog',
    templateUrl: './tipaudi-delete-dialog.component.html'
})
export class TipaudiDeleteDialogComponent {

    tipaudi: Tipaudi;

    constructor(
        private tipaudiService: TipaudiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipaudiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipaudiListModification',
                content: 'Deleted an tipaudi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipaudi-delete-popup',
    template: ''
})
export class TipaudiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipaudiPopupService: TipaudiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipaudiPopupService
                .open(TipaudiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
