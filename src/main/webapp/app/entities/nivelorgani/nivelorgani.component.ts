import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Nivelorgani } from './nivelorgani.model';
import { NivelorganiService } from './nivelorgani.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-nivelorgani',
    templateUrl: './nivelorgani.component.html'
})
export class NivelorganiComponent implements OnInit, OnDestroy {
nivelorganis: Nivelorgani[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private nivelorganiService: NivelorganiService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.nivelorganiService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.nivelorganis = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.nivelorganiService.query().subscribe(
            (res: ResponseWrapper) => {
                this.nivelorganis = res.json;
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
        this.registerChangeInNivelorganis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Nivelorgani) {
        return item.id;
    }
    registerChangeInNivelorganis() {
        this.eventSubscriber = this.eventManager.subscribe('nivelorganiListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
