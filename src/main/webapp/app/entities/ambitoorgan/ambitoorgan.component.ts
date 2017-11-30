import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Ambitoorgan } from './ambitoorgan.model';
import { AmbitoorganService } from './ambitoorgan.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-ambitoorgan',
    templateUrl: './ambitoorgan.component.html'
})
export class AmbitoorganComponent implements OnInit, OnDestroy {
ambitoorgans: Ambitoorgan[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private ambitoorganService: AmbitoorganService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.ambitoorganService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.ambitoorgans = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.ambitoorganService.query().subscribe(
            (res: ResponseWrapper) => {
                this.ambitoorgans = res.json;
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
        this.registerChangeInAmbitoorgans();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Ambitoorgan) {
        return item.id;
    }
    registerChangeInAmbitoorgans() {
        this.eventSubscriber = this.eventManager.subscribe('ambitoorganListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
