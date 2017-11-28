import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CartrabComponent } from './cartrab.component';
import { CartrabDetailComponent } from './cartrab-detail.component';
import { CartrabPopupComponent } from './cartrab-dialog.component';
import { CartrabDeletePopupComponent } from './cartrab-delete-dialog.component';

export const cartrabRoute: Routes = [
    {
        path: 'cartrab',
        component: CartrabComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cartrab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cartrab/:id',
        component: CartrabDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cartrab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cartrabPopupRoute: Routes = [
    {
        path: 'cartrab-new',
        component: CartrabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cartrab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cartrab/:id/edit',
        component: CartrabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cartrab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cartrab/:id/delete',
        component: CartrabDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.cartrab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
