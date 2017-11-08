import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Perjuridire } from './perjuridire.model';
import { PerjuridireService } from './perjuridire.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-perjuridire',
    templateUrl: './perjuridire.component.html'
})
export class PerjuridireComponent implements OnInit, OnDestroy {
perjuridires: Perjuridire[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private perjuridireService: PerjuridireService,
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
            this.perjuridireService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.perjuridires = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.perjuridireService.query().subscribe(
            (res: ResponseWrapper) => {
                this.perjuridires = res.json;
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
        this.registerChangeInPerjuridires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Perjuridire) {
        return item.id;
    }
    registerChangeInPerjuridires() {
        this.eventSubscriber = this.eventManager.subscribe('perjuridireListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
