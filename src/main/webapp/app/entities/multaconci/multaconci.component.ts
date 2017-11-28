import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Multaconci } from './multaconci.model';
import { MultaconciService } from './multaconci.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-multaconci',
    templateUrl: './multaconci.component.html'
})
export class MultaconciComponent implements OnInit, OnDestroy {
multaconcis: Multaconci[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private multaconciService: MultaconciService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.multaconciService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.multaconcis = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.multaconciService.query().subscribe(
            (res: ResponseWrapper) => {
                this.multaconcis = res.json;
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
        this.registerChangeInMultaconcis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Multaconci) {
        return item.id;
    }
    registerChangeInMultaconcis() {
        this.eventSubscriber = this.eventManager.subscribe('multaconciListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
