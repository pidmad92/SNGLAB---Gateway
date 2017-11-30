import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ScargoComponent } from './scargo.component';
import { ScargoDetailComponent } from './scargo-detail.component';
import { ScargoPopupComponent } from './scargo-dialog.component';
import { ScargoDeletePopupComponent } from './scargo-delete-dialog.component';

export const scargoRoute: Routes = [
    {
        path: 'scargo',
        component: ScargoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.scargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'scargo/:id',
        component: ScargoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.scargo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const scargoPopupRoute: Routes = [
    {
        path: 'scargo-new',
        component: ScargoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.scargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scargo/:id/edit',
        component: ScargoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.scargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'scargo/:id/delete',
        component: ScargoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.scargo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
