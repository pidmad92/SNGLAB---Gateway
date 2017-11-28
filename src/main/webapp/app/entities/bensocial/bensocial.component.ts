import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Bensocial } from './bensocial.model';
import { BensocialService } from './bensocial.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bensocial',
    templateUrl: './bensocial.component.html'
})
export class BensocialComponent implements OnInit, OnDestroy {
bensocials: Bensocial[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private bensocialService: BensocialService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.bensocialService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.bensocials = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.bensocialService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bensocials = res.json;
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
        this.registerChangeInBensocials();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bensocial) {
        return item.id;
    }
    registerChangeInBensocials() {
        this.eventSubscriber = this.eventManager.subscribe('bensocialListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
