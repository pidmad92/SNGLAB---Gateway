import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Motatenofic } from './motatenofic.model';
import { MotatenoficService } from './motatenofic.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motatenofic',
    templateUrl: './motatenofic.component.html'
})
export class MotatenoficComponent implements OnInit, OnDestroy {
motatenofics: Motatenofic[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private motatenoficService: MotatenoficService,
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
            this.motatenoficService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.motatenofics = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.motatenoficService.query().subscribe(
            (res: ResponseWrapper) => {
                this.motatenofics = res.json;
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
        this.registerChangeInMotatenofics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Motatenofic) {
        return item.id;
    }
    registerChangeInMotatenofics() {
        this.eventSubscriber = this.eventManager.subscribe('motatenoficListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
