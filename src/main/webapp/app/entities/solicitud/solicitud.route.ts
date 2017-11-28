import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SolicitudComponent } from './solicitud.component';
import { SolicitudDetailComponent } from './solicitud-detail.component';
import { SolicitudPopupComponent } from './solicitud-dialog.component';
import { SolicitudDeletePopupComponent } from './solicitud-delete-dialog.component';

export const solicitudRoute: Routes = [
    {
        path: 'solicitud',
        component: SolicitudComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'solicitud/:id',
        component: SolicitudDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solicitudPopupRoute: Routes = [
    {
        path: 'solicitud-new',
        component: SolicitudPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud/:id/voucher',
        component: SolicitudPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solicitud/:id/delete',
        component: SolicitudDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.solicitud.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
