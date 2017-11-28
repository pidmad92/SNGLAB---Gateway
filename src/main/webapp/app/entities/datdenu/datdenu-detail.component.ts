import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Datdenu } from './datdenu.model';
import { DatdenuService } from './datdenu.service';

@Component({
    selector: 'jhi-datdenu-detail',
    templateUrl: './datdenu-detail.component.html'
})
export class DatdenuDetailComponent implements OnInit, OnDestroy {

    datdenu: Datdenu;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private datdenuService: DatdenuService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDatdenus();
    }

    load(id) {
        this.datdenuService.find(id).subscribe((datdenu) => {
            this.datdenu = datdenu;
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

    registerChangeInDatdenus() {
        this.eventSubscriber = this.eventManager.subscribe(
            'datdenuListModification',
            (response) => this.load(this.datdenu.id)
        );
    }
}
