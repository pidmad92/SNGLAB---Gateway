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
    expedientes: any;
    id = '14';
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
        this.expedientes = [
            {item: '1', codexpediente : '0000002169-10', fecha: '10/03/2010', conciliador: 'SLIZARRAGA',
                ruc: '20505158343', empleador: 'CONFECCIONES INCA COTTON S.A.C', nrodoc: '56897245', nomdoc: '' },
            {item: '2', codexpediente : '0000001699-06', fecha: '11/05/2006', conciliador: 'ACASSANA',
                ruc: '20251850993', empleador: 'GRUPO INTERNACIONAL SERVICE S.A.C.', nrodoc: '56897458', nomdoc: '' },
            {item: '3', codexpediente : '0000001698-07', fecha: '15/06/2007', conciliador: 'SLIZARRAGA',
                ruc: '20504257381', empleador: 'SYSTEM DATABASE S.A.', nrodoc: '56897845', nomdoc: '' }
        ]
        this.loadAll();
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
