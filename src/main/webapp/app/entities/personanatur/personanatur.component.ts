import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Personanatur } from './personanatur.model';
import { PersonanaturService } from './personanatur.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-personanatur',
    templateUrl: './personanatur.component.html'
})
export class PersonanaturComponent implements OnInit, OnDestroy {
personanaturs: Personanatur[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private personanaturService: PersonanaturService,
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
            this.personanaturService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.personanaturs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.personanaturService.query().subscribe(
            (res: ResponseWrapper) => {
                this.personanaturs = res.json;
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
        this.registerChangeInPersonanaturs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Personanatur) {
        return item.id;
    }
    registerChangeInPersonanaturs() {
        this.eventSubscriber = this.eventManager.subscribe('personanaturListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
