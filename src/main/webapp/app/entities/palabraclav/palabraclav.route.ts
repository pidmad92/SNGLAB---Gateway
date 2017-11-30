import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PalabraclavComponent } from './palabraclav.component';
import { PalabraclavDetailComponent } from './palabraclav-detail.component';
import { PalabraclavPopupComponent } from './palabraclav-dialog.component';
import { PalabraclavDeletePopupComponent } from './palabraclav-delete-dialog.component';

export const palabraclavRoute: Routes = [
    {
        path: 'palabraclav',
        component: PalabraclavComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.palabraclav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'palabraclav/:id',
        component: PalabraclavDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.palabraclav.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const palabraclavPopupRoute: Routes = [
    {
        path: 'palabraclav-new',
        component: PalabraclavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.palabraclav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'palabraclav/:id/edit',
        component: PalabraclavPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.palabraclav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'palabraclav/:id/delete',
        component: PalabraclavDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.palabraclav.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
