import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ActiveconoComponent } from './activecono.component';
import { ActiveconoDetailComponent } from './activecono-detail.component';
import { ActiveconoPopupComponent } from './activecono-dialog.component';
import { ActiveconoDeletePopupComponent } from './activecono-delete-dialog.component';

export const activeconoRoute: Routes = [
    {
        path: 'activecono',
        component: ActiveconoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.activecono.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'activecono/:id',
        component: ActiveconoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.activecono.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const activeconoPopupRoute: Routes = [
    {
        path: 'activecono-new',
        component: ActiveconoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.activecono.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activecono/:id/edit',
        component: ActiveconoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.activecono.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'activecono/:id/delete',
        component: ActiveconoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.activecono.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
