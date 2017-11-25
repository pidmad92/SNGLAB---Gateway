import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Interesperi } from './interesperi.model';
import { InteresperiPopupService } from './interesperi-popup.service';
import { InteresperiService } from './interesperi.service';

@Component({
    selector: 'jhi-interesperi-delete-dialog',
    templateUrl: './interesperi-delete-dialog.component.html'
})
export class InteresperiDeleteDialogComponent {

    interesperi: Interesperi;

    constructor(
        private interesperiService: InteresperiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.interesperiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'interesperiListModification',
                content: 'Deleted an interesperi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-interesperi-delete-popup',
    template: ''
})
export class InteresperiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private interesperiPopupService: InteresperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.interesperiPopupService
                .open(InteresperiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
