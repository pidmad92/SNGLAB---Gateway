import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AccadoateComponent } from './accadoate.component';
import { AccadoateDetailComponent } from './accadoate-detail.component';
import { AccadoatePopupComponent } from './accadoate-dialog.component';
import { AccadoateDeletePopupComponent } from './accadoate-delete-dialog.component';

export const accadoateRoute: Routes = [
    {
        path: 'accadoate',
        component: AccadoateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accadoate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'accadoate/:id',
        component: AccadoateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accadoate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accadoatePopupRoute: Routes = [
    {
        path: 'accadoate-new',
        component: AccadoatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accadoate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accadoate/:id/edit',
        component: AccadoatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accadoate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accadoate/:id/delete',
        component: AccadoateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.accadoate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
