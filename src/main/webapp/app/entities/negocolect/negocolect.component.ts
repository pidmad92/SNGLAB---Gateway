import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Negocolect } from './negocolect.model';
import { NegocolectService } from './negocolect.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-negocolect',
    templateUrl: './negocolect.component.html'
})
export class NegocolectComponent implements OnInit, OnDestroy {
negocolects: Negocolect[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private negocolectService: NegocolectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.negocolectService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.negocolects = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.negocolectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.negocolects = res.json;
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
        this.registerChangeInNegocolects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Negocolect) {
        return item.id;
    }
    registerChangeInNegocolects() {
        this.eventSubscriber = this.eventManager.subscribe('negocolectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
