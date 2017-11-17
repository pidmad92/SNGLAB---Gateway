import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DettipprovComponent } from './dettipprov.component';
import { DettipprovDetailComponent } from './dettipprov-detail.component';
import { DettipprovPopupComponent } from './dettipprov-dialog.component';
import { DettipprovDeletePopupComponent } from './dettipprov-delete-dialog.component';

export const dettipprovRoute: Routes = [
    {
        path: 'dettipprov',
        component: DettipprovComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dettipprov.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'dettipprov/:id',
        component: DettipprovDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dettipprov.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dettipprovPopupRoute: Routes = [
    {
        path: 'dettipprov-new',
        component: DettipprovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dettipprov.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dettipprov/:id/edit',
        component: DettipprovPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dettipprov.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'dettipprov/:id/delete',
        component: DettipprovDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.dettipprov.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
