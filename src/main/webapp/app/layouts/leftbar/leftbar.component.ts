import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageService } from 'ng-jhipster';
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
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    aplicacion: string;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;

        if (router.url.indexOf('defensa') === 1) {
            this.aplicacion = 'defensa';
        } else if (router.url.indexOf('consultas') === 1) {
            this.aplicacion = 'consultas';
        } else if (router.url.indexOf('sindicatos') === 1) {
            this.aplicacion = 'sindicatos';
        } else if (router.url.indexOf('dictamenes') === 1) {
            this.aplicacion = 'dictamenes';
        } else {
            // this.aplicacion = 'seguridad';
            this.aplicacion = 'dictamenes';
        }
    }

    ngOnInit() {
        this.profileService.getProfileInfo().subscribe((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
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
