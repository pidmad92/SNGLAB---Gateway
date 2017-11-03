import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ProfileService } from '../profiles/profile.service';
import { Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';
declare var $: any;

@Component({
    selector: 'jhi-topbar',
    templateUrl: './topbar.component.html',
})
export class TopbarComponent implements OnInit {

    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
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
    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        if ($( window ).width() > 992) {
            $('.left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active'); // reduce el menu vertical
            $('.right-col').toggleClass('col-lg-11').toggleClass('col-12').toggleClass('col-lg-10');
            $('.logo a span').toggleClass('active'); // desaparece la letra del logo
            $('.welcome').toggleClass('active'); // desaparece el bienvenido
            $('.left-col nav h3').toggleClass('active'); // desaparece los titulo
            $('nav a.a-menu').toggleClass('d-flex flex-column align-items-center'); // poner en vertical el contenido del menu vertical
            $('.fa-chevron-down').toggleClass('active');
            $('.level-two').toggleClass('level-two-min');
        }
        if ($( window ).width() < 992) {
            $('.left-col').toggleClass('active');
            $('a.logo span').toggleClass('active');
            // $('.left-col').animate({width: ['toggle']}, 'fast', 'linear'); // reduce el menu vertical
            $('.right-col').toggleClass('col-12').toggleClass('col-10');
            $('.welcome').addClass('active'); // desaparece el bienvenido
            // $('.left-col nav h3').addClass('active'); // desaparece los titulo
            $('nav a.a-menu').addClass('d-flex flex-column align-items-center'); // poner en vertical el contenido del menu vertical
            $('.fa-chevron-down').toggleClass('active');
            $('.level-two').toggleClass('level-two-min');
        }
        // $('.left-col').toggleClass('active');
        // $('.logo a span').toggleClass('active');
        // $('.welcome').toggleClass('active');
        // $('.left-col nav h3').toggleClass('active');
        // $('nav a').toggleClass('d-flex flex-column align-items-center');
        // $('.fa-chevron-down').toggleClass('active');
        // $('#sidebar-nav').toggleClass('normalizar');
        // $('.level-two').toggleClass('level-two-min');
        // this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
