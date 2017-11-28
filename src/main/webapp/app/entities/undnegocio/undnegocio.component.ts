import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Undnegocio } from './undnegocio.model';
import { UndnegocioService } from './undnegocio.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-undnegocio',
    templateUrl: './undnegocio.component.html'
})
export class UndnegocioComponent implements OnInit, OnDestroy {
undnegocios: Undnegocio[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private undnegocioService: UndnegocioService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.undnegocioService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.undnegocios = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.undnegocioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.undnegocios = res.json;
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
        this.registerChangeInUndnegocios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Undnegocio) {
        return item.id;
    }
    registerChangeInUndnegocios() {
        this.eventSubscriber = this.eventManager.subscribe('undnegocioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
