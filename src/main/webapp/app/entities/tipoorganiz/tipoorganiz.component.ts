import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Tipoorganiz } from './tipoorganiz.model';
import { TipoorganizService } from './tipoorganiz.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipoorganiz',
    templateUrl: './tipoorganiz.component.html'
})
export class TipoorganizComponent implements OnInit, OnDestroy {
tipoorganizs: Tipoorganiz[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipoorganizService: TipoorganizService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.tipoorganizService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.tipoorganizs = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.tipoorganizService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipoorganizs = res.json;
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
        this.registerChangeInTipoorganizs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tipoorganiz) {
        return item.id;
    }
    registerChangeInTipoorganizs() {
        this.eventSubscriber = this.eventManager.subscribe('tipoorganizListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
