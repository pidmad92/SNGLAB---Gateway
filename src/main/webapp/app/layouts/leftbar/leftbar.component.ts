import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Rx';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageService, JhiEventManager } from 'ng-jhipster';
import { Principal, LoginModalService, LoginService } from '../../shared';
import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';

@Component({
    selector: 'jhi-leftbar',
    templateUrl: './leftbar.component.html',
    styleUrls: [
        'leftbar.scss'
    ]
})
export class LeftbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    eventSubscriber: Subscription;
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    aplicacion: string;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;

        this.getRoute(router);
    }

    getRoute(router) {
        if (router.url.indexOf('defensa') === 1) {
            this.aplicacion = 'defensa';
        } else if (router.url.indexOf('consultas') === 1) {
            this.aplicacion = 'consultas';
        } else if (router.url.indexOf('liquidaciones') === 1) {
            this.aplicacion = 'liquidaciones';
        } else if (router.url.indexOf('sindicatos') === 1) {
            this.aplicacion = 'sindicatos';
        } else if (router.url.indexOf('dictamenes') === 1) {
            this.aplicacion = 'dictamenes';
        } else if (router.url.indexOf('denuncias') === 1) {
            this.aplicacion = 'denuncias';
        } else {
            this.aplicacion = 'dictamenes';
        }
    }

    ngOnInit() {
        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
        this.registerChangeInRoutes();
    }

    registerChangeInRoutes() {
        this.eventSubscriber = this.eventManager.subscribe('changeRoute', (response) => this.getRoute(this.router));
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
}
