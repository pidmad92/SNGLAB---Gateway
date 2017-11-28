import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Resolucrd } from './resolucrd.model';
import { ResolucrdService } from './resolucrd.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-resolucrd',
    templateUrl: './resolucrd.component.html'
})
export class ResolucrdComponent implements OnInit, OnDestroy {
resolucrds: Resolucrd[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private resolucrdService: ResolucrdService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.resolucrdService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.resolucrds = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.resolucrdService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resolucrds = res.json;
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
        this.registerChangeInResolucrds();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Resolucrd) {
        return item.id;
    }
    registerChangeInResolucrds() {
        this.eventSubscriber = this.eventManager.subscribe('resolucrdListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
