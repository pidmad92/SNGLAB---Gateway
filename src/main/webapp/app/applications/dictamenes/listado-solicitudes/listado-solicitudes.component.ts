import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { ListadoSolicitudesService } from './listado-solicitudes.service';

import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../../shared';

@Component({
    selector: 'jhi-listado-solicitudes',
    templateUrl: './listado-solicitudes.component.html',
    styleUrls: ['listado-solicitudes.scss']
})

export class ListadoSolicitudesComponent implements OnInit {
    isSaving: boolean;

    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
    ) {
    }
    loadAll() {}
    clear() {}
    ngOnInit() {}
    salirr() {}
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
