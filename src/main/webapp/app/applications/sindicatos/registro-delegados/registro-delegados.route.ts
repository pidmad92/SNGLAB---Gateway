import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroDelegadosComponent } from './registro-delegados.component';
import { ConsultaDelegadosComponent } from './consulta-delegados.component';
import { IngresoDelegadosComponent } from './ingreso-delegados.component';
import { NuevoDelegadosComponent } from './nuevo-delegados.component';
import { PrincipalComponent } from './principal.component';

// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroDelegadosRoute: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consulta Delegados'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'nuevo-delegados',
                component: NuevoDelegadosComponent,
                /*data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },*/
                outlet: 'wizard'
            },
            {
                path: 'consulta-delegados',
                component: ConsultaDelegadosComponent,
                outlet: 'wizard'
            }
        ]
    },
    {
        path: 'consulta-delegados',
        component: ConsultaDelegadosComponent
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
