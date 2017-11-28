import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MotateComponent } from './motate.component';
import { MotateDetailComponent } from './motate-detail.component';
import { MotatePopupComponent } from './motate-dialog.component';
import { MotateDeletePopupComponent } from './motate-delete-dialog.component';

export const motateRoute: Routes = [
    {
        path: 'motate',
        component: MotateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'motate/:id',
        component: MotateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const motatePopupRoute: Routes = [
    {
        path: 'motate-new',
        component: MotatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motate/:id/edit',
        component: MotatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'motate/:id/delete',
        component: MotateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.motate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
