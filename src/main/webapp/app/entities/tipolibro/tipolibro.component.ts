import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Tipolibro } from './tipolibro.model';
import { TipolibroService } from './tipolibro.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tipolibro',
    templateUrl: './tipolibro.component.html'
})
export class TipolibroComponent implements OnInit, OnDestroy {
tipolibros: Tipolibro[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private tipolibroService: TipolibroService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.tipolibroService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.tipolibros = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.tipolibroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tipolibros = res.json;
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
        this.registerChangeInTipolibros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tipolibro) {
        return item.id;
    }
    registerChangeInTipolibros() {
        this.eventSubscriber = this.eventManager.subscribe('tipolibroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
