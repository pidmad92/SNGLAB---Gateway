import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DatlabComponent } from './datlab.component';
import { DatlabDetailComponent } from './datlab-detail.component';
import { DatlabPopupComponent } from './datlab-dialog.component';
import { DatlabDeletePopupComponent } from './datlab-delete-dialog.component';

export const datlabRoute: Routes = [
    {
        path: 'datlab',
        component: DatlabComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'datlab/:id',
        component: DatlabDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const datlabPopupRoute: Routes = [
    {
        path: 'datlab-new',
        component: DatlabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datlab/:id/edit',
        component: DatlabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'datlab/:id/delete',
        component: DatlabDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.datlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
