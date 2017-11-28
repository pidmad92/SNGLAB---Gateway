import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipconremComponent } from './tipconrem.component';
import { TipconremDetailComponent } from './tipconrem-detail.component';
import { TipconremPopupComponent } from './tipconrem-dialog.component';
import { TipconremDeletePopupComponent } from './tipconrem-delete-dialog.component';

export const tipconremRoute: Routes = [
    {
        path: 'tipconrem',
        component: TipconremComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipconrem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipconrem/:id',
        component: TipconremDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipconrem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipconremPopupRoute: Routes = [
    {
        path: 'tipconrem-new',
        component: TipconremPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipconrem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipconrem/:id/edit',
        component: TipconremPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipconrem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipconrem/:id/delete',
        component: TipconremDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gatewayApp.tipconrem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
