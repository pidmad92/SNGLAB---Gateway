import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Formperfil } from './formperfil.model';
import { FormperfilService } from './formperfil.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-formperfil',
    templateUrl: './formperfil.component.html'
})
export class FormperfilComponent implements OnInit, OnDestroy {
formperfils: Formperfil[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private formperfilService: FormperfilService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.formperfilService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.formperfils = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.formperfilService.query().subscribe(
            (res: ResponseWrapper) => {
                this.formperfils = res.json;
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
        this.registerChangeInFormperfils();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Formperfil) {
        return item.id;
    }
    registerChangeInFormperfils() {
        this.eventSubscriber = this.eventManager.subscribe('formperfilListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
