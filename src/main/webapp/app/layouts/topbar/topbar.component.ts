import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

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
    ruta: any;
    private modules: { id: string, nombre: string, ruta: any }[] = [
        { 'id': '0', 'nombre': 'seguridad', 'ruta': ['/'] },
        { 'id': '1', 'nombre': 'liquidaciones', 'ruta': ['/liquidaciones/registro-atencion'] },
        { 'id': '2', 'nombre': 'consultas', 'ruta': ['consultas/atencion-trabajador'] },
        { 'id': '3', 'nombre': 'conciliacion', 'ruta': ['/defensa/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }] },
        { 'id': '4', 'nombre': 'defensa', 'ruta': ['/defensa/expediente/registro' , { outlets: { wizard: ['datos-pase'] } }] },
        { 'id': '5', 'nombre': 'patrocinio', 'ruta': ['/patrocinio/legajo/registro' , { outlets: { wizard: ['seleccion-legajo'] } }] },
        { 'id': '6', 'nombre': 'sindicatos', 'ruta': ['sindicatos/bienvenida'] },
        { 'id': '7', 'nombre': 'denuncias', 'ruta': ['/denuncias/validarruc'] },
        { 'id': '8', 'nombre': 'dictamen', 'ruta': ['/dictamenes/listado-solicitudes'] }
    ];

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private eventManager: JhiEventManager,
        private router: Router
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.updateRouteSelect(this.router.url);
    }
    updateRouteSelect(url) {
        for (const module of this.modules) {
            if (url === '/') {
                this.ruta = '0';
            } else if (url.indexOf(module.nombre) === 1) {
                this.ruta = module.id;
            }
        }
    }
    updateModule() {
        const codRuta = this.ruta;
        for (const module of this.modules) {
            if (codRuta === module.id) {
                this.router.navigate(module.ruta);
            }
        }
        this.router.events
            .filter((event) => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
           this.onChangeSuccess();
        });
    }
    private onChangeSuccess() {
        this.eventManager.broadcast({ name: 'changeRoute', content: 'OK'});
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
