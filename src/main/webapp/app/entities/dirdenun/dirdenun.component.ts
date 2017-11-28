import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Dirdenun } from './dirdenun.model';
import { DirdenunService } from './dirdenun.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dirdenun',
    templateUrl: './dirdenun.component.html'
})
export class DirdenunComponent implements OnInit, OnDestroy {
dirdenuns: Dirdenun[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private dirdenunService: DirdenunService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.dirdenunService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.dirdenuns = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.dirdenunService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dirdenuns = res.json;
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
        this.registerChangeInDirdenuns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Dirdenun) {
        return item.id;
    }
    registerChangeInDirdenuns() {
        this.eventSubscriber = this.eventManager.subscribe('dirdenunListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
