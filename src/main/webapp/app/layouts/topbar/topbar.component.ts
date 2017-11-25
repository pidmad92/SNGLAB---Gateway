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
    updateModule($event) {
        const ruta = $event.target.value;
        if (ruta === '0') {
            this.router.navigate(['/seguridad/aplicacion']);
        } else if (ruta === '2') {
            this.router.navigate(['/consultas/atencion']);
        } else if (ruta === '8') {
            this.router.navigate(['/dictamenes/listado-solicitudes']);
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
    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['/login']);
    }

    toggleNavbar() {
        if ($( window ).width() >= 992) {
            this.large();
        }
        if ($( window ).width() >= 768 && $( window ).width() < 992) {
            this.medium();
        }
        if ($( window ).width() >= 576 && $( window ).width() < 768) {
            this.small();
        }
        if ($( window ).width() < 576) {
            this.xsmall();
        }
    }
    large() {
        $('.left-col').toggleClass('col-lg-2').toggleClass('col-lg-1');
        $('.right-col').toggleClass('col-lg-10').toggleClass('col-lg-11');
        $('.logo span').toggleClass('active'); // desaparece la letra del logo
        $('.welcome').toggleClass('active'); // desaparece el welcome
        $('.left-col nav h3').toggleClass('active'); // desaparece el titulo
        $('nav a.a-menu').toggleClass('flex-lg-row'); // se convierte en columna
        $('.level-two').toggleClass('level-two-min'); // el submenu cambia absolute
        $('.fa-chevron-down').toggleClass('active');
    }
    medium() {
        $('header .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1');
        $('header .right-col').toggleClass('col-lg-10').toggleClass('col-lg-11');
        $('section .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('section .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                               .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('footer .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('footer .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                              .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('.logo span').toggleClass('active');
        $('.welcome').toggleClass('active');
        $('.left-col nav h3').toggleClass('active');
        $('nav a.a-menu').toggleClass('flex-lg-row');
        $('.level-two').toggleClass('level-two-min');
        $('.fa-chevron-down').toggleClass('active');
    }
    small() {
        $('header .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1');
        $('header .right-col').toggleClass('col-lg-10').toggleClass('col-lg-11');
        $('section .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('section .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                               .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('footer .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('footer .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                              .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('.logo span').toggleClass('active');
        $('.welcome').toggleClass('active');
        $('.left-col nav h3').toggleClass('active');
        $('nav a.a-menu').toggleClass('flex-lg-row');
        $('.level-two').toggleClass('level-two-min');
        $('.fa-chevron-down').toggleClass('active');
    }
    xsmall() {
        $('header .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1');
        $('header .right-col').toggleClass('col-lg-10').toggleClass('col-lg-11');
        $('section .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('section .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                               .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('footer .left-col').toggleClass('col-lg-2').toggleClass('col-lg-1').toggleClass('active-zero');
        $('footer .right-col').toggleClass('col-10').toggleClass('col-sm-10').toggleClass('col-md-10').toggleClass('col-lg-10')
                              .toggleClass('col-12').toggleClass('col-sm-12').toggleClass('col-md-12').toggleClass('col-lg-11');
        $('.logo span').toggleClass('active');
        $('.welcome').toggleClass('active');
        $('.left-col nav h3').toggleClass('active');
        $('nav a.a-menu').toggleClass('flex-lg-row');
        $('.level-two').toggleClass('level-two-min');
        $('.fa-chevron-down').toggleClass('active');
    }
    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
