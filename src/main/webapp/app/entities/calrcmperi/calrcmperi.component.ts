import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Calrcmperi } from './calrcmperi.model';
import { CalrcmperiService } from './calrcmperi.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calrcmperi',
    templateUrl: './calrcmperi.component.html'
})
export class CalrcmperiComponent implements OnInit, OnDestroy {
calrcmperis: Calrcmperi[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private calrcmperiService: CalrcmperiService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.calrcmperiService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.calrcmperis = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.calrcmperiService.query().subscribe(
            (res: ResponseWrapper) => {
                this.calrcmperis = res.json;
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
        this.registerChangeInCalrcmperis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Calrcmperi) {
        return item.id;
    }
    registerChangeInCalrcmperis() {
        this.eventSubscriber = this.eventManager.subscribe('calrcmperiListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
