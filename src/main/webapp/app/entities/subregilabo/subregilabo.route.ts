import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SubregilaboComponent } from './subregilabo.component';
import { SubregilaboDetailComponent } from './subregilabo-detail.component';
import { SubregilaboPopupComponent } from './subregilabo-dialog.component';
import { SubregilaboDeletePopupComponent } from './subregilabo-delete-dialog.component';

export const subregilaboRoute: Routes = [
    {
        path: 'subregilabo',
        component: SubregilaboComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.subregilabo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'subregilabo/:id',
        component: SubregilaboDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.subregilabo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const subregilaboPopupRoute: Routes = [
    {
        path: 'subregilabo-new',
        component: SubregilaboPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.subregilabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subregilabo/:id/edit',
        component: SubregilaboPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.subregilabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'subregilabo/:id/delete',
        component: SubregilaboDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.subregilabo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
