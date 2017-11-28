import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Reporteres } from './reporteres.model';
import { ReporteresService } from './reporteres.service';

@Component({
    selector: 'jhi-reporteres-detail',
    templateUrl: './reporteres-detail.component.html'
})
export class ReporteresDetailComponent implements OnInit, OnDestroy {

    reporteres: Reporteres;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private reporteresService: ReporteresService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInReporteres();
    }

    load(id) {
        this.reporteresService.find(id).subscribe((reporteres) => {
            this.reporteres = reporteres;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInReporteres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'reporteresListModification',
            (response) => this.load(this.reporteres.id)
        );
    }
}
