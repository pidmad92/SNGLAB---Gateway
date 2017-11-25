import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Reporteres } from './reporteres.model';
import { ReporteresPopupService } from './reporteres-popup.service';
import { ReporteresService } from './reporteres.service';

@Component({
    selector: 'jhi-reporteres-delete-dialog',
    templateUrl: './reporteres-delete-dialog.component.html'
})
export class ReporteresDeleteDialogComponent {

    reporteres: Reporteres;

    constructor(
        private reporteresService: ReporteresService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reporteresService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'reporteresListModification',
                content: 'Deleted an reporteres'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reporteres-delete-popup',
    template: ''
})
export class ReporteresDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private reporteresPopupService: ReporteresPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.reporteresPopupService
                .open(ReporteresDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
