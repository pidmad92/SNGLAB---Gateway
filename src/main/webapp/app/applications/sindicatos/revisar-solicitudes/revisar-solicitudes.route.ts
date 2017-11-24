import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RevisarSolicitudesComponent } from './revisar-solicitudes.component';
import { EvaluarSolicitudesComponent } from './evaluar-solicitudes.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RevisarSolicitudesRoute: Routes = [
    {
        path: 'revisar-solicitudes',
        component: RevisarSolicitudesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Revisar Solicitudes'
        },

        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'evaluar-solicitudes/:id',
                component: EvaluarSolicitudesComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'Evaluar Solicitudes'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
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

export const RevisarSolicitudesPopupRoute: Routes = [
    {
        path: 'evaluar-solicitudes',
        component: EvaluarSolicitudesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Evaluar Solicitudes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popupexp'
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
