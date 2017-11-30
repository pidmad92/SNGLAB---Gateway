import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Calificacio } from './calificacio.model';
import { CalificacioService } from './calificacio.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-calificacio',
    templateUrl: './calificacio.component.html'
})
export class CalificacioComponent implements OnInit, OnDestroy {
calificacios: Calificacio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private calificacioService: CalificacioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.calificacioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.calificacios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.calificacioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.calificacios = res.json;
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
        this.registerChangeInCalificacios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Calificacio) {
        return item.id;
    }
    registerChangeInCalificacios() {
        this.eventSubscriber = this.eventManager.subscribe('calificacioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
