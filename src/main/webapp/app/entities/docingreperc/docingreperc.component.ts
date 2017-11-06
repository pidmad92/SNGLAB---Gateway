import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Docingreperc } from './docingreperc.model';
import { DocingrepercService } from './docingreperc.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docingreperc',
    templateUrl: './docingreperc.component.html'
})
export class DocingrepercComponent implements OnInit, OnDestroy {
docingrepercs: Docingreperc[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private docingrepercService: DocingrepercService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.docingrepercService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.docingrepercs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.docingrepercService.query().subscribe(
            (res: ResponseWrapper) => {
                this.docingrepercs = res.json;
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
        this.registerChangeInDocingrepercs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Docingreperc) {
        return item.id;
    }
    registerChangeInDocingrepercs() {
        this.eventSubscriber = this.eventManager.subscribe('docingrepercListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
