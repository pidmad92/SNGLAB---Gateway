import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Solicitud } from './solicitud.model';
import { SolicitudService } from './solicitud.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-solicitud',
    templateUrl: './solicitud.component.html',
    styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit, OnDestroy {
    solicituds: Solicitud[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    display = false;

    showDialog() {
        this.display = true;
        console.log('1')
    }

    constructor(
        private solicitudService: SolicitudService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.solicitudService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: ResponseWrapper) => this.solicituds = res.json,
                    (res: ResponseWrapper) => this.onError(res.json)
                );
            return;
       }
        this.solicitudService.query().subscribe(
            (res: ResponseWrapper) => {
                this.solicituds = res.json;
                this.currentSearch = '';
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.display = false;
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    obtenerListaSolicitud() {
        this.solicitudService.obtenerlistaSolicitudes().subscribe(
            (res: ResponseWrapper) => this.solicituds = res.json,
            (res: ResponseWrapper) => this.onError(res.json),
        );
    }

    setColor() {
        let estadoSolicitud: string;
        estadoSolicitud = 'E';
        if (estadoSolicitud = 'P') {
            return '';
        }else if (estadoSolicitud = 'E') {
            return 'yellow';
        }else if (estadoSolicitud = 'O') {
            return 'red';
        }else {
            return 'green';
        }
    }
}
