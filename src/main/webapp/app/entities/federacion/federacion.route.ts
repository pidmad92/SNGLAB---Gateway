import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FederacionComponent } from './federacion.component';
import { FederacionDetailComponent } from './federacion-detail.component';
import { FederacionPopupComponent } from './federacion-dialog.component';
import { FederacionDeletePopupComponent } from './federacion-delete-dialog.component';

export const federacionRoute: Routes = [
    {
        path: 'federacion',
        component: FederacionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.federacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'federacion/:id',
        component: FederacionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.federacion.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const federacionPopupRoute: Routes = [
    {
        path: 'federacion-new',
        component: FederacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.federacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'federacion/:id/edit',
        component: FederacionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.federacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'federacion/:id/delete',
        component: FederacionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.federacion.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
