import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroOrganizacionComponent } from './registro-organizacion.component';
import { RegistroJdComponent } from './registro-jd.component';
import { RegistroCargoComponent } from './registro-cargo.component';
import { RegistroEstatutoComponent } from './registro-estatuto.component';
import { RegistroAfiliadoComponent } from './registro-afiliado.component';
import { RegistroFederacionComponent } from './registro-federacion.component';
import { RegistroConfederacionComponent } from './registro-confederacion.component';
import { ConsultaOrganizacionComponent } from './consulta-organizacion.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroOrganizacionRoute: Routes = [
    {
        path: 'registro-organizacion',
        component: RegistroOrganizacionComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-jd',
        component: RegistroJdComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-cargo',
        component: RegistroCargoComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-estatuto',
        component: RegistroEstatutoComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-afiliado',
        component: RegistroAfiliadoComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-federacion',
        component: RegistroFederacionComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-confederacion',
        component: RegistroConfederacionComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-organizacion',
        component: ConsultaOrganizacionComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    }
    // {
    //     path: 'accionadop/:id',
    //     component: AccionadopDetailComponent,
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'gatewayApp.accionadop.home.title'
    //     },
    //     canActivate: [UserRouteAccessService]
    // }
];

// export const accionadopPopupRoute: Routes = [
//     {
//         path: 'accionadop-new',
//         component: AccionadopPopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'gatewayApp.accionadop.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     },
//     {
//         path: 'accionadop/:id/edit',
//         component: AccionadopPopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'gatewayApp.accionadop.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     },
//     {
//         path: 'accionadop/:id/delete',
//         component: AccionadopDeletePopupComponent,
//         data: {
//             authorities: ['ROLE_USER'],
//             pageTitle: 'gatewayApp.accionadop.home.title'
//         },
//         canActivate: [UserRouteAccessService],
//         outlet: 'popup'
//     }
// ];
