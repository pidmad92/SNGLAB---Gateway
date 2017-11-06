import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Accionadop } from './accionadop.model';
import { AccionadopService } from './accionadop.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-accionadop',
    templateUrl: './accionadop.component.html'
})
export class AccionadopComponent implements OnInit, OnDestroy {
accionadops: Accionadop[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private accionadopService: AccionadopService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.accionadopService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.accionadops = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.accionadopService.query().subscribe(
            (res: ResponseWrapper) => {
                this.accionadops = res.json;
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
        this.registerChangeInAccionadops();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Accionadop) {
        return item.id;
    }
    registerChangeInAccionadops() {
        this.eventSubscriber = this.eventManager.subscribe('accionadopListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
