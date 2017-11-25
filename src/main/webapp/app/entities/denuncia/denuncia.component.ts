import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Denuncia } from './denuncia.model';
import { DenunciaService } from './denuncia.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-denuncia',
    templateUrl: './denuncia.component.html'
})
export class DenunciaComponent implements OnInit, OnDestroy {
denuncias: Denuncia[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private denunciaService: DenunciaService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.denunciaService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.denuncias = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.denunciaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.denuncias = res.json;
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
        this.registerChangeInDenuncias();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Denuncia) {
        return item.id;
    }
    registerChangeInDenuncias() {
        this.eventSubscriber = this.eventManager.subscribe('denunciaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
