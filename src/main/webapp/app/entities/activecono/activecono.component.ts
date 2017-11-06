import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Activecono } from './activecono.model';
import { ActiveconoService } from './activecono.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-activecono',
    templateUrl: './activecono.component.html'
})
export class ActiveconoComponent implements OnInit, OnDestroy {
activeconos: Activecono[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private activeconoService: ActiveconoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.activeconoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.activeconos = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.activeconoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.activeconos = res.json;
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
        this.registerChangeInActiveconos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Activecono) {
        return item.id;
    }
    registerChangeInActiveconos() {
        this.eventSubscriber = this.eventManager.subscribe('activeconoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
