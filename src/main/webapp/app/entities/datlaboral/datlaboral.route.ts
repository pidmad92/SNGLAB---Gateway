import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DatlaboralComponent } from './datlaboral.component';
import { DatlaboralDetailComponent } from './datlaboral-detail.component';
import { DatlaboralPopupComponent } from './datlaboral-dialog.component';
import { DatlaboralDeletePopupComponent } from './datlaboral-delete-dialog.component';

export const datlaboralRoute: Routes = [
    {
        path: 'datlaboral',
        component: DatlaboralComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlaboral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'datlaboral/:id',
        component: DatlaboralDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlaboral.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datlaboralPopupRoute: Routes = [
    {
        path: 'datlaboral-new',
        component: DatlaboralPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datlaboral/:id/edit',
        component: DatlaboralPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datlaboral/:id/delete',
        component: DatlaboralDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlaboral.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
