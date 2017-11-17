import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NotificacionComponent } from './notificacion.component';
import { NotificacionDetailComponent } from './notificacion-detail.component';
import { NotificacionPopupComponent } from './notificacion-dialog.component';
import { NotificacionDeletePopupComponent } from './notificacion-delete-dialog.component';

export const notificacionRoute: Routes = [
    {
        path: 'notificacion',
        component: NotificacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notificacion/:id',
        component: NotificacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificacionPopupRoute: Routes = [
    {
        path: 'notificacion-new',
        component: NotificacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notificacion/:id/edit',
        component: NotificacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notificacion/:id/delete',
        component: NotificacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notificacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
