import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Afiliado } from './afiliado.model';
import { AfiliadoService } from './afiliado.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-afiliado',
    templateUrl: './afiliado.component.html'
})
export class AfiliadoComponent implements OnInit, OnDestroy {
afiliados: Afiliado[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private afiliadoService: AfiliadoService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.afiliadoService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.afiliados = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.afiliadoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.afiliados = res.json;
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
        this.registerChangeInAfiliados();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Afiliado) {
        return item.id;
    }
    registerChangeInAfiliados() {
        this.eventSubscriber = this.eventManager.subscribe('afiliadoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
