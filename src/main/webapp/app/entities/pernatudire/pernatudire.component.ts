import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Pernatudire } from './pernatudire.model';
import { PernatudireService } from './pernatudire.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pernatudire',
    templateUrl: './pernatudire.component.html'
})
export class PernatudireComponent implements OnInit, OnDestroy {
pernatudires: Pernatudire[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pernatudireService: PernatudireService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.pernatudireService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.pernatudires = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.pernatudireService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pernatudires = res.json;
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
        this.registerChangeInPernatudires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Pernatudire) {
        return item.id;
    }
    registerChangeInPernatudires() {
        this.eventSubscriber = this.eventManager.subscribe('pernatudireListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
