import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DocinperdlbComponent } from './docinperdlb.component';
import { DocinperdlbDetailComponent } from './docinperdlb-detail.component';
import { DocinperdlbPopupComponent } from './docinperdlb-dialog.component';
import { DocinperdlbDeletePopupComponent } from './docinperdlb-delete-dialog.component';

export const docinperdlbRoute: Routes = [
    {
        path: 'docinperdlb',
        component: DocinperdlbComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docinperdlb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'docinperdlb/:id',
        component: DocinperdlbDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docinperdlb.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const docinperdlbPopupRoute: Routes = [
    {
        path: 'docinperdlb-new',
        component: DocinperdlbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docinperdlb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docinperdlb/:id/edit',
        component: DocinperdlbPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docinperdlb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'docinperdlb/:id/delete',
        component: DocinperdlbDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.docinperdlb.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
