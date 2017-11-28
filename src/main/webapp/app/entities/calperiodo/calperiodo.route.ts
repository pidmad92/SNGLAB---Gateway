import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CalperiodoComponent } from './calperiodo.component';
import { CalperiodoDetailComponent } from './calperiodo-detail.component';
import { CalperiodoPopupComponent } from './calperiodo-dialog.component';
import { CalperiodoDeletePopupComponent } from './calperiodo-delete-dialog.component';

export const calperiodoRoute: Routes = [
    {
        path: 'calperiodo',
        component: CalperiodoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calperiodo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'calperiodo/:id',
        component: CalperiodoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calperiodo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const calperiodoPopupRoute: Routes = [
    {
        path: 'calperiodo-new',
        component: CalperiodoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calperiodo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calperiodo/:id/edit',
        component: CalperiodoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calperiodo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'calperiodo/:id/delete',
        component: CalperiodoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.calperiodo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
