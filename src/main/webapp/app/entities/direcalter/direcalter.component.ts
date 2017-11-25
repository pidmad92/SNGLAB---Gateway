import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Direcalter } from './direcalter.model';
import { DirecalterService } from './direcalter.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-direcalter',
    templateUrl: './direcalter.component.html'
})
export class DirecalterComponent implements OnInit, OnDestroy {
direcalters: Direcalter[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private direcalterService: DirecalterService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.direcalterService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.direcalters = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.direcalterService.query().subscribe(
            (res: ResponseWrapper) => {
                this.direcalters = res.json;
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
        this.registerChangeInDirecalters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Direcalter) {
        return item.id;
    }
    registerChangeInDirecalters() {
        this.eventSubscriber = this.eventManager.subscribe('direcalterListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
