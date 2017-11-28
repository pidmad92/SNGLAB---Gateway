import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Motidenun } from './motidenun.model';
import { MotidenunService } from './motidenun.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motidenun',
    templateUrl: './motidenun.component.html'
})
export class MotidenunComponent implements OnInit, OnDestroy {
motidenuns: Motidenun[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private motidenunService: MotidenunService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.motidenunService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.motidenuns = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.motidenunService.query().subscribe(
            (res: ResponseWrapper) => {
                this.motidenuns = res.json;
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
        this.registerChangeInMotidenuns();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Motidenun) {
        return item.id;
    }
    registerChangeInMotidenuns() {
        this.eventSubscriber = this.eventManager.subscribe('motidenunListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
