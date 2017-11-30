import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Falsoexp } from './falsoexp.model';
import { FalsoexpService } from './falsoexp.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-falsoexp',
    templateUrl: './falsoexp.component.html'
})
export class FalsoexpComponent implements OnInit, OnDestroy {
falsoexps: Falsoexp[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private falsoexpService: FalsoexpService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.falsoexpService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.falsoexps = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.falsoexpService.query().subscribe(
            (res: ResponseWrapper) => {
                this.falsoexps = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFalsoexps();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Falsoexp) {
        return item.id;
    }
    registerChangeInFalsoexps() {
        this.eventSubscriber = this.eventManager.subscribe('falsoexpListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
