import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroDelegadosComponent } from './registro-delegados.component';
import { ConsultaDelegadosComponent } from './consulta-delegados.component';
import { IngresoDelegadosComponent } from './ingreso-delegados.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroDelegadosRoute: Routes = [
    {
        path: 'registro-delegados',
        component: RegistroDelegadosComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-delegados',
        component: ConsultaDelegadosComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'ingreso-delegados',
        component: IngresoDelegadosComponent,
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
