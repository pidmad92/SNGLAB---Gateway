import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Dlabingrperc } from './dlabingrperc.model';
import { DlabingrpercService } from './dlabingrperc.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-dlabingrperc',
    templateUrl: './dlabingrperc.component.html'
})
export class DlabingrpercComponent implements OnInit, OnDestroy {
dlabingrpercs: Dlabingrperc[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private dlabingrpercService: DlabingrpercService,
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
            this.dlabingrpercService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.dlabingrpercs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.dlabingrpercService.query().subscribe(
            (res: ResponseWrapper) => {
                this.dlabingrpercs = res.json;
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
        this.registerChangeInDlabingrpercs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Dlabingrperc) {
        return item.id;
    }
    registerChangeInDlabingrpercs() {
        this.eventSubscriber = this.eventManager.subscribe('dlabingrpercListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
