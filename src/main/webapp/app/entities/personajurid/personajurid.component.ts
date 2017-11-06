import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Personajurid } from './personajurid.model';
import { PersonajuridService } from './personajurid.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-personajurid',
    templateUrl: './personajurid.component.html'
})
export class PersonajuridComponent implements OnInit, OnDestroy {
personajurids: Personajurid[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private personajuridService: PersonajuridService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.personajuridService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.personajurids = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.personajuridService.query().subscribe(
            (res: ResponseWrapper) => {
                this.personajurids = res.json;
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
        this.registerChangeInPersonajurids();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Personajurid) {
        return item.id;
    }
    registerChangeInPersonajurids() {
        this.eventSubscriber = this.eventManager.subscribe('personajuridListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
