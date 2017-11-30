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
import { PrincipalComponent } from './principal.component';
// import { AccionadopDetailComponent } from './accionadop-detail.component';
// import { AccionadopPopupComponent } from './accionadop-dialog.component';
// import { AccionadopDeletePopupComponent } from './accionadop-delete-dialog.component';

export const RegistroOrganizacionRoute: Routes = [
    {
        path: 'principal',
        component: PrincipalComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Principal'
        },
        canActivate: [UserRouteAccessService],
        children: [
            {
                path: 'registro-organizacion',
                component: RegistroOrganizacionComponent,
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'RegistroOrganizacion'
                },
                outlet: 'wizard'
            }
        ]
    },
    {
        path: 'registro-organizacion',
        component: RegistroOrganizacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroOrganizacion'
        }
    },
    {
        path: 'registro-jd',
        component: RegistroJdComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroJD'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-cargo',
        component: RegistroCargoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroCargo'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-estatuto',
        component: RegistroEstatutoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroEstatuto'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-afiliado',
        component: RegistroAfiliadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroAfiliado'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-federacion',
        component: RegistroFederacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroFederacion'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'registro-confederacion',
        component: RegistroConfederacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'RegistroConfederacion'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consulta-organizacion',
        component: ConsultaOrganizacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ConsultaOrganizacion'
        },
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
