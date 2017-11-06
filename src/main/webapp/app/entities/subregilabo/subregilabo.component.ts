import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Subregilabo } from './subregilabo.model';
import { SubregilaboService } from './subregilabo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-subregilabo',
    templateUrl: './subregilabo.component.html'
})
export class SubregilaboComponent implements OnInit, OnDestroy {
subregilabos: Subregilabo[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private subregilaboService: SubregilaboService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.subregilaboService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.subregilabos = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.subregilaboService.query().subscribe(
            (res: ResponseWrapper) => {
                this.subregilabos = res.json;
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
        this.registerChangeInSubregilabos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Subregilabo) {
        return item.id;
    }
    registerChangeInSubregilabos() {
        this.eventSubscriber = this.eventManager.subscribe('subregilaboListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
