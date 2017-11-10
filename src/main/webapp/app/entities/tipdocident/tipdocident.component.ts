import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Tipdocident } from './tipdocident.model';
import { TipdocidentService } from './tipdocident.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipdocident',
    templateUrl: './tipdocident.component.html'
})
export class TipdocidentComponent implements OnInit, OnDestroy {
tipdocidents: Tipdocident[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipdocidentService: TipdocidentService,
        private jhiAlertService: JhiAlertService,
        private languageService: JhiLanguageService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.tipdocidentService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.tipdocidents = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.tipdocidentService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipdocidents = res.json;
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
        this.registerChangeInTipdocidents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tipdocident) {
        return item.id;
    }
    registerChangeInTipdocidents() {
        this.eventSubscriber = this.eventManager.subscribe('tipdocidentListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
