import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DiscapComponent } from './discap.component';
import { DiscapDetailComponent } from './discap-detail.component';
import { DiscapPopupComponent } from './discap-dialog.component';
import { DiscapDeletePopupComponent } from './discap-delete-dialog.component';

export const discapRoute: Routes = [
    {
        path: 'discap',
        component: DiscapComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discap.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discap/:id',
        component: DiscapDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discap.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discapPopupRoute: Routes = [
    {
        path: 'discap-new',
        component: DiscapPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discap/:id/edit',
        component: DiscapPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discap/:id/delete',
        component: DiscapDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discap.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
