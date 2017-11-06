import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Modacontrato } from './modacontrato.model';
import { ModacontratoService } from './modacontrato.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-modacontrato',
    templateUrl: './modacontrato.component.html'
})
export class ModacontratoComponent implements OnInit, OnDestroy {
modacontratoes: Modacontrato[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private modacontratoService: ModacontratoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.modacontratoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.modacontratoes = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.modacontratoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.modacontratoes = res.json;
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
        this.registerChangeInModacontratoes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Modacontrato) {
        return item.id;
    }
    registerChangeInModacontratoes() {
        this.eventSubscriber = this.eventManager.subscribe('modacontratoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
