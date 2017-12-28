import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { Resulconci } from './resulconci.model';
import { ResulconciService } from './resulconci.service';
import { JhiEventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-mantenimiento-resultado',
    templateUrl: './mantenimiento-resultado.component.html'
})
export class MantenimientoResultadoComponent implements OnInit {

    resulconcis: Resulconci[];
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager,
        private resulconciService: ResulconciService
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInResulconcis();
    }
    loadAll() {
        if (this.currentSearch) {
            this.resulconciService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.resulconcis = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.resulconciService.query().subscribe(
            (res: ResponseWrapper) => {
                this.resulconcis = res.json;
                console.log(this.resulconcis);
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

    registerChangeInResulconcis() {
        this.eventSubscriber = this.eventManager.subscribe('resulconciListModification', (response) => this.loadAll());
    }
    private onError(error) {
        // this.jhiAlertService.error(error.message, null, null);
    }
}
