import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Datlaboral } from './datlaboral.model';
import { DatlaboralService } from './datlaboral.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-datlaboral',
    templateUrl: './datlaboral.component.html'
})
export class DatlaboralComponent implements OnInit, OnDestroy {
datlaborals: Datlaboral[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private datlaboralService: DatlaboralService,
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
            this.datlaboralService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.datlaborals = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.datlaboralService.query().subscribe(
            (res: ResponseWrapper) => {
                this.datlaborals = res.json;
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
        this.registerChangeInDatlaborals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Datlaboral) {
        return item.id;
    }
    registerChangeInDatlaborals() {
        this.eventSubscriber = this.eventManager.subscribe('datlaboralListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
