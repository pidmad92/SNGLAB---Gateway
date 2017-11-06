import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Docpresenta } from './docpresenta.model';
import { DocpresentaService } from './docpresenta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-docpresenta',
    templateUrl: './docpresenta.component.html'
})
export class DocpresentaComponent implements OnInit, OnDestroy {
docpresentas: Docpresenta[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private docpresentaService: DocpresentaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.docpresentaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.docpresentas = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.docpresentaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.docpresentas = res.json;
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
        this.registerChangeInDocpresentas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Docpresenta) {
        return item.id;
    }
    registerChangeInDocpresentas() {
        this.eventSubscriber = this.eventManager.subscribe('docpresentaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
