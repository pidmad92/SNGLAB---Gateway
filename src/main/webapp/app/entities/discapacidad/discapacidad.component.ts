import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Discapacidad } from './discapacidad.model';
import { DiscapacidadService } from './discapacidad.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-discapacidad',
    templateUrl: './discapacidad.component.html'
})
export class DiscapacidadComponent implements OnInit, OnDestroy {
discapacidads: Discapacidad[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private discapacidadService: DiscapacidadService,
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
            this.discapacidadService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.discapacidads = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.discapacidadService.query().subscribe(
            (res: ResponseWrapper) => {
                this.discapacidads = res.json;
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
        this.registerChangeInDiscapacidads();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Discapacidad) {
        return item.id;
    }
    registerChangeInDiscapacidads() {
        this.eventSubscriber = this.eventManager.subscribe('discapacidadListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
