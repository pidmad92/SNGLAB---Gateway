import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tipcalperi } from './tipcalperi.model';
import { TipcalperiPopupService } from './tipcalperi-popup.service';
import { TipcalperiService } from './tipcalperi.service';

@Component({
    selector: 'jhi-tipcalperi-delete-dialog',
    templateUrl: './tipcalperi-delete-dialog.component.html'
})
export class TipcalperiDeleteDialogComponent {

    tipcalperi: Tipcalperi;

    constructor(
        private tipcalperiService: TipcalperiService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipcalperiService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipcalperiListModification',
                content: 'Deleted an tipcalperi'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipcalperi-delete-popup',
    template: ''
})
export class TipcalperiDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipcalperiPopupService: TipcalperiPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipcalperiPopupService
                .open(TipcalperiDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
