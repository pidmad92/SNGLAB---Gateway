import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Conciliacion } from './conciliacion.model';
import { ConciliacionService } from './conciliacion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-conciliacion',
    templateUrl: './conciliacion.component.html'
})
export class ConciliacionComponent implements OnInit, OnDestroy {
conciliacions: Conciliacion[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private conciliacionService: ConciliacionService,
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
            this.conciliacionService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.conciliacions = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.conciliacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.conciliacions = res.json;
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
        this.registerChangeInConciliacions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Conciliacion) {
        return item.id;
    }
    registerChangeInConciliacions() {
        this.eventSubscriber = this.eventManager.subscribe('conciliacionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
