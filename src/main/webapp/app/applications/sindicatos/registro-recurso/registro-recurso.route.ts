import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegistroRecursoComponent } from './registro-recurso.component';
import { ConsultaRecursoComponent } from './consulta-recurso.component';
import { RegistroObservacionComponent } from './registro-observacion.component';
import { PrincipalComponent } from './principal.component';
import { NuevoRecursoComponent } from './nuevo-recurso.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroRecursoRoute: Routes = [
    {
        path: 'registro-recurso',
        component: RegistroRecursoComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-recurso',
        component: ConsultaRecursoComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-observacion',
        component: RegistroObservacionComponent,
        /*data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accionadop.home.title'
        },*/
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'principal',
        component: PrincipalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consulta Recurso'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'consulta-recurso',
                component: ConsultaRecursoComponent,
                /*data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },*/
                outlet: 'wizard'
            },
            {
                path: 'nuevo-recurso',
                component: NuevoRecursoComponent,
                /*data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },*/
                outlet: 'wizard'
            },
            {
                path: 'registro-recurso',
                component: RegistroRecursoComponent,
                /*data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'gatewayApp.accionadop.home.title'
                },*/
                outlet: 'wizard'
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
