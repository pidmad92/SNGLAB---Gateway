import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Motivocese } from './motivocese.model';
import { MotivoceseService } from './motivocese.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-motivocese',
    templateUrl: './motivocese.component.html'
})
export class MotivoceseComponent implements OnInit, OnDestroy {
motivocese: Motivocese[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private motivoceseService: MotivoceseService,
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
            this.motivoceseService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.motivocese = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.motivoceseService.query().subscribe(
            (res: ResponseWrapper) => {
                this.motivocese = res.json;
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
        this.registerChangeInMotivocese();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Motivocese) {
        return item.id;
    }
    registerChangeInMotivocese() {
        this.eventSubscriber = this.eventManager.subscribe('motivoceseListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
