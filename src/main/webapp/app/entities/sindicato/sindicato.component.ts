import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Sindicato } from './sindicato.model';
import { SindicatoService } from './sindicato.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-sindicato',
    templateUrl: './sindicato.component.html'
})
export class SindicatoComponent implements OnInit, OnDestroy {
sindicatoes: Sindicato[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private sindicatoService: SindicatoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.sindicatoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.sindicatoes = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.sindicatoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.sindicatoes = res.json;
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
        this.registerChangeInSindicatoes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Sindicato) {
        return item.id;
    }
    registerChangeInSindicatoes() {
        this.eventSubscriber = this.eventManager.subscribe('sindicatoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
