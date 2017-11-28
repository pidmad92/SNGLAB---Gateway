import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OridenuComponent } from './oridenu.component';
import { OridenuDetailComponent } from './oridenu-detail.component';
import { OridenuPopupComponent } from './oridenu-dialog.component';
import { OridenuDeletePopupComponent } from './oridenu-delete-dialog.component';

export const oridenuRoute: Routes = [
    {
        path: 'oridenu',
        component: OridenuComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oridenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'oridenu/:id',
        component: OridenuDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oridenu.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const oridenuPopupRoute: Routes = [
    {
        path: 'oridenu-new',
        component: OridenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oridenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'oridenu/:id/edit',
        component: OridenuPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oridenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'oridenu/:id/delete',
        component: OridenuDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.oridenu.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
