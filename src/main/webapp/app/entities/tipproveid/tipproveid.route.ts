import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipproveidComponent } from './tipproveid.component';
import { TipproveidDetailComponent } from './tipproveid-detail.component';
import { TipproveidPopupComponent } from './tipproveid-dialog.component';
import { TipproveidDeletePopupComponent } from './tipproveid-delete-dialog.component';

export const tipproveidRoute: Routes = [
    {
        path: 'tipproveid',
        component: TipproveidComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipproveid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipproveid/:id',
        component: TipproveidDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipproveid.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipproveidPopupRoute: Routes = [
    {
        path: 'tipproveid-new',
        component: TipproveidPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipproveid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipproveid/:id/edit',
        component: TipproveidPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipproveid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipproveid/:id/delete',
        component: TipproveidDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipproveid.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
