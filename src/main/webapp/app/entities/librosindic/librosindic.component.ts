import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Librosindic } from './librosindic.model';
import { LibrosindicService } from './librosindic.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-librosindic',
    templateUrl: './librosindic.component.html'
})
export class LibrosindicComponent implements OnInit, OnDestroy {
librosindics: Librosindic[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private librosindicService: LibrosindicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.librosindicService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.librosindics = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.librosindicService.query().subscribe(
            (res: ResponseWrapper) => {
                this.librosindics = res.json;
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
        this.registerChangeInLibrosindics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Librosindic) {
        return item.id;
    }
    registerChangeInLibrosindics() {
        this.eventSubscriber = this.eventManager.subscribe('librosindicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
