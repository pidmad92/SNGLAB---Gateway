import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { NotificaComponent } from './notifica.component';
import { NotificaDetailComponent } from './notifica-detail.component';
import { NotificaPopupComponent } from './notifica-dialog.component';
import { NotificaDeletePopupComponent } from './notifica-delete-dialog.component';

export const notificaRoute: Routes = [
    {
        path: 'notifica',
        component: NotificaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notifica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'notifica/:id',
        component: NotificaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notifica.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notificaPopupRoute: Routes = [
    {
        path: 'notifica-new',
        component: NotificaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notifica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notifica/:id/edit',
        component: NotificaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notifica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'notifica/:id/delete',
        component: NotificaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.notifica.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
