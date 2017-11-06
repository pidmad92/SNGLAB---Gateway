import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Pasemotiaten } from './pasemotiaten.model';
import { PasemotiatenService } from './pasemotiaten.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pasemotiaten',
    templateUrl: './pasemotiaten.component.html'
})
export class PasemotiatenComponent implements OnInit, OnDestroy {
pasemotiatens: Pasemotiaten[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private pasemotiatenService: PasemotiatenService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.pasemotiatenService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.pasemotiatens = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.pasemotiatenService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pasemotiatens = res.json;
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
        this.registerChangeInPasemotiatens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Pasemotiaten) {
        return item.id;
    }
    registerChangeInPasemotiatens() {
        this.eventSubscriber = this.eventManager.subscribe('pasemotiatenListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
