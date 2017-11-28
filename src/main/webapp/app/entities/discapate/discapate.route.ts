import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DiscapateComponent } from './discapate.component';
import { DiscapateDetailComponent } from './discapate-detail.component';
import { DiscapatePopupComponent } from './discapate-dialog.component';
import { DiscapateDeletePopupComponent } from './discapate-delete-dialog.component';

export const discapateRoute: Routes = [
    {
        path: 'discapate',
        component: DiscapateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'discapate/:id',
        component: DiscapateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discapatePopupRoute: Routes = [
    {
        path: 'discapate-new',
        component: DiscapatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discapate/:id/edit',
        component: DiscapatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discapate/:id/delete',
        component: DiscapateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.discapate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
