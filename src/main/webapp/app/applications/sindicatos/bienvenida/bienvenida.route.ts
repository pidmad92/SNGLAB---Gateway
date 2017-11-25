import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { BienvenidaComponent } from './bienvenida.component';
import { BienvenidatComponent } from './bienvenidat.component';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

// import { RevisarSolicitudesComponent } from './revisar-solicitudes.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const BienvenidaRoute: Routes = [
    {
        path: 'bienvenida',
        component: BienvenidaComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        // canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'bienvenidat',
                component: BienvenidatComponent,
                /*data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },*/
                outlet: 'wizardbt'
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
         ]
    },
    {
        path: 'bienvenidatmodal',
        component: BienvenidatComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        outlet: 'wizardbt'
    }
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
