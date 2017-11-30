import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AmbitoorganComponent } from './ambitoorgan.component';
import { AmbitoorganDetailComponent } from './ambitoorgan-detail.component';
import { AmbitoorganPopupComponent } from './ambitoorgan-dialog.component';
import { AmbitoorganDeletePopupComponent } from './ambitoorgan-delete-dialog.component';

export const ambitoorganRoute: Routes = [
    {
        path: 'ambitoorgan',
        component: AmbitoorganComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.ambitoorgan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'ambitoorgan/:id',
        component: AmbitoorganDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.ambitoorgan.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ambitoorganPopupRoute: Routes = [
    {
        path: 'ambitoorgan-new',
        component: AmbitoorganPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.ambitoorgan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ambitoorgan/:id/edit',
        component: AmbitoorganPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.ambitoorgan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'ambitoorgan/:id/delete',
        component: AmbitoorganDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.ambitoorgan.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
