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
    accordionDefensa = 'expediente';
    menuDefensa = [ 'expediente', 'audiencia', 'reportes', 'mantenimiento']
    private modules = ['consultas', 'defensa', 'liquidaciones', 'sindicatos', 'dictamenes', 'denuncias', 'seguridad'];

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private route: ActivatedRoute,
        private eventManager: JhiEventManager,
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.getRoute(router.url);
    }

    getRoute(url) {
        console.log(url);
        for (const module of this.modules) {
            if (url.indexOf(module) === 1) {
                if (module === 'defensa') {
                    this.menuDefensaActive(url);
                }
                this.aplicacion = module;
            }
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
        this.eventSubscriber = this.eventManager.subscribe('changeRoute', (response) => this.getRoute(this.router.url));
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
    menuDefensaActive(url) {
        for (const menu of this.menuDefensa) {
            if (url.indexOf(menu) !== -1) {
                this.accordionDefensa = menu;
            }
        }
    }
}
