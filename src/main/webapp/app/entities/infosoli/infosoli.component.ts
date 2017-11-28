import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Infosoli } from './infosoli.model';
import { InfosoliService } from './infosoli.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-infosoli',
    templateUrl: './infosoli.component.html'
})
export class InfosoliComponent implements OnInit, OnDestroy {
infosolis: Infosoli[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private infosoliService: InfosoliService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.infosoliService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.infosolis = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.infosoliService.query().subscribe(
            (res: ResponseWrapper) => {
                this.infosolis = res.json;
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
        this.registerChangeInInfosolis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Infosoli) {
        return item.id;
    }
    registerChangeInInfosolis() {
        this.eventSubscriber = this.eventManager.subscribe('infosoliListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
