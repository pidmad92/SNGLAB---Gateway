import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Juntadirect } from './juntadirect.model';
import { JuntadirectService } from './juntadirect.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-juntadirect',
    templateUrl: './juntadirect.component.html'
})
export class JuntadirectComponent implements OnInit, OnDestroy {
juntadirects: Juntadirect[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private juntadirectService: JuntadirectService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.juntadirectService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.juntadirects = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.juntadirectService.query().subscribe(
            (res: ResponseWrapper) => {
                this.juntadirects = res.json;
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
        this.registerChangeInJuntadirects();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Juntadirect) {
        return item.id;
    }
    registerChangeInJuntadirects() {
        this.eventSubscriber = this.eventManager.subscribe('juntadirectListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
