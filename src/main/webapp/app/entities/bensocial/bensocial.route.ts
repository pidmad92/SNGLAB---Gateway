import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BensocialComponent } from './bensocial.component';
import { BensocialDetailComponent } from './bensocial-detail.component';
import { BensocialPopupComponent } from './bensocial-dialog.component';
import { BensocialDeletePopupComponent } from './bensocial-delete-dialog.component';

export const bensocialRoute: Routes = [
    {
        path: 'bensocial',
        component: BensocialComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.bensocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bensocial/:id',
        component: BensocialDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.bensocial.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bensocialPopupRoute: Routes = [
    {
        path: 'bensocial-new',
        component: BensocialPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.bensocial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bensocial/:id/edit',
        component: BensocialPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.bensocial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bensocial/:id/delete',
        component: BensocialDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.bensocial.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
