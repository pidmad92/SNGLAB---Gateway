import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroDelegadosComponent } from './registro-delegados.component';
import { ConsultaDelegadosComponent } from './consulta-delegados.component';
import { IngresoDelegadosComponent } from './ingreso-delegados.component';
import { IngresoDelegadosPopupComponent } from './ingreso-delegados.component';
import { NuevoDelegadosComponent } from './nuevo-delegados.component';
import { PrincipalComponent } from './principal.component';
import { RegistroDelegadosPopupComponent } from './registro-delegados.component';

// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroDelegadosRoute: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConsultaDelegados'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'nuevo-delegados',
                component: NuevoDelegadosComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'NuevoDelegados'
                },
                outlet: 'wizard',
                canActivate: [UserRouteAccessService],
                children: [
                    {
                        path: 'ingreso-delegados',
                        component: IngresoDelegadosPopupComponent,
                        data: {
                            authorities: ['ROLE_USER'],
                            pageTitle: 'IngresoDelegados'
                        },
                        canActivate: [UserRouteAccessService],
                        outlet: 'wizard'
                    }
                ]
            },
            {
                path: 'consulta-delegados',
                component: ConsultaDelegadosComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ConsultaDelegados'
                },
                outlet: 'wizard'
            }
        ]
    },
    {
        path: 'consulta-delegados',
        component: ConsultaDelegadosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConsultaDelegados'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'registro-delegados',
                component: RegistroDelegadosPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'RegistroDelegados'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
    },
    {
        path: 'nuevo-delegados',
        component: NuevoDelegadosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NuevoDelegados'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'ingreso-delegados',
                component: IngresoDelegadosPopupComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'IngresoDelegados'
                },
                canActivate: [UserRouteAccessService],
                outlet: 'popupexp'
            }
        ]
    }

];

export const RegistroDelegadosPopupRoute: Routes = [
    {
        path: 'registro-delegados',
        component: RegistroDelegadosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroDelegados'
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
