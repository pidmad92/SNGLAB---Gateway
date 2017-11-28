import { Component, OnInit, OnDestroy } from '@angular/core';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { Principal } from '../../../shared/index';

@Component({
    selector: 'jhi-formulario-perfil',
    templateUrl: './formulario-perfil.component.html',
    styleUrls: ['formulario-perfil.scss']
})

export class FormularioPerfilComponent implements OnInit, OnDestroy {

    constructor(
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
    ) {}

    loadAll() {}

    ngOnInit() {}

    ngOnDestroy() {}
}
