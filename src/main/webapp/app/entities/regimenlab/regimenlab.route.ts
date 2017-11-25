import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RegimenlabComponent } from './regimenlab.component';
import { RegimenlabDetailComponent } from './regimenlab-detail.component';
import { RegimenlabPopupComponent } from './regimenlab-dialog.component';
import { RegimenlabDeletePopupComponent } from './regimenlab-delete-dialog.component';

export const regimenlabRoute: Routes = [
    {
        path: 'regimenlab',
        component: RegimenlabComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'regimenlab/:id',
        component: RegimenlabDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlab.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const regimenlabPopupRoute: Routes = [
    {
        path: 'regimenlab-new',
        component: RegimenlabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regimenlab/:id/edit',
        component: RegimenlabPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'regimenlab/:id/delete',
        component: RegimenlabDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.regimenlab.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
