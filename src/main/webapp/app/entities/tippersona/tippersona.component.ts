import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Tippersona } from './tippersona.model';
import { TippersonaService } from './tippersona.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tippersona',
    templateUrl: './tippersona.component.html'
})
export class TippersonaComponent implements OnInit, OnDestroy {
tippersonas: Tippersona[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tippersonaService: TippersonaService,
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
            this.tippersonaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.tippersonas = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.tippersonaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tippersonas = res.json;
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
        this.registerChangeInTippersonas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tippersona) {
        return item.id;
    }
    registerChangeInTippersonas() {
        this.eventSubscriber = this.eventManager.subscribe('tippersonaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
