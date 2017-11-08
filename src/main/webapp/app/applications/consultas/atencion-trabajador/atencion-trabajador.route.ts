import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AtencionTrabajadorComponent } from './atencion-trabajador.component';
import { DatosTrabajadorComponent } from './datos-trabajador.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const atencionTrabajadorRoute: Routes = [
    {
        path: 'atencion-trabajador',
        component: AtencionTrabajadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
         path: 'datos-trabajador/:id',
        component: DatosTrabajadorComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },
        canActivate: [UserRouteAccessService]
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
