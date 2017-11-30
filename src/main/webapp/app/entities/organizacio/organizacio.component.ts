import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Organizacio } from './organizacio.model';
import { OrganizacioService } from './organizacio.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-organizacio',
    templateUrl: './organizacio.component.html'
})
export class OrganizacioComponent implements OnInit, OnDestroy {
organizacios: Organizacio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private organizacioService: OrganizacioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.organizacioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.organizacios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.organizacioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.organizacios = res.json;
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
        this.registerChangeInOrganizacios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Organizacio) {
        return item.id;
    }
    registerChangeInOrganizacios() {
        this.eventSubscriber = this.eventManager.subscribe('organizacioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
